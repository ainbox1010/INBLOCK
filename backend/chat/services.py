import logging
from langchain_openai import ChatOpenAI
from django.conf import settings
from django.core.cache import cache
from typing import Optional, Dict, Any, List
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import json

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
            
            # Initialize cache key
            self.cache_key = "chat_history"
            
            logger.info("ChatService initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing ChatService: {str(e)}")
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
        cache.set(self.cache_key, history_data, timeout=3600)  # 1 hour timeout

    def process_message(self, message: str) -> dict:
        try:
            # Load existing history
            message_history = self._load_history()
            
            # Add new message to history
            message_history.append(HumanMessage(content=message))
            
            # Create full message list including system message
            messages = [
                SystemMessage(content=(
                    "You are a helpful AI assistant specializing in cryptocurrency. "
                    "When asked about previous messages, look at the chat history to provide accurate information. "
                    "If asked what was previously discussed, refer to the specific topics or cryptocurrencies mentioned."
                )),
                *message_history
            ]
            
            # Get response from LLM
            response = self.llm.invoke(messages)
            
            # Add response to history
            message_history.append(AIMessage(content=response.content))
            
            # Save updated history
            self._save_history(message_history)
            
            # Log current history for debugging
            logger.info(f"Current message history (last 3 messages): {message_history[-3:]}")
            
            return {
                "content": response.content,
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