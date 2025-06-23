from fastapi import APIRouter, Depends, HTTPException, status
from app.models.craving import CravingCreate, CravingInDB
from app.models.vape_session import VapeSessionCreate, VapeSessionInDB
from app.database import get_database
from app.auth.firebase_auth import get_current_user
from typing import List, Union
from bson import ObjectId
from app.services.daily_logs import calculate_progress

router = APIRouter()

@router.post("/", status_code=201)
async def add_entry(
    entry: dict,  # Accepts both craving and vape session
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    if entry.get("type") == "vape_session":
        # Validate as VapeSessionCreate
        session = VapeSessionCreate(**entry)
        session_dict = session.dict()
        session_dict["user_id"] = user_id
        session_dict["type"] = "vape_session"
        result = await db["cravings"].insert_one(session_dict)
        session_dict["id"] = str(result.inserted_id)
        return session_dict
    else:
        # Default to craving
        craving = CravingCreate(**entry)
        craving_dict = craving.dict()
        craving_dict["user_id"] = user_id
        craving_dict["type"] = "craving"
        result = await db["cravings"].insert_one(craving_dict)
        craving_dict["id"] = str(result.inserted_id)
        return craving_dict

@router.get("/", response_model=List[dict])
async def get_entries(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    entries = []
    cursor = db["cravings"].find({"user_id": user_id})
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        entries.append(doc)
    return entries

@router.get("/stats")
async def entries_stats(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    craving_pipeline = [
        {"$match": {"user_id": user_id, "type": "craving"}},
        {"$group": {"_id": "$trigger", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    vape_pipeline = [
        {"$match": {"user_id": user_id, "type": "vape_session"}},
        {"$group": {"_id": "$location", "count": {"$sum": 1}, "avg_stress": {"$avg": "$stress_level"}}},
        {"$sort": {"count": -1}}
    ]
    most_frequent_triggers = await db["cravings"].aggregate(craving_pipeline).to_list(length=10)
    frequency_by_location = await db["cravings"].aggregate(vape_pipeline).to_list(length=10)
    total_cravings = await db["cravings"].count_documents({"user_id": user_id, "type": "craving"})
    total_sessions = await db["cravings"].count_documents({"user_id": user_id, "type": "vape_session"})
    return {
        "most_frequent_triggers": most_frequent_triggers,
        "total_cravings": total_cravings,
        "frequency_by_location": frequency_by_location,
        "total_sessions": total_sessions
    }

@router.get("/progress")
async def get_progress(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    entries = []
    cursor = db["cravings"].find({"user_id": user_id})
    async for doc in cursor:
        # Convert ObjectId to string and ensure timestamps are ISO strings
        doc["id"] = str(doc.get("_id", ""))
        if "timestamp" in doc and hasattr(doc["timestamp"], "isoformat"):
            doc["timestamp"] = doc["timestamp"].isoformat()
        if "session_datetime" in doc and hasattr(doc["session_datetime"], "isoformat"):
            doc["session_datetime"] = doc["session_datetime"].isoformat()
        entries.append(doc)
    return calculate_progress(entries)

@router.delete("/{id}")
async def delete_entry(
    id: str,
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    result = await db["cravings"].delete_one({"_id": ObjectId(id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"message": "Entry deleted successfully"}
