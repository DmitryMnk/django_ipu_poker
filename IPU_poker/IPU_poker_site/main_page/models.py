from django.db import models


class WhiteListHeaders(models.Model):
    name = models.CharField(max_length=25, verbose_name='Заголовок')
    number = models.IntegerField(unique=True, verbose_name='Номер')


class BlackListHeaders(models.Model):
    name = models.CharField(max_length=25, verbose_name='Заголовок')
    number = models.IntegerField(unique=True, verbose_name='Номер')


class WhiteListRow(models.Model):
    col_1 = models.CharField(max_length=100, verbose_name='Application', null=True, blank=True)
    col_2 = models.CharField(max_length=100, verbose_name='Club', null=True, blank=True)
    col_3 = models.CharField(max_length=100, verbose_name='Union', null=True, blank=True)


class BlackListRow(models.Model):
    col_1 = models.CharField(max_length=100, verbose_name='Application', null=True, blank=True)
    col_2 = models.CharField(max_length=100, verbose_name='Contact', null=True, blank=True)
    col_3 = models.CharField(max_length=100, verbose_name='Club', null=True, blank=True)
    col_4 = models.CharField(max_length=100, verbose_name='Union', null=True, blank=True)
    col_5 = models.CharField(max_length=100, verbose_name='Reason', null=True, blank=True)
    col_6 = models.CharField(max_length=100, verbose_name='Over Information', null=True, blank=True)
