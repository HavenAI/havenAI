from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

class Database:
    client: AsyncIOMotorClient = None

async def get_database():
    return Database.client[settings.MONGODB_DB_NAME]

async def connect_to_mongo():
    Database.client = AsyncIOMotorClient(settings.MONGODB_URL)

async def close_mongo_connection():
    Database.client.close()
