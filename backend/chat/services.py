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
            self.llm = ChatOpenAI(
                temperature=temperature,
                model_name=model_name,
                max_tokens=max_tokens,
                api_key=settings.OPENAI_API_KEY
            )
            
            # Initialize message history
            self.message_history: List[BaseMessage] = []
            
            # Initialize tools (same as before)
            self._initialize_tools()
            
            logger.info("ChatService initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing ChatService: {str(e)}")
            raise

    def _initialize_tools(self):
        """Initialize all tools"""
        # Initialize Pinecone
        pc = Pinecone(
            api_key=settings.PINECONE_API_KEY,
            environment=settings.PINECONE_ENVIRONMENT
        )
        
        # Initialize embeddings and vectorstore
        self.embeddings = OpenAIEmbeddings()
        index = pc.Index(settings.PINECONE_INDEX_NAME)
        self.vectorstore = LangchainPinecone(
            index,
            self.embeddings.embed_query,
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
                        f"Market analysis for {symbol.upper()}:\n"
                        f"24h change: {quote['percent_change_24h']:.2f}%\n"
                        f"7d change: {quote['percent_change_7d']:.2f}%\n"
                        f"Volume change 24h: {quote['volume_change_24h']:.2f}%\n"
                        f"Market dominance: {crypto_data['market_cap_dominance']:.2f}%\n"
                        f"Market rank: #{crypto_data['cmc_rank']}"
                    )
                    cache.set(cache_key, result, self.SENTIMENT_CACHE_TIMEOUT)
                    return result
                else:
                    raise Exception(f"CoinMarketCap API error: {data.get('status', {}).get('error_message', 'Unknown error')}")

            except Exception as e:
                logger.error(f"Error fetching sentiment: {str(e)}")
                return f"Error fetching sentiment data for {symbol}"

        @tool
        def search_crypto_knowledge(query: str) -> str:
            """Search for cryptocurrency information in our knowledge base."""
            try:
                docs = self.vectorstore.similarity_search(query, k=3)
                if docs:
                    return "\n".join([f"Source {i+1}: {doc.page_content}" for i, doc in enumerate(docs)])
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

    def process_message(self, message: str) -> dict:
        try:
            # Load existing history from cache
            cache_key = "chat_history"
            history_data = cache.get(cache_key, [])
            self.message_history = []
            for msg in history_data:
                if msg['type'] == 'human':
                    self.message_history.append(HumanMessage(content=msg['content']))
                elif msg['type'] == 'ai':
                    self.message_history.append(AIMessage(content=msg['content']))

            # Add new message to history
            self.message_history.append(HumanMessage(content=message))
            
            # Create system message with tools info
            system_message = SystemMessage(content="""
                You are an expert AI agent specializing in cryptocurrency analysis.
                You have access to several tools:
                1. get_crypto_price: Use this for current cryptocurrency prices
                2. get_market_sentiment: Use this for market sentiment analysis
                3. search_crypto_knowledge: Use this to search our knowledge base
                
                When asked about previous messages, look at the chat history below.
                Always explain your reasoning and cite your sources.
                Refer to yourself as an InBlock AI Agent.
            """)
            
            # Format conversation history for the agent
            conversation_history = "\n".join([
                f"{'Human' if isinstance(msg, HumanMessage) else 'Assistant'}: {msg.content}"
                for msg in self.message_history[:-1]  # Exclude the current message
            ])
            
            # Combine history with current message
            full_prompt = f"""
            Previous conversation:
            {conversation_history}
            
            Current message: {message}
            """
            
            try:
                # Try using agent with full context
                response = self.agent.run(full_prompt)
            except Exception as agent_error:
                logger.error(f"Agent error, falling back to LLM: {str(agent_error)}")
                # Fallback to regular LLM
                messages = [system_message, *self.message_history]
                response = self.llm.invoke(messages).content
            
            # Add response to history
            ai_message = AIMessage(content=response)
            self.message_history.append(ai_message)
            
            # Save updated history to cache
            history_data = []
            for msg in self.message_history:
                if isinstance(msg, HumanMessage):
                    history_data.append({'type': 'human', 'content': msg.content})
                elif isinstance(msg, AIMessage):
                    history_data.append({'type': 'ai', 'content': msg.content})
            cache.set(cache_key, history_data, timeout=3600)  # 1 hour timeout
            
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