from rest_framework import permissions
from .models import User

class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        
        return request.user.pk == view.kwargs['user_pk']

              
