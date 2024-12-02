from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import SalonOwner

class CustomJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            # Look for the custom claim (salon_owner_id) in the token
            salon_owner_id = validated_token.get('salon_owner_id', None)
            if salon_owner_id is None:
                raise AuthenticationFailed("Token does not contain valid user identification.")
            
            # Retrieve the user based on the custom salon_owner_id claim
            return SalonOwner.objects.get(id=salon_owner_id)
        except SalonOwner.DoesNotExist:
            raise AuthenticationFailed("User not found.")
        except Exception as e:
            raise AuthenticationFailed(f"Error retrieving user: {str(e)}")
