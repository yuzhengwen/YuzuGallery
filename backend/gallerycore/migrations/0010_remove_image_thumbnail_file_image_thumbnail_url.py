# Generated by Django 5.1.7 on 2025-03-11 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallerycore', '0009_alter_image_image_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='thumbnail_file',
        ),
        migrations.AddField(
            model_name='image',
            name='thumbnail_url',
            field=models.URLField(blank=True),
        ),
    ]
