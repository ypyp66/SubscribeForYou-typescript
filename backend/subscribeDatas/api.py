from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from .serializers import SubscribeSerializer, SubscribeIndexSerializer
from .models import Subscribe, SubscribeIndex
from .functions import load_sublist_data


class SubscribeListAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = SubscribeSerializer

    def get_queryset(self):
        try:
            print('sort ------------------------->' , self.request.GET['sort'])
            queryset = Subscribe.objects.all().order_by(self.request.GET['sort'])
        except:
            queryset = Subscribe.objects.all().order_by('pk')
            
        user_pk = self.request.user.pk
        if user_pk is not None:
            queryset = queryset.filter(user_pk=user_pk)
        return queryset

    def get(self, request, *args, **kwargs):
        load_sublist_data()
        return self.list(self, request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        #request.data._mutable = True
        request.data['user_pk'] = request.user.pk
        #request.data._mutable = False

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
        #request.data._mutable = True
        request.data['user_pk'] = request.user.pk
        #request.data._mutable = False

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



class SubscribeSearchAPI(generics.GenericAPIView, mixins.ListModelMixin):
    
    serializer_class = SubscribeIndexSerializer
    
    # 실시간 검색 속도가 좋지 않을 시 전체 데이터 보낼 쿼리문
    # def get_queryset(self):
    #     return SubscribeIndex.objects.all().order_by('s_name')

    def get_queryset(self):
        if self.request.GET['keyword'] == '':
            return SubscribeIndex.objects.filter(s_name__iregex=f'[#]')
        else:
            # print('request --------------------> ', self.request.GET['keyword'])
            return SubscribeIndex.objects.filter(s_name__iregex=self.request.GET['keyword'])

    def get(self, request, *args, **kwargs):
        return self.list(self, request, *args, **kwargs)