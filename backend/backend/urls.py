"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from gallerycore.views import upload, gallery, ImageViewSet, FavouriteViewSet, RegisterView, GetUserInfo
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('upload/', upload, name='upload'),
    path('', gallery, name='gallery'),
    path('obtain-token/', views.obtain_auth_token),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', GetUserInfo.as_view(), name='user'),
]

router = DefaultRouter()
router.register(r'api/gallery', ImageViewSet, basename='image')
router.register(r'api/favourites', FavouriteViewSet, basename='favourite')
urlpatterns += router.urls