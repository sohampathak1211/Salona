from django.views import View
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.utils.crypto import get_random_string
from .models import User,SalonOwner
import random
import json
from mailersend import emails
from hnb.util import send_otp
from rest_framework.decorators import api_view
from rest_framework.response import Response

API_KEY = "mlsn.520f24ab18eeca13c6d9c985be2347e1a1a3fd1814401868238590862bade9bb"
mailer = emails.NewEmail(API_KEY)

class SignupView(View):
    def post(self, request):
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')
        otp = random.randint(1000, 9999)
        hashed_password = make_password(password)
        
        user = User(
            name=name,
            email=email,
            phone=phone,
            otp=otp,
            is_user_agreement=True  # Assuming agreement checked on signup
        )
        user.password = hashed_password
        user.save()

        # Set up email details for OTP
        
        try:
            send_otp(user.email,user.otp)
            return JsonResponse({"message": "User registered successfully. Please verify OTP.", "otp": otp}, status=201)
        except Exception as e:
            return JsonResponse({"error": "Failed to send OTP email."}, status=500)

class SigninView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                if user.is_otp_verified:
                    return JsonResponse({"message": "Sign in successful."}, status=200)
                else:
                    return JsonResponse({"error": "OTP not verified."}, status=403)
            else:
                return JsonResponse({"error": "Invalid password."}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist."}, status=404)

class OtpVerificationView(View):
    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        otp = data.get('otp')
        
        try:
            user = User.objects.get(email=email)
            if user.otp == int(otp):
                user.is_otp_verified = True
                user.save()
                return JsonResponse({"message": "OTP verified successfully."}, status=200)
            else:
                return JsonResponse({"error": "Invalid OTP."}, status=400)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist."}, status=404)

class OtpResendView(View):
    def post(self, request):
        data = json.loads(request.body.decode("utf-8"))
        email = data.get('email')
        
        try:
            user = SalonOwner.objects.get(email=email)
            user.otp = random.randint(1000, 9999)  # Regenerate 4-digit OTP
            user.save()
            
            send_otp(user.email,user.otp)
            return JsonResponse({"message": "OTP resent successfully.", "otp": user.otp}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist."}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({"error": "Failed to resend OTP email."}, status=500)





#sms otp things

@api_view(['POST'])
def send_otp_phone(request):
    data = request.data
    
    if data.get('phone') is None:
        return Response({
            'status':400,
            'message':'Key phone is require'
        })
        
    if data.get('password') is None:
        return Response({
            'status':400,
            'message':'Key password is required'
        })    
        
