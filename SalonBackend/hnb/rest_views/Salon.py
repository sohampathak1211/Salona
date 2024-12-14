from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Salon
from hnb.serializer import SalonSerializer,SearchSalonSerializer
from django.db.models import Q, F, Max, Min, ExpressionWrapper, DecimalField

class SalonRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Fetch search query from query parameters
            search_query = request.query_params.get('search', '').strip()
            salon_id = request.query_params.get('salon_id')
            owner_id = request.query_params.get('owner_id')
            only_names_and_locations = request.GET.get('names_and_locations', 'false').lower() == 'true'
            
            if owner_id:
                salon = Salon.objects.filter(owner=owner_id).first()
                if salon:
                    return Response(SalonSerializer(salon).data,status=status.HTTP_200_OK)
                return Response({'error':'Salon not found'},status=status.HTTP_404_NOT_FOUND)
            # Fetch by salon_id if provided
            if salon_id:
                salon = Salon.objects.filter(id=salon_id).first()
                if not salon:
                    return Response({"error": "Salon not found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = SalonSerializer(salon)
                return Response(serializer.data, status=status.HTTP_200_OK)

            # Apply search filter if search_query exists
            if search_query:
                salons = Salon.objects.filter(
                    Q(name=search_query) | 
                    Q(address__icontains=search_query)  # Replace `location` with any other field you want to include
                )
            elif only_names_and_locations:
                salons = Salon.objects.values('name', 'address')
                print(salons)
                serializer = SearchSalonSerializer(salons,many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                salons = Salon.objects.all()

            serializer = SalonSerializer(salons, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
