from typing import List, Optional
from datetime import datetime




def clamp(val:int, min_val: int, max_val:int) -> int:
    return max(min_val, min(val, max_val))


def calculate_health_score(answer: dict) -> dict:
    # q2 = answer.get("goal")
    q3 = answer.get("vapeType")
    q4 = answer.get("nicotineStrength")
    q5 = answer.get("craveTime", [])
    q6 = answer.get("goal", [])
    q7 = answer.get("vapeFrequency")
    q8 = answer.get("vapeRefill")
    q10 = answer.get("quitHistory")
    q11_raw = answer.get("cravingFeeling", "")
    q11 = [item.strip() for item in q11_raw.split(",")]
    q13 = answer.get("safeSpots")
    q14 = answer.get("stressTriggers")
    q15 = answer.get("musicHelp")
    q16 = answer.get("mindfulness")
    q19 = answer.get("aiTalkative")
    q20 = answer.get("checkInFrequency")
    q21 = answer.get("quitMethod")

    #Mental Health Score
    mental_score = 100
    if "When I'm stressed or anxious" in q5 or any(x in q6 for x in ["Stress/overwhelm","Emotions (e.g. sadness, anxiety)"]):
        mental_score -= 20
    if len(set(q11).intersection({"Mental tug of war to get a vape","General discomfort","Dizziness or lack of focus","Jittery or shaking"})) >= 2:
        mental_score -= 20
    if q16 == "Yes":
        mental_score += 3
    if q19 == "I want full conversations" or q20 in ["3 times a day","2 times a day"]:
        mental_score += 3
    mental_score = clamp(mental_score,30,100)

    #Lung Functionality Score
    lung_score = 100
    lung_score -= {
        "Disposable (e.g. Elf bar, Puff bar)": 15, 
        "Pod based (e.g. JUUL, Vuse)": 10, 
        "Refillable/Mod": 5
        }.get(q3,10)
    lung_score -= {
        "Yes - High (e.g. 50mg)": 15,
        "Medium (e.g. 20–35mg)": 10,
        "Low (e.g. <10mg)": 5
        }.get(q4, 10)
    lung_score -= {
        "More than 10 times":20,
        "6 - 10 times": 15,
        "3 - 5 times": 5
    }.get(q7, 10)
    lung_score -= {
        "Everyday": 20,
        "Every 2-3 days": 15,
        "Once a week": 10
    }.get(q8, 5)

    lung_score = clamp(lung_score, 30, 100)


    #Heart Health Score
    heart_score = 100
    heart_score -= {
        "Yes - High (e.g. 50mg)": 20,
        "Medium (e.g. 20–35mg)": 15,
        "Low (e.g. <10mg)": 5
    }.get(q4, 10)
    heart_score -= {
        "More than 10 times":20,
        "6 - 10 times": 15,
        "3 - 5 times": 5
    }.get(q7, 10)
    heart_score += 5 if q10 == "Yes" else -5
    # heart_score += 10 if q2 == "I want to quit completely" or 5 if q2 == "I want to cut down gradually"
    heart_score = clamp(heart_score, 30, 100)

    return {
        "mental_health": mental_score,
        "lung_function": lung_score,
        "heart_health": heart_score
    }



def calculate_percentage_change(new: int, old: int) -> float:
    print(f"Calculating change: current={new}, previous={old}")
    if old == 0:
        return 0.0
    return ((new-old) / old) * 100


def calculate_latest_health_score(
    current_cravings: List[dict],
    current_sessions: List[dict],
    previous_cravings: Optional[List[dict]] = None,
    previous_sessions: Optional[List[dict]] = None,
    onboarding_answers: Optional[dict] = None,
    initial_health_score: Optional[dict] = None,
) -> dict:
    print("current cravings list of past 2 days is:",current_cravings)
    print("current sessions list of past 2 days is:",current_sessions)
    print("previous session ")
    base_scores = initial_health_score or {
       "mental_health": 70,
        "lung_functionality": 70,
        "heart_health": 70 
    }

    curr_session_count = len(current_sessions)
    print("current session count is", curr_session_count)
    prev_sesion_count = len(previous_sessions) if previous_sessions else None

    curr_cravings_count = len(current_cravings)
    prev_cravings_count = len(previous_cravings) if previous_cravings else None

    curr_moods = [log["mood"] for log in current_cravings + current_sessions]
    prev_moods = [log["mood"] for log in previous_cravings + previous_sessions] if previous_cravings and previous_sessions else None

    stress_moods = {"Stressed", "Anxiety", "Pressure"}
    curr_stress_count = sum(1 for mood in curr_moods if mood in stress_moods)
    prev_stress_count = sum(1 for mood in prev_moods if mood in stress_moods) if prev_moods else None
    print(f"current stress count is {curr_stress_count} and previous stress count is {prev_stress_count}")
    #For fallback
    onboarding_session_estimate = 10
    onboarding_stress_estimate = 8


    if onboarding_answers:
        q7 = onboarding_answers.get("vapeFrequency")
        if q7 == "1 - 2 times":
            onboarding_session_estimate = 2
        elif q7 == "3 - 5 times":
            onboarding_session_estimate = 4
        elif q7 == "6 - 10 times":
            onboarding_session_estimate = 8
        elif q7 == "More than 10 times" or "I don't keep track":
            onboarding_session_estimate = 15
        print("onboarding session estimate is ", onboarding_session_estimate)
        q5_raw = onboarding_answers.get("craveTime", "")
        q6_raw = onboarding_answers.get("goal", "")

        # Convert comma-separated string to list and strip spaces
        q5 = [item.strip() for item in q5_raw.split(",")] if isinstance(q5_raw, str) else q5_raw
        q6 = [item.strip() for item in q6_raw.split(",")] if isinstance(q6_raw, str) else q6_raw

        stress_signals = [
            "When I'm stressed or anxious", "Stress/overwhelm", "Emotions (e.g. sadness, anxiety)"
        ]
        stress_factor = sum(1 for x in q5 + q6 if x in stress_signals)
        onboarding_stress_estimate = 3 + stress_factor * 2  # basic scaling
        print("onboarding stress estimate is ", onboarding_stress_estimate)


    #Lung Functionality
    lung_score = 0
    if prev_sesion_count is not None:
        session_change = calculate_percentage_change(curr_session_count, prev_sesion_count)
    else:
        session_change = calculate_percentage_change(curr_session_count, onboarding_session_estimate)
        print("session change is",session_change)
    if session_change <= -25:
        lung_score += 8
        print("lung score is:",lung_score)
    elif session_change >= 25:
        lung_score -= 8
        print("lung score is:",lung_score)
    


    #Mental Health
    mental_score = 0
    if prev_stress_count is not None:
        stress_change = calculate_percentage_change(curr_stress_count, prev_stress_count)
    else:
        stress_change = calculate_percentage_change(curr_stress_count,onboarding_stress_estimate)
    print("stress change is", stress_change)
    if stress_change <= -25:
        mental_score += 8
    elif stress_change >= 25:
        mental_score -= 8
    


    #Heart Health
    heart_score = 0
    if prev_sesion_count and prev_stress_count is not None:
        session_change = calculate_percentage_change(curr_session_count, prev_sesion_count)
        stress_change = calculate_percentage_change(curr_stress_count, prev_stress_count)
    else:
        session_change = calculate_percentage_change(curr_session_count, onboarding_session_estimate)
        stress_change = calculate_percentage_change(curr_stress_count, onboarding_stress_estimate)
    print("session change and stress change is",session_change,stress_change)
    if session_change <= -25 and stress_change <= -25:
        heart_score += 8
    elif session_change >= 25 and stress_change >= 25:
        heart_score -= 8


    def clamp(score): 
        print("score is", score)
        return max(0, min(100, score))

    return {
        "latest_mental_health": clamp(base_scores["mental_health"] + mental_score),
        "latest_lung_functionality": clamp(base_scores["lung_functionality"] + lung_score),
        "latest_heart_health": clamp(base_scores["heart_health"] + heart_score),
        "updated_at": datetime.utcnow()
    }
