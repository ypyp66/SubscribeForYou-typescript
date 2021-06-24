# Generated by Django 3.2.4 on 2021-06-23 17:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=256, validators=[django.core.validators.RegexValidator(code='invalid_username', message='Username must be Alphanumeric', regex='[a-z0-9]+')], verbose_name='비밀번호'),
        ),
    ]