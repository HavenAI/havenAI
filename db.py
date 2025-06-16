from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.collection import Collection
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "haven")
COLLECTION_NAME = "users"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]


def get_user_collection() -> Collection:
    return db[COLLECTION_NAME]
