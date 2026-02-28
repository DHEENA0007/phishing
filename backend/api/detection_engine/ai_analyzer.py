import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

def analyze_with_ai(content, type_, lang='en'):
    if not GROQ_API_KEY:
        return None
        
    lang_map = {'en': 'English', 'ta': 'Tamil'}
    target_lang = lang_map.get(lang, 'English')
        
    try:
        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a cybersecurity expert analyzing content for phishing. Assess the risk from 0 to 100. Provide your reasoning in {target_lang}. Respond ONLY with valid JSON exactly like this: {{\"ai_risk_score\": <number 0-100>, \"ai_reasoning\": \"<1-3 sentence explanation in {target_lang}>\"}}"
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

def translate_to_target(text, target_lang):
    """
    Translates text to the target language (if it's not 'en') using Groq for zero-shot translation.
    """
    if not GROQ_API_KEY or target_lang == 'en':
        return text
        
    lang_map = {
        'ta': 'Tamil',
        # Add others if needed
    }
    
    target_lang_full = lang_map.get(target_lang, target_lang)
    
    try:
        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": f"You are a professional translator. Translate the given text into {target_lang_full}. Respond ONLY with the translated text without any quotes or preamble."
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        )
        return completion.choices[0].message.content.strip()
    except Exception as e:
        print(f"Groq Translation Error: {e}")
        return text
