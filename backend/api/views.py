from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def register_user(request):
    return Response({'message': 'User registration endpoint is ready'})
