from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class CravingBase(BaseModel):
    trigger: str
    intensity: int = Field(..., ge=1, le=10)
    mood: str
    notes: Optional[str] = None
    
class CravingCreate(CravingBase):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_id: str
    
class CravingInDB(CravingCreate):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    
    class Config:
        json_schema_extra = {
            "example": {
                "trigger": "Stress at work",
                "intensity": 7,
                "mood": "Anxious",
                "notes": "Meeting with boss",
                "timestamp": "2023-11-20T10:00:00",
                "user_id": "firebase_user_id"
            }
        }
