from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import SalonOwner,Salon
from hnb.serializer import SalonOwnerSerializer,SalonSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
import jwt 
from Salon.settings import SECRET_KEY,JWT_EXPIRY
import json
import logging

# Create a logger
logger = logging.getLogger(__name__)

class SalonOwnerRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            logger.info('Getting all salon owners')
            data = SalonOwner.objects.all()
            serializer = SalonOwnerSerializer(data, many=True)
            logger.info('Salon owners retrieved successfully')
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f'Error getting salon owners: {str(e)}')
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        
    def signup(self, request):
        """Handle SalonOwner signup."""
        try:
            logger.info('Signing up new salon owner')
            # Ensure the password is hashed before saving
            serializer = SalonOwnerSerializer(data=request.data)
            request.data['password'] = make_password(request.data.get('password'))
            if serializer.is_valid():
                owner = serializer.save()
                logger.info('Salon owner signed up successfully')
                print("Owner",owner)
                print(serializer.data)
                temp = serializer.data
                temp['password']=""
                payload = serializer.data
                salon_data = Salon.objects.filter(owner=payload['id'])
                salon_seri = SalonSerializer(salon_data,many=True)
                payload['exp'] = int(JWT_EXPIRY)
                payload['password'] = ''
                access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                
                return Response(
                    {"message": "Sign-up successful","token": access_token, "owner_data": temp, "salon_data":salon_seri.data},
                    status=status.HTTP_201_CREATED,
                )
            logger.error('Error signing up salon owner: invalid data')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'Error signing up salon owner: {str(e)}')
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def signin(self, request):
        """Handle SalonOwner sign-in."""
        try:
            logger.info('Signing in salon owner')
            email = request.data.get('email')
            password = request.data.get('password')

            if not email or not password:
                logger.error('Error signing in salon owner: email and password are required')
                return Response(
                    {"error": "Email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the SalonOwner exists
            try:
                salon_owner = SalonOwner.objects.get(email=email)
            except SalonOwner.DoesNotExist:
                logger.error('Error signing in salon owner: salon owner not found')
                return Response(
                    {"error": "Salon Owner with this email does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Verify the password
            if not check_password(password, salon_owner.password):
                logger.error('Error signing in salon owner: invalid credentials')
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # On successful login, return user details (you could also return a token)
            serializer = SalonOwnerSerializer(salon_owner)
            print(serializer.data)
            temp = serializer.data
            temp['password']=""
            payload = serializer.data
            salon_data = Salon.objects.filter(owner=payload['id'])
            salon_seri = SalonSerializer(salon_data,many=True)
            payload['salon_data'] = salon_seri.data
            payload['exp'] = int(JWT_EXPIRY)
            payload['password'] = ''
            access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            logger.info('Salon owner signed in successfully')
            return Response(
                {"message": "Sign-in successful","token": access_token, "owner_data": temp, "salon_data":salon_seri.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            logger.error(f'Error signing in salon owner: {str(e)}')
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, *args, **kwargs):
        logger.info('Handling post request')
        
        action = request.data.get('action')  # Determine whether it's sign-up or sign-in
        print(action)
        if action == "signup":
            return self.signup(request)
        elif action == "signin":
            return self.signin(request)
        else:
            logger.error('Error handling post request: invalid action')
            return Response(
                {"error": "Invalid action. Use 'signup' or 'signin'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def patch(self, request, *args, **kwargs):
        try:
            logger.info('Updating salon owner')
            owner_id = request.data.get('owner_id')
            salon_owner = SalonOwner.objects.get(owner_id=owner_id)
            serializer = SalonOwnerSerializer(salon_owner, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                logger.info('Salon owner updated successfully')
                return Response(serializer.data, status=status.HTTP_200_OK)
            logger.error('Error updating salon owner: invalid data')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SalonOwner.DoesNotExist:
            logger.error('Error updating salon owner: salon owner not found')
            return Response({"error": "Salon Owner not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            logger.info('Deleting salon owner')
            owner_id = request.data.get('owner_id')
            salon_owner = SalonOwner.objects.get(owner_id=owner_id)
            salon_owner.delete()
            logger.info('Salon owner deleted successfully')
            return Response({"message": "Salon Owner successfully deleted"}, status=status.HTTP_200_OK)
        except SalonOwner.DoesNotExist:
            logger.error('Error deleting salon owner: salon owner not found')
            return Response({"error": "Salon Owner not found"}, status=status.HTTP_404_NOT_FOUND)