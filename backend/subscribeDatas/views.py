from django.shortcuts import render
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.auth import TokenAuthentication

from .serializers import SubscribeDatasSerializer
from accounts.models import User
from .models import SubscribeDatas
from .functions import load_sublist_data

class SubscribeListAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeDatasSerializer

    def get_queryset(self):
        queryset = SubscribeDatas.objects.all().order_by('id')
        user_pk = self.request.user.pk
        if user_pk is not None:
            queryset = queryset.filter(user_pk=user_pk)
        return queryset

    def get(self, request, *args, **kwargs):
        # load_sublist_data() # 최초 한번만 실행해야함..... 누군가 해결해줘....
        return self.list(self, request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        # request.save()
        return self.create(request, *args, **kwargs)    



class SubscribeDetailAPI(generics.GenericAPIView, mixins.RetrieveModelMixin, 
                         mixins.UpdateModelMixin, mixins.DestroyModelMixin):
                         
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeDatasSerializer

    def get_queryset(self):
        queryset = SubscribeDatas.objects.all().order_by('id')
        user_pk = self.request.user.pk
        if user_pk is not None:
            queryset = queryset.filter(user_pk=user_pk)
        return queryset

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)