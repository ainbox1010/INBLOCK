from django.urls import path
from .views import ChatView, ChatViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'conversations', ChatViewSet, basename='conversation')

urlpatterns = [
    path('', ChatView.as_view(), name='chat'),
] + router.urls 