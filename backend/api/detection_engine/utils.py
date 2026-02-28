import math
import re
from api.models import DetectionRule, SuspiciousKeyword

def calculate_entropy(text):
    if not text:
        return 0
    entropy = 0
    for x in set(text):
        p_x = float(text.count(x)) / len(text)
        entropy += - p_x * math.log2(p_x)
    return entropy

def get_rule_weight(rule_name, default_weight):
    try:
        rule = DetectionRule.objects.get(rule_name=rule_name, is_active=True)
        return rule.weight
    except DetectionRule.DoesNotExist:
        return default_weight

def get_active_keywords(msg_type):
    applicable_types = ['Both', msg_type]
    return SuspiciousKeyword.objects.filter(type__in=applicable_types, is_active=True)

def determine_status(score):
    if score <= 30:
        return 'Safe'
    elif score <= 70:
        return 'Suspicious'
    return 'High Risk'

def extract_urls(content):
    urls = re.findall(r'(https?://[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/\S*)', content)
    return list(set(urls))
