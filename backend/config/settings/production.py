from .base import *
import os

DEBUG = True  # Temporarily enable debug
ALLOWED_HOSTS = ['*']
SECRET_KEY = os.getenv('SECRET_KEY')

# Simplified database for testing
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('PGDATABASE'),
        'USER': os.getenv('PGUSER'),
        'PASSWORD': os.getenv('PGPASSWORD'),
        'HOST': os.getenv('PGHOST'),
        'PORT': os.getenv('PGPORT'),
    }
}

# Basic CORS for testing
CORS_ALLOW_ALL_ORIGINS = False  # More secure
CORS_ALLOWED_ORIGINS = [
    'https://inblock.vercel.app',  # Your Vercel domain
]
CORS_ALLOW_CREDENTIALS = True

# Print debug info
import sys
print("Django settings loaded", file=sys.stderr)
print(f"DEBUG: {DEBUG}", file=sys.stderr)
print(f"BASE_DIR: {BASE_DIR}", file=sys.stderr)

# Add static files config
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 