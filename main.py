import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from datetime import datetime, timezone
from typing import List, Optional
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
import asyncio

from models import TriggerCreate, TriggerResponse, TriggerStatusUpdate, TriggerStatus
from db import get_trigger_collection

app = FastAPI()

# Helper to convert MongoDB document to TriggerResponse
async def trigger_doc_to_response(doc):
    if not doc:
        return None
    doc["_id"] = str(doc["_id"])
    return TriggerResponse(**doc)

@app.post("/triggers/", response_model=TriggerResponse)
async def create_trigger(trigger: TriggerCreate):
    collection = await get_trigger_collection()
    now = datetime.now(timezone.utc)
    doc = trigger.dict()
    doc["created_at"] = now
    doc["updated_at"] = now
    result = await collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    return await trigger_doc_to_response(doc)

@app.get("/triggers/{user_id}", response_model=List[TriggerResponse])
async def get_triggers(user_id: str, status: Optional[TriggerStatus] = Query(None)):
    collection = await get_trigger_collection()
    query = {"user_id": user_id}
    if status:
        query["status"] = status
    cursor = collection.find(query).sort("trigger_time", 1)
    triggers = [await trigger_doc_to_response(doc) async for doc in cursor]
    return triggers

@app.put("/triggers/{id}/status", response_model=TriggerResponse)
async def update_trigger_status(id: str, status_update: TriggerStatusUpdate):
    collection = await get_trigger_collection()
    result = await collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": {"status": status_update.status, "updated_at": datetime.now(timezone.utc)}}
    )
    if not result:
        raise HTTPException(status_code=404, detail="Trigger not found")
    updated = await collection.find_one({"_id": ObjectId(id)})
    return await trigger_doc_to_response(updated)

# Optional: APScheduler integration
scheduler = AsyncIOScheduler()

async def check_and_send_triggers():
    collection = await get_trigger_collection()
    now = datetime.now(timezone.utc)
    cursor = collection.find({"status": "Pending", "trigger_time": {"$lte": now}})
    async for doc in cursor:
        print(f"[Mock Delivery] Sending trigger {doc['_id']} to user {doc['user_id']} via {doc.get('delivery_method', 'N/A')}")
        await collection.update_one({"_id": doc["_id"]}, {"$set": {"status": "Sent", "updated_at": datetime.now(timezone.utc)}})

@app.on_event("startup")
async def startup_event():
    scheduler.add_job(check_and_send_triggers, IntervalTrigger(seconds=30))
    scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    scheduler.shutdown()
