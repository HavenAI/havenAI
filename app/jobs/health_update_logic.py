from datetime import datetime, timedelta
from app.db import get_db
from services.health_score_calculation import calculate_latest_health_score


def update_health_score_for_all_users():
    db = get_db()
    now = datetime.utcnow()
    threshold_date = now - timedelta(days=3)

    users_to_update = db["health_scores"].find({
        "updatedAt": {"$lte": threshold_date}
    })

    for doc in users_to_update:
        user_id = doc["_id"]

        user_doc = db["user"].find_one({"_id.user_id": user_id})
        if not user_doc:
            continue

        onboarding_answers = user_doc.get("onboarding", {}).get("answers", {})
        initial = doc.get("initial_healthscore",{})
        initial_scores = {
            "mental_health": initial.get("mental_health", 70),
            "lung_function": initial.get("lung_functionality", 70),
            "heart_health": initial.get("heart_health", 70),
        }

        now = datetime.utcnow()
        three_days_ago = now - timedelta(days=3)
        six_days_ago = now - timedelta(days=6)

        logs = list(db["logs"].find({
            "user_id":user_id,
            "timestamp":{"$gte":six_days_ago, "$lte":now}
        }))


        current_cravings = [log for log in logs if log["type"] == "craving" and log["timestamp"] >= three_days_ago]
        previous_cravings = [log for log in logs if log["type"] == "craving" and log["timestamp"] < three_days_ago]

        current_sessions = [log for log in logs if log["type"] == "vape" and log["timestamp"] >= three_days_ago]
        previous_sessions = [log for log in logs if log["type"] == "vape" and log["timestamp"] < three_days_ago]

        if not current_sessions and not current_cravings:
            continue

        scores = calculate_latest_health_score(
            current_cravings=current_cravings,
            current_sessions=current_sessions,
            previous_cravings=previous_cravings,
            previous_sessions=previous_sessions,
            onboarding_answers=onboarding_answers,
            initial_health_score=initial_scores
        )

        db["health_scores"].update_one(
            {"_id": user_id},
            {
                "$set": {
                    "latest_healthscore": {
                        "latest_mental_health": scores["latest_mental_health"],
                        "latest_lung_functionality": scores["latest_lung_functionality"],
                        "latest_heart_health": scores["latest_heart_health"],
                    },
                    "updatedAt": datetime.utcnow()
                }
            }
        )