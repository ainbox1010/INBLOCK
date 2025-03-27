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
import os
from datetime import datetime, timedelta

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
            
            # Add back the system prompt
            self.system_prompt = """You are an AI assistant specializing in cryptocurrency and financial markets. 
            You have access to real-time market data and can provide analysis of cryptocurrency prices and trends. 
            Be clear, concise, and accurate in your responses."""
            
            self.llm = ChatOpenAI(
                temperature=temperature,
                model_name=model_name,
                max_tokens=max_tokens,
                api_key=settings.OPENAI_API_KEY
            )
            
            # Initialize tools and memory
            self._initialize_tools()
            self.cache_key = "chat_history"
            
            self.COINGECKO_BASE_URL = "https://pro-api.coingecko.com/api/v3"
            
            # Debug print
            print(f"\nInitializing ChatService with CoinGecko API key: {os.getenv('COINGECKO_API_KEY')}\n")
            self.COINGECKO_API_KEY = os.getenv('COINGECKO_API_KEY')
            
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
                try:
                    # Clean up the symbol
                    symbol = symbol.upper().strip()
                    
                    # Get the coin list
                    coins_list = self.get_coin_list()
                    if not coins_list:
                        return "Unable to fetch supported cryptocurrencies list. Please try again later."
                    
                    # Try to find the coin ID
                    coin_id = coins_list.get(symbol)
                    if not coin_id:
                        return f"Could not find a matching cryptocurrency for symbol {symbol}. Please verify the symbol and try again."
                    
                    # Check cache
                    cache_key = f"crypto_price_{coin_id}"
                    cached_result = cache.get(cache_key)
                    if cached_result:
                        logger.info(f"Returning cached price for {coin_id}")
                        return f"{cached_result} (Cached)"
                    
                    # Fetch current price data
                    url = f"{self.COINGECKO_BASE_URL}/simple/price"
                    headers = {
                        'x-cg-pro-api-key': self.COINGECKO_API_KEY,
                        'Content-Type': 'application/json'
                    }
                    
                    params = {
                        'ids': coin_id,
                        'vs_currencies': 'usd',
                        'include_24hr_change': 'true',
                        'include_market_cap': 'true',
                        'include_24hr_vol': 'true'
                    }
                    
                    logger.info(f"Fetching price data for {coin_id} from CoinGecko")
                    response = requests.get(url, headers=headers, params=params)
                    response.raise_for_status()
                    data = response.json()
                    
                    if coin_id in data:
                        coin_data = data[coin_id]
                        result = (
                            f"{symbol} current price: ${coin_data['usd']:,.8f}\n"
                            f"24h change: {coin_data.get('usd_24h_change', 0):,.2f}%\n"
                            f"Market cap: ${coin_data.get('usd_market_cap', 0):,.2f}\n"
                            f"(Data from CoinGecko Pro API)"
                        )
                        
                        # Cache the result
                        cache.set(cache_key, result, self.PRICE_CACHE_TIMEOUT)
                        return result
                    else:
                        raise Exception(f"No data found for {symbol}")
                    
                except requests.RequestException as e:
                    logger.error(f"CoinGecko API error for {symbol}: {str(e)}")
                    return f"Error fetching price data for {symbol}: {str(e)}"
                except Exception as e:
                    logger.error(f"Unexpected error fetching {symbol} price: {str(e)}")
                    return f"Unexpected error fetching {symbol} price: {str(e)}"

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
                        price_change_24h = quote.get('percent_change_24h', 0)
                        price_change_7d = quote.get('percent_change_7d', 0)
                        volume_change_24h = quote.get('volume_change_24h', 0)
                        
                        sentiment = "bullish" if price_change_24h > 0 and volume_change_24h > 0 else "bearish"
                        if abs(price_change_24h) < 1:
                            sentiment = "neutral"
                        
                        # Build result string dynamically based on available data
                        result = [
                            f"Market analysis for {symbol.upper()} (Data from CoinMarketCap):",
                            f"Sentiment: {sentiment}"
                        ]
                        
                        # Add available metrics
                        if 'percent_change_24h' in quote:
                            result.append(f"24h change: {price_change_24h:.2f}%")
                        if 'percent_change_7d' in quote:
                            result.append(f"7d change: {price_change_7d:.2f}%")
                        if 'volume_change_24h' in quote:
                            result.append(f"Volume change 24h: {volume_change_24h:.2f}%")
                        if 'market_cap_dominance' in crypto_data:
                            result.append(f"Market dominance: {crypto_data['market_cap_dominance']:.2f}%")
                        if 'cmc_rank' in crypto_data:
                            result.append(f"Market rank: #{crypto_data['cmc_rank']}")
                        
                        result_str = "\n".join(result)
                        cache.set(cache_key, result_str, self.SENTIMENT_CACHE_TIMEOUT)
                        return result_str
                        
                    else:
                        raise Exception(f"CoinMarketCap API error: {data.get('status', {}).get('error_message', 'Unknown error')}")
                        
                except Exception as e:
                    logger.error(f"CoinMarketCap error: {str(e)}")
                    # Fallback to yfinance
                    logger.info(f"Falling back to yfinance for {symbol} sentiment")
                    try:
                        ticker = yf.Ticker(f"{symbol}-USD")
                        hist = ticker.history(period="7d")
                        if not hist.empty:
                            # Calculate basic metrics from yfinance data
                            price_change = ((hist['Close'].iloc[-1] - hist['Close'].iloc[0]) / hist['Close'].iloc[0]) * 100
                            volume_change = ((hist['Volume'].iloc[-1] - hist['Volume'].iloc[0]) / hist['Volume'].iloc[0]) * 100
                            
                            # Calculate sentiment using same logic
                            sentiment = "bullish" if price_change > 0 and volume_change > 0 else "bearish"
                            if abs(price_change) < 1:
                                sentiment = "neutral"
                            
                            # Build yfinance result
                            result = [
                                f"Market analysis for {symbol.upper()} (Data from Yahoo Finance):",
                                f"Sentiment: {sentiment}",
                                f"7d price change: {price_change:.2f}%",
                                f"7d volume change: {volume_change:.2f}%"
                            ]
                            
                            result_str = "\n".join(result)
                            cache.set(cache_key, result_str, self.SENTIMENT_CACHE_TIMEOUT)
                            return result_str
                            
                        return f"Could not fetch sentiment data for {symbol} from Yahoo Finance"
                    except Exception as yf_error:
                        logger.error(f"YFinance error: {str(yf_error)}")
                        return f"Error fetching sentiment data for {symbol} from all sources"

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
                        # Simplify the response format to avoid parsing issues
                        results = []
                        for i, doc in enumerate(docs, 1):
                            source = doc.metadata.get('source', 'Unknown')
                            content = doc.page_content.replace('\n\n', ' ').replace('\n', ' ')
                            results.append(f"Source {i} ({source}): {content}")
                        return " | ".join(results)
                    return "No relevant information found."
                except Exception as e:
                    logger.error(f"Error searching knowledge base: {str(e)}")
                    return "Error accessing knowledge base."

            # Initialize the tools list with the updated get_crypto_price
            self.tools = [
                get_crypto_price,
                get_market_sentiment,  # We'll update this next
                search_crypto_knowledge
            ]
            
            # Initialize the agent with our tools
            self.agent = initialize_agent(
                tools=self.tools,
                llm=self.llm,
                agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
                verbose=True,
                handle_parsing_errors=True,
                max_iterations=3
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

    def get_coin_history(self, coin_id: str, days: str = '7') -> Dict[str, Any]:
        """
        Get current price data for a specific coin using CoinGecko Pro API
        """
        try:
            url = "https://pro-api.coingecko.com/api/v3/simple/price"
            
            headers = {
                'x-cg-pro-api-key': self.COINGECKO_API_KEY,
                'Content-Type': 'application/json'
            }
            
            params = {
                'ids': coin_id,
                'vs_currencies': 'usd',
                'include_24hr_change': 'true',
                'include_market_cap': 'true'
            }
            
            # Print exact request details
            print("\n=== CoinGecko Request Details ===")
            print(f"URL: {url}")
            print(f"Headers: {headers}")
            print(f"Params: {params}")
            print(f"Full URL with params: {url}?{'&'.join(f'{k}={v}' for k, v in params.items())}")
            print("================================\n")
            
            response = requests.get(url, params=params, headers=headers)
            
            # Print response details
            print("\n=== CoinGecko Response Details ===")
            print(f"Status Code: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            print(f"Response Text: {response.text}")
            print("=================================\n")
            
            response.raise_for_status()
            return response.json()
            
        except requests.RequestException as e:
            print(f"\nCoinGecko Error: {str(e)}\n")
            return {"error": f"Failed to fetch coin data: {str(e)}"}

    def get_coin_list(self) -> dict:
        """
        Get and cache the full list of supported coins from CoinGecko
        Returns a dict mapping symbols to CoinGecko IDs
        """
        try:
            cache_key = "coingecko_coins_list"
            coins_list = cache.get(cache_key)
            
            if not coins_list:
                logger.info("Fetching fresh coin list from CoinGecko")
                url = f"{self.COINGECKO_BASE_URL}/coins/list"
                headers = {
                    'x-cg-pro-api-key': self.COINGECKO_API_KEY,
                    'Content-Type': 'application/json'
                }
                
                response = requests.get(url, headers=headers)
                response.raise_for_status()
                
                # Create a mapping of symbol -> id
                # If multiple coins have the same symbol, use the one with higher market cap
                coins_list = {}
                for coin in response.json():
                    symbol = coin['symbol'].upper()
                    coin_id = coin['id']
                    
                    # If symbol already exists, keep the more "standard" version
                    # (usually the one without numbers or extra characters)
                    if symbol not in coins_list or (
                        len(coin_id) < len(coins_list[symbol]) and 
                        not any(c.isdigit() for c in coin_id)
                    ):
                        coins_list[symbol] = coin_id
                
                # Cache for 1 hour
                cache.set(cache_key, coins_list, 3600)
                logger.info(f"Cached {len(coins_list)} coins from CoinGecko")
            
            return coins_list
            
        except Exception as e:
            logger.error(f"Error fetching coin list: {str(e)}")
            return {}

    def process_message(self, message: str, context: dict = None) -> Dict[str, Any]:
        try:
            crypto_terms = ['price', 'chart', 'crypto', 'market', 'coin', 'btc', 'eth', 'sol', 'doge', 'shib', 'xrp']
            
            print(f"\nChecking message: {message}")
            print(f"Contains crypto terms: {[term for term in crypto_terms if term in message.lower()]}")
            
            if any(term in message.lower() for term in crypto_terms):
                print("Detected crypto-related query!")
                
                # Use the agent for crypto queries
                agent_prompt = f"""You are a cryptocurrency market expert. 
                First, identify which cryptocurrency is being asked about.
                Then, use the get_crypto_price tool to fetch its current price.
                Finally, provide a clear analysis of the data.
                
                Question: {message}"""
                
                # This will show the agent's step-by-step reasoning
                response = self.agent.run(agent_prompt)
                
                return {
                    'success': True,
                    'content': response
                }
            
            # Regular chat processing for non-crypto queries
            messages = [
                SystemMessage(content=self.system_prompt),
                HumanMessage(content=message)
            ]
            
            chat = ChatOpenAI(
                model_name=self.model_name,
                temperature=self.temperature,
                api_key=settings.OPENAI_API_KEY
            )
            
            response = chat.invoke(messages).content
            return {
                'success': True,
                'content': response
            }
            
        except Exception as e:
            print(f"Outer error: {str(e)}")
            logger.error(f"Error processing message: {str(e)}")
            return {
                'success': False,
                'error': f"Sorry, there was an error processing your message: {str(e)}"
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