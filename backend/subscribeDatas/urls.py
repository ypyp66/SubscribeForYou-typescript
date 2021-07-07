from django.urls import path
from .api import SubscribeListAPI, SubscribeDetailAPI

urlpatterns = [
    path('', SubscribeListAPI.as_view()),
    path('<int:pk>', SubscribeDetailAPI.as_view()),
]
