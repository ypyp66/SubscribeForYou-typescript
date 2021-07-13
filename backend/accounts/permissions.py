from rest_framework import permissions
from .models import User
from knox.auth import TokenAuthentication
from django.contrib.auth import get_user_model

class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else:
            if request.user.is_authenticated:
                return request.user.pk == view.kwargs['user_pk']
            else:
                return False 

