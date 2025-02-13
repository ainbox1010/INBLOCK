# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserLoginRequestSerializer, 
    UserRegistrationSerializer,
    UserLoginResponseSerializer,
    ForgotPasswordSerializer,
    ResetPasswordSerializer,
    UserLoginSerializer
)
from django.core.mail import send_mail
from django.conf import settings
from .models import PasswordResetToken, EmailVerification
from .services import send_verification_email
import sys

User = get_user_model()

class UserRegisterView(APIView):
    def post(self, request):
        try:
            # Add debug logging
            print("Registration request received:", file=sys.stderr)
            print(f"Request data: {request.data}", file=sys.stderr)
            print(f"Request headers: {request.headers}", file=sys.stderr)
            
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                print("Serializer valid, creating user...", file=sys.stderr)
                user = User.objects.create_user(
                    username=serializer.validated_data['username'],
                    email=serializer.validated_data['email'],
                    password=serializer.validated_data['password']
                )
                response_serializer = UserLoginResponseSerializer(user)
                return Response(
                    {
                        "message": "User registered successfully.",
                        "user": response_serializer.data
                    },
                    status=status.HTTP_201_CREATED
                )
            else:
                print(f"Serializer errors: {serializer.errors}", file=sys.stderr)
                return Response(
                    {"error": {"code": "validation_error", "message": serializer.errors}},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            print(f"Registration error: {str(e)}", file=sys.stderr)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginRequestSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                request,
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user:
                refresh = RefreshToken.for_user(user)
                response_data = UserLoginResponseSerializer(user).data
                response_data['token'] = str(refresh.access_token)
                return Response(response_data, status=status.HTTP_200_OK)
            
            return Response(
                {"error": {"code": "invalid_credentials", "message": "Invalid credentials"}},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return Response(
            {"error": {"code": "validation_error", "message": serializer.errors}},
            status=status.HTTP_400_BAD_REQUEST
        )

class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                # Create reset token
                reset_token = PasswordResetToken.objects.create(user=user)
                
                # Send email
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{reset_token.token}"
                send_mail(
                    'Password Reset Request',
                    f'Click the following link to reset your password: {reset_url}',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                
                return Response(
                    {"message": "Password reset email sent successfully"},
                    status=status.HTTP_200_OK
                )
            except User.DoesNotExist:
                # For security, don't reveal that the email doesn't exist
                return Response(
                    {"message": "Password reset email sent successfully"},
                    status=status.HTTP_200_OK
                )
                
        return Response(
            {"error": {"code": "validation_error", "message": serializer.errors}},
            status=status.HTTP_400_BAD_REQUEST
        )

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                token_obj = PasswordResetToken.objects.get(
                    token=serializer.validated_data['token'],
                    is_used=False
                )
                
                # Update password
                user = token_obj.user
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                
                # Mark token as used
                token_obj.is_used = True
                token_obj.save()
                
                return Response(
                    {"message": "Password reset successful"},
                    status=status.HTTP_200_OK
                )
            except PasswordResetToken.DoesNotExist:
                return Response(
                    {"error": {"code": "invalid_token", "message": "Invalid or expired token"}},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        return Response(
            {"error": {"code": "validation_error", "message": serializer.errors}},
            status=status.HTTP_400_BAD_REQUEST
        )

class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Send verification email
            verification = send_verification_email(user)
            
            return Response({
                'message': 'Registration successful. Please check your email for verification.',
                'user_id': user.id,
                'requires_verification': True
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            
            if user:
                # Check if email is verified
                if not user.is_email_verified:
                    return Response(
                        {'error': 'Please verify your email before logging in'}, 
                        status=status.HTTP_403_FORBIDDEN
                    )
                
                refresh = RefreshToken.for_user(user)
                return Response({
                    'user': {
                        'email': user.email,
                        'id': user.id
                    },
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                })
            
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView):
    def post(self, request):
        token = request.data.get('token')
        code = request.data.get('code')
        
        try:
            # Try to find verification by token or code
            if token:
                verification = EmailVerification.objects.get(token=token)
            else:
                # If using code, match first 6 chars of token
                verifications = EmailVerification.objects.filter()
                verification = next(
                    v for v in verifications 
                    if str(v.token)[:6].upper() == code.upper()
                )
            
            # Check if user is already verified
            if verification.user.is_email_verified:
                return Response({
                    'message': 'already_verified',
                    'user': {
                        'email': verification.user.email,
                        'id': verification.user.id
                    }
                })
            
            if verification.is_expired:
                return Response(
                    {'error': 'Verification link has expired'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if verification.is_used:
                return Response(
                    {'error': 'This verification code has already been used'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Mark as verified
            user = verification.user
            user.is_email_verified = True
            user.save()
            
            verification.is_used = True
            verification.save()
            
            # Generate tokens for auto-login
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Email verified successfully',
                'user': {
                    'email': user.email,
                    'id': user.id
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
            
        except (EmailVerification.DoesNotExist, StopIteration):
            return Response(
                {'error': 'Invalid verification token/code'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class VerificationStatusView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'is_verified': False})
        return Response({
            'is_verified': request.user.is_email_verified
        })
