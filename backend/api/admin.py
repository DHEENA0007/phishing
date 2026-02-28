from django.contrib import admin
from .models import BlacklistDomain, SuspiciousKeyword, UrlChecked, AnalysisRecord, Report, SafeDomain, DetectionRule

class DetectionRuleAdmin(admin.ModelAdmin):
    list_display = ('rule_name', 'weight', 'is_active')

class SuspiciousKeywordAdmin(admin.ModelAdmin):
    list_display = ('keyword', 'type', 'weight', 'category', 'is_active')

class BlacklistDomainAdmin(admin.ModelAdmin):
    list_display = ('domain', 'risk_weight', 'is_active')

admin.site.register(BlacklistDomain, BlacklistDomainAdmin)
admin.site.register(SuspiciousKeyword, SuspiciousKeywordAdmin)
admin.site.register(SafeDomain)
admin.site.register(DetectionRule, DetectionRuleAdmin)
admin.site.register(UrlChecked)
admin.site.register(AnalysisRecord)
admin.site.register(Report)
