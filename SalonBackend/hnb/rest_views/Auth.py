import jwt
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Salon.settings import SECRET_KEY,JWT_EXPIRY
from hnb.models import SalonOwner, SalonMaintainer, Branch
import logging
from django.contrib.auth.hashers import make_password, check_password
from hnb.serializer import SalonOwnerSerializer,SalonSerializer,BranchSerializer,SalonMaintainerSerializer,SalonIdSerializer,BranchIdSerializer
from hnb.models import SalonOwner,Salon,Branch

logger = logging.getLogger(__name__)

@api_view(['POST'])
def salon_owner_signup(request):
    try:
        logger.info('Signing up new salon owner')
        # Ensure the password is hashed before saving
        serializer = SalonOwnerSerializer(data=request.data)
        
        request.data['password'] = make_password(request.data.get('password'))
        if serializer.is_valid():
            owner = serializer.save()
            logger.info('Salon owner signed up successfully')
            print("Owner",owner)
            salon = Salon.objects.filter(owner=serializer.data['id'])
            seri_salo = SalonIdSerializer(salon)
            print(seri_salo.data)
            if id not in seri_salo.data:
                salon_id = -1
            else:
                salon_id = seri_salo.data['id']
            print(serializer.data)
            payload = serializer.data
            payload['role'] = "SO"
            payload['exp'] = int(JWT_EXPIRY)
            payload['salon_id'] = salon_id
            payload['password'] = ''
            access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            
            return Response(
                {"message": "Sign-up successful","token": access_token, "cUser": payload},
                status=status.HTTP_201_CREATED,
            )
        logger.error('Error signing up salon owner: invalid data')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def salon_owner_signin(request):
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
        # Roles are SO for the Salon Owner , STY for the Stylist , MT for the maintainer 
        serializer = SalonOwnerSerializer(salon_owner)
        salon = Salon.objects.filter(owner=serializer.data['id'])
        seri_salo = SalonIdSerializer(salon,many=True)
        salon_id = -1
        if len(seri_salo.data)>0:
            salon_id = seri_salo.data[0]['id']
        print(salon_id)
        branch_id = Branch.objects.filter(salon=salon_id)
        seri_branch = BranchIdSerializer(branch_id,many=True)
        branches = [branch['id'] for branch in seri_branch.data]
        print(branches)
        payload = serializer.data
        payload['role'] = "SO"
        payload['exp'] = int(JWT_EXPIRY)
        payload['salon_id'] = salon_id
        payload['branch_id'] = branches
        payload['password'] = ''
        access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        logger.info('Salon owner signed in successfully')
        return Response(
            {"message": "Sign-in successful","token": access_token, "cUser": payload},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def salon_maintainer_signin(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = SalonMaintainer.objects.get(email=email)
            serializer = SalonMaintainerSerializer(user,many=False)
        except SalonMaintainer.DoesNotExist:
            return Response(
                {"error": "Maintainer with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        if user:
            if not check_password(password,serializer.data['password']):
                return Response({"error": "Invalid Password"}, status=status.HTTP_404_NOT_FOUND)
            else:
                payload = serializer.data
                payload['role'] = 'MT'
                branch = Branch.objects.get(id=serializer.data['branch'])
                seri_branch = BranchSerializer(branch,many=False)
                payload['role'] = "MT"
                payload['branch_id'] = serializer.data['branch']
                payload['salon_id'] = seri_branch.data['salon']
                payload['password'] = ''
                payload['exp'] = int(JWT_EXPIRY)
                access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                return Response(
                {"message": "Maintainer Sign-in successful", "token": access_token, "cUser": payload},
                status=status.HTTP_200_OK)
        else:
            return Response({"message": "Maintainer does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return Response({"error":"Error in the maintainer api"},status=status.HTTP_400_BAD_REQUEST)