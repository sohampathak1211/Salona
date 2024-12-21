from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Branch
from hnb.serializer import BranchSerializer,SearchBranchSerializer,BranchNameIdSerializer
from django.db.models import Q, F, Max, Min, ExpressionWrapper, DecimalField

class BranchRest(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Fetch search query from query parameters
            search_query = request.query_params.get('search', '').strip()
            branch_id = request.query_params.get('branch_id')
            salon_id = request.salon_id
            is_owner = request.is_owner
            only_names_and_locations = request.GET.get('names_and_locations', 'false').lower() == 'true'
            print("Salonid   --->>>",salon_id)
            # Fetch by salon_id if provided           
            if is_owner and salon_id:
                branches = Branch.objects.filter(salon=salon_id)
                if not branches.exists():  # Check if the queryset is empty
                    return Response({"error": "No branch found for the provided salon and branch ID"}, status=status.HTTP_404_NOT_FOUND)
                return Response(BranchSerializer(branches, many=True).data, status=status.HTTP_200_OK)
            if branch_id:
                branch = Branch.objects.filter(id=branch_id).first()
                if not branch:
                    return Response({"error": "Branch not found"}, status=status.HTTP_404_NOT_FOUND)
                serializer = BranchSerializer(branch)
                return Response(serializer.data, status=status.HTTP_200_OK)

            # Apply search filter if search_query exists
            if search_query:
                branches = Branch.objects.filter(
                    Q(name=search_query) | 
                    Q(address__icontains=search_query)  # Replace `location` with any other field you want to include
                )
            elif only_names_and_locations:
                branches = Branch.objects.values('name', 'address')
                print(branches)
                serializer = SearchBranchSerializer(branches,many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                branches = Branch.objects.filter(salon=salon_id)

            serializer = BranchSerializer(branches, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request, *args, **kwargs):
        if not request.is_owner:
            return Response({"error": "Maintainer cannot create branches"}, status=status.HTTP_400_BAD_REQUEST)
        request.data['salon'] = request.salon_id
        print(request.salon_id)
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            branch_id = request.data.get('branch_id')
            branches = Branch.objects.get(id=branch_id)
            serializer = BranchSerializer(branches, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Branch.DoesNotExist:
            return Response({"error": "Branch not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            branch_id = request.data.get('branch_id')
            branch = Branch.objects.get(id=branch_id)
            branch.delete()
            return Response({"message": "Branch successfully deleted"}, status=status.HTTP_200_OK)
        except Branch.DoesNotExist:
            return Response({"error": "Branch not found"}, status=status.HTTP_404_NOT_FOUND)
