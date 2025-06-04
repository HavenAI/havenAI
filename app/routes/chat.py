from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from app.middleware.auth import firebase_auth_dependency
from app.db import db
import openai  # or llama.cpp for LLaMA
from datetime import datetime
from app.services.chat_services import chat_response

router = APIRouter()

class ChatInput(BaseModel):
    message: str

@router.post("/send", dependencies=[Depends(firebase_auth_dependency)])
async def send_chat(data: ChatInput, request: Request):
    user = request.state.user
    reply = await chat_response(data.message)

    db.interventions.insert_one({
        "user_id": user["uid"],
        "prompt": data.message,
        "response": reply,
        "timestamp": datetime.utcnow()
    })

    return {"response": reply}

