from rest_framework import generics, mixins
from knox.auth import TokenAuthentication

from .serializers import NoticeSerializer
from .models import Notice
from .permissions import IsAdminUserOrReadOnly 


class NoticeListAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUserOrReadOnly,)
    serializer_class = NoticeSerializer

    def get_queryset(self):
        queryset = Notice.objects.all().order_by('-pk')
        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(self, request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data['author'] = request.user.pk
        request.data._mutable = False

        return self.create(request, *args, **kwargs)    


class NoticeDetailAPI(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
                        
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAdminUserOrReadOnly,) 
    serializer_class = NoticeSerializer

    def get_queryset(self):
        queryset = Notice.objects.all().order_by('-pk')
        return queryset

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data['author'] = request.user.pk
        request.data._mutable = False
        
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)