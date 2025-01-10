import logging
logger = logging.getLogger(__name__)

class ChatView(APIView):
    def post(self, request):
        # Log request details
        logger.debug(f"Incoming request from IP: {request.META.get('REMOTE_ADDR')}")
        logger.debug(f"Request headers: {request.headers}")
        logger.debug(f"Origin: {request.headers.get('origin')}")
        # ... rest of your view code 