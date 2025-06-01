from base_prompt import build_prompt

def build_final_prompt(user_profile, talk_level, past_summaries, emotional_prefix=""):
    base_prompt = build_prompt(user_profile, emotional_prefix)
    combined_summary_context = "\n".join(past_summaries)

    return f"""
{base_prompt}

Here are some relevant past reflections and context that might help you support the user more meaningfully:

{combined_summary_context}

Here is User preferred talk level: {talk_level}
Please adjust your response length and emotional detail accordingly:

- **Quick Check-ins:** Brief (1-2 sentences), warm, and grounding. Avoid extra elaboration.  
- **Back-and-Forth:** Concise reflections with light follow-ups (3-4 sentences). Warm and engaging.  
- **Full Conversations:** Expressive, emotionally attuned, empathetic, and detailed. Rich, thoughtful responses.  

Summary so far:
{{chat_summary}}

Conversation history:
{{chat_history}}

Now respond to this message from the user:
\"\"\"{{question}}\"\"\"
Keep in mind that every chat should be as personalized as possible based on the **Current User Info**.
"""
