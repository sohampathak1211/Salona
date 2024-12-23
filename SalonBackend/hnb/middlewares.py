from hnb.models import SalonOwner,SalonMaintainer,Salon,Branch
from django.http import HttpResponse
import jwt
from Salon.settings import SECRET_KEY
import logging
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
import json

logger = logging.getLogger(__name__)

from django.middleware.common import MiddlewareMixin

class ContentSecurityPolicyMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response['Content-Security-Policy'] = "default-src 'self'; connect-src 'self' http://127.0.0.1:8000"
        return response
class ChatUserEnabledMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        logger.info(f"Request path: {request.path}")
        
        if request.path.startswith('/admin'):
            logger.info("Request is for salon owner")
            return self.get_response(request)
        
        # path_pass = request.path.startswith('/hnb/salon_owner') or request.path.startswith('/hnb/salon_maintainer')
        # if path_pass and request.method == 'POST':
        #     has_action = None
        #     if request.method == 'POST':
        #         try:
        #             body_data = json.loads(request.body.decode('utf-8'))
        #             has_action = body_data.get('action', None)
        #         except json.JSONDecodeError:
        #             logger.warning("Invalid JSON in request body")
        #     if has_action is not None:
        #         logger.info("Request is for salon owner")
        #         return self.get_response(request)
        
        if request.path.startswith('/hnb/auth') and request.method == 'POST':
            return self.get_response(request)
        
        try:
            auth = request.headers.get('Authorization', None)
            if not auth:
                logger.error("Authorization header is missing")
                return JsonResponse({"error": "Authorization header is missing"}, status=status.HTTP_401_UNAUTHORIZED)
            
            token = auth.split(" ")[1]
            logger.info(f"Token: {token}")
            user = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            logger.info(f"Decoded user: {user}")
            
            salon_id = user.get('salon_id', None)
            branch_id = user.get('branch_id', None)
            if user:
                if user['role'] == 'SO':
                    try:
                        cUser = SalonOwner.objects.get(id=user['id'])
                        print("cUSer",cUser)
                        logger.info(f"User {user['id']} is enabled: {cUser.is_enabled}")
                        if not cUser.is_enabled:
                            logger.warning("User is not enabled")
                            return JsonResponse({"error": "You are not enabled. Contact admin of the software at 7887557175 or pathaksoham2003@gmail.com | Thanks for connecting with NEXORA CREATIONS |"}, 
                                                status=status.HTTP_401_UNAUTHORIZED)
                        request.cUser = cUser
                        request.salon_id = salon_id
                        request.branch_id = branch_id
                        request.role = user['role']
                        request.is_owner = user['role'] == 'SO'
                    except SalonOwner.DoesNotExist:
                        logger.error(f"User {user['id']} does not exist")
                        return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
                elif user['role'] == 'MT':
                    # Handling maintainer account 
                    try:
                        cUser = SalonMaintainer.objects.get(id=user['id'])
                        logger.info(f"User {user['id']} is enabled: {cUser.is_enabled}")
                        if not cUser.is_enabled:
                            logger.warning("User is not enabled")
                            return JsonResponse({"error": "You are not enabled. Contact admin of the software at 7887557175 or pathaksoham2003@gmail.com | Thanks for connecting with NEXORA CREATIONS |"}, 
                                                status=status.HTTP_401_UNAUTHORIZED)
                        salon = Branch.objects.get(id=branch_id)
                        request.cUser = cUser
                        request.salon_data = salon.id
                        request.branch_data = branch_id
                        request.role = user['role']
                        request.is_owner = user['role'] == 'SO'
                    except SalonOwner.DoesNotExist:
                        logger.error(f"User {user['id']} does not exist")
                        return JsonResponse({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
                    pass
            else:
                logger.error("No user found")
                return JsonResponse({"error": "No user found"}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(f"An error occurred: {e}")
            return JsonResponse({"error": "Token Expired! Login Again"}, status=status.HTTP_401_UNAUTHORIZED)

        response = self.get_response(request)
        logger.info("Response: {}".format(response))
        return response
