from rest_framework import serializers
from .models import SubscribeDatas


class SubscribeDatasSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribeDatas
        fields = '__all__'
