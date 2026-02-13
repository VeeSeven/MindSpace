#!/bin/bash
set -e


echo "Waiting for PostgreSQL..."
python manage.py wait_for_db

echo "Running migrations..."
python manage.py migrate --noinput


echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Checking superuser status..."
python manage.py shell -c "
import os
from django.contrib.auth import get_user_model

User = get_user_model()
username = os.getenv('DJANGO_SUPERUSER_USERNAME')
email = os.getenv('DJANGO_SUPERUSER_EMAIL')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD')

if username and password:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f'Successfully created superuser: {username}')
    else:
        print(f'Superuser \"{username}\" already exists. Skipping...')
else:
    print('Superuser variables missing in .env. Skipping creation.')
"

exec "$@"