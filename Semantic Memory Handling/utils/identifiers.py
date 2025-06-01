# utils/identifiers.py

import chainlit as cl
import uuid

def get_user_id():
    # Use email or fallback to unique ID
    user = cl.user_session.get("user")
    if user and "email" in user:
        return user["email"]
    return cl.user_session.get("user_id") or _assign_user_id()

def _assign_user_id():
    new_id = f"guest_{uuid.uuid4()}"
    cl.user_session.set("user_id", new_id)
    return new_id

def get_session_id():
    session_id = cl.user_session.get("session_id")
    if session_id:
        return session_id
    new_session = f"session_{uuid.uuid4()}"
    cl.user_session.set("session_id", new_session)
    return new_session
