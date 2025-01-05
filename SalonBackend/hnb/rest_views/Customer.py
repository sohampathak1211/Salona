from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Customer
from hnb.serializer import CustomerSerializer

class CustomerREST(APIView):
    def get(self, request, *args, **kwargs):
        try:
            print("I AM GETTING HIT")
            salon_id = request.salon_id
            data = Customer.objects.filter(salon_id=request.salon_id)
            serializer = CustomerSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            customer_id = request.data.get('customer_id')
            customer = Customer.objects.get(id=customer_id)
            serializer = CustomerSerializer(customer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            customer_id = request.data.get('customer_id')
            Customer = Customer.objects.get(customer_id=customer_id)
            Customer.delete()
            return Response({"message": "Customer successfully deleted"}, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)
