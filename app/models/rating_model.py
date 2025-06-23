from pydantic import BaseModel
from datetime import datetime

class RatingEntry(BaseModel):
    star_ratings: int