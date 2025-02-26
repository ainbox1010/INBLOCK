from django.urls import path
from .views import (
    UserRegisterView,
    LoginView,
    VerifyEmailView,
    VerificationStatusView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('verification-status/', VerificationStatusView.as_view(), name='verification-status'),
]
