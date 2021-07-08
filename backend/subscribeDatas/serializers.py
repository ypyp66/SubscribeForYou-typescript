from rest_framework import serializers
from .models import Subscribe, SubscribeIndex


class SubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscribe
        fields = '__all__'


class SubscribeIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribeIndex
        fields = '__all__'

