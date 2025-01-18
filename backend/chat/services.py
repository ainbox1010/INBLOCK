import logging
from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.callbacks.manager import get_openai_callback
from langchain.agents import initialize_agent, AgentType
from django.conf import settings
from typing import Optional, Dict, Any
import yfinance as yf
import requests
from langchain.tools import Tool, tool

logger = logging.getLogger(__name__)

class ChatService:
    """
    Enhanced chat service using GPT-4 Turbo with configurable settings
    """
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
                """Get the current price of a cryptocurrency. Input should be a cryptocurrency symbol (e.g., BTC, ETH)."""
                try:
                    ticker = yf.Ticker(f"{symbol}-USD")
                    data = ticker.history(period="1d")
                    if not data.empty:
                        return f"{symbol} current price: ${data['Close'].iloc[-1]:.2f}"
                    return f"Could not fetch price for {symbol}"
                except Exception as e:
                    return f"Error fetching price: {str(e)}"

            @tool
            def get_market_sentiment(symbol: str) -> str:
                """Get market sentiment for a cryptocurrency. Input should be a cryptocurrency symbol (e.g., BTC, ETH)."""
                try:
                    # Example API endpoint - replace with your preferred data source
                    api_url = f"https://api.example.com/sentiment/{symbol}"
                    response = requests.get(api_url)
                    if response.status_code == 200:
                        return response.json()
                    return f"Could not fetch sentiment for {symbol}"
                except Exception as e:
                    return f"Error fetching sentiment: {str(e)}"

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
            Always explain your reasoning and what tools you're using."""

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