from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import SalonOwner
from hnb.serializer import SalonOwnerSerializer
from django.contrib.auth.hashers import make_password, check_password


class SalonOwnerRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            data = SalonOwner.objects.all()
            serializer = SalonOwnerSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        
    def signup(self, request):
        """Handle SalonOwner signup."""
        try:
            # Ensure the password is hashed before saving
            request.data['password'] = make_password(request.data.get('password'))
            serializer = SalonOwnerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "Sign-up successful", "data": serializer.data},
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def signin(self, request):
        """Handle SalonOwner sign-in."""
        try:
            email = request.data.get('email')
            password = request.data.get('password')

            if not email or not password:
                return Response(
                    {"error": "Email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the SalonOwner exists
            try:
                salon_owner = SalonOwner.objects.get(email=email)
            except SalonOwner.DoesNotExist:
                return Response(
                    {"error": "Salon Owner with this email does not exist"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Verify the password
            if not check_password(password, salon_owner.password):
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # On successful login, return user details (you could also return a token)
            serializer = SalonOwnerSerializer(salon_owner)
            return Response(
                {"message": "Sign-in successful", "data": serializer.data},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, *args, **kwargs):
        action = request.data.get('action')  # Determine whether it's sign-up or sign-in

        if action == "signup":
            return self.signup(request)
        elif action == "signin":
            return self.signin(request)
        else:
            return Response(
                {"error": "Invalid action. Use 'signup' or 'signin'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def patch(self, request, *args, **kwargs):
        try:
            owner_id = request.data.get('owner_id')
            salon_owner = SalonOwner.objects.get(owner_id=owner_id)
            serializer = SalonOwnerSerializer(salon_owner, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SalonOwner.DoesNotExist:
            return Response({"error": "Salon Owner not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            owner_id = request.data.get('owner_id')
            salon_owner = SalonOwner.objects.get(owner_id=owner_id)
            salon_owner.delete()
            return Response({"message": "Salon Owner successfully deleted"}, status=status.HTTP_200_OK)
        except SalonOwner.DoesNotExist:
            return Response({"error": "Salon Owner not found"}, status=status.HTTP_404_NOT_FOUND)
