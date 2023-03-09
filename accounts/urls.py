from django.urls import path
from .views import ProfileCreateAPIView

app_name = 'accounts'

urlpatterns = [
    path('profiles/', ProfileCreateAPIView.as_view(), name="profile_add"),

]
