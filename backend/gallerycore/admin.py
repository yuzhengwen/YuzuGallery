from django.contrib import admin
from .models import User, Image, Favourite

# Register your models here.

admin.site.register(User)
admin.site.register(Image)
admin.site.register(Favourite)
