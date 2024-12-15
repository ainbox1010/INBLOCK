from django.urls import path
from .views import UserLoginView, UserRegisterView  # Assuming you've already implemented UserRegisterView

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='user-login'),
    # You can also add the register endpoint here:
    path('register/', UserRegisterView.as_view(), name='user-register'),
]
