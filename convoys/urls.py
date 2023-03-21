from django.urls import path, include

# AdminDetailInformationListAPIView
from .views import MessageListAPIView, ChannelListAPIView, ConvoyDetailAPIView, ConvoyListAPIView, ConvoyCategoryRecordAPIView, ConvoyCategoryRecordDetailAPIView
from .views import MessageDetailAPIView, ChannelDetailAPIView


urlpatterns = [

    # This endpoint is used for retrieving, updating or deleting a specific message by its primary key pk.
    # The HTTP methods that are allowed on this endpoint are GET, PUT, PATCH and DELETE.
    path('messages/<int:pk>/', MessageDetailAPIView.as_view()),
    # this endpoint is used for creating a new message or retrieving a list of messages.
    #  The HTTP methods that are allowed on this endpoint are GET and POST.
    path('messages/', MessageListAPIView.as_view()),
    # used for retrieving, updating or deleting a specific channel by its primary key pk.
    # The HTTP methods that are allowed on this endpoint are GET, PUT, PATCH and DELETE.
    path('channels/<int:pk>/', ChannelDetailAPIView.as_view()),
    # This endpoint is used for creating a new channel or retrieving a list of channels.
    # The HTTP methods that are allowed on this endpoint are GET and POST.
    path('channels/', ChannelListAPIView.as_view()),
    # path('notes/', InformationListAPIView.as_view()),
    # path('notes/<int:pk>/', AdminInformationDetailAPIView.as_view()),

    path('convoys/records/', ConvoyCategoryRecordAPIView.as_view()),
    path('convoys/records/<int:pk>/', ConvoyCategoryRecordDetailAPIView.as_view()),
    path('convoys/<int:pk>/', ConvoyDetailAPIView.as_view()),
    path('convoys/', ConvoyListAPIView.as_view()),

    # Add a url path for updating your convoys
]
