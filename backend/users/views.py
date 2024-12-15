# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserLoginRequestSerializer, 
    UserRegistrationSerializer,
    UserLoginResponseSerializer
)

User = get_user_model()

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
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
        return Response(
            {"error": {"code": "validation_error", "message": serializer.errors}},
            status=status.HTTP_400_BAD_REQUEST
        )

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
