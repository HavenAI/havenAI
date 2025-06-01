import pinecone
from datetime import datetime
from openai import OpenAIEmbeddings

pinecone.init(api_key="YOUR_API_KEY")
pinecone_index = pinecone.Index("quit-vape")
embedding_fn = OpenAIEmbeddings().embed_query

TOP_K_SUMMARIES = 3

def get_namespace(user_id):
    return f"user_{user_id}"

def store_summary(user_id, session_id, summary):
    vector = embedding_fn(summary)
    pinecone_index.upsert(
        [(session_id, vector, {"summary": summary, "timestamp": str(datetime.utcnow())})],
        namespace=get_namespace(user_id)
    )

def retrieve_top_summaries(user_id, message):
    query_vector = embedding_fn(message)
    results = pinecone_index.query(
        vector=query_vector,
        top_k=TOP_K_SUMMARIES,
        include_metadata=True,
        namespace=get_namespace(user_id)
    )
    return [match['metadata']['summary'] for match in results['matches'] if 'summary' in match['metadata']]
