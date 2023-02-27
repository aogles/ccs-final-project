from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
# Custom user will inherti  all of the abstract user characteristics


class CustomUser(AbstractUser):
    pass
