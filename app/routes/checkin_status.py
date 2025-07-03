from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.firebase_auth import verify_token
from pymongo import MongoClient
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
auth_scheme = HTTPBearer()

client = MongoClient(os.getenv("MONGO_URI"))
db = client["haven"]
checkin_flags = db["checkin_flags"]

@router.get("/checkin/status")
async def get_checkin_status(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        return {"checkin_due": False}

    recent_flag = db.checkin_flags.find_one({
        "user_id": user_id,
        "status": "pending",
        "timestamp": {"$gte": datetime.utcnow() - timedelta(minutes=10)}
    })

    if recent_flag:
        # Mark as acknowledged so we don't resend
        db.checkin_flags.update_one(
            {"_id": recent_flag["_id"]},
            {"$set": {"status": "acknowledged"}}
        )
        return {"checkin_due": True}
    return {"checkin_due": False}

@router.get("/checkin-status/pending")
def get_pending_checkins(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid Token")

    pending = list(checkin_flags.find({
        "user_id": user_id,
        "status": "pending"
    }))

    # Optional: Convert ObjectIds and timestamps to string format for JSON
    for item in pending:
        item["_id"] = str(item["_id"])
        item["timestamp"] = item["timestamp"].isoformat()

    return {"pending_checkins": pending}



