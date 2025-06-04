from langchain_openai import OpenAIEmbeddings
from app.config import settings

embedding_model = OpenAIEmbeddings(model="text-embedding-3-small",  openai_api_key=settings.OPENAI_API_KEY)