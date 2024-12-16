import os
from django.conf import settings
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

def test_openai_connection():
    try:
        # Initialize ChatOpenAI
        chat = ChatOpenAI(
            temperature=0,
            model_name="gpt-3.5-turbo",
            api_key=settings.OPENAI_API_KEY
        )
        
        # Test message
        messages = [
            HumanMessage(content="Say 'Hello, this is a test!' if you can read this message.")
        ]
        
        # Get response
        response = chat.invoke(messages)
        print("OpenAI Response:", response.content)
        print("Connection Test: SUCCESS ✅")
        return True
        
    except Exception as e:
        print("Connection Test: FAILED ❌")
        print("Error:", str(e))
        return False

if __name__ == "__main__":
    # This allows running the test directly
    import django
    import sys
    import os
    
    # Add the project root directory to Python path
    sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
    
    # Setup Django environment
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()
    
    # Run the test
    test_openai_connection() 