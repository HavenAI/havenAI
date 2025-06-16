from fastapi import APIRouter, HTTPException, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List, Optional
from datetime import datetime, date
from pymongo import DESCENDING
from app.schemas import LogCreate, LogResponse, LogType
from app.db import get_logs_collection
from bson import ObjectId

router = APIRouter()

@router.post("/logs/", response_model=LogResponse)
def create_log(log: LogCreate):
    log_dict = log.dict()
    log_dict["created_at"] = datetime.utcnow()
    result = get_logs_collection().insert_one(log_dict)
    log_dict["id"] = str(result.inserted_id)
    return LogResponse(**log_dict)

@router.get("/logs/{user_id}", response_model=List[LogResponse])
def get_logs(user_id: str, date: Optional[date] = Query(None)):
    query = {"user_id": user_id}
    if date:
        start = datetime.combine(date, datetime.min.time())
        end = datetime.combine(date, datetime.max.time())
        query["timestamp"] = {"$gte": start, "$lte": end}
    logs = list(get_logs_collection().find(query).sort("timestamp", DESCENDING))
    for log in logs:
        log["id"] = str(log["_id"])
    return [LogResponse(**log) for log in logs]

@router.get("/logs/stats/{user_id}")
def get_mood_stats(user_id: str):
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": "$mood", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    stats = list(get_logs_collection().aggregate(pipeline))
    return {"mood_breakdown": stats}
