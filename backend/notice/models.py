from django.db import models

class Notice(models.Model):
    title = models.CharField(verbose_name='제목', max_length=255, null=False, blank=False)
    content = models.TextField(verbose_name='내용', null=False, blank=False)
    author = models.ForeignKey('accounts.User', db_column='user_pk', related_name='author', verbose_name='글쓴이', on_delete=models.CASCADE)
    created = models.DateTimeField(verbose_name='작성날짜', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='수정날짜',auto_now=True)

    def __str__(self):
        return self.title     