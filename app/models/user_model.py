from pydantic import BaseModel
from typing import Optional, Dict, List
from datetime import datetime

class UserPreferences(BaseModel):
    timezone: Optional[str] = "UTC"
    coping_style: Optional[str] = "breathing"
    preferred_prompt_time: Optional[str] = "16:00"
    notification_opt_in: Optional[bool] = True

class UserProfile(BaseModel):
    age: Optional[int]
    location: Optional[str]
    reason_for_quitting: Optional[str]

class OnboardingAnswers(BaseModel):
    ageRange: Optional[str]
    nickname: Optional[str]
    goal: Optional[str]
    vapeType: Optional[str]
    nicotineStrength: Optional[str]
    craveTime: Optional[str]
    craveTriggers: Optional[List[str]]
    vapeFrequency: Optional[str]
    quitHistory: Optional[str]
    cravingFeeling: Optional[str]
    cravingSupport: Optional[str]
    safeSpots: Optional[str]
    stressTriggers: Optional[str]
    musicHelp: Optional[str]
    mindfulness: Optional[str]
    mindfulnessTypes: Optional[str]
    aiTone: Optional[str]
    aiTalkative: Optional[str]
    checkInFrequency: Optional[str]
    vapingEmotion: Optional[str]
    openNotes: Optional[str]
    quitMethod: Optional[str]
    futureSelfMessage: Optional[str]
    vapeRefill: Optional[str]
    expense: Optional[str]

class Onboarding(BaseModel):
    completed: bool
    submittedAt: datetime
    answers: OnboardingAnswers

class User(BaseModel):
    _id: str  # Firebase UID
    email: str
    created_at: datetime
    preferences: Optional[UserPreferences]
    profile: Optional[UserProfile]
    onboarding: Optional[Onboarding]


