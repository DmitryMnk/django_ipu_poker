# Generated by Django 5.0.5 on 2024-05-08 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_whitelistrow'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlackListRow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('col_1', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 1')),
                ('col_2', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 2')),
                ('col_3', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 3')),
                ('col_4', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 4')),
                ('col_5', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 5')),
                ('col_6', models.CharField(blank=True, max_length=100, null=True, verbose_name='Столбец 6')),
            ],
        ),
    ]