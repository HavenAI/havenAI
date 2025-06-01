# main.py
import os
import pandas as pd
import chainlit as cl
from functools import lru_cache
from config import retriever, emotion_classifier, llm
from prompt import build_prompt  # You can keep your prompt utils in utils.py if preferred

# Loading data - from the google form
def get_user_info():
    file_path = "user_info.csv"
    if not os.path.exists(file_path):
        raise FileNotFoundError("user_info.csv not found. Please make sure the user data is available.")
    df = pd.read_csv(file_path)
    row = df.iloc[0]  # Assuming only one user record

    def parse_list(value):
        if pd.isna(value):
            return []
        if isinstance(value, str):
            return [item.strip() for item in value.split(';')]
        return list(value)

    return {
        "name": "Jane",
        "age_range": row["What’s your age range?"],
        "goal": parse_list(row["What's your current goal with vaping?"]),
        "vape_type": parse_list(row["What type of vape do you mostly use?"]),
        "nicotine_strength": row["Do you know your vape's nicotine strength?"],
        "craving_times": parse_list(row["When do you usually crave a hit? (Select all that apply)"]),
        "craving_causes": parse_list(row["What usually causes you to reach for your vape?"]),
        "vape_frequency": row["How many times a day do you typically vape? (Think about this in sessions, not puffs)"],
        "previous_quit_attempt": row["Have you ever tried to quit vaping before?"],
        "craving_feelings": parse_list(row["If you have tried to quit vaping before, how did the cravings feel like? (Select all that apply)"]),
        "help_preference": parse_list(row["Which of these would help you the most during a craving? (Select all that apply)"]),
        "support_style": row["How do you want your AI support to feel?"],
        "talk_level": row["How talkative do you want your AI to be?"],
        "vaping_feeling": row["In one word, how does vaping make you feel?"],
        "additional_notes": row["Anything you'd like to tell us about your journey with vaping?"],
        "daily_checkin": "9 pm IST"
    }


@lru_cache(maxsize=128)
def get_emotion_prefix(text):
    try:
        result = emotion_classifier(text)
        emotion = result[0]['label'].lower()
    except Exception:
        emotion = "neutral"

    return {
        "joy": "Respond in an uplifting and motivating tone.",
        "anger": "Respond calmly and constructively.",
        "sadness": "Respond empathetically and supportively.",
        "fear": "Respond with gentle reassurance.",
        "neutral": "Respond in a friendly, thoughtful tone.",
        "disgust": "Respond with understanding and compassion.",
        "surprise": "Respond with grounded encouragement."
    }.get(emotion, "Respond in a warm, caring tone.")

# Chainlit message handler
@cl.on_message
async def main_handler(message: cl.Message):
    user_profile = get_user_info()

    # Get emotional tone
    emotional_prefix = get_emotion_prefix(message.content)

    # Build system prompt
    system_prompt = build_prompt(user_profile, emotional_prefix=emotional_prefix)

    # Use Langchain LLM chain (retriever-RAG setup)
    docs = retriever.get_relevant_documents(message.content)
    context = "\n\n".join([doc.page_content for doc in docs])

    final_prompt = f"""{system_prompt}

📚 **Context from your journey**:
{context}

🗨️ **User says:** {message.content}
"""

    response = llm.predict(final_prompt)
    await cl.Message(content=response).send()
