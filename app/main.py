from fastapi import FastAPI
from app.routes import logs, chat

app = FastAPI()

app.include_router(logs.router, prefix="/log", tags=["Logs"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

@app.get("/")
def root():
    return {"message": "HAVEN AI Backend is running"}
