# trips/views.py

from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LogInSerializer, UserSerializer, TripSerializer
from .models import Trip


class SignUpView(generics.CreateAPIView):
  queryset = get_user_model().objects.all()
  serializer_class = UserSerializer

class LogInView(TokenObtainPairView):
  serializer_class = LogInSerializer

class TripView(viewsets.ReadOnlyModelViewSet):
  lookup_field = 'id' 
  lookup_url_kwarg = 'trip_id'
  permission_classes = (permissions.IsAuthenticated,)
  queryset = Trip.objects.all()
  serializer_class = TripSerializer