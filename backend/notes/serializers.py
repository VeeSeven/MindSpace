from rest_framework import serializers
from .models import Note, Tag
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True, label="Confirm password", min_length=6)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')
        extra_kwargs = {
            'email': {'required': False},  # set True if you want an email required
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        email = data.get('email', None)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        # keep default is_staff/is_superuser False -> regular user
        user.save()
        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')

class RecursiveNoteSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ('id','title','slug','content','parent','tags','children','created_at','updated_at')
        read_only_fields = ('slug','created_at','updated_at')

    def get_children(self, obj):
        qs = obj.children.all()
        return NoteListSerializer(qs, many=True).data

class NoteListSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ('id','title','slug','content','tags','parent','updated_at')

class NoteDetailSerializer(RecursiveNoteSerializer):
    tags = TagSerializer(many=True, read_only=True)