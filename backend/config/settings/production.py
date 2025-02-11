from .base import *
import os
from django.core.exceptions import ImproperlyConfigured
import logging

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
        'NAME': os.getenv('PGDATABASE', 'railway'),
        'USER': os.getenv('PGUSER', 'postgres'),
        'PASSWORD': os.getenv('PGPASSWORD'),
        'HOST': os.getenv('PGHOST', 'postgres.railway.internal'),  # Make sure this is correct
        'PORT': os.getenv('PGPORT', '5432'),
    }
}

# Temporarily allow all origins
CORS_ALLOW_ALL_ORIGINS = True

# Comment out specific origins for now
# CORS_ALLOWED_ORIGINS = [
#     'https://inblock.vercel.app',
#     'https://inblock.ai',
#     'http://localhost:5173'
# ]

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

# Redis Cache Configuration
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.getenv('REDIS_URL'),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "RETRY_ON_TIMEOUT": True,
        }
    }
}

# Use Redis for session backend
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Simple Redis connection check
if os.getenv('REDIS_URL'):
    logger.info("Redis URL configured successfully")
else:
    logger.warning("Redis URL not found in environment variables")

# Add Gunicorn timeout settings
GUNICORN_TIMEOUT = 120  # 2 minutes 

# Print debug info
print("Database settings:", file=sys.stderr)
print(f"HOST: {os.getenv('PGHOST')}", file=sys.stderr)
print(f"DB: {os.getenv('PGDATABASE')}", file=sys.stderr)
print(f"USER: {os.getenv('PGUSER')}", file=sys.stderr) 