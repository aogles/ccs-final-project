# Generated by Django 4.1.7 on 2023-03-11 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('convoys', '0002_rename_text_information_body_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='information',
            old_name='body',
            new_name='message',
        ),
    ]
