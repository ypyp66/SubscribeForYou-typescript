from rest_framework import serializers
from .models import Subscribe, SubscribeIndex
from accounts.serializers import UserSerializer


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = '__all__'


class SubscribeIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribeIndex
        fields = '__all__'
    # user_pk = UserSerializer(read_only=True)
    # subs_pk = SubscribeListSerializer(read_only=True)

    # class Meta:
    #     model = SubscribeDatas
    #     fields = ('id', 'user_pk', 'subs_pk', 'price', 'purchaseDay', 'created_date')

