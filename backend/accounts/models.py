from datetime import datetime
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  

class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, u_name, user_id, password, email, gender, birth_year):
        if not u_name:
            raise ValueError('must have u_name')
        if not user_id:
            raise ValueError('must have user_id')
        if not email:
            raise ValueError('must have email')
        if not password:
            raise ValueError('must have password')
        if not gender:
            raise ValueError('must have gender')
        if not birth_year:
            raise ValueError('must have birth_year')
        user = self.model(
            email=email,
            u_name=u_name,
            user_id=user_id,
            gender=gender,
            birth_year=birth_year,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, password, u_name, user_id, email, gender, birth_year):
        user = self.create_user(
            email=email,
            u_name=u_name,
            user_id=user_id,
            gender=gender,
            birth_year=birth_year,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


# 정규표현식
userid_regex = RegexValidator('^[a-z]{1}[0-9a-z]+$', 'only valid userid is required')
pwd_regex = RegexValidator(
    '^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$', 'only valid password is required')
name_regex = RegexValidator('^[가-힣]+$', 'only valid name is required')


# 유저 모델
class User(AbstractBaseUser):
    user_id = models.CharField(
        max_length=30, verbose_name='아이디', unique=True, blank=False, validators=[userid_regex])
    password = models.CharField(
        max_length=256, verbose_name='비밀번호', blank=False, null=False, validators=[pwd_regex])
    u_name = models.CharField(
        max_length=20, verbose_name='이름', blank=False, null=False, validators=[name_regex])
    email = models.EmailField(
        max_length=30, verbose_name='이메일', unique=True, null=False, blank=False)
    gender = models.CharField(
        max_length=10, verbose_name='성별', blank=False)
    birth_year = models.IntegerField(
        verbose_name='출생년도', null=False, blank=False, validators=[MinValueValidator(1900), MaxValueValidator(datetime.today().year)])
    created = models.DateTimeField(auto_now_add=True, verbose_name="생성시간")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = ['u_name', 'password', 'email', 'gender', 'birth_year']
    USERNAME_FIELD = 'user_id'

    def __str__(self):
        return self.user_id

    def get_full_name(self):
        pass

    def get_short_name(self):
        pass

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    @is_staff.setter
    def is_staff(self, value):
        self._is_staff = value


# 비밀번호 재설정
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    print('token---------------------->>>> ', reset_password_token.key)
    email_content = "비밀번호 까먹었니 밥우야! 아래 링크로 접속해서 비밀번호 재설정하렴\n\n{}?token={}".format('http://101.101.217.185/resetpwd', reset_password_token.key)

    
    send_mail(
        # title:
        "Password Reset for {title}".format(title="서비스명"),
        # message:
        email_content,
        # from:
        "nosenada9846@gmail.com",
        # to:
        [reset_password_token.user.email]
    )