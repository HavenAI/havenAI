from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
from app.firebase_auth import verify_token
from app.db import get_db
from services.health_score_calculation import calculate_health_score, calculate_latest_health_score


router = APIRouter()
auth_scheme = HTTPBearer()


@router.post('/save/initial')
def save_health_milestone(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    db = get_db()
    user_id = db["users"].find_one({"_id.user_id": user['user_id']})
    answers = user["onboarding"].get("answers", {}) if user_id else None

    if answers is None:
        raise HTTPException(status_code=404, detail="Onboarding answers not found")

    scores = calculate_health_score(answers)

    result = db["health_scores"].update_one(
        {"_id": user['user_id']},
        {
            "$set":{
                    "initial_healthscore": {
                    "mental_health": scores["mental_health"],
                    "lung_functionality": scores["lung_function"],
                    "heart_health": scores["heart_health"],
                },
                "latest_healthscore": {
                    "updated_at": datetime.utcnow(),
                    "latest_mental_health": scores["mental_health"],
                    "latest_lung_functionality": scores["lung_function"],
                    "latest_heart_health": scores["heart_health"],
                },
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            }
        },
        upsert=True
    )
    return {"message": "Initial health score saved successfully"}


@router.put("/update/latest")
def update_latest_healthscore(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    user_id = user["user_id"]
    
    now = datetime.utcnow()
    three_days_ago = now - timedelta(days=3)
    six_days_ago = now - timedelta(days=6)

    all_logs = list(db["logs"].find({
        "user_id": user_id,
        "timestamp": {"$gte": six_days_ago, "$lte": now}
    }))

    current_cravings = [log for log in all_logs if log["type"] == "craving" and log["timestamp"] >= three_days_ago]
    previous_cravings = [log for log in all_logs if log["type"] == "craving" and log["timestamp"] < three_days_ago]

    current_sessions = [log for log in all_logs if log["type"] == "vape" and log["timestamp"] >= three_days_ago]
    previous_sessions = [log for log in all_logs if log["type"] == "vape" and log["timestamp"] < three_days_ago]

    user_doc = db["users"].find_one({"_id.user_id": user['user_id']})
    onboarding_answers = user_doc.get("onboarding", {}).get("answers", {}) if user_doc else None

    # Get initial scores if needed
    doc = db["health_scores"].find_one({"_id": user["user_id"]})
    initial_scores = None
    if doc and "initial_healthscore" in doc:
        initial = doc["initial_healthscore"]
        initial_scores = {
            "mental_health": initial.get("mental_health", 70),
            "lung_function": initial.get("lung_functionality", 70),
            "heart_health": initial.get("heart_health", 70),
        }

    # Calculate
    scores = calculate_latest_health_score(
        current_cravings=current_cravings,
        current_sessions=current_sessions,
        previous_cravings=previous_cravings,
        previous_sessions=previous_sessions,
        onboarding_answers=onboarding_answers,
        initial_health_score=initial_scores
    )

    # Update in DB
    db["health_scores"].update_one(
        {"_id": user_id},
        {
            "$set": {
                "latest_healthscore": {
                    "updated_at": scores["updated_at"],
                    "latest_mental_health": scores["latest_mental_health"],
                    "latest_lung_functionality": scores["latest_lung_functionality"],
                    "latest_heart_health": scores["latest_heart_health"],
                },
                "updatedAt": datetime.utcnow()
            }
        },
        upsert=False
    )

    return {
        "message": "Latest health score updated",
        "data": scores
    }


