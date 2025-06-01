# config.py

import os
from dotenv import load_dotenv
from transformers import pipeline
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore

# Load environment variables
load_dotenv()

# Environment variables
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
INDEX_NAME = "haven-ai"

# Set environment for APIs
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Pinecone client and index setup
pc = Pinecone(api_key=PINECONE_API_KEY)

if not pc.has_index(INDEX_NAME):
    pc.create_index(
        name=INDEX_NAME,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

# Emotion classifier
emotion_classifier = pipeline("sentiment-analysis", model="j-hartmann/emotion-english-distilroberta-base")

# Embedding and LLM
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
llm = ChatOpenAI(model_name="gpt-4-turbo", temperature=0.7, max_tokens=512)

# Vector store & retriever
vector_store = PineconeVectorStore.from_existing_index(index_name=INDEX_NAME, embedding=embeddings)
retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Constants
MAX_CONTEXT_MESSAGES = 10
SUMMARIZE_AFTER = 10
