from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import money_saved

app = FastAPI()

# Allow CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(money_saved.router, prefix="/money")

@app.get("/")
def read_root():
    return {"message": "Money Saved API is running"}
