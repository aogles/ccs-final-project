from django.urls import path
from .views import IndexView
from . import views

app_name = 'frontend'


urlpatterns = [
    path("", views.IndexView.as_view(), name='index'),
]
