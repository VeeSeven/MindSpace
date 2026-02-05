from rest_framework import serializers
from .models import Note, Tag
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, label="Confirm password", min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')
        extra_kwargs = {'email': {'required': False}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        email = data.get('email')
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class TagSerializer(serializers.ModelSerializer):
    note_count = serializers.IntegerField(read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = Tag
        fields = ('id', 'name', 'color', 'created_by', 'created_by_username', 'created_at', 'note_count')
        read_only_fields = ('created_by', 'created_at')
    
    def validate_name(self, value):
        
        return value.strip().lower()

class NoteListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ('id', 'title', 'slug', 'content', 'tags', 'parent', 'updated_at')

class NoteDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Tag.objects.none(),
        source='tags', 
        write_only=True, 
        required=False,
        allow_empty=True
    )
    children = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ('id', 'title', 'slug', 'content', 'parent', 'tags', 'tag_ids', 'children', 'created_at', 'updated_at')
        read_only_fields = ('slug', 'created_at', 'updated_at')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            self.fields['tag_ids'].queryset = Tag.objects.filter(created_by=request.user)

    def get_children(self, obj):
        return NoteListSerializer(obj.children.all(), many=True).data
    
    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        note = Note.objects.create(**validated_data)
        if tags_data:
            note.tags.set(tags_data)
        return note
    
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if 'tags' in self.context['request'].data:
            instance.tags.set(tags_data)
        return instance