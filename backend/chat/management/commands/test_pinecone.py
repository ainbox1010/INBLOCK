from django.core.management.base import BaseCommand
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Pinecone
from pinecone import Pinecone as PineconeClient
from django.conf import settings

class Command(BaseCommand):
    help = 'Test Pinecone vector database queries'

    def handle(self, *args, **options):
        # Initialize Pinecone
        pc = PineconeClient(
            api_key=settings.PINECONE_API_KEY,
            environment=settings.PINECONE_ENVIRONMENT
        )
        
        # Initialize embeddings
        embeddings = OpenAIEmbeddings()
        
        # Get the index
        index = pc.Index(settings.PINECONE_INDEX_NAME)
        
        # Create vector store
        vectorstore = Pinecone(index, embeddings.embed_query, "text")
        
        # Test queries
        test_queries = [
            "What is Bitcoin?",
            "How does Ethereum work?",
            "What is the maximum supply of Bitcoin?",
            "What are smart contracts?",
        ]
        
        for query in test_queries:
            self.stdout.write(f"\nQuery: {query}")
            results = vectorstore.similarity_search(query, k=2)
            for i, doc in enumerate(results, 1):
                self.stdout.write(f"\nResult {i}:")
                self.stdout.write(f"Source: {doc.metadata.get('source', 'Unknown')}")
                self.stdout.write(f"Content: {doc.page_content[:200]}...") 