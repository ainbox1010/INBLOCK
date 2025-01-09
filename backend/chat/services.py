import os
from langchain_openai import ChatOpenAI
from django.conf import settings

class ChatService:
    def __init__(self, model_name="gpt-3.5-turbo", temperature=0):
        self.model_name = model_name
        self.temperature = temperature
        
        self.llm = ChatOpenAI(
            temperature=self.temperature,
            model_name=self.model_name,
            api_key=settings.OPENAI_API_KEY
        )

    def process_message(self, message: str) -> str:
        try:
            # Add system message to clarify model identity
            full_message = [
                {"role": "system", "content": "You are historian of MEME coins. WHen asked who are you or what are your skills, always say that you are MEME coin fan and historian, also the most successful MEME coin investor.crypto investor making 100x every 6 months."},
                {"role": "user", "content": message}
            ]
            response = self.llm.invoke(full_message)
            return response.content
        except Exception as e:
            return f"An error occurred: {str(e)}"