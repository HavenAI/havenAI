from pymongo import MongoClient, ASCENDING, DESCENDING
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
COLLECTION_NAME = "logs"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Ensure indexes for fast retrieval
logs_collection: Collection = db[COLLECTION_NAME]
logs_collection.create_index([("user_id", ASCENDING)])
logs_collection.create_index([("timestamp", DESCENDING)])

def get_logs_collection() -> Collection:
    return logs_collection
