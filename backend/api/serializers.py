from rest_framework import serializers
from django.contrib.auth.models import User
from .models import AnalysisRecord, UrlChecked, Report, UserSettings

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = '__all__'
        read_only_fields = ('user',)

class AnalysisRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisRecord
        fields = '__all__'

class UrlCheckedSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlChecked
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'
