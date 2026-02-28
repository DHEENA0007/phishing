import os
import django
import sys

# Setup standard Django environment running script
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.detection_engine.scoring import process_analysis
import json

payload = """
Conversation opened. 1 read message.

Skip to content
Using Gmail with screen readers
2 of 12,362
Download Cursor
Inbox
Cursor <hi@cursor.com>
	
8:59 AM (8 hours ago)
	
to me
Hi DHEENADHAYALAN,

Cursor is the best way to code with agents.

Download the app on your computer to get started.

Best,
Cursor Team
"""

score, status, details = process_analysis(payload, 'Email')

print("="*40)
print(f"STATUS: {status}")
print(f"RISK SCORE: {score}%")
print("="*40)
print("DETAILS:")
print(json.dumps(details, indent=2))
