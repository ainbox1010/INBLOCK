import logging
from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.callbacks.manager import get_openai_callback
from langchain.agents import initialize_agent, AgentType
from django.conf import settings
from django.core.cache import cache
from typing import Optional, Dict, Any
import yfinance as yf
import requests
from langchain.tools import Tool, tool

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
        streaming: bool = False
    ):
        self.model_name = model_name
        self.temperature = temperature
        
        try:
            self.llm = ChatOpenAI(
                temperature=self.temperature,
                model_name=self.model_name,
                max_tokens=max_tokens,
                streaming=streaming,
                api_key=settings.OPENAI_API_KEY,
                request_timeout=30,
            )
            
            # Create tools using the @tool decorator
            @tool
            def get_crypto_price(symbol: str) -> str:
                """Get current price and market data for a cryptocurrency. Input should be a cryptocurrency symbol (e.g., BTC, ETH)."""
                cache_key = f"crypto_price_{symbol.upper()}"
                cached_result = cache.get(cache_key)
                if cached_result:
                    logger.info(f"Returning cached price for {symbol}")
                    return f"{cached_result} (Cached)"

                try:
                    # First try CoinMarketCap
                    url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
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
                        crypto_data = data['data'][symbol.upper()]
                        quote = crypto_data['quote']['USD']
                        
                        result = (
                            f"{symbol.upper()} current price: ${quote['price']:.2f}\n"
                            f"24h change: {quote['percent_change_24h']:.2f}%\n"
                            f"Market cap: ${quote['market_cap']:,.2f}\n"
                            f"Volume 24h: ${quote['volume_24h']:,.2f}"
                        )
                        cache.set(cache_key, result, self.PRICE_CACHE_TIMEOUT)
                        return result
                    else:
                        # If CoinMarketCap fails, fallback to yfinance
                        logger.info(f"Falling back to yfinance for {symbol}")
                        ticker = yf.Ticker(f"{symbol}-USD")
                        data = ticker.history(period="1d")
                        if not data.empty:
                            current_price = data['Close'].iloc[-1]
                            result = f"{symbol.upper()} current price: ${current_price:.2f} (Data from Yahoo Finance)"
                            cache.set(cache_key, result, self.PRICE_CACHE_TIMEOUT)
                            return result
                        return f"Could not fetch price for {symbol} from either source"
                except Exception as e:
                    logger.error(f"Price error: {str(e)}")
                    # Final fallback to yfinance
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
                """Get detailed market analysis for a cryptocurrency. Input should be a cryptocurrency symbol (e.g., BTC, ETH)."""
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

            # Initialize agent with tools
            self.tools = [get_crypto_price, get_market_sentiment]
            
            self.agent = initialize_agent(
                tools=self.tools,
                llm=self.llm,
                agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
                verbose=True,
                handle_parsing_errors=True
            )
            logger.info("Agent initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing ChatService: {str(e)}")
            raise

    def process_message(self, message: str, custom_system_prompt: Optional[str] = None) -> Dict[str, Any]:
        try:
            default_system_prompt = """You are an expert AI agent specializing in cryptocurrency analysis. 
            Use the get_crypto_price tool when asked about prices. Use the get_market_sentiment tool when asked about market sentiment.
            Always explain your reasoning and what tools you're using. Always refer to yourself as an InBlock AI Agent."""

            try:
                response = self.agent.run(
                    f"System: {custom_system_prompt or default_system_prompt}\nHuman: {message}"
                )
                logger.info(f"Agent response: {response}")
                return {
                    "content": response,
                    "model_used": self.model_name,
                    "success": True
                }
            except Exception as agent_error:
                logger.error(f"Agent error: {str(agent_error)}")
                # Fallback to regular chat
                messages = [
                    {"role": "system", "content": custom_system_prompt or default_system_prompt},
                    {"role": "user", "content": message}
                ]
                response = self.llm.invoke(messages).content
                return {
                    "content": response,
                    "model_used": self.model_name,
                    "success": True
                }

        except Exception as e:
            logger.error(f"Error processing message: {str(e)}")
            return {
                "content": "An error occurred while processing your request. Please try again.",
                "error": str(e),
                "success": False
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