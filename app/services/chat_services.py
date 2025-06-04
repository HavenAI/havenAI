from langchain_openai import ChatOpenAI
from app.vectorstore.retriever import retriever
from app.services.emotion import detect_emotion, emotion_prompt_prefix
# from app.services.summarization import summarize_text
from app.services.prompt import build_prompt
from app.models.user import get_user_profile
from app.config import settings


llm = ChatOpenAI(model="gpt-4-turbo", openai_api_key=settings.OPENAI_API_KEY)

chat_history = []

async def chat_response(user_message: str):
    user_profile = get_user_profile()
    talk_level = user_profile['talk_level']
    emotion = detect_emotion(user_message)
    prefix = emotion_prompt_prefix(emotion)

    chat_history.append(f"User: {user_message}")
    if len(chat_history) > 10:
        chat_history.pop(0)

    relevant_docs = retriever.get_relevant_documents(user_message)
    context = "\n".join([doc.page_content for doc in relevant_docs])

    base_prompt = build_prompt(user_profile, prefix)
    final_prompt = f"""
{base_prompt}

Here are some relevant past reflections and context that might help you support the user more meaningfully:

{context}

Here is User preferred talk level: {talk_level}
Please adjust your response length and emotional detail accordingly:

- **Quick Check-ins:** Brief (1-2 sentences), warm, and grounding. Avoid extra elaboration.  
- **Back-and-Forth:** Concise reflections with light follow-ups (3-4 sentences). Warm and engaging.  
- **Full Conversations:** Expressive, emotionally attuned, empathetic, and detailed. Rich, thoughtful responses.  

Conversation history:
{{chat_history}}
Now respond to this message from the user:
 \"\"\"{{user_message}}\"\"\"
Keep in mind that every chat should be as personalized as possible based on the **Current User Info**.
"""
 
    response = llm.invoke(final_prompt)
    chat_history.append(f"AI: {response.content}")
    return response.content
