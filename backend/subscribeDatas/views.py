from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from .serializers import SubscribeSerializer
from .models import Subscribe
from .functions import load_sublist_data


class SubscribeListAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeSerializer

    def get_queryset(self):
        queryset = Subscribe.objects.all().order_by('i_name')
        print(self.request)
        user_pk = self.request.user.pk
        if user_pk is not None:
            queryset = queryset.filter(user_pk=user_pk)
        return queryset

    def get(self, request, *args, **kwargs):
        load_sublist_data()
        return self.list(self, request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)    



class SubscribeDetailAPI(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
                        
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeSerializer

    def get_queryset(self):
        queryset = Subscribe.objects.all().order_by('i_name')
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