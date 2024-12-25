
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from hnb.models import Branch,Product
from hnb.serializer import ProductSerializer

import logging

logger = logging.getLogger(__name__)

class ProductRest(APIView):
    def get(self, request, *args, **kwargs):
      try:
        # Debug request attributes
        print("is_owner:", getattr(request, "is_owner", None))
        print("cUserrrrrrrr:", getattr(request, "cUser", None))

        # Log full cUser data
        c_user = getattr(request, "cUser", None)
        if c_user:
            print("Full cUser data:", c_user)
            print("cUser ID: {c_user.get('id', 'N/A')}")
            print("cUser Name: {c_user.get('name', 'N/A')}")
            print("cUser Email: {c_user.get('email', 'N/A')}")
            print("cUser Branch IDs: {c_user.get('branch_id', 'N/A')}")
        
        # Check if the user is an owner and use request.branch_id
        if request.is_owner:
            branch_ids = getattr(request, "branch_id", None)
            print("branch_ids:", branch_ids)

            if not branch_ids:
                return Response(
                    {"error": "No branches found for the owner"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch products for all branches the owner manages
            products = Product.objects.filter(branch_id__in=branch_ids)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # For maintainers, use the existing logic
        branch_id = request.branch_id
        if not branch_id:
            return Response(
                {"error": "branch_id query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch products for the single branch ID
        products = Product.objects.filter(branch_id=branch_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

      except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        return Response(
            {"error": "An error occurred while fetching products"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
            
            
    def post(self, request, *args, **kwargs):
        try:
            if not request.is_owner:
                return Response(
                    {"error": "You are not authorized to create products"},
                    status=status.HTTP_403_FORBIDDEN
                )

            branch_id = request.data.get("branch")
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

    