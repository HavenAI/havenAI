from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from app.middleware.auth import firebase_auth_dependency
from app.db import db
import openai  # or llama.cpp for LLaMA
from datetime import datetime
from app.services.intervention_service import save_intervention

from app.services.chat_services import chat_response

router = APIRouter()

class ChatInput(BaseModel):
    message: str

@router.post("/send", dependencies=[Depends(firebase_auth_dependency)])
async def send_chat(data: ChatInput, request: Request):
    user = request.state.user
    reply = await chat_response(data.message)

    save_intervention({
    "user_id": user["uid"],
    "timestamp": datetime.utcnow(),
    "trigger_type": "manual",
    "prompt": data.message,
    "response": reply,
    "used_toolbox_strategy": False  # or True if applicable
})


    return {"response": reply}

