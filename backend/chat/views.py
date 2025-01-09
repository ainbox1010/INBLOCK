from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message
from .services import ChatService
from .serializers import ConversationSerializer, MessageSerializer
from rest_framework.views import APIView
<<<<<<< HEAD
=======
from django.core.cache import cache
import uuid
>>>>>>> deployment-to-servers

class ChatViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing chat conversations and messages.
    
    Provides endpoints for:
    - Creating and retrieving conversations
    - Sending messages with configurable AI model settings
    - Getting available AI models
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer
    
    def get_queryset(self):
        """Return conversations for the authenticated user only."""
        return Conversation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """
        Send a message in a conversation with configurable AI model settings.
        
        Payload structure:
        {
            "message": "User's message",
            "model": "gpt-3.5-turbo",  # optional, defaults to gpt-3.5-turbo
            "temperature": 0,  # optional, defaults to 0, range: 0-2
        }
        
        Returns:
        {
            "user_message": {
                "id": int,
                "content": str,
                "is_user": true,
                "created_at": datetime
            },
            "assistant_message": {
                "id": int,
                "content": str,
                "is_user": false,
                "created_at": datetime
            }
        }
        
        Raises:
        - 400 if message content is missing
        - 404 if conversation not found
        """
        conversation = self.get_object()
        message_content = request.data.get('message')
        model_name = request.data.get('model', 'gpt-3.5-turbo')
        temperature = request.data.get('temperature', 0)
        
        if not message_content:
            return Response(
                {'error': 'Message content is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create user message
        user_message = Message.objects.create(
            conversation=conversation,
            content=message_content,
            is_user=True
        )

        # Process message with ChatService
        chat_service = ChatService(model_name=model_name, temperature=temperature)
        response = chat_service.process_message(message_content)

        # Create assistant message
        assistant_message = Message.objects.create(
            conversation=conversation,
            content=response,
            is_user=False
        )

        # Update user's query count
        user = request.user
        user.query_count += 1
        user.save()

        return Response({
            'user_message': MessageSerializer(user_message).data,
            'assistant_message': MessageSerializer(assistant_message).data
        })

    @action(detail=False, methods=['get'])
    def available_models(self, request):
        """
        Get list of available AI models and their configurations.
        
        Returns:
        {
            "gpt-3.5-turbo": {
                "name": "GPT-3.5 Turbo",
                "max_tokens": 4096,
                "description": "Good balance of performance and cost"
            },
            ...
        }
        """
        return Response(ChatService.get_available_models())

class ChatView(APIView):
    def post(self, request):
        message = request.data.get('message')
        model = request.data.get('model', 'gpt-3.5-turbo')
        temperature = float(request.data.get('temperature', 0))

        if not message:
            return Response(
                {"error": "Message is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        chat_service = ChatService(model_name=model, temperature=temperature)
        response = chat_service.process_message(message)

        return Response({
            "message": response
<<<<<<< HEAD
=======
        })

class DemoChatView(APIView):
    """
    Handles demo chat functionality with rate limiting using IP address
    """
    DEMO_QUERIES_PER_DAY = 5
    CACHE_TTL = 24 * 60 * 60  # 24 hours in seconds

    def _get_cache_key(self, request):
        """Generate a unique cache key based on IP"""
        ip = request.META.get('HTTP_X_FORWARDED_FOR', request.META.get('REMOTE_ADDR'))
        if not ip:
            # Fallback to session-based tracking if IP not available
            if not request.session.session_key:
                request.session.create()
            return f"demo_chat_{request.session.session_key}"
        return f"demo_chat_{ip}"

    def get(self, request):
        """Get remaining queries for demo user"""
        cache_key = self._get_cache_key(request)
        queries_used = cache.get(cache_key, 0)
        queries_left = max(0, self.DEMO_QUERIES_PER_DAY - queries_used)
        
        return Response({
            "queries_left": queries_left
        })

    def post(self, request):
        """Handle demo chat message"""
        cache_key = self._get_cache_key(request)
        queries_used = cache.get(cache_key, 0)
        
        if queries_used >= self.DEMO_QUERIES_PER_DAY:
            return Response(
                {"error": "Daily query limit reached"}, 
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        message = request.data.get('message')
        if not message:
            return Response(
                {"error": "Message is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Process message
        chat_service = ChatService(
            model_name=request.data.get('model', 'gpt-3.5-turbo'),
            temperature=float(request.data.get('temperature', 0))
        )
        response = chat_service.process_message(message)

        # Increment query count
        cache.set(cache_key, queries_used + 1, self.CACHE_TTL)
        
        return Response({
            "message": response,
            "queries_left": self.DEMO_QUERIES_PER_DAY - (queries_used + 1)
>>>>>>> deployment-to-servers
        })