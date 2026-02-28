from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from gtts import gTTS
import io
from .models import AnalysisRecord, UrlChecked, UserSettings
from .serializers import AnalysisRecordSerializer, UserSerializer, UserSettingsSerializer
from .detection_engine import process_analysis

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(username=data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(
            username=data['email'],
            email=data['email'],
            password=data['password'],
            first_name=data.get('fullName', '')
        )
        return Response({'success': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    data = request.data
    user = authenticate(username=data['email'], password=data['password'])
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'user': UserSerializer(user).data, 'token': token.key})
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    return Response({'success': 'Logged out successfully'})

@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    if request.method == 'GET':
        return Response(UserSerializer(request.user).data)
    elif request.method == 'PUT':
        user = request.user
        data = request.data
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'email' in data:
            if User.objects.exclude(id=user.id).filter(username=data['email']).exists():
                return Response({'error': 'Email already in use'}, status=400)
            user.email = data['email']
            user.username = data['email']
        user.save()
        return Response(UserSerializer(user).data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def analyze_content(request):
    content_type = request.data.get('type') # Email, SMS, URL
    content = request.data.get('content')

    if not content or not content_type:
        return Response({'error': 'Content and type required'}, status=status.HTTP_400_BAD_REQUEST)

    risk_score, eval_status, report_details = process_analysis(content, content_type)

    if content_type == 'URL':
        url_obj, created = UrlChecked.objects.get_or_create(url=content)
        if not created:
            url_obj.checked_count += 1
        url_obj.status = eval_status
        url_obj.save()

    analysis = AnalysisRecord.objects.create(
        user=request.user,
        type=content_type,
        content=content,
        risk_score=risk_score,
        status=eval_status,
        report_details=report_details
    )

    return Response(AnalysisRecordSerializer(analysis).data, status=status.HTTP_201_CREATED)

class AnalysisRecordViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AnalysisRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AnalysisRecord.objects.filter(user=self.request.user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    if not user.check_password(old_password):
        return Response({'error': 'Old password is not correct'}, status=400)
    user.set_password(new_password)
    user.save()
    return Response({'success': 'Password updated successfully'})

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response({'success': 'Account deleted successfully'})

@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def user_settings(request):
    settings_obj, created = UserSettings.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        return Response(UserSettingsSerializer(settings_obj).data)
    elif request.method == 'PUT':
        serializer = UserSettingsSerializer(settings_obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def forgot_password(request):
    email = request.data.get('email')
    if email:
        user = User.objects.filter(username=email).first()
        if user:
            # Here you would typically generate a password reset token and send an email.
            # For this MVP, we will just simulate a successful request.
            pass
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_audio(request):
    text = request.data.get('text')
    
    if not text:
        return Response({'error': 'Text is required for audio generation.'}, status=400)

    try:
        # Utilize purely Google Translate Neural TTS backend via Python securely. 
        # This completely overrides local robotic voices and forces the pristine, high-fidelity Google female neural voice.
        tts = gTTS(text=text, lang='en', tld='com')
        fp = io.BytesIO()
        tts.write_to_fp(fp)
        fp.seek(0)
        
        response = HttpResponse(fp.read(), content_type='audio/mpeg')
        response['Content-Disposition'] = 'attachment; filename="report_audio.mp3"'
        return response
    except Exception as e:
        return Response({'error': str(e)}, status=500)
