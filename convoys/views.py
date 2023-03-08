from django.shortcuts import render
from .models import Channel, Message, Navigation, Information
from rest_framework import generics
from django.views.generic import ListView
from .serializers import ChannelSerializer, MessageSerializer, InformationSerializer, NavigationSerializer
from .permissions import IsAdminOrReadOnly, IsAuthOrAdmin

# Create your views here.


class ChannelListAPIView(generics.ListCreateAPIView):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer


class ChannelDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = ChannelSerializer


class MessageListAPIView(generics.ListCreateAPIView):
    # queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        channel = self.request.query_params.get('channel')
        return Message.objects.filter(channel=channel)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthOrAdmin,)


# class CategoryListAPIView(generics.ListCreateAPIView):

#     queryset = Category.objects.all()

#     serializer_class = CategorySerializer
#     permission_classes = (IsAdminOrReadOnly,)


class InformationListAPIView(generics.ListAPIView):
    serializer_class = InformationSerializer
    permission_classes = IsAdminOrReadOnly


class AdminInformationListAPIView(generics.ListCreateAPIView):
    queryset = Information.objects.all()
    serializer_class = InformationSerializer
    permission_classes = (IsAdminOrReadOnly,)


# class AdminDetailInformationListAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Information.objects.all()
#     serializer_class = InformationSerializer
#     permission_classes = (IsAdminOrReadOnly,)

class NavigationListAPIView(generics.ListAPIView):
    serializer_class = NavigationSerializer
    permission_classes = IsAuthOrAdmin
