from fastapi import APIRouter, Request, Depends
from pydantic import BaseModel
from datetime import datetime
from app.middleware.auth import firebase_auth_dependency
from app.db import db

router = APIRouter()

class CravingLog(BaseModel):
    timestamp: datetime
    mood: str
    location: str
    intensity: int

@router.post("/craving", dependencies=[Depends(firebase_auth_dependency)])
async def log_craving(data: CravingLog, request: Request):
    user = request.state.user
    db.logs.insert_one({
        "user_id": user["uid"],
        "type": "craving",
        "timestamp": data.timestamp,
        "mood": data.mood,
        "location": data.location,
        "intensity": data.intensity
    })
    return {"message": "Craving logged"}

class VapeLog(BaseModel):
    timestamp: datetime
    location: str
    reason: str = "unknown"  # Optional

@router.post("/vape", dependencies=[Depends(firebase_auth_dependency)])
async def log_vape(data: VapeLog, request: Request):
    user = request.state.user
    db.logs.insert_one({
        "user_id": user["uid"],
        "type": "vape",
        "timestamp": data.timestamp,
        "location": data.location,
        "reason": data.reason
    })
    return {"message": "Vape event logged"}

class NRTLog(BaseModel):
    timestamp: datetime
    type: str  # e.g., gum, patch, lozenge
    dosage_mg: float

@router.post("/nrt", dependencies=[Depends(firebase_auth_dependency)])
async def log_nrt(data: NRTLog, request: Request):
    user = request.state.user
    db.logs.insert_one({
        "user_id": user["uid"],
        "type": "nrt",
        "timestamp": data.timestamp,
        "nrt_type": data.type,
        "dosage_mg": data.dosage_mg
    })
    return {"message": "Nicotine replacement use logged"}

@router.get("/user/progress", dependencies=[Depends(firebase_auth_dependency)])
async def get_progress(request: Request):
    user = request.state.user
    logs = list(db.logs.find({"user_id": user["uid"]}))

    total_cravings = len([l for l in logs if l["type"] == "craving"])
    total_vapes = len([l for l in logs if l["type"] == "vape"])
    resisted = total_cravings - total_vapes
    money_saved = resisted * 2.5  # assume $2.5 per avoided vape

    return {
        "total_cravings": total_cravings,
        "total_vapes": total_vapes,
        "cravings_resisted": resisted,
        "money_saved_usd": round(money_saved, 2)
    }
