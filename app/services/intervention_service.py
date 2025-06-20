from app.db import db

def save_intervention(intervention: dict):
    db.interventions.insert_one(intervention)

def get_interventions_for_user(user_id):
    return list(db.interventions.find({"user_id.user_id": user_id["user_id"]}).sort("timestamp", -1))

