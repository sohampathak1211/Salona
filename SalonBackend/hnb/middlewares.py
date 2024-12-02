from hnb.models import SalonOwner,SalonMaintainer
from django.http import HttpResponse
import jwt
from Salon.settings import SECRET_KEY
import logging
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

logger = logging.getLogger(__name__)

class ChatUserEnabledMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        logger.info(f"Request path: {request.path}")
        if request.path.startswith('/salon_owner'):
            logger.info("Request is for salon owner")
            return response
        try:
            auth = request.headers['Authorization']
            token = auth.split(" ")[1]
            logger.info(f"Token: {token}")
            user = jwt.decode(token, SECRET_KEY , algorithms=["HS256"])
            logger.info(f"Decoded user: {user}")
            if user:
                try:
                    cUser = SalonOwner.objects.get(id=user['id'])
                    logger.info(f"User {user['id']} is enabled: {cUser.is_enabled}")
                    if not cUser.is_enabled:
                        logger.warning("User is not enabled")
                        return JsonResponse({"error":"Contact admin of the software at 7887557175 or pathaksoham2003@gmail.com | Thanks for connecting with NEXORA CREATIONS |"}, status=status.HTTP_401_UNAUTHORIZED)
                    request.cUser = cUser
                except SalonOwner.DoesNotExist:
                    logger.error(f"User {user['id']} does not exist")
            else:
                logger.error("No user found")
        except Exception as e:
            logger.error(f"An error occurred: {e}")

        response = self.get_response(request)
        logger.info("Response: {}".format(response))
        return response
