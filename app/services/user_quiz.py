from app.db import get_db
from app.firebase_auth import verify_token
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from typing import Dict


def parse_list(value):
    if not value:
        return []
    if isinstance(value,list):
        return value
    
    return[item.strip() for item in value.split(',') if item.strip()]

def get_quiz_data(credentials: HTTPAuthorizationCredentials) -> Dict:
    user_id = verify_token(credentials.credentials)
    print(user_id)

    if not user_id:
        raise HTTPException(
            status_code=404, detail="Onboarding data not found"
        )
    
    db = get_db()
    user = db["users"].find_one({"_id.user_id": user_id['user_id']})
    print(user)

    if not user or "onboarding" not in user:
        raise HTTPException(status_code=404, detail="Onboarding data not found")
    
    answers = user["onboarding"].get("answer", {})
    print(answers)

    return{
        "name": user.get("name", "User"),  # fallback
        "age_range": answers.get("ageRange", "Unknown"),
        "goal": parse_list(answers.get("goal")),
        "vape_type": parse_list(answers.get("vapeType")),
        "nicotine_strength": answers.get("nicotineStrength", "Unknown"),
        "craving_times": parse_list(answers.get("craveTime")),
        "craving_causes": parse_list(answers.get("craveTriggers")),
        "vape_frequency": answers.get("vapeFrequency", "Unknown"),
        "previous_quit_attempt": answers.get("quitHistory", "Unknown"),
        "craving_feelings": parse_list(answers.get("cravingFeeling")),
        "help_preference": parse_list(answers.get("cravingSupport")),
        "support_style": answers.get("aiTone", "Unknown"),
        "talk_level": answers.get("aiTalkative", "Quick Check-ins"),
        "vaping_feeling": answers.get("vapingEmotion", "Unknown"),
        "additional_notes": answers.get("openNotes", "None"),
        "daily_checkin": answers.get("checkInFrequency", "Not set")
    }