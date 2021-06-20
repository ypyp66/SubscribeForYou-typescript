from django.urls import path, include
from . import views
from rest_framework import urls, routers
from knox import views as knox_views
from .api import LoginAPI, RegisterAPI, UserAPI


urlpatterns = [
    path('api/register', RegisterAPI.as_view()),
    path('api/login', LoginAPI.as_view()),
    path('api/user', UserAPI.as_view()),
    path('api.auth', include('knox.urls')),
    path('api/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
