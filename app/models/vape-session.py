from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class VapeSessionBase(BaseModel):
    location: str
    stress_level: int = Field(..., ge=1, le=10)
    emotion: str
    notes: Optional[str] = None

class VapeSessionCreate(VapeSessionBase):
    session_datetime: datetime = Field(default_factory=datetime.utcnow)
    user_id: str
    
class VapeSessionInDB(VapeSessionCreate):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    
    class Config:
        json_schema_extra = {
            "example": {
                "location": "Home",
                "stress_level": 6,
                "emotion": "Stressed",
                "notes": "After difficult work call",
                "session_datetime": "2023-11-20T10:00:00",
                "user_id": "firebase_user_id"
            }
        }
