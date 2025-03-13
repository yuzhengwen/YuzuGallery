from django.shortcuts import render, redirect, get_object_or_404
from .forms import ImageForm
from .models import Image, Favourite, User
from .serializers import ImageSerializer, FavouriteSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

def upload(request):
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            upload = form.save(commit=False) # don't save the form to the database yet
            upload.user = request.user
            upload.save() 
            return redirect('gallery')  # Redirect to the gallery view after successful upload
        else:
            context = {'form': form}
            return render(request, 'upload.html', context)
    else:
        form = ImageForm()
    context = {'form': form}
    return render(request, 'upload.html', context)

def gallery(request):
    images = Image.objects.all()
    context = {'images': images}
    return render(request, 'gallery.html', context)

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = (AllowAny,)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            return [AllowAny()]
        return [IsAuthenticated()]

class FavouriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavouriteSerializer
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return Favourite.objects.filter(user=self.request.user)
    # Requires image id in the request data body
    def perform_create(self, serializer):
        image_id = self.request.data['image']
        image = get_object_or_404(Image, pk=image_id)
        if Favourite.objects.filter(user=self.request.user, image=image).exists():
            raise serializer.ValidationError({'message': 'Already in favorites'})
        serializer.save(user=self.request.user, image=image)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': response.data}, status=status.HTTP_201_CREATED)

class GetUserInfo(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    def get_object(self):
        return self.request.user