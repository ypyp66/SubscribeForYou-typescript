from .models import User
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, UserRegisterSerializer, UserLoginSerializer


# 회원가입
class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # 유효성검사
        serializer.save()

        return Response(
            {
                "message": "successfully created"
            }, status=201
        )


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
                    "userid": user.userid,
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
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user