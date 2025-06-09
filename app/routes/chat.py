from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from app.middleware.auth import firebase_auth_dependency
from app.db import db
import openai  # or llama.cpp for LLaMA
from datetime import datetime
from app.services.intervention_service import save_intervention


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
    
    save_intervention({
    "user_id": user["uid"],
    "timestamp": datetime.utcnow(),
    "trigger_type": "manual",
    "prompt": data.message,
    "response": reply,
    "used_toolbox_strategy": False  # or True if applicable
})


    return {"response": reply}
