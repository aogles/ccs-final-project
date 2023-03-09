from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

# Create your models here.
# Custom user will inherti  all of the abstract user characteristics


class CustomUser(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    avatar = models.ImageField(upload_to='profile/')
    display_name = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username
