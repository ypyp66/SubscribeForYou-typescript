from django.urls import path, include
from . import views
from rest_framework import urls

urlpatterns = [
    path('register/', views.createUser),
    path('login/', views.login),
    path('api-auth/', include('rest_framework.urls')),
]
