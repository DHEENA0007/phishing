import re
from urllib.parse import urlparse
import tldextract # type: ignore (Assuming we will install it, we'll install it next)
from .models import BlacklistDomain, SuspiciousKeyword

# Expanding our knowledge base of suspicious patterns
FINANCIAL_KEYWORDS = ['invoice', 'payment', 'transaction', 'billing', 'statement', 'wire transfer', 'routing number', 'swift code', 'tax return', 'refund']
URGENCY_KEYWORDS = ['urgent', 'immediate action', 'verify your account', 'suspend', 'restricted', 'action required', 'expires', 'final notice', 'within 24 hours']
OTP_SCAM_PATTERNS = ['otp', 'one time password', 'verification code', 'auth code', 'do not share this code']
SUSPICIOUS_TLDS = ['.xyz', '.top', '.club', '.loan', '.win', '.vip', '.click', '.tk', '.ga', '.gq', '.cf', '.ml']
FREE_EMAIL_PROVIDERS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'protonmail.com', 'yandex.com', 'icloud.com']

def calculate_entropy(text):
    import math
    if not text:
        return 0
    entropy = 0
    for x in set(text):
        p_x = float(text.count(x)) / len(text)
        entropy += - p_x * math.log2(p_x)
    return entropy

def evaluate_url(url_text):
    risk_score = 0
    details = {
        'domain': '',
        'blacklisted': False,
        'ip_based': False,
        'suspicious_format': False,
        'suspicious_tld': False,
        'excessive_subdomains': False,
        'homograph_suspicion': False,
        'url_entropy_suspicion': False
    }

    try:
        url_text = url_text.strip()
        if not url_text.startswith(('http://', 'https://')):
            url_text = 'https://' + url_text # Assume https for extraction
            
        parsed = urlparse(url_text)
        details['domain'] = parsed.netloc

        if parsed.scheme == 'http':
            risk_score += 15
            details['suspicious_format'] = True

        # Check IP based
        if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", parsed.netloc):
            risk_score += 80
            details['ip_based'] = True

        # Extracts sub, domain, tld
        extracted = tldextract.extract(url_text)
        
        # Suspicious TLD check
        tld_with_dot = f".{extracted.suffix}"
        if tld_with_dot in SUSPICIOUS_TLDS:
            risk_score += 30
            details['suspicious_tld'] = True

        # Too many subdomains
        if extracted.subdomain.count('.') > 1:
            risk_score += 20
            details['excessive_subdomains'] = True
            
        # Entropy check for randomly generated domains (DGA)
        if calculate_entropy(extracted.domain) > 4.0:
            risk_score += 30
            details['url_entropy_suspicion'] = True

        # Check blacklist
        if BlacklistDomain.objects.filter(domain__icontains=parsed.netloc).exists():
            risk_score += 100
            details['blacklisted'] = True
            
        if '-' in parsed.netloc and not details['blacklisted']: # Hyphens are common in typosquatting but not definitive
            risk_score += 10
            
    except Exception as e:
        risk_score += 50
        details['error'] = 'Invalid URL format'

    return min(risk_score, 100), details

def _extract_sender(content, content_type):
    # Very naive extraction of sender from raw text headers
    if content_type == 'Email':
        match = re.search(r'From:\s*(.*<)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(>?)', content, re.IGNORECASE)
        if match:
            return match.group(2)
        # Fallback to finding just an email pattern near the top
        emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', content[:500])
        return emails[0] if emails else None
    return None

def evaluate_text(content, type_='Both'):
    risk_score = 0
    details = {
        'found_keywords': [],
        'extracted_urls': [],
        'url_findings': [],
        'urgency_detected': False,
        'financial_request': False,
        'otp_phishing_detected': False,
        'sender_suspicion': None
    }

    # Extract all URLs
    urls = re.findall(r'(https?://[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/\S*)', content)
    unique_urls = list(set(urls))
    details['extracted_urls'] = unique_urls
    
    # URL Risk (Weight heavily based on highest risk URL found)
    max_url_risk = 0
    for url in unique_urls:
        score, url_detail = evaluate_url(url)
        max_url_risk = max(max_url_risk, score)
        details['url_findings'].append(url_detail)
        
    risk_score += max_url_risk * 0.7 # Add 70% of the max URL risk directly to total score

    # Content Analysis (NLP rules)
    content_lower = content.lower()
    
    # Check Database Keywords
    applicable_types = ['Both', type_]
    db_keywords = SuspiciousKeyword.objects.filter(type__in=applicable_types)
    for kw in db_keywords:
        if kw.keyword.lower() in content_lower:
            risk_score += kw.weight
            details['found_keywords'].append({'keyword': kw.keyword, 'weight': kw.weight, 'category': 'Custom Rule'})

    # Advanced NLP Heuristics
    for word in URGENCY_KEYWORDS:
        if word in content_lower:
            risk_score += 15
            details['urgency_detected'] = True
            details['found_keywords'].append({'keyword': word, 'weight': 15, 'category': 'Urgent/Threatening Language'})
            
    for word in FINANCIAL_KEYWORDS:
        if word in content_lower:
            risk_score += 10
            details['financial_request'] = True
            details['found_keywords'].append({'keyword': word, 'weight': 10, 'category': 'Financial Request'})
            
    if type_ == 'SMS' or type_ == 'Both':
        for word in OTP_SCAM_PATTERNS:
            if word in content_lower:
                risk_score += 30 # High risk for SMS
                details['otp_phishing_detected'] = True
                details['found_keywords'].append({'keyword': word, 'weight': 30, 'category': 'OTP Scam Pattern'})

    # Password Reset Heuristics
    if 'password' in content_lower and ('reset' in content_lower or 'update' in content_lower):
        if len(unique_urls) > 0:
            risk_score += 40
            details['found_keywords'].append({'keyword': 'password reset with link', 'weight': 40, 'category': 'Credential Harvesting Pattern'})

    # Sender Analysis (If Email)
    if type_ == 'Email':
        sender = _extract_sender(content, 'Email')
        if sender:
            sender_domain = sender.split('@')[-1].lower()
            if 'paypal' in content_lower and sender_domain in FREE_EMAIL_PROVIDERS:
                 risk_score += 60
                 details['sender_suspicion'] = f"Claims to be business but uses free email ({sender})"
            elif 'microsoft' in content_lower and sender_domain != 'microsoft.com':
                 risk_score += 60
                 details['sender_suspicion'] = f"Mismatched sender domain for Microsoft"

    risk_score = min(round(risk_score), 100)
    return risk_score, details

def determine_status(score):
    if score <= 25:
        return 'Safe'
    elif score <= 65:
        return 'Suspicious'
    return 'High Risk'
