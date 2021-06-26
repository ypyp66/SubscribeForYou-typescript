from django.contrib import admin
from django.urls import path, include
from subscribeDatas.views import SubscribeListAPI, SubscribeDetailAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('subscribe/', SubscribeListAPI.as_view()),
    path('subscribe/<int:pk>', SubscribeDetailAPI.as_view()),
    path('auth/', include('accounts.urls')),
]
