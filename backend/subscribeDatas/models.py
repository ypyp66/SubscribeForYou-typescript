from django.db import models

class Subscribe(models.Model):
    user_pk = models.ForeignKey('accounts.User', db_column='user_pk', related_name='user', verbose_name='유저정보', on_delete=models.CASCADE)
    price = models.IntegerField(verbose_name='가격')
    purchase_day = models.IntegerField(verbose_name='결제일')
    i_name = models.CharField(max_length=256, verbose_name='구독서비스명')

    def __str__(self):
        return self.i_name


class SubscribeIndex(models.Model):
    s_name = models.CharField(max_length=256, verbose_name='구독서비스명')

    def __str__(self):
        return self.s_name