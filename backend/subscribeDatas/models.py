from django.db import models


# Create your models here.


class SubscribeDatas(models.Model):
    category = models.CharField(max_length=256, verbose_name='분류', null=True)
    title = models.CharField(max_length=256, verbose_name='구독서비스 명')
    price = models.IntegerField(verbose_name='가격')
    purchaseDay = models.IntegerField(verbose_name='결제일')
    userid = models.CharField(max_length=256, verbose_name='유저정보')
    created_date = models.DateTimeField(
        auto_now_add=True, verbose_name='추가한 날짜')

    def __str__(self):
        return '<%d %s %s>' % (self.pk, self.title, self.userid)
