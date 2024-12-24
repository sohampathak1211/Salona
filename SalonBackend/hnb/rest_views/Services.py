from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Service
from hnb.serializer import ServiceSerializer,ServiceBranchIdSerilaizer
import logging

logger = logging.getLogger(__name__)

class ServicesRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            service_id = request.query_params.get('service_id')
            branch_id = request.branch_id
            print(branch_id)
            
            if request.is_owner:
                services = Service.objects.filter(branch_id__in=branch_id)
                return Response(ServiceBranchIdSerilaizer(services, many=True).data, status=status.HTTP_200_OK)
            service = Service.objects.filter(branch=branch_id)
            serializer = ServiceBranchIdSerilaizer(service,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
            
            print("service_id",service_id)
            print("branch_id",branch_id)
            if service_id:
                service = Service.objects.filter(id=service_id,branch=branch_id)
                serializer = ServiceSerializer(service,many=False)
                return Response(serializer.data,status=status.HTTP_200_OK)
            if branch_id:
                service = Service.objects.filter(branch=branch_id)
                serializer = ServiceSerializer(service,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            logger.info('Getting all services')
            data = Service.objects.filter(branch=branch_id)
            serializer = ServiceSerializer(data, many=True)
            logger.info('Services retrieved successfully')
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f'Error getting services: {str(e)}')
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        logger.info('Creating new service')
        print(request.data)
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            service = serializer.save()
            service_data = ServiceBranchIdSerilaizer(service).data
            logger.info('Service created successfully')
            return Response(service_data, status=status.HTTP_201_CREATED)
        logger.error(f'Error creating service: {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            logger.info('Updating service')
            service_id = request.data.get('service_id')
            service = Service.objects.get(id=service_id)
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
            service = Service.objects.get(id=service_id)
            service.delete()
            logger.info('Service deleted successfully')
            return Response({"message": "Service successfully deleted"}, status=status.HTTP_200_OK)
        except Service.DoesNotExist:
            logger.error(f'Service not found: {service_id}')
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)
