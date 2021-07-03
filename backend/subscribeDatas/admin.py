from django.contrib import admin
from . import models


class SubscribeDataAdmin(admin.ModelAdmin):
    list_display = ['user_pk', 'subs_pk']


class SubscribeListDataAdmin(admin.ModelAdmin):
    list_display = ['category', 'title']


admin.site.register(models.SubscribeDatas, SubscribeDataAdmin)
admin.site.register(models.SubscribeListData, SubscribeListDataAdmin)