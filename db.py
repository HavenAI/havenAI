import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

if not MONGO_URI or not DB_NAME:
    raise RuntimeError("MONGO_URI and DB_NAME must be set in the .env file.")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

async def get_trigger_collection():
    collection = db["triggers"]
    # Ensure indexes
    await collection.create_index("user_id")
    await collection.create_index("trigger_time")
    await collection.create_index("status")
    return collection
