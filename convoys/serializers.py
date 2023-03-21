from .models import Navigation, Channel, Message, Convoy, ConvoyCategoryRecord
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

    def get_role(self, obj):
        if self.context.get('request').user == obj.user:
            return 'user'
        elif self.context.get('request').user.is_superuser:
            return 'admin'
        else:
            return None

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'


class ConvoyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Convoy
        fields = '__all__'


class ConvoyCategoryRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConvoyCategoryRecord
        fields = '__all__'


class ConvoyDetailSerializer(serializers.ModelSerializer):
    # records = ConvoyCategoryRecordSerializer(read_only=True, many=True)

    class Meta:
        model = Convoy
        fields = '__all__'

    #     category = models.CharField(
    #         max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    # convoy = models.ForeignKey(
    #     Convoy, on_delete=models.CASCADE, blank=True, null=True)
    # title = models.CharField(max_length=255)
    # message = models.TextField()
    # image = models.ImageField(upload_to='images/', blank=True, null=True)

    # def get_role(self, obj):
    #     if self.context.get('request').user == obj.user:
    #         return 'user'
    #     elif self.context.get('request').user.is_superuser:
    #         return 'admin'
    #     else:
    #         return None


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
