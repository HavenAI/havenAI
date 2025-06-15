from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.firebase_auth import verify_token

auth_scheme = HTTPBearer()

async def firebase_auth_dependency(request: Request):
    credentials: HTTPAuthorizationCredentials = await auth_scheme(request)
    if credentials:
        user = verify_token(credentials.credentials)
        if user:
            request.state.user = user
            return
    raise HTTPException(status_code=401, detail="Invalid or missing Firebase token")
