from django.shortcuts import render
from .models import Channel, Message, Navigation, Convoy, ConvoyCategoryRecord
from rest_framework import generics
from django.views.generic import ListView
from .serializers import ChannelSerializer, MessageSerializer, NavigationSerializer, ConvoyListSerializer, ConvoyDetailSerializer, ConvoyCategoryRecordSerializer
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


# class InformationListAPIView(generics.ListCreateAPIView):
#     queryset = Information.objects.all()
#     serializer_class = InformationSerializer
#     permission_classes = (IsAuthOrAdmin,)

#     def get_queryset(self):
#         category = self.request.query_params.get('category')
#         return Information.objects.filter(category=category)


# class AdminInformationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Information.objects.all()
#     serializer_class = InformationSerializer
#     permission_classes = (IsAdminOrReadOnly,)

    # def get_queryset(self):
    #     category = self.request.query_params.get('category')
    #     return Information.objects.filter(category=category)


# class AdminDetailInformationListAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Information.objects.all()
#     serializer_class = InformationSerializer
#     permission_classes = (IsAdminOrReadOnly,)

class NavigationListAPIView(generics.ListAPIView):
    serializer_class = NavigationSerializer
    permission_classes = (IsAuthOrAdmin,)


class ConvoyListAPIView(generics.ListCreateAPIView):
    queryset = Convoy.objects.all()
    serializer_class = ConvoyListSerializer

    def get_queryset(self):
        queryset = Convoy.objects.all()
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active)
        return queryset


class ConvoyDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Convoy.objects.all()
    serializer_class = ConvoyDetailSerializer

    def perform_update(self, serializer):
        pass

    def perform_destroy(self, serializer):
        pass


class ConvoyCategoryRecordAPIView(generics.ListCreateAPIView):
    queryset = ConvoyCategoryRecord.objects.all()
    serializer_class = ConvoyCategoryRecordSerializer

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        convoy = self.request.query_params.get('convoy')
        return ConvoyCategoryRecord.objects.filter(convoy=convoy)


class ConvoyCategoryRecordDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConvoyCategoryRecord.objects.all()
    serializer_class = ConvoyCategoryRecordSerializer
    permission_classes = (IsAuthOrAdmin,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
