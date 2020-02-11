# trips/views.py

from django.contrib.auth import get_user_model
from rest_framework import generics

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LogInSerializer, UserSerializer


class SignUpView(generics.CreateAPIView):
  queryset = get_user_model().objects.all()
  serializer_class = UserSerializer

class LogInView(TokenObtainPairView):
  serializer_class = LogInSerializer