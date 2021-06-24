from django.shortcuts import render
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication

from .serializers import SubscribeDatasSerializer
from .models import SubscribeDatas
from .functions import load_sublist_data


class SubscribeDataAPI(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeDatasSerializer

    def get_queryset(self):
        return SubscribeDatas.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        load_sublist_data() # 최초 한번만 실행해야함..... 누군가 해결해줘....
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.save()
        return self.list(request, *args, **kwargs)
