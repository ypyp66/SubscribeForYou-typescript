from django.shortcuts import render
from rest_framework import generics, mixins
from .serializers import SubscribeDatasSerializer
from .models import SubscribeDatas
# Create your views here.


class SubscribeDataAPI(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SubscribeDatasSerializer

    def get_queryset(self):
        return SubscribeDatas.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.save()
        return self.list(request, *args, **kwargs)
