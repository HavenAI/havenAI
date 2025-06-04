from langchain_pinecone import PineconeVectorStore
from app.vectorstore.embedder import embedding_model
from app.config import settings

vector_store = PineconeVectorStore.from_existing_index(
    index_name=settings.PINECONE_INDEX,
    embedding=embedding_model
)

retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 3})
