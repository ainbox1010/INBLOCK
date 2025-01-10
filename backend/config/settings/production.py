from .base import *
import os

DEBUG = False  # Production should never have debug enabled
ALLOWED_HOSTS = ['*']  # Update this with your Railway domain later
SECRET_KEY = os.getenv('SECRET_KEY')

# PostgreSQL Database
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

# CORS settings for Vercel frontend
CORS_ALLOW_ALL_ORIGINS = True  # Temporarily enable for debugging
CORS_ALLOWED_ORIGINS = [
    'https://inblock.vercel.app',
    'http://localhost:5173',
]
CORS_ALLOW_CREDENTIALS = True

# Debug info
import sys
print("Django settings loaded", file=sys.stderr)
print(f"DEBUG: {DEBUG}", file=sys.stderr)
print(f"BASE_DIR: {BASE_DIR}", file=sys.stderr)

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 