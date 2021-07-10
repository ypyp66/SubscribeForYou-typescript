from rest_framework import permissions

class IsAuthenticatedOrRegister(permissions.IsAuthenticated):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else :
            if request.user.is_authenticated : 
                return True
            else : 
                return False

class IsOwnerOnly(permissions.DjangoModelPermissions):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        else :
            if request.user.is_authenticated : 
                return True
            else : 
                return False
            
        
              
