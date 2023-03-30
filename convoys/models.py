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


class Convoy(models.Model):
    text = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.text


class ConvoyCategoryRecord(models.Model):
    OPTION_A = 'Safety'
    OPTION_B = 'Vehicle Info'
    OPTION_C = 'Convoy Checklist'

    CATEGORY_CHOICES = [
        (OPTION_A, 'Safety'),
        (OPTION_B, 'Vehicle Info'),
        (OPTION_C, 'Convoy Checklist'),
    ]

    category = models.CharField(
        max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, blank=True, null=True)
    convoy = models.ForeignKey(
        Convoy, on_delete=models.CASCADE, blank=True, null=True, related_name="records")
    title = models.CharField(max_length=255)
    message = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.title[:50]
