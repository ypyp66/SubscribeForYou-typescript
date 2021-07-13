from django.urls import path, include
from . import views
from knox import views as knox_views
from .api import LoginAPI, UserAPI


urlpatterns = [
    path('api/login', LoginAPI.as_view()),
    path('api/user', UserAPI.as_view()),
    path('api/user/<int:user_pk>', UserAPI.as_view()),
    path('api/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/password_reset', include('django_rest_passwordreset.urls'), name='password_reset'),
    path('api/auth', include('knox.urls')),
    path('api/test', views.test, name="test"),
]
