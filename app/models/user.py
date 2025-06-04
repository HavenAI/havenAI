import pandas as pd
import os

def get_user_profile():
    file_path = "app/models/user_info.csv"
    if not os.path.exists(file_path):
        raise FileNotFoundError("user_info.csv not found")
    df = pd.read_csv(file_path)
    row = df.iloc[0]

    def parse_list(value):
        return [] if pd.isna(value) else [item.strip() for item in value.split(';')]

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
