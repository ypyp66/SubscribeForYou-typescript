from django.db import models

class SubscribeDatas(models.Model):
    user_pk = models.ForeignKey('accounts.User', related_name='user', verbose_name='유저정보', on_delete=models.CASCADE)
    subs_pk = models.ForeignKey('SubscribeListData', related_name='subs', verbose_name='구독정보', on_delete=models.CASCADE)
    # category = models.CharField(max_length=256, verbose_name='분류', null=True)
    # title = models.CharField(max_length=256, verbose_name='구독서비스 명')
    price = models.IntegerField(verbose_name='가격')
    purchaseDay = models.IntegerField(verbose_name='결제일')
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='추가한 날짜')

    def __str__(self):
        return '<%d %s %s>' % (self.pk, self.title, self.userid)


class SubscribeListData(models.Model):
    category = models.CharField(max_length=256, verbose_name='분류')
    title = models.CharField(max_length=256, verbose_name='구독서비스명')