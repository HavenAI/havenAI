from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
from app.firebase_auth import verify_token
from app.db import get_db
from app.services.health_score_calculation import calculate_health_score, calculate_latest_health_score


router = APIRouter()
auth_scheme = HTTPBearer()


@router.post('/save/initial')
def save_health_milestone(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    db = get_db()
    user_doc = db["users"].find_one({"_id.user_id": user['user_id']})
    answers = user_doc.get("onboarding", {}).get("answers", {}) if user_doc else None

    if answers is None:
        raise HTTPException(status_code=404, detail="Onboarding answers not found")

    existing_score = db["health_scores"].find_one({"_id": user['user_id']})
    if existing_score and existing_score.get("initial_healthscore", {}).get("initialized") == True:
        raise HTTPException(status_code=409, detail="Initial health score already saved")

    scores = calculate_health_score(answers)

    result = db["health_scores"].update_one(
        {"_id": user['user_id']},
        {
            "$set":{
                    "initial_healthscore": {
                    "mental_health": scores["mental_health"],
                    "lung_functionality": scores["lung_function"],
                    "heart_health": scores["heart_health"],
                    "initialized": True
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
    return {"message": "Initial health score saved successfully",
            "data": {
                "mental_health": scores["mental_health"],
                "lung_functionality": scores["lung_function"],
                "heart_health": scores["heart_health"],
                "initialized": True
        }}


@router.put("/update/latest")
def update_latest_healthscore(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    user_id = user["user_id"]
    
    now = datetime.utcnow()
    two_days_ago = now - timedelta(days=2)
    four_days_ago = now - timedelta(days=4)

    all_logs = list(db["logs"].find({
        "user_id": user_id,
        "timestamp": {"$gte": four_days_ago, "$lte": now}
    }))

    current_cravings = [log for log in all_logs if log["type"] == "craving" and log["timestamp"] >= two_days_ago]
    previous_cravings = [log for log in all_logs if log["type"] == "craving" and log["timestamp"] < two_days_ago]

    current_sessions = [log for log in all_logs if log["type"] == "vape" and log["timestamp"] >= two_days_ago]
    previous_sessions = [log for log in all_logs if log["type"] == "vape" and log["timestamp"] < two_days_ago]

    if not current_sessions and not current_cravings:
        raise HTTPException(status_code=400, detail="No new logs in the last 2 days to update health scores.")
    
        # Validate health score initialized
    doc = db["health_scores"].find_one({"_id": user_id})
    if not doc or not doc.get("initial_healthscore", {}).get("initialized", False):
        raise HTTPException(status_code=400, detail="Initial health score not found or not initialized.")


    user_doc = db["users"].find_one({"_id.user_id": user['user_id']})
    onboarding_answers = user_doc.get("onboarding", {}).get("answers", {}) if user_doc else None

    # Get initial scores if needed

    initial_scores = {
        "mental_health": doc["initial_healthscore"].get("mental_health", 70),
        "lung_functionality": doc["initial_healthscore"].get("lung_functionality", 70),
        "heart_health": doc["initial_healthscore"].get("heart_health", 70),
    }

    # Calculate
    updated_scores = calculate_latest_health_score(
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
                    "latest_mental_health": updated_scores["latest_mental_health"],
                    "latest_lung_functionality": updated_scores["latest_lung_functionality"],
                    "latest_heart_health": updated_scores["latest_heart_health"],
                },
                "updatedAt": now
            }
        },
        upsert=False
    )

    return {
        "message": "Latest health score updated",
        "data": {
            "latest_mental_health": updated_scores["latest_mental_health"],
            "latest_lung_functionality": updated_scores["latest_lung_functionality"],
            "latest_heart_health": updated_scores["latest_heart_health"],
            "updatedAt": now
        }
    }


@router.get("/get")
def get_health_score(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    user = verify_token(credentials.credentials)
    print(user)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    db = get_db()
    user_id = user["user_id"]

    doc = db["health_scores"].find_one({"_id": user_id})

    if not doc:
        return {
            "message": "Health score not initialized yet",
            "data": {
                "initialized": False
            }
        }

    return {
        "message": "Health score fetched successfully",
        "data": {
            "initial_healthscore": doc.get("initial_healthscore"),
            "latest_healthscore": doc.get("latest_healthscore"),
            "createdAt": doc.get("createdAt"),
            "updatedAt": doc.get("updatedAt")
        }
    }
