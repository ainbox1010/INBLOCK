from .base import *

DEBUG = False
ALLOWED_HOSTS = ['api.inblock.ai']  # Update with your domain

# Database
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

# CORS
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'https://inblock.ai',  # Update with your frontend domain
]
CORS_ALLOW_CREDENTIALS = True

# Cache - Redis for production
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.getenv('REDIS_URL', 'redis://127.0.0.1:6379/1'),
    }
}

# Frontend URL
FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://inblock.ai') 