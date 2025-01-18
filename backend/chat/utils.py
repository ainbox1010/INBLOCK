import os
from langchain_community.document_loaders import (
    TextLoader,
    PDFMinerLoader,
    CSVLoader,
    UnstructuredMarkdownLoader,
    UnstructuredHTMLLoader,
    UnstructuredWordDocumentLoader
)
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Pinecone
from pinecone import Pinecone, ServerlessSpec
from django.conf import settings

def get_loader_for_file(file_path: str):
    """Return appropriate loader based on file extension."""
    file_extension = os.path.splitext(file_path)[1].lower()
    
    loaders = {
        '.txt': TextLoader,
        '.pdf': PDFMinerLoader,
        '.csv': CSVLoader,
        '.md': UnstructuredMarkdownLoader,
        '.html': UnstructuredHTMLLoader,
        '.htm': UnstructuredHTMLLoader,
        '.doc': UnstructuredWordDocumentLoader,
        '.docx': UnstructuredWordDocumentLoader,
    }
    
    loader_class = loaders.get(file_extension)
    if loader_class is None:
        raise ValueError(f"Unsupported file type: {file_extension}")
    
    return loader_class(file_path)

def load_documents_to_pinecone(directory_path: str):
    """Load documents from a directory into Pinecone."""
    # Initialize Pinecone with new client
    pc = Pinecone(
        api_key=settings.PINECONE_API_KEY,
        environment=settings.PINECONE_ENVIRONMENT
    )
    
    # Check if index exists, if not create it
    index_name = settings.PINECONE_INDEX_NAME
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region="us-east-1"
            )
        )
    
    # Load documents
    documents = []
    supported_extensions = ['.txt', '.pdf', '.csv', '.md', '.html', '.htm', '.doc', '.docx']
    
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)
        file_extension = os.path.splitext(filename)[1].lower()
        
        if file_extension in supported_extensions:
            try:
                loader = get_loader_for_file(file_path)
                doc_content = loader.load()
                if isinstance(doc_content, list):
                    for content in doc_content:
                        documents.append({
                            "text": content.page_content,
                            "source": filename,
                            "metadata": content.metadata
                        })
                else:
                    documents.append({
                        "text": doc_content.page_content,
                        "source": filename,
                        "metadata": doc_content.metadata
                    })
            except Exception as e:
                print(f"Error loading file {file_path}: {str(e)}")
    
    if not documents:
        raise Exception("No documents were loaded")
    
    # Split documents
    text_splitter = CharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separator="\n"
    )
    
    texts = []
    for doc in documents:
        splits = text_splitter.split_text(doc["text"])
        texts.extend([{"text": split, "source": doc["source"]} for split in splits])
    
    # Create embeddings and upload to Pinecone
    embeddings = OpenAIEmbeddings()
    
    # Initialize vector store with new index
    index = pc.Index(index_name)
    
    # Convert texts to the format Pinecone expects
    vectors = []
    for i, item in enumerate(texts):
        embedding = embeddings.embed_query(item["text"])
        vectors.append({
            "id": f"doc_{i}",
            "values": embedding,
            "metadata": {
                "text": item["text"],
                "source": item["source"]
            }
        })
    
    # Upload in batches
    batch_size = 100
    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i + batch_size]
        index.upsert(vectors=batch)
    
    print(f"Successfully uploaded {len(vectors)} vectors to Pinecone") 