from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Service
from hnb.serializer import ServiceSerializer

class ServicesRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            data = Service.objects.all()
            serializer = ServiceSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            service_id = request.data.get('service_id')
            service = Service.objects.get(service_id=service_id)
            serializer = ServiceSerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            service_id = request.data.get('service_id')
            service = Service.objects.get(service_id=service_id)
            service.delete()
            return Response({"message": "Service successfully deleted"}, status=status.HTTP_200_OK)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
