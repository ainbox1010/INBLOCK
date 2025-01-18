import logging
from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.callbacks.manager import get_openai_callback
from langchain.agents import initialize_agent, AgentType
from django.conf import settings
from typing import Optional, Dict, Any
import yfinance as yf
import requests

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
            
            # Define tool descriptions
            tool_descriptions = [
                {
                    "name": "get_crypto_price",
                    "description": "Get the current price of a cryptocurrency",
                    "func": self.get_crypto_price
                },
                {
                    "name": "get_market_sentiment",
                    "description": "Get market sentiment for a cryptocurrency",
                    "func": self.get_market_sentiment
                }
            ]
            
            # Initialize tools
            self.tools = []
            for tool in tool_descriptions:
                try:
                    self.tools.append({
                        "name": tool["name"],
                        "description": tool["description"],
                        "func": tool["func"]
                    })
                except Exception as tool_error:
                    logger.error(f"Error initializing tool {tool['name']}: {str(tool_error)}")
            
            # Initialize agent with tools
            try:
                self.agent = initialize_agent(
                    tools=self.tools,
                    llm=self.llm,
                    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
                    verbose=True
                )
                logger.info("Agent initialized successfully")
            except Exception as agent_error:
                logger.error(f"Error initializing agent: {str(agent_error)}")
                # Fall back to basic LLM if agent initialization fails
                self.agent = None
            
            logger.info(f"Initialized ChatService with model: {model_name}")
        except Exception as e:
            logger.error(f"Error initializing ChatService: {str(e)}")
            raise

    def get_crypto_price(self, symbol: str) -> str:
        """Get current price for a cryptocurrency"""
        try:
            ticker = yf.Ticker(f"{symbol}-USD")
            data = ticker.history(period="1d")
            if not data.empty:
                return f"{symbol} current price: ${data['Close'].iloc[-1]:.2f}"
            return f"Could not fetch price for {symbol}"
        except Exception as e:
            return f"Error fetching price: {str(e)}"

    def get_market_sentiment(self, symbol: str) -> str:
        """Get market sentiment from social media/news"""
        try:
            # Example API endpoint - replace with your preferred data source
            api_url = f"https://api.example.com/sentiment/{symbol}"
            response = requests.get(api_url)
            if response.status_code == 200:
                return response.json()
            return f"Could not fetch sentiment for {symbol}"
        except Exception as e:
            return f"Error fetching sentiment: {str(e)}"

    def process_message(self, message: str, custom_system_prompt: Optional[str] = None) -> Dict[str, Any]:
        """
        Process a message with enhanced error handling and logging
        """
        try:
            # Keep the existing system prompt
            default_system_prompt = """You are an expert AI agent specializing in cryptocurrency analysis, 
            especially in the field of AI Agent related tokens and coins. You have deep knowledge of market trends, tokenomics, and 
            social media sentiment analysis. If asked, you can retrieve real time data from the internet, especially about token/coin prices, market cap, and other relevant metrics. Always provide well-reasoned, analytical responses 
            while maintaining engaging communication."""

            # Use agent to process message with tools
            try:
                response = self.agent.run(message)  # Changed from dict to direct message
                logger.info(f"Agent response: {response}")
            except Exception as agent_error:
                logger.error(f"Agent error: {str(agent_error)}")
                # Fallback to regular chat if agent fails
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