from app.config import settings
from pinecone import ServerlessSpec, Pinecone


pc = Pinecone(api_key=settings.PINECONE_API_KEY)

# Pinecone Initialization
index_name = "haven-ai"
if not pc.has_index(index_name):
    pc.create_index(
        name=settings.PINECONE_INDEX,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(cloud=settings.PINECONE_CLOUD, region=settings.PINECONE_ENVIRONMENT),
    )


pinecone_index = pc.Index(settings.PINECONE_INDEX)
