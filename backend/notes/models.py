from django.conf import settings
from django.db import models
from django.utils.text import slugify

User = settings.AUTH_USER_MODEL


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Note(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=300, blank=True, db_index=True)
    content = models.TextField(blank=True)
    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='children'
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:240]
            
            timestamp = int(self.created_at.timestamp()) if self.created_at else ''
            self.slug = f"{base}-{self.author_id}-{timestamp}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
