from django.urls import include, path
app_name = "api_v1"

urlpatterns = [
    path('', include('accounts.urls',)),
    path('', include('convoys.urls')),
]
