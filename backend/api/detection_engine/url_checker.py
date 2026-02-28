import re
import tldextract
from urllib.parse import urlparse
from api.models import BlacklistDomain, SafeDomain
from .utils import calculate_entropy, get_rule_weight

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
        'url_entropy_suspicion': False,
        'reasoning': []
    }

    try:
        url_text = url_text.strip()
        if not url_text.startswith(('http://', 'https://')):
            url_text = 'https://' + url_text
            
        parsed = urlparse(url_text)
        details['domain'] = parsed.netloc

        if SafeDomain.objects.filter(domain_name__iexact=parsed.netloc, is_active=True).exists():
            details['reasoning'].append('Domain is considered safe.')
            return 0, details # No risk for safe domains

        if parsed.scheme == 'http':
            weight = get_rule_weight('HTTP instead of HTTPS', 15)
            risk_score += weight
            details['suspicious_format'] = True
            details['reasoning'].append(f'Uses HTTP instead of HTTPS (+{weight})')

        # Check IP based
        if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", parsed.netloc):
            weight = get_rule_weight('IP Address URL', 80)
            risk_score += weight
            details['ip_based'] = True
            details['reasoning'].append(f'IP based URL detected (+{weight})')

        # Extracts sub, domain, tld
        extracted = tldextract.extract(url_text)
        
        # Suspicious TLD check
        tld_with_dot = f".{extracted.suffix}"
        suspicious_tlds = ['.xyz', '.top', '.club', '.loan', '.win', '.vip', '.click', '.tk', '.ga', '.gq', '.cf', '.ml']
        if tld_with_dot in suspicious_tlds:
            weight = get_rule_weight('Suspicious TLD', 30)
            risk_score += weight
            details['suspicious_tld'] = True
            details['reasoning'].append(f'Suspicious TLD {tld_with_dot} (+{weight})')

        # Too many subdomains
        if extracted.subdomain.count('.') > 1:
            weight = get_rule_weight('Excessive Subdomains', 20)
            risk_score += weight
            details['excessive_subdomains'] = True
            details['reasoning'].append(f'Excessive subdomains (+{weight})')
            
        # Entropy check for randomly generated domains (DGA)
        if calculate_entropy(extracted.domain) > 4.0:
            weight = get_rule_weight('High Entropy Domain', 30)
            risk_score += weight
            details['url_entropy_suspicion'] = True
            details['reasoning'].append(f'High entropy / randomly generated domain (+{weight})')

        # Check blacklist
        blacklist_entry = BlacklistDomain.objects.filter(domain__icontains=parsed.netloc, is_active=True).first()
        if blacklist_entry:
            weight = blacklist_entry.risk_weight
            risk_score += weight
            details['blacklisted'] = True
            reason = f' - {blacklist_entry.reason}' if blacklist_entry.reason else ''
            details['reasoning'].append(f'Found on Blacklist{reason} (+{weight})')
            
        if '-' in parsed.netloc and not details['blacklisted']:
            weight = get_rule_weight('Hyphen in Domain', 10)
            risk_score += weight
            details['reasoning'].append(f'Hyphens in domain (+{weight})')
            
    except Exception as e:
        weight = get_rule_weight('Invalid URL format', 50)
        risk_score += weight
        details['error'] = 'Invalid URL format'
        details['reasoning'].append(f'Invalid URL format (+{weight})')

    return min(risk_score, 100), details
