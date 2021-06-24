from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http import HttpResponse

from .serializers import UserRegisterSerializer, UserLoginSerializer
from .models import User


# 회원가입
def test(request):
    print('test')
    if request.method == "GET":
        return HttpResponse({"data": "test"})


@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(userid=serializer.validated_data['userid']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate userid"}, status=status.HTTP_409_CONFLICT)


# 로그인
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['userid'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': 'True',
            'token': serializer.data['token']
        }
        return Response(response, status=status.HTTP_200_OK)
