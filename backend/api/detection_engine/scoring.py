from .email_detector import evaluate_email
from .sms_detector import evaluate_sms
from .url_checker import evaluate_url
from .utils import determine_status
from .ai_analyzer import analyze_with_ai

def process_analysis(content, type_, lang='en'):
    if type_ == 'URL':
        score, details = evaluate_url(content)
    else:
        # User requested to use both email and sms detectors for better results
        email_score, email_details = evaluate_email(content)
        sms_score, sms_details = evaluate_sms(content)
        
        # Combine the details efficiently, prioritizing found facts
        score = max(email_score, sms_score) # Take the higher risk rule
        
        details = {
            'found_keywords': list({v['keyword']:v for v in (email_details['found_keywords'] + sms_details['found_keywords'])}.values()), # Deduplicate keywords
            'url_findings': email_details['url_findings'], # URL findings are identical across both engines since they call evaluate_url identically
            'sender_suspicion': email_details.get('sender_suspicion') or sms_details.get('sender_suspicion')
        }

    # Integrate AI Insights with language preference
    ai_result = analyze_with_ai(content, type_, lang)
    if ai_result:
        ai_score = ai_result.get('ai_risk_score', 0)
        ai_reason = ai_result.get('ai_reasoning', '')
        
        # Blend the deterministic rules processing with the LLM analysis dynamically. We'll take the maximum computed risk logically.
        score = max(score, ai_score)
        details['ai_analysis'] = {
            'score': ai_score,
            'reasoning': ai_reason
        }

    status = determine_status(score)
    return score, status, details
