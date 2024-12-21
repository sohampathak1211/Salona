from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import SalonMaintainer,Branch
from hnb.serializer import SalonMaintainerSerializer,BranchSerializer
from django.contrib.auth.hashers import make_password, check_password
import jwt 
from Salon.settings import SECRET_KEY,JWT_EXPIRY

class MaintainerRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            is_owner = request.is_owner
            if not is_owner:
                return Response({"error":"Only salon owner can get maintainer account"},status=status.HTTP_400_BAD_REQUEST)
            branch_ids = request.branch_id
            data = SalonMaintainer.objects.filter(branch_id__in=branch_ids)
            serializer = SalonMaintainerSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        
    def signin(self,request,*args,**kwargs):
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
                    status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Maintainer does not exist"}, status=status.HTTP_404_NOT_FOUND)
        except Exception:
            return Response({"error":"Error in the maintainer api"},status=status.HTTP_400_BAD_REQUEST)
            
    def post(self, request, *args, **kwargs):
        is_owner = request.is_owner
        if is_owner:
            pass
        action = request.data.get('action')
        email = request.data.get('email')
        if action == 'signin':
            return self.signin(request,*args,**kwargs)
        maintainer = SalonMaintainer.objects.filter(email=email)
        if maintainer.exists():
            return Response({"error": "Maintainer already exists"}, status=status.HTTP_400_BAD_REQUEST)
        request.data['password'] = make_password(request.data.get('password'))
        serializer = SalonMaintainerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            payload = serializer.data
            payload['exp'] = int(JWT_EXPIRY)
            access_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            return Response(
                    {"message": "Maintainer Sign-up successful", "token": access_token, "data": serializer.data},
                    status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            service_id = request.data.get('service_id')
            service = SalonMaintainer.objects.get(service_id=service_id)
            serializer = SalonMaintainerSerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except SalonMaintainer.DoesNotExist:
            return Response({"error": "Maintainer not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            maintainer_id = request.data.get('maintainer_id')
            maintainer = SalonMaintainer.objects.get(id=maintainer_id)
            maintainer.delete()
            return Response({"message": "Maintainer successfully deleted"}, status=status.HTTP_200_OK)
        except SalonMaintainer.DoesNotExist:
            return Response({"error": "Maintainer not found"}, status=status.HTTP_404_NOT_FOUND)
