import logging
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from django.conf import settings
from django.core.cache import cache
from typing import Optional, Dict, Any, List
from langchain.tools import Tool, tool
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from pinecone import Pinecone
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
import yfinance as yf
import requests

logger = logging.getLogger(__name__)

class ChatService:
    """
    Enhanced chat service using GPT-4 Turbo with configurable settings
    """
    # Cache timeouts in seconds
    PRICE_CACHE_TIMEOUT = 60  # 1 minute for prices
    SENTIMENT_CACHE_TIMEOUT = 300  # 5 minutes for sentiment
    
    def __init__(
        self,
        model_name: str = "gpt-4-0125-preview",
        temperature: float = 0,
        max_tokens: Optional[int] = None,
    ):
        try:
            self.model_name = model_name
            self.temperature = temperature
            
            self.llm = ChatOpenAI(
                temperature=temperature,
                model_name=model_name,
                max_tokens=max_tokens,
                api_key=settings.OPENAI_API_KEY
            )
            
            # Initialize tools and memory
            self._initialize_tools()
            self.cache_key = "chat_history"
            
            logger.info("ChatService initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing ChatService: {str(e)}")
            raise

    def _initialize_tools(self):
        """Initialize all tools"""
        try:
            # Initialize Pinecone
            pc = Pinecone(
                api_key=settings.PINECONE_API_KEY,
                environment=settings.PINECONE_ENVIRONMENT
            )
            
            # Initialize embeddings
            self.embeddings = OpenAIEmbeddings(
                model="text-embedding-ada-002",
                api_key=settings.OPENAI_API_KEY
            )
            
            # Get the index
            index = pc.Index(settings.PINECONE_INDEX_NAME)
            
            # Initialize vector store
            self.vectorstore = LangchainPinecone(
                index,
                self.embeddings,
                "text"
            )
            
            # Create tools
            @tool
            def get_crypto_price(symbol: str) -> str:
                """Get current price and market data for a cryptocurrency."""
                cache_key = f"crypto_price_{symbol.upper()}"
                cached_result = cache.get(cache_key)
                if cached_result:
                    logger.info(f"Returning cached price for {symbol}")
                    return f"{cached_result} (Cached)"

                try:
                    # First try CoinMarketCap
                    url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
                    parameters = {
                        'symbol': symbol.upper(),
                        'convert': 'USD'
                    }
                    headers = {
                        'Accepts': 'application/json',
                        'X-CMC_PRO_API_KEY': settings.COINMARKETCAP_API_KEY,
                    }

                    response = requests.get(url, headers=headers, params=parameters)
                    data = response.json()
                    
                    if response.status_code == 200 and data['status']['error_code'] == 0:
                        crypto_data = data['data'][symbol.upper()][0]
                        quote = crypto_data['quote']['USD']
                        
                        result = (
                            f"{symbol.upper()} current price: ${quote['price']:.2f}\n"
                            f"24h change: {quote['percent_change_24h']:.2f}%\n"
                            f"Market cap: ${quote['market_cap']:,.2f}\n"
                            f"Volume 24h: ${quote['volume_24h']:,.2f}\n"
                            f"(Data from CoinMarketCap)"
                        )
                        cache.set(cache_key, result, self.PRICE_CACHE_TIMEOUT)
                        return result
                    else:
                        raise Exception(f"CoinMarketCap API error: {data.get('status', {}).get('error_message', 'Unknown error')}")
                    
                except Exception as e:
                    logger.error(f"Error fetching from CoinMarketCap: {str(e)}")
                    # Fallback to yfinance
                    try:
                        ticker = yf.Ticker(f"{symbol}-USD")
                        data = ticker.history(period="1d")
                        if not data.empty:
                            current_price = data['Close'].iloc[-1]
                            result = f"{symbol.upper()} current price: ${current_price:.2f} (Data from Yahoo Finance)"
                            cache.set(cache_key, result, self.PRICE_CACHE_TIMEOUT)
                            return result
                    except Exception as yf_error:
                        logger.error(f"YFinance error: {str(yf_error)}")
                    return f"Error fetching price from all sources for {symbol}"

            @tool
            def get_market_sentiment(symbol: str) -> str:
                """Get detailed market analysis for a cryptocurrency."""
                cache_key = f"crypto_sentiment_{symbol.upper()}"
                cached_result = cache.get(cache_key)
                if cached_result:
                    logger.info(f"Returning cached sentiment for {symbol}")
                    return f"{cached_result} (Cached)"

                try:
                    # First try CoinMarketCap
                    url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest'
                    parameters = {
                        'symbol': symbol.upper(),
                        'convert': 'USD'
                    }
                    headers = {
                        'Accepts': 'application/json',
                        'X-CMC_PRO_API_KEY': settings.COINMARKETCAP_API_KEY,
                    }

                    response = requests.get(url, headers=headers, params=parameters)
                    data = response.json()

                    if response.status_code == 200 and data['status']['error_code'] == 0:
                        crypto_data = data['data'][symbol.upper()][0]
                        quote = crypto_data['quote']['USD']
                        
                        # Calculate sentiment based on price and volume changes
                        price_change_24h = quote['percent_change_24h']
                        price_change_7d = quote['percent_change_7d']
                        volume_change_24h = quote['volume_change_24h']
                        
                        sentiment = "bullish" if price_change_24h > 0 and volume_change_24h > 0 else "bearish"
                        if abs(price_change_24h) < 1:
                            sentiment = "neutral"
                        
                        result = (
                            f"Market analysis for {symbol.upper()}:\n"
                            f"Sentiment: {sentiment}\n"
                            f"24h change: {price_change_24h:.2f}%\n"
                            f"7d change: {price_change_7d:.2f}%\n"
                            f"Volume change 24h: {volume_change_24h:.2f}%\n"
                            f"Market dominance: {crypto_data['market_cap_dominance']:.2f}%\n"
                            f"Market rank: #{crypto_data['cmc_rank']}"
                        )
                        cache.set(cache_key, result, self.SENTIMENT_CACHE_TIMEOUT)
                        return result
                    else:
                        # Fallback to yfinance for basic sentiment
                        logger.info(f"Falling back to yfinance for {symbol} sentiment")
                        ticker = yf.Ticker(f"{symbol}-USD")
                        hist = ticker.history(period="7d")
                        if not hist.empty:
                            price_change = ((hist['Close'].iloc[-1] - hist['Close'].iloc[0]) / hist['Close'].iloc[0]) * 100
                            volume_change = ((hist['Volume'].iloc[-1] - hist['Volume'].iloc[0]) / hist['Volume'].iloc[0]) * 100
                            sentiment = "bullish" if price_change > 0 and volume_change > 0 else "bearish"
                            if abs(price_change) < 1:
                                sentiment = "neutral"
                                
                            return (
                                f"Market analysis for {symbol.upper()} (Data from Yahoo Finance):\n"
                                f"Sentiment: {sentiment}\n"
                                f"7d price change: {price_change:.2f}%\n"
                                f"7d volume change: {volume_change:.2f}%"
                            )
                        return f"Could not fetch sentiment data for {symbol} from either source"
                except Exception as e:
                    logger.error(f"Sentiment error: {str(e)}")
                    # Final fallback to yfinance
                    try:
                        ticker = yf.Ticker(f"{symbol}-USD")
                        hist = ticker.history(period="7d")
                        if not hist.empty:
                            price_change = ((hist['Close'].iloc[-1] - hist['Close'].iloc[0]) / hist['Close'].iloc[0]) * 100
                            return f"Basic sentiment for {symbol.upper()}: {'positive' if price_change > 0 else 'negative'} (7d change: {price_change:.2f}%) (Data from Yahoo Finance)"
                    except Exception as yf_error:
                        logger.error(f"YFinance error: {str(yf_error)}")
                    return f"Error fetching sentiment from all sources for {symbol}"

            @tool
            def search_crypto_knowledge(query: str) -> str:
                """Search for cryptocurrency information in our knowledge base."""
                try:
                    docs = self.vectorstore.similarity_search(
                        query,
                        k=3,
                        filter={"source": {"$exists": True}}
                    )
                    if docs:
                        return "\n".join([
                            f"Source {i+1} ({doc.metadata.get('source', 'Unknown')}): {doc.page_content}"
                            for i, doc in enumerate(docs)
                        ])
                    return "No relevant information found."
                except Exception as e:
                    logger.error(f"Error searching knowledge base: {str(e)}")
                    return "Error accessing knowledge base."

            # Initialize agent with tools
            self.tools = [get_crypto_price, get_market_sentiment, search_crypto_knowledge]
            self.agent = initialize_agent(
                tools=self.tools,
                llm=self.llm,
                agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
                verbose=True,
                handle_parsing_errors=True
            )
            
        except Exception as e:
            logger.error(f"Error initializing tools: {str(e)}")
            raise

    def _load_history(self) -> List[BaseMessage]:
        """Load message history from cache"""
        history_data = cache.get(self.cache_key, [])
        messages = []
        for msg in history_data:
            if msg['type'] == 'human':
                messages.append(HumanMessage(content=msg['content']))
            elif msg['type'] == 'ai':
                messages.append(AIMessage(content=msg['content']))
        return messages

    def _save_history(self, messages: List[BaseMessage]):
        """Save message history to cache"""
        history_data = []
        for msg in messages:
            if isinstance(msg, HumanMessage):
                history_data.append({'type': 'human', 'content': msg.content})
            elif isinstance(msg, AIMessage):
                history_data.append({'type': 'ai', 'content': msg.content})
        cache.set(self.cache_key, history_data, timeout=3600)

    def process_message(self, message: str) -> dict:
        try:
            # Load existing history
            message_history = self._load_history()
            
            # Add new message to history
            message_history.append(HumanMessage(content=message))
            
            # Format conversation history
            conversation_history = "\n".join([
                f"{'Human' if isinstance(msg, HumanMessage) else 'Assistant'}: {msg.content}"
                for msg in message_history[:-1]
            ])
            
            # Create full prompt with history
            full_prompt = f"""Previous conversation:
            {conversation_history}
            
            Current message: {message}
            
            Remember to use available tools when needed:
            1. get_crypto_price: For current cryptocurrency prices
            2. get_market_sentiment: For market sentiment analysis
            3. search_crypto_knowledge: For searching our knowledge base
            """
            
            try:
                # Try using agent
                response = self.agent.run(full_prompt)
            except Exception as agent_error:
                logger.error(f"Agent error: {str(agent_error)}")
                # Fallback to regular chat
                messages = [
                    SystemMessage(content="You are a helpful AI assistant specializing in cryptocurrency."),
                    *message_history
                ]
                response = self.llm.invoke(messages).content
            
            # Add response to history
            message_history.append(AIMessage(content=response))
            
            # Save updated history
            self._save_history(message_history)
            
            return {
                "content": response,
                "success": True
            }
            
        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            }

    def get_model_info(self) -> Dict[str, Any]:
        """
        Return current model configuration
        """
        return {
            "model_name": self.model_name,
            "temperature": self.temperature,
            "max_context_length": "128k tokens" if self.model_name == "gpt-4-0125-preview" else "varies"
        }