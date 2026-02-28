from .utils import get_active_keywords, extract_urls, get_rule_weight
from .url_checker import evaluate_url
import re

def _extract_sender(content):
    match = re.search(r'From:\s*(.*<)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(>?)', content, re.IGNORECASE)
    if match:
        return match.group(2)
    emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', content[:500])
    return emails[0] if emails else None

def evaluate_email(content):
    risk_score = 0
    details = {
        'found_keywords': [],
        'extracted_urls': [],
        'url_findings': [],
        'sender_suspicion': None
    }

    # URL Check
    urls = extract_urls(content)
    details['extracted_urls'] = urls
    
    max_url_risk = 0
    for url in urls:
        score, url_detail = evaluate_url(url)
        max_url_risk = max(max_url_risk, score)
        details['url_findings'].append(url_detail)
        
    risk_score += max_url_risk * 0.7 # Add 70% of max URL risk

    content_lower = content.lower()

    # Keywords evaluation
    keywords = get_active_keywords('Email')
    
    for kw in keywords:
        if kw.keyword.lower() in content_lower:
            weight = kw.weight
            risk_score += weight
            category = kw.category if kw.category else 'Custom Rule'
            details['found_keywords'].append({'keyword': kw.keyword, 'weight': weight, 'category': category})

    # Password Reset Pattern
    if 'password' in content_lower and ('reset' in content_lower or 'update' in content_lower):
        if len(urls) > 0:
            weight = get_rule_weight('Credential Harvesting Pattern', 40)
            risk_score += weight
            details['found_keywords'].append({'keyword': 'Password reset with link', 'weight': weight, 'category': 'Credential Harvesting Pattern'})

    # Sender Analysis
    sender = _extract_sender(content)
    free_email_providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'protonmail.com', 'yandex.com', 'icloud.com']
    
    if sender:
        sender_domain = sender.split('@')[-1].lower()
        if 'paypal' in content_lower and sender_domain in free_email_providers:
            weight = get_rule_weight('Business claims with Free Email', 60)
            risk_score += weight
            details['sender_suspicion'] = f"Claims to be a business (PayPal) but uses a free email provider ({sender}) (+{weight})"
        elif 'microsoft' in content_lower and sender_domain != 'microsoft.com':
            weight = get_rule_weight('Mismatched corporate domain', 60)
            risk_score += weight
            details['sender_suspicion'] = f"Mismatched sender domain for Microsoft ({sender}) (+{weight})"

    return min(round(risk_score), 100), details
