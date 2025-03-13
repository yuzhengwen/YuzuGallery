from rest_framework import serializers
from .models import Image, User, Favourite

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
        read_only_fields = ['user', 'thumbnail_url']

class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'
        read_only_fields = ['user', 'image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Ensure passwords are hashed before saving
        user = User.objects.create_user(**validated_data)
        return user