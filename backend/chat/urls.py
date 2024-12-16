from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, ChatView

router = DefaultRouter()
router.register(r'conversations', ChatViewSet, basename='conversation')

urlpatterns = [
    path('', include(router.urls)),
    path('send_message/', ChatView.as_view(), name='send_message'),
] 