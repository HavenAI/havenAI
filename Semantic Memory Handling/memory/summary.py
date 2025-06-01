import openai

SUMMARY_LIMIT = 300

def summarize_chat(history, existing_summary):
    text = "\n".join([f"User: {q}\nBot: {a}" for q, a in history])
    prompt = f"""Here is the current summary of the conversation:\n\n{existing_summary}

Update it with the following new conversation snippet:\n\n{text}

Return a brief updated summary within 300 characters, capturing emotional context, cravings, vaping sessions, and goals. Be concise, avoid repeating older info:"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    summary = response['choices'][0]['message']['content'].strip()
    return summary[:SUMMARY_LIMIT - 3] + "..." if len(summary) > SUMMARY_LIMIT else summary
