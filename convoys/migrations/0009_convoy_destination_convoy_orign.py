# Generated by Django 4.1.7 on 2023-03-23 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('convoys', '0008_alter_convoycategoryrecord_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='convoy',
            name='destination',
            field=models.CharField(default='some text', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='convoy',
            name='orign',
            field=models.CharField(default='some text', max_length=255),
            preserve_default=False,
        ),
    ]
