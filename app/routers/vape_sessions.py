from fastapi import APIRouter, Depends, HTTPException, status
from app.models.vape_session import VapeSessionCreate, VapeSessionInDB
from app.database import get_database
from app.auth.firebase_auth import get_current_user
from typing import List
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=VapeSessionInDB, status_code=201)
async def add_vape_session(
    session: VapeSessionCreate,
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    session_dict = session.dict()
    session_dict["user_id"] = user_id
    result = await db["vape_sessions"].insert_one(session_dict)
    session_dict["id"] = str(result.inserted_id)
    return VapeSessionInDB(**session_dict)

@router.get("/", response_model=List[VapeSessionInDB])
async def get_vape_sessions(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    sessions = []
    cursor = db["vape_sessions"].find({"user_id": user_id})
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        sessions.append(VapeSessionInDB(**doc))
    return sessions

@router.get("/stats")
async def vape_sessions_stats(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {
            "_id": "$location",
            "count": {"$sum": 1},
            "avg_stress": {"$avg": "$stress_level"}
        }},
        {"$sort": {"count": -1}}
    ]
    stats = await db["vape_sessions"].aggregate(pipeline).to_list(length=10)
    total = await db["vape_sessions"].count_documents({"user_id": user_id})
    return {
        "frequency_by_location": stats,
        "total_sessions": total
    }

@router.delete("/{id}")
async def delete_vape_session(
    id: str,
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    result = await db["vape_sessions"].delete_one({"_id": ObjectId(id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vape session not found")
    return {"message": "Vape session deleted successfully"}
