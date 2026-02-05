from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0003_remove_tag_unique_tag_per_user'),
    ]

    operations = [
        migrations.RunSQL(
            
            'ALTER TABLE notes_tag DROP CONSTRAINT IF EXISTS notes_tag_name_key;',
            
            reverse_sql='ALTER TABLE notes_tag ADD CONSTRAINT notes_tag_name_key UNIQUE (name);'
        ),
    ]