from app.db import db

def get_active_triggers():
    return list(db.triggers.find({"active": True}))

def get_user_triggers(user_id: str):
    return list(db.triggers.find({"user_id": user_id}))

def insert_trigger(trigger: dict):
    db.triggers.insert_one(trigger)
