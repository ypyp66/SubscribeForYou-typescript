from datetime import datetime
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator


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
    def create_superuser(self, password, name, userid, email, gender, birthYear):
        user = self.create_user(
            email=email,
            name=name,
            userid=userid,
            gender=gender,
            birthYear=birthYear,
            password=password,
        )
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


userid_regex = RegexValidator('^[a-z]{1}[0-9a-z]+$', 'only valid userid is required')
pwd_regex = RegexValidator(
    '^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$', 'only valid password is required')
name_regex = RegexValidator('^[가-힣]+$', 'only valid name is required')


class User(AbstractBaseUser):
    userid = models.CharField(
        max_length=30, verbose_name='아이디', unique=True, blank=False, validators=[userid_regex])
    password = models.CharField(
        max_length=256, verbose_name='비밀번호', blank=False, null=False, validators=[pwd_regex])
    name = models.CharField(
        max_length=20, verbose_name='이름', blank=False, null=False, validators=[name_regex])
    email = models.EmailField(
        max_length=30, verbose_name='이메일', unique=True, null=False, blank=False)
    gender = models.CharField(
        max_length=10, verbose_name='성별', blank=False)
    birthYear = models.IntegerField(
        verbose_name='출생년도', null=False, blank=False, validators=[MinValueValidator(1900), MaxValueValidator(datetime.today().year)])
    created = models.DateTimeField(auto_now_add=True, verbose_name="생성시간")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    REQUIRED_FIELDS = ['name', 'password', 'email', 'gender', 'birthYear']
    USERNAME_FIELD = 'userid'

    def __str__(self):
        return self.userid

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
