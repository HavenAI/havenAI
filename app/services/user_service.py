from datetime import datetime
from app.db import db

def create_user_if_not_exists(uid: str, email: str):
    existing = db.users.find_one({"_id": uid})
    if existing:
        return existing
    
    new_user = {
        "_id": uid,
        "email": email,
        "created_at": datetime.utcnow(),
        "preferences": {
            "timezone": "UTC",
            "coping_style": "breathing",
            "preferred_prompt_time": "16:00",
            "notification_opt_in": True
        },
        "profile": {}
    }
    db.users.insert_one(new_user)
    return new_user
