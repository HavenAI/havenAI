from langchain_openai import ChatOpenAI
from fastapi.security import HTTPAuthorizationCredentials
from langchain.tools import tool
from langchain.agents import initialize_agent, AgentType
from typing import Optional, Dict
from datetime import datetime
from functools import partial

from app.vectorstore.retriever import retriever
from app.services.emotion import detect_emotion, emotion_prompt_prefix
from app.services.daily_checkin_prompt import daily_checkin_prompt
from app.services.user_quiz import get_quiz_data
from app.services.daily_logs import get_daily_checkin_data, add_log_entry
from app.config import settings

llm = ChatOpenAI(model="gpt-4-turbo", openai_api_key=settings.OPENAI_API_KEY)

chat_history = []

def make_log_untracked_events(credentials: HTTPAuthorizationCredentials):
    @tool
    def log_untracked_events(type:str, timestamp: Optional[str] = None, mood: Optional[str] = None, location: Optional[str] = None, intensity: Optional[int] = None, note: Optional[str] = None) -> Dict:
        """
        Log a missed craving or vape session.
        Type must be "craving" or "vape"
        Timestamp must be ISO format (e.g., "2024-06-19T15:00:00").
        Only 'type' is required.
        If mood, intensity, or location are missing, ask the user.

        """
        log_data = {
            "type": type,
            "timestamp": datetime.fromisoformat(timestamp) if timestamp else datetime.utcnow(),
            "mood": mood or "Unknown",
            "location": location or "Unknown",
            "intensity": intensity if intensity is not None else "Unknown",
            "note": note or "Unknown"
        }
        add_log_entry(log_data, credentials)
        return "Thanks! I’ve logged that for you. Anything else you want to talk about?"
    return log_untracked_events




async def checkin_response(user_message: str, credentials: HTTPAuthorizationCredentials):
    user_profile = get_quiz_data(credentials)
    daily_checkin_data = get_daily_checkin_data(credentials)
    print("checkin data", daily_checkin_data)
    talk_level = user_profile['talk_level']
    emotion = detect_emotion(user_message)
    prefix = emotion_prompt_prefix(emotion)

    chat_history.append(f"User: {user_message}")
    if len(chat_history) > 10:
        chat_history.pop(0)

    relevant_docs = retriever.get_relevant_documents(user_message)
    context = "\n".join([doc.page_content for doc in relevant_docs])

    base_prompt = daily_checkin_prompt(user_profile, daily_checkin_data, prefix)
    system_prompt = f"""
{base_prompt}

Here are some relevant past reflections and context that might help you support the user more meaningfully:

{context}

Here is User preferred talk level: {talk_level}
Please adjust your response length and emotional detail accordingly:

- **Quick Check-ins:** Brief (1-2 sentences), warm, and grounding. Avoid extra elaboration.  
- **Back-and-Forth:** Concise reflections with light follow-ups (3-4 sentences). Warm and engaging.  
- **Full Conversations:** Expressive, emotionally attuned, empathetic, and detailed. Rich, thoughtful responses.  

Conversation history:
{'\n'.join(chat_history)}
Now respond to this message from the user:
 \"\"\"{user_message}\"\"\"
Keep in mind that every chat should be as personalized as possible based on the **Current User Info**.
"""
    tools = [make_log_untracked_events(credentials)]
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        verbose=True
    )
    agent_response = agent.run(system_prompt)

    print("AI: ",agent_response)
    chat_history.append(f"AI: {agent_response}")
    print("chat history", chat_history)
    return agent_response
