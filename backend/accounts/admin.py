from django.contrib import admin
from . import models

class UserAdmin(admin.ModelAdmin):
    list_display = ['pk', 'user_id', 'u_name']

admin.site.register(models.User, UserAdmin)