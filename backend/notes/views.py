from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q, Count
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
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None
    
    def get_queryset(self):
        return Tag.objects.filter(created_by=self.request.user).annotate(
            note_count=Count('notes')
        ).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        name = request.data.get('name', '').strip().lower()
        if not name:
            return Response({"detail": "Name is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink']
        hash_value = 0
        for char in name:
            hash_value = (hash_value * 31 + ord(char)) & 0xFFFFFFFF
        color = colors[hash_value % len(colors)]

        existing_tag = Tag.objects.filter(name=name, created_by=request.user).first()
        
        if existing_tag:
            
            serializer = self.get_serializer(existing_tag)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        try:
            tag = Tag.objects.create(
                name=name,
                created_by=request.user,
                color=color
            )
            serializer = self.get_serializer(tag)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            
            return Response(
                {"detail": f"Error creating tag: {str(e)}"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class NoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        return NoteListSerializer if self.action == 'list' else NoteDetailSerializer

    def get_queryset(self):
        qs = Note.objects.filter(author=self.request.user).select_related('parent').prefetch_related('tags', 'children')
        q = self.request.query_params.get('q')
        tag_id = self.request.query_params.get('tag')
        
        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(content__icontains=q) | Q(tags__name__icontains=q)).distinct()
        if tag_id:
            qs = qs.filter(tags__id=tag_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        note = self.get_object()
        tag_id = request.data.get('tag_id')
        try:
            tag = Tag.objects.get(id=tag_id, created_by=request.user)
            note.tags.add(tag)
            return Response(self.get_serializer(note).data)
        except Tag.DoesNotExist:
            return Response(
                {'error': 'Tag not found or does not belong to you'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['delete'])
    def remove_tag(self, request, pk=None):
        note = self.get_object()
        tag_id = request.data.get('tag_id')
        try:
            tag = Tag.objects.get(id=tag_id, created_by=request.user)
            note.tags.remove(tag)
            return Response(self.get_serializer(note).data)
        except Tag.DoesNotExist:
            return Response(
                {'error': 'Tag not found or does not belong to you'}, 
                status=status.HTTP_404_NOT_FOUND
            )