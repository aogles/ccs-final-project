from django.db import models
from django.conf import settings
from django_google_maps import fields as map_fields

# Create your models here.


class Navigation(models.Model):
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)


class Channel(models.Model):
    title = models.CharField(max_length=300)

    def __str__(self):
        return self.title


class Message(models.Model):
    text = models.TextField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.text[:100]


class Information(models.Model):
    OPTION_A = 'safety'
    OPTION_B = 'vehicle-info'
    OPTION_C = 'convoy-checklist'

    CATEGORY_CHOICES = [
        (OPTION_A, 'safety'),
        (OPTION_B, 'vehicle-info'),
        (OPTION_C, 'convoy-checklist'),
    ]
    category = models.CharField(
        max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.title[:50]
