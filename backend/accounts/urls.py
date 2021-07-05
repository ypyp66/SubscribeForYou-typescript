from django.urls import path, include
from . import views
from rest_framework import urls, routers
from knox import views as knox_views
from .api import LoginAPI, UserAPI 



urlpatterns = [
    # path('api/register', RegisterAPI.as_view()),
    path('api/login', LoginAPI.as_view()),
    path('api/user', UserAPI.as_view()),
    path('api/user/<int:user_pk>', UserAPI.as_view()),
    path('api/test', views.test, name="test"),
    path('api/auth', include('knox.urls')),
    path('api/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/password_reset', include('django_rest_passwordreset.urls'), name='password_reset'),
    #path('api/password_reset/confirm', ResetPwdAPI.as_view(), name='password_reset_confirm'),
]
