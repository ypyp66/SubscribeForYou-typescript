from rest_framework import serializers
from .models import SubscribeDatas, SubscribeListData
from accounts.serializers import UserSerializer


class SubscribeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribeListData
        fields = '__all__'


class SubscribeDatasSerializer(serializers.ModelSerializer):
    user_pk = UserSerializer(read_only=True)
    subs_pk = SubscribeListSerializer(read_only=True)

    class Meta:
        model = SubscribeDatas
        fields = ('id', 'user_pk', 'subs_pk', 'price', 'purchaseDay', 'created_date')

