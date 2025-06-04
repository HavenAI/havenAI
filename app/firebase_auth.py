import firebase_admin
from firebase_admin import credentials, auth
import os


# Load Firebase Admin SDK credentials
cred = credentials.Certificate("secrets\firebase-adminsdk.json")  # Path to the .json file
firebase_admin.initialize_app(cred)


def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # Contains uid, email, etc.
    except Exception as e:
        return None

