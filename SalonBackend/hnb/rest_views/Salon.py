from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Salon
from hnb.serializer import SalonSerializer

class SalonRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            salon_id=request.query_params.get('salon_id') 
            if salon_id:
                salon = Salon.objects.filter(id==salon_id)
                seri = SalonSerializer(salon,many=False)
                print("HIT",salon)
                return Response(seri.data,status=status.HTTP_200_OK)
            data = Salon.objects.all()
            serializer = SalonSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = SalonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            salon_id = request.data.get('salon_id')
            salon = Salon.objects.get(salon_id=salon_id)
            serializer = SalonSerializer(salon, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Salon.DoesNotExist:
            return Response({"error": "Salon not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            salon_id = request.data.get('salon_id')
            salon = Salon.objects.get(salon_id=salon_id)
            salon.delete()
            return Response({"message": "Salon successfully deleted"}, status=status.HTTP_200_OK)
        except Salon.DoesNotExist:
            return Response({"error": "Salon not found"}, status=status.HTTP_404_NOT_FOUND)
