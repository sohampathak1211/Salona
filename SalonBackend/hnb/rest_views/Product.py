from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProductRest(APIView):
    def get(self, request, *args, **kwargs):
        print(request.cUser)
        print(request.salon_id)
        print(request.branch_id)
        print(request.role)
        print(request.is_owner)
        return Response({"message": "GET method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
    def post(self, request, *args, **kwargs):
        return Response({"message": "POST method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def put(self, request, *args, **kwargs):
        return Response({"message": "PUT method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def delete(self, request, *args, **kwargs):
        return Response({"message": "DELETE method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)   
    
    