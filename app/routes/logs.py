from fastapi import APIRouter, Request, Depends,  HTTPException
from pydantic import BaseModel
from app.middleware.auth import firebase_auth_dependency
from app.db import db
from app.services.log_service import insert_log
from app.scheduler import rule_based_trigger
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.firebase_auth import verify_token
from bson import ObjectId
from firebase_admin import auth
from datetime import datetime, timezone



auth_scheme = HTTPBearer()

router = APIRouter()

class CravingLog(BaseModel):
    timestamp: datetime
    mood: str
    location: str
    intensity: int
    type : str

@router.post("/craving", dependencies=[Depends(firebase_auth_dependency)])
async def log_craving(data: CravingLog, request: Request):
    user = request.state.user

    log = {
        "user_id": user["uid"],
        "type": data.type,
        "timestamp": data.timestamp,
        "mood": data.mood,
        "location": data.location,
        "intensity": 0,
        "nrt_type": None,
        "dosage_mg": None
    }

    insert_log(log)

    rule_based_trigger(user["uid"]) 
    return {"message": "Craving logged successfully"}


class VapeLog(BaseModel):
    timestamp: datetime
    location: str
    reason: str = "unknown"  # Optional

@router.post("/vape", dependencies=[Depends(firebase_auth_dependency)])
async def log_vape(data: VapeLog, request: Request):
    user = request.state.user

    log = {
        "user_id": user["uid"],
        "type": "vape",
        "timestamp": data.timestamp,
        "location": data.location,
        "reason": data.reason,
        "mood": None,
        "intensity": None,
        "nrt_type": None,
        "dosage_mg": None
    }

    insert_log(log)

    return {"message": "Vape event logged"}


class NRTLog(BaseModel):
    timestamp: datetime
    type: str  # e.g., gum, patch, lozenge
    dosage_mg: float

@router.post("/nrt", dependencies=[Depends(firebase_auth_dependency)])
async def log_nrt(data: NRTLog, request: Request):
    user = request.state.user

    log = {
        "user_id": user["uid"],
        "type": "nrt",
        "timestamp": data.timestamp,
        "nrt_type": data.type,
        "dosage_mg": data.dosage_mg,
        "location": None,
        "mood": None,
        "intensity": None
    }

    insert_log(log)

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

@router.get("/craving")
async def get_log_craving(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)

    if not user_id:
        raise HTTPException(
            status_code=404, detail="Onboarding data not found"
        )

    logs_cursor = db["logs"].find({"user_id": user_id["user_id"]})
    logs = list(logs_cursor)

    for log in logs:
        log["_id"] = str(log["_id"])
        if isinstance(log.get("timestamp"), datetime):
            log["timestamp"] = log["timestamp"].isoformat(timespec='milliseconds') + "Z"

    return {"logs": logs}

@router.get("/user/streak")
async def get_nicotine_free_streak(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    uid = user_id["uid"]
    user = auth.get_user(uid)
  

    latest_vape_log = db.logs.find_one(
        {"user_id": uid, "type": "Vaping"},
        sort=[("timestamp", -1)]
    )
    now = datetime.now(timezone.utc)
    print(now)
    nicotine_free_days = 0
    if latest_vape_log:
        last_vape_date = latest_vape_log["timestamp"]
        diff = now - last_vape_date
        nicotine_free_days = diff.days
    else:
        user_timestamp = user.user_metadata.creation_timestamp
        formatted_timestamp = datetime.fromtimestamp(user_timestamp/1000, tz = timezone.utc)
        diff= now - formatted_timestamp
        nicotine_free_days = diff.days
       

    return {"nicotine_free_days": nicotine_free_days}