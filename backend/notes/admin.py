from django.contrib import admin

from django.contrib import admin
from .models import Note, Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(Note)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'parent', 'updated_at')
    list_filter = ('author', 'tags')
    search_fields = ('title', 'content')

