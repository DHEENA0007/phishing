import re
from .utils import get_active_keywords, extract_urls, get_rule_weight
from .url_checker import evaluate_url

def evaluate_sms(content):
    risk_score = 0
    details = {
        'found_keywords': [],
        'extracted_urls': [],
        'url_findings': [],
        'sender_suspicion': None
    }

    # Extract all URLs
    urls = extract_urls(content)
    details['extracted_urls'] = urls
    
    max_url_risk = 0
    for url in urls:
        score, url_detail = evaluate_url(url)
        max_url_risk = max(max_url_risk, score)
        details['url_findings'].append(url_detail)
        
    risk_score += max_url_risk * 0.7 # Add 70% of max URL risk directly to total score

    content_lower = content.lower()

    # Keywords evaluation
    keywords = get_active_keywords('SMS')
    
    for kw in keywords:
        if kw.keyword.lower() in content_lower:
            weight = kw.weight
            risk_score += weight
            category = kw.category if kw.category else 'Custom Rule'
            details['found_keywords'].append({'keyword': kw.keyword, 'weight': weight, 'category': category})

    return min(round(risk_score), 100), details
