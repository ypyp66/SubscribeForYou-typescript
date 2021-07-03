from django.contrib import admin
from . import models


class SubscribeAdmin(admin.ModelAdmin):
    list_display = ['pk', 'i_name', 'user_pk']


class SubscribeIndexDataAdmin(admin.ModelAdmin):
    list_display = ['pk', 's_name']


admin.site.register(models.Subscribe, SubscribeAdmin)
admin.site.register(models.SubscribeIndex, SubscribeIndexDataAdmin)