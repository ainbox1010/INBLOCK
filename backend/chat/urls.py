from django.urls import path
from .views import ChatView, ChatViewSet, DemoChatView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'conversations', ChatViewSet, basename='conversation')

urlpatterns = [
    path('', ChatView.as_view(), name='chat'),
    path('demo/', DemoChatView.as_view(), name='demo-chat'),
] + router.urls 