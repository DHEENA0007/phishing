from django.db import models
from django.contrib.auth.models import User

class BlacklistDomain(models.Model):
    domain = models.CharField(max_length=255, unique=True)
    risk_weight = models.IntegerField(default=100)
    reason = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    date_added = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.domain

class SafeDomain(models.Model):
    domain_name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.domain_name

class DetectionRule(models.Model):
    rule_name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    weight = models.IntegerField(default=10)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.rule_name} (Weight: {self.weight})"

class SuspiciousKeyword(models.Model):
    TYPE_CHOICES = (
        ('Email', 'Email'),
        ('SMS', 'SMS'),
        ('Both', 'Both'),
    )
    keyword = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='Both')
    weight = models.FloatField(default=10.0) # How much risk score this adds
    category = models.CharField(max_length=50, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.keyword} ({self.type})"

class UrlChecked(models.Model):
    STATUS_CHOICES = (
        ('Safe', 'Safe'),
        ('Suspicious', 'Suspicious'),
        ('High Risk', 'High Risk'),
    )
    url = models.URLField(max_length=2000, unique=True)
    checked_count = models.IntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Safe')
    last_checked = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url

class AnalysisRecord(models.Model):
    TYPE_CHOICES = (
        ('Email', 'Email'),
        ('SMS', 'SMS'),
        ('URL', 'URL')
    )
    STATUS_CHOICES = (
        ('Safe', 'Safe'),
        ('Suspicious', 'Suspicious'),
        ('High Risk', 'High Risk'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    date_analyzed = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    content = models.TextField() # Message text or URL
    risk_score = models.FloatField(default=0.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    report_details = models.JSONField(default=dict)

    class Meta:
        ordering = ['-date_analyzed']

    def __str__(self):
        return f"{self.type} - {self.status} ({self.date_analyzed})"

class Report(models.Model):
    analysis = models.OneToOneField(AnalysisRecord, on_delete=models.CASCADE)
    pdf_file = models.FileField(upload_to='reports/', null=True, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for Analysis {self.analysis.id}"

class UserSettings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='settings')
    email_alerts = models.BooleanField(default=False)
    dark_mode = models.BooleanField(default=True)
    notification_preferences = models.BooleanField(default=True)

    def __str__(self):
        return f"Settings for {self.user.username}"
