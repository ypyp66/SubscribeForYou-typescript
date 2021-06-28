from django.contrib import admin
from django.urls import path, include
from .views import SubscribeListAPI, SubscribeDetailAPI

urlpatterns = [
    path('', SubscribeListAPI.as_view()),
    path('<int:pk>', SubscribeDetailAPI.as_view()),
]
