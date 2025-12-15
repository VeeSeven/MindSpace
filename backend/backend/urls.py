from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from notes.views import RegisterAPIView
from notes.views import NoteViewSet, TagViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet, basename='notes')
router.register(r'tags', TagViewSet, basename='tags')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterAPIView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]