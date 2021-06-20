from .models import User
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, UserRegisterSerializer, UserLoginSerializer

# 회원가입


class RegisterAPI(generics.GenericAPIView):
    serializer_class = UserRegisterSerializer

    # kwargs basically means it can take more arguments
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # token = Token.objects.create(user=user)
        # return Response({"Token": token.key})
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )

# 로그인


class LoginAPI(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        if user is not "None":
            # return Response({
            #     "userid": user,
            #     'token': token.key},
            #     status=200
            # )
            return Response(
                {
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                    "token": AuthToken.objects.create(user)[1],
                }
            )
        else:
            return Response({
                "message": "no user"
            }, status=401)


# 토큰 인증
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
