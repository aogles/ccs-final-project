from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework.authtoken.models import Token
# from dj_rest_auth.models import TokenModel
from dj_rest_auth.serializers import TokenSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source="user.email")

    class Meta:
        model = Profile
        fields = '__all__'


class customTokenSerializer(TokenSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + ('username',)


class CustomRegisterSerializer(RegisterSerializer):
    def get_token(self, user):
        token, _ = Token.objects.get_or_create(user=user)
        return token.key
