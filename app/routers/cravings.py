from fastapi import APIRouter, Depends, HTTPException, status
from app.models.craving import CravingCreate, CravingInDB
from app.database import get_database
from app.auth.firebase_auth import get_current_user
from typing import List
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=CravingInDB, status_code=201)
async def add_craving(
    craving: CravingCreate,
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    craving_dict = craving.dict()
    craving_dict["user_id"] = user_id
    result = await db["cravings"].insert_one(craving_dict)
    craving_dict["id"] = str(result.inserted_id)
    return CravingInDB(**craving_dict)

@router.get("/", response_model=List[CravingInDB])
async def get_cravings(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    cravings = []
    cursor = db["cravings"].find({"user_id": user_id})
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        cravings.append(CravingInDB(**doc))
    return cravings

@router.get("/stats")
async def cravings_stats(
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": "$trigger", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    stats = await db["cravings"].aggregate(pipeline).to_list(length=10)
    total = await db["cravings"].count_documents({"user_id": user_id})
    return {
        "most_frequent_triggers": stats,
        "total_cravings": total
    }

@router.delete("/{id}")
async def delete_craving(
    id: str,
    user_id: str = Depends(get_current_user),
    db=Depends(get_database)
):
    result = await db["cravings"].delete_one({"_id": ObjectId(id), "user_id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Craving not found")
    return {"message": "Craving deleted successfully"}
