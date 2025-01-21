"""
WSGI config for backend project.
"""
import os
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))

# Set Django settings module based on environment
if os.getenv('RAILWAY_ENVIRONMENT'):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings.production'
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
