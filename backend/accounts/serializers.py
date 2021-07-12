from django.http.response import HttpResponse
from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model, logout
from django.contrib.auth.models import update_last_login
from knox import views as knox_views
from rest_framework_jwt.settings import api_settings
from django.core.validators import RegexValidator
from .models import User
from django.http import HttpResponse

User = get_user_model()
JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'u_name', 'email', 'gender', 'birth_year')


class UserRegisterSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            u_name=validated_data['u_name'],
            user_id=validated_data['user_id'],
            password=validated_data['password'],
            email=validated_data['email'],
            gender=validated_data['gender'],
            birth_year=validated_data['birth_year'],
        )
        return user

    class Meta:
        model = User
        fields = '__all__'
        extra_kwards = {'password': {'write_only': True}}


class UserLoginSerializer(serializers.Serializer):
    user_id = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=256, write_only=True)

    def validate(self, data):
        user_id = data.get("user_id", None)
        password = data.get("password", None)

        user = authenticate(user_id=user_id, password=password)

        if user is None:
            return "None"

        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

pwd_regex = RegexValidator('^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$', 'only valid password is required')

class ChangePasswordSerializer(serializers.ModelSerializer):
    old_pwd = serializers.CharField(max_length=256, required=True, validators=[pwd_regex])
    new_pwd = serializers.CharField(max_length=256, required=True, validators=[pwd_regex], write_only=True)
    re_pwd = serializers.CharField(max_length=256, required=True, validators=[pwd_regex], write_only=True)

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
    pwd = serializers.CharField(max_length=256, required=True, validators=[pwd_regex], write_only=True)
    def update(self, instance, validated_data):
        
        instance.password = validated_data.get('password', instance.password)
        if not instance.check_password(validated_data['pwd']):
            raise serializers.ValidationError({'password':'Invalid password'})
        else:
            User.objects.filter(pk=instance.pk).update(is_active=False)
            return HttpResponse('logout')


           
    
    class Meta:
        model = User
        fields = ['pwd']