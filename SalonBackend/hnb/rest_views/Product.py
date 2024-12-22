# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# class ProductRest(APIView):
#     def get(self, request, *args, **kwargs):
#         print(request.cUser)
#         print(request.salon_id)
#         print(request.branch_id)
#         print(request.role)
#         print(request.is_owner)
#         return Response({"message": "GET method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
#     def post(self, request, *args, **kwargs):
#         data = request.data 
#         branch_id = data.get('branch_id')
        
#         # return Response({"message": "POST method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
     
#     def put(self, request, *args, **kwargs):
#         return Response({"message": "PUT method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
#     def delete(self, request, *args, **kwargs):
#         return Response({"message": "DELETE method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)   
    
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from hnb.models import Branch
from hnb.serializer import ProductSerializer

import logging

logger = logging.getLogger(__name__)

class ProductRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            branch_id = request.query_params.get('branch_id')

            if not branch_id:
                return Response(
                    {"error": "branch_id query parameter is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch products by branch_id
            products = Product.objects.filter(branch_id=branch_id)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error fetching products: {str(e)}")
            return Response({"error": "An error occurred while fetching products"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, *args, **kwargs):
        try:
            if not request.is_owner:
                return Response(
                    {"error": "You are not authorized to create products"},
                    status=status.HTTP_403_FORBIDDEN
                )

            branch_id = request.data.get("branch_id")
            if not branch_id:
                return Response(
                    {"error": "branch_id is required to create a product"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            branch = get_object_or_404(Branch, id=branch_id)

            # Create the product
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                product = serializer.save(branch=branch)
                return Response(
                    ProductSerializer(product).data,
                    status=status.HTTP_201_CREATED
                )

            logger.error(f"Product creation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Error creating product: {str(e)}")
            return Response({"error": "An error occurred while creating the product"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    