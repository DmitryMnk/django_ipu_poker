# Generated by Django 5.0.5 on 2024-05-08 08:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_blacklistrow'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BlackListHeaders',
        ),
        migrations.DeleteModel(
            name='BlackListRow',
        ),
        migrations.DeleteModel(
            name='WhiteListHeaders',
        ),
        migrations.DeleteModel(
            name='WhiteListRow',
        ),
    ]