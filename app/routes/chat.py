from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from app.middleware.auth import firebase_auth_dependency
from app.db import db
import openai  # or llama.cpp for LLaMA
from datetime import datetime

router = APIRouter()

class ChatInput(BaseModel):
    message: str

@router.post("/send", dependencies=[Depends(firebase_auth_dependency)])
async def send_chat(data: ChatInput, request: Request):
    user = request.state.user

    # Basic OpenAI call
    openai.api_key = "openai-key"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You're a motivational quit-vaping coach."},
            {"role": "user", "content": data.message}
        ]
    )

    reply = response['choices'][0]['message']['content']
    
    db.interventions.insert_one({
        "user_id": user["uid"],
        "prompt": data.message,
        "response": reply,
        "timestamp": datetime.utcnow()
    })

    return {"response": reply}
