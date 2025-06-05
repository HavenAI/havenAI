from app.db import db

def insert_log(log: dict):
    db.logs.insert_one(log)

def get_logs_by_user(user_id: str):
    return list(db.logs.find({"user_id": user_id}))
