from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Note, Tag
from .serializers import NoteListSerializer, NoteDetailSerializer, TagSerializer, RegisterSerializer


class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]  

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            data = {
                "id": user.id,
                "username": user.username,
                "email": getattr(user, "email", "")
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.select_related('author', 'parent').prefetch_related('tags', 'children').all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list':
            return NoteListSerializer
        return NoteDetailSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset().filter(author=self.request.user)
        q = self.request.query_params.get('q')
        if q:
            qs = qs.filter(
                Q(title__icontains=q) |
                Q(content__icontains=q) |
                Q(tags__name__icontains=q)
            ).distinct()
        return qs
