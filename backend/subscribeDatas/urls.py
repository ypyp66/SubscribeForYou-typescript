from django.urls import path
from .api import SubscribeListAPI, SubscribeDetailAPI, SubscribeSearchAPI

urlpatterns = [
    path('', SubscribeListAPI.as_view()),
    path('<int:pk>', SubscribeDetailAPI.as_view()),
    path('search', SubscribeSearchAPI.as_view()),
]
