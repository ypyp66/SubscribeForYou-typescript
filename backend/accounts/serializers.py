from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings
from .models import User

User = get_user_model()
JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('userid', 'name', 'email', 'gender', 'birthYear')


class UserRegisterSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            userid=validated_data['userid'],
            password=validated_data['password'],
            email=validated_data['email'],
            gender=validated_data['gender'],
            birthYear=validated_data['birthYear'],
        )
        return user

    class Meta:
        model = User
        fields = '__all__'
        extra_kwards = {'password': {'write_only': True}}


class UserLoginSerializer(serializers.Serializer):
    userid = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=256, write_only=True)

    def validate(self, data):
        userid = data.get("userid", None)
        password = data.get("password", None)

        user = authenticate(userid=userid, password=password)
        print(user)

        if user is None:
            return "None"

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
