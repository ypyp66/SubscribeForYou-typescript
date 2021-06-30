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

        if user is None:
            return "None"

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_pwd = serializers.CharField(required=True, write_only=True)
    new_pwd = serializers.CharField(required=True, write_only=True)
    re_pwd = serializers.CharField(required=True, write_only=True)

    def update(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        if not validated_data['new_pwd']:
            raise serializers.ValidationError({'new_pwd': 'not found'})
        if not validated_data['old_pwd']:
            raise serializers.ValidationError({'old_pwd': 'not found'})
        if not instance.check_password(validated_data['old_pwd']):
            raise serializers.ValidationError({'old_pwd': 'wrong password'})
        if validated_data['new_pwd'] != validated_data['re_pwd']:
            raise serializers.ValidationError({'passwords': 'passwords do not match'})
        if validated_data['new_pwd'] == validated_data['re_pwd'] and instance.check_password(validated_data['old_pwd']):
            instance.set_password(validated_data['new_pwd'])
            instance.save()
            return instance
            
    class Meta:
        model = User
        fields = ['old_pwd', 'new_pwd','re_pwd']


class ChangeIsActiveSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)

    def delete(self, instance, validated_data):
        instance.password = validated_data.get('password', instance.password)
        if not validated_data['password']:
            raise serializers.ValidationError({'password': 'not found'})
        if not instance.check_password(validated_data['password']):
            raise serializers.ValidationError({'password': 'wrong password'})
        else:
            instance.is_active = False
            instance.save()
            return instance

    class Meta:
        model = User
        fields = ['password']
