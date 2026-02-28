from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import register_user, login_user, logout_user, current_user, analyze_content, AnalysisRecordViewSet, change_password, delete_account, user_settings, forgot_password, generate_audio

router = DefaultRouter()
router.register(r'history', AnalysisRecordViewSet, basename='history')

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('user/', current_user, name='user'),
    path('analyze/', analyze_content, name='analyze'),
    path('generate-audio/', generate_audio, name='generate-audio'),
    path('change-password/', change_password, name='change_password'),
    path('forgot-password/', forgot_password, name='forgot_password'),
    path('delete-account/', delete_account, name='delete_account'),
    path('settings/', user_settings, name='user_settings'),
    path('', include(router.urls)),
]
