from django.urls import path
from .api import NoticeListAPI, NoticeDetailAPI

urlpatterns = [
    path('', NoticeListAPI.as_view()),
    path('<int:pk>', NoticeDetailAPI.as_view()),
]