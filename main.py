from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import UserCreate, UserUpdate, UserResponse
from db import get_user_collection
from datetime import datetime
from bson import ObjectId
from fastapi.encoders import jsonable_encoder
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Haven AI User API. See /docs for usage."}

@app.post("/users", response_model=UserResponse, tags=["Users"])
async def create_user(user: UserCreate):
    users = get_user_collection()
    existing = await users.find_one({"user_id": user.user_id})
    now = datetime.utcnow()
    user_data = user.dict()
    user_data["created_at"] = now
    user_data["updated_at"] = now
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    result = await users.insert_one(user_data)
    user_data["_id"] = result.inserted_id
    return UserResponse(**user_data)

@app.get("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def get_user(user_id: str):
    users = get_user_collection()
    user = await users.find_one({"user_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(**user)

@app.put("/users/{user_id}", response_model=UserResponse, tags=["Users"])
async def update_user(user_id: str, update: UserUpdate):
    users = get_user_collection()
    user = await users.find_one({"user_id": user_id})
    now = datetime.utcnow()
    if not user:
        # Create new user if not exists
        user_data = update.dict(exclude_unset=True)
        user_data["user_id"] = user_id
        user_data["created_at"] = now
        user_data["updated_at"] = now
        result = await users.insert_one(user_data)
        user_data["_id"] = result.inserted_id
        return UserResponse(**user_data)
    # Update only changed fields
    update_data = {k: v for k, v in update.dict(exclude_unset=True).items() if user.get(k) != v}
    if not update_data:
        update_data = {}
    update_data["updated_at"] = now
    await users.update_one({"user_id": user_id}, {"$set": update_data})
    user.update(update_data)
    return UserResponse(**user)
