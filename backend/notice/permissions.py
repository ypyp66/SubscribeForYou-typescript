from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.IsAdminUser):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        else:
            if request.user.is_authenticated: # 로그인여부
                if request.user.is_admin == True: # admin여부
                    return True
                return False
            else:
                return False 

  