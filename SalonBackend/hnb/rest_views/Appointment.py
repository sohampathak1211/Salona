from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Appointment
from hnb.serializer import AppointmentSerializer

class AppointmentRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            data = Appointment.objects.all()
            serializer = AppointmentSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            appointment_id = request.data.get('appointment_id')
            appointment = Appointment.objects.get(appointment_id=appointment_id)
            serializer = AppointmentSerializer(appointment, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            appointment_id = request.data.get('appointment_id')
            appointment = Appointment.objects.get(appointment_id=appointment_id)
            appointment.delete()
            return Response({"message": "Appointment successfully deleted"}, status=status.HTTP_200_OK)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
