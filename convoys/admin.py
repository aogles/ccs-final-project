from django.contrib import admin
from .models import Convoy, ConvoyCategoryRecord, Navigation, Channel, Message
# from django_google_maps import widgets as map_widgets
# from django_google_maps import fields as map_fields


# class NavigationAdmin(admin.ModelAdmin):
#     formfield_overrides = {
#         map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
#     }

# Register your models here.

admin.site.register(Convoy)
admin.site.register(ConvoyCategoryRecord)


admin.site.register(Navigation)
admin.site.register(Channel)
admin.site.register(Message)
