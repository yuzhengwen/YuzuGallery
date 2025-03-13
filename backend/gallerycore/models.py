from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image as PILImage

from django.conf import settings
from azure.storage.blob import BlobServiceClient, ContentSettings
import io
from django.core.files.base import ContentFile
from django.dispatch import receiver
from django.db.models.signals import post_save
from easy_thumbnails.files import get_thumbnailer

# Create your models here.
class User(AbstractUser):
    pass

class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_file = models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    thumbnail_url = models.URLField(blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        thumbnailer = get_thumbnailer(self.image_file)
        thumbnail = thumbnailer.get_thumbnail({'size': (300, 300), 'crop': 'scale'})
        self.thumbnail_url = thumbnail.url
        super().save(update_fields=['thumbnail_url'])

    ''' Code to manually generate thumbnails and store them in Azure Blob Storage
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.create_thumbnail()
        super().save(update_fields=['thumbnail_file'])

    def create_thumbnail(self):
        if not self.image_file:
            return

        image = PILImage.open(self.image_file)
        image.thumbnail((300, 300))  

        thumb_io = io.BytesIO()
        image.save(thumb_io, format="WEBP", quality=80)
        thumb_io.seek(0)
        filename = f"thumbnails/thumb_{self.image_file.name.split('/')[-1].split('.')[0]}.webp"

        blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_CONNECTION_STRING)
        blob_client = blob_service_client.get_blob_client(container=settings.AZURE_CONTAINER, blob=filename)
        blob_client.upload_blob(
            thumb_io, 
            overwrite=True, 
            content_settings=ContentSettings(content_type="image/webp")
        )
        # set the thumbnail file to the URL of the blob storage obj
        self.thumbnail_file.name = filename
    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.delete_thumbnail()
    def delete_thumbnail(self):
        if not self.thumbnail_file:
            return
        thumbnail = self.thumbnail_file.split('/')[-1]
        blob_service_client = BlobServiceClient.from_connection_string(settings.AZURE_CONNECTION_STRING)
        blob_client = blob_service_client.get_blob_client(container=settings.AZURE_CONTAINER, blob=f"thumbnails/{thumbnail}")
        blob_client.delete_blob()
'''

class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    favorited_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'image']
