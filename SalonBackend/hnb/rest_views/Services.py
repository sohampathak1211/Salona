from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Service
from hnb.serializer import ServiceSerializer
import logging

logger = logging.getLogger(__name__)

class ServicesRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            logger.info('Getting all services')
            data = Service.objects.all()
            serializer = ServiceSerializer(data, many=True)
            logger.info('Services retrieved successfully')
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f'Error getting services: {str(e)}')
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        logger.info('Creating new service')
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            logger.info('Service created successfully')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f'Error creating service: {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            logger.info('Updating service')
            service_id = request.data.get('service_id')
            service = Service.objects.get(service_id=service_id)
            serializer = ServiceSerializer(service, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                logger.info('Service updated successfully')
                return Response(serializer.data, status=status.HTTP_200_OK)
            logger.error(f'Error updating service: {serializer.errors}')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Service.DoesNotExist:
            logger.error(f'Service not found: {service_id}')
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            logger.info('Deleting service')
            service_id = request.data.get('service_id')
            service = Service.objects.get(service_id=service_id)
            service.delete()
            logger.info('Service deleted successfully')
            return Response({"message": "Service successfully deleted"}, status=status.HTTP_200_OK)
        except Service.DoesNotExist:
            logger.error(f'Service not found: {service_id}')
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
