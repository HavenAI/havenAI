from transformers import pipeline
from functools import lru_cache

@lru_cache(maxsize=16)
def get_summarizer():
    return pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def summarize_text(text):
    summarizer = get_summarizer()
    result = summarizer(text, max_length=130, min_length=30, do_sample=False)
    return result[0]["summary_text"]

