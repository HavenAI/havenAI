import os
import json
import base64
import firebase_admin
from firebase_admin import credentials, auth


# Load Firebase Admin SDK credentials from either env variable (Render) or file path (local)
firebase_json_base64 = os.getenv("FIREBASE_JSON_BASE64")

if firebase_json_base64:
    # Decode and load from base64 env var (for Render deployment)
    decoded = base64.b64decode(firebase_json_base64)
    cert_dict = json.loads(decoded)
    cred = credentials.Certificate(cert_dict)
else:
    # Local development - load from file
    cred = credentials.Certificate("secrets/firebase-adminsdk.json")

firebase_admin.initialize_app(cred)


def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # Contains uid, email, etc.
    except Exception:
        return None
