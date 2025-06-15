from transformers import pipeline
from functools import lru_cache

classifier = pipeline("sentiment-analysis", model="j-hartmann/emotion-english-distilroberta-base")

@lru_cache(maxsize=128)
def detect_emotion(text):
    try:
        result = classifier(text)
        return result[0]['label'].lower()
    except:
        return "neutral"

def emotion_prompt_prefix(emotion):
    return {
        "joy": "Respond in an uplifting and motivating tone.",
        "anger": "Respond calmly and constructively.",
        "sadness": "Respond empathetically and supportively.",
        "fear": "Respond with gentle reassurance.",
        "neutral": "Respond in a friendly, thoughtful tone.",
        "disgust": "Respond with understanding and compassion.",
        "surprise": "Respond with grounded encouragement."
    }.get(emotion, "Respond in a warm, caring tone.")
