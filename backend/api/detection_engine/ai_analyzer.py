import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

def analyze_with_ai(content, type_):
    if not GROQ_API_KEY:
        return None
        
    try:
        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a cybersecurity expert analyzing content for phishing. Assess the risk from 0 to 100. Respond ONLY with valid JSON exactly like this: {\"ai_risk_score\": <number 0-100>, \"ai_reasoning\": \"<1-3 sentence explanation>\"}"
                },
                {
                    "role": "user",
                    "content": f"Analyze this {type_} for phishing risks:\n\n{content}"
                }
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(completion.choices[0].message.content)
    except Exception as e:
        print(f"Groq API Error: {e}")
        return None
