from .models import Navigation, Channel, Message, Information
from rest_framework import serializers


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    role = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = '__all__'

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'


class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = '__all__'


class NavigationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Navigation
        fields = '__all__'

# this will apply  to permissions once set up
#   def get_role(self, obj):
#         if self.context.get('request').user == obj.user:
#             return 'user'
#         elif self.context.get('request').user.is_superuser:
#             return 'admin'
#         else:
#             return None
