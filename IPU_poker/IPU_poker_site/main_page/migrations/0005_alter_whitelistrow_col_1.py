# Generated by Django 5.0.5 on 2024-05-08 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0004_blacklistrow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='whitelistrow',
            name='col_1',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Application'),
        ),
    ]