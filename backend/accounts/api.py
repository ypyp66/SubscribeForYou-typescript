from .models import User
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, UserRegisterSerializer, UserLoginSerializer, ChangePasswordSerializer, ChangeIsActiveSerializer


# 회원가입
# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = UserRegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)  # 유효성검사
#         serializer.save()

#         return Response(
#             {
#                 "message": "successfully created"
#             }, status=201
#         )


# 로그인
class LoginAPI(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if user is not "None":
            return Response(
                {
                    "user_id": user.user_id,
                    'user_pk': user.pk,
                    "token": AuthToken.objects.create(user)[1],
                    "message": "successfully login",
                }, status=200
            )
        else:
            return Response(
                {
                    "message": "no user"
                }, status=401
            )


# 토큰 인증
class UserAPI(generics.RetrieveAPIView):
    
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        permission_classes = [
            permissions.IsAuthenticated,
        ]
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # 유효성검사
        serializer.save()

        return Response(
            {
                "message": "successfully created"
            }, status=201
        )

    def patch(self, request):        
        permission_classes = [
            permissions.IsAuthenticated,
        ]
        serializer = ChangePasswordSerializer(instance=self.request.user, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {
                    "message": "successfully updated"
                }, status=200
            )
        return Response(
            {
                "message": "bad request"
            }, status=400
        )    

    def delete(self, request):
        permission_classes = [
            permissions.IsAuthenticated,
        ]
        serializer = ChangeIsActiveSerializer(instance=self.request.user, data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {
                    "message": "successfully deleted"
                }, status=200
            )
        return Response(
            {
                "message": "bad request"
            }, status=400
        )