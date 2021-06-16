from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.


class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, name, userid, password, email, gender, birthYear):
        if not name:
            raise ValueError('must have name')
        if not userid:
            raise ValueError('must have userid')
        if not email:
            raise ValueError('must have email')
        if not password:
            raise ValueError('must have password')
        if not gender:
            raise ValueError('must have gender')
        if not birthYear:
            raise ValueError('must have birthYear')
        user = self.model(
            email=email,
            name=name,
            userid=userid,
            gender=gender,
            birthYear=birthYear,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, name, userid, email, gender, birthYear):
        user = self.create_user(
            email=email,
            name=name,
            userid=userid,
            gender=gender,
            birthYear=birthYear,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    userid = models.CharField(
        max_length=30, verbose_name='아이디', unique=True, blank=False)
    password = models.CharField(
        max_length=256, verbose_name='비밀번호', blank=False)
    name = models.CharField(
        max_length=20, verbose_name='이름', blank=False)
    email = models.EmailField(
        max_length=30, verbose_name='이메일', unique=True, null=False, blank=False)
    gender = models.CharField(
        max_length=10, verbose_name='성별', blank=False)
    birthYear = models.IntegerField(
        verbose_name='출생년도', default=1900, blank=False)
    created = models.DateTimeField(auto_now_add=True, verbose_name="생성시간")

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = ['name', 'password', 'email', 'gender', 'birthYear']
    USERNAME_FIELD = 'userid'

    def __str__(self):
        return self.userid
