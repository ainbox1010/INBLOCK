from .base import *
import os
from django.core.exceptions import ImproperlyConfigured

# Temporarily enable debug for troubleshooting
DEBUG = True

# Allow all hosts temporarily
ALLOWED_HOSTS = ['*']

# Make sure static files are configured
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

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
CORS_ALLOW_ALL_ORIGINS = True  # Keep for now while testing
CORS_ALLOWED_ORIGINS = [
    'https://inblock.vercel.app',
    'http://localhost:5173'  # Keep for local development
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

# Debug Redis connection (safely)
redis_url = os.getenv("REDIS_URL")
print("Redis Debug:", file=sys.stderr)
print(f"Redis URL present: {redis_url is not None}", file=sys.stderr)
print(f"Environment variables: {list(os.environ.keys())}", file=sys.stderr)

# Redis Cache Configuration for production only
if not redis_url:
    raise ImproperlyConfigured(
        "REDIS_URL environment variable is required in production. "
        "Check Railway configuration."
    )

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": redis_url,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "RETRY_ON_TIMEOUT": True,
            "MAX_CONNECTIONS": 50,
        }
    }
}

# Use Redis for session backend in production
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default' 