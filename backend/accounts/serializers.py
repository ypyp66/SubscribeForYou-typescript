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
        fields = '__all__'


class UserCreateSerializer(serializers.ModelSerializer):
    # name = serializers.CharField(required=True)
    # userid = serializers.CharField(required=True)
    # password = serializers.CharField(required=True)
    # email = serializers.EmailField(required=True)
    # gender = serializers.CharField(required=True)
    # birthYear = serializers.IntegerField(required=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            userid=validated_data['userid'],
            password=validated_data['password'],
            email=validated_data['email'],
            gender=validated_data['gender'],
            birthYear=validated_data['birthYear'],
        )
        user.save()
        return user

    class Meta:
        model = User
        fields = '__all__'


class UserLoginSerializer(serializers.Serializer):
    userid = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        userid = data.get("userid", None)
        password = data.get("password", None)
        print(f'id : {userid}, pw : {password}')
        user = authenticate(userid=userid, password=password)
        print(user)

        if user is None:
            return {
                'userid': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'userid': user.userid,
            'token': jwt_token
        }
