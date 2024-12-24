from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Combo
from hnb.serializer import ComboSerializer,GetSalonBranchComboSerializer

class ComboREST(APIView):
    def get(self, request, *args, **kwargs):
        try:
            search = request.query_params.get('search')
            combo_id = request.query_params.get('combo_id')
            branch_id = request.branch_id
            if request.is_owner:
                combos = Combo.objects.filter(branch_id__in=branch_id)
                return Response(GetSalonBranchComboSerializer(combos, many=True).data, status=status.HTTP_200_OK)
            combo = Combo.objects.filter(branch=branch_id)
            serializer = GetSalonBranchComboSerializer(combo,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
            if combo_id:
                combo = Combo.objects.get(id=combo_id)
                serializer = GetSalonBranchComboSerializer(combo,many=False)
                return Response(serializer.data,status=status.HTTP_200_OK)
            if branch_id:
                combo = Combo.objects.filter(branch=branch_id)
                serializer = GetSalonBranchComboSerializer(combo,many=True)
                return Response(serializer.data,status=status.HTTP_200_OK)
            data = Combo.objects.all()
            serializer = GetSalonBranchComboSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = ComboSerializer(data=request.data)
        if serializer.is_valid():
            combo = serializer.save()
            seri = GetSalonBranchComboSerializer(combo,many=False)
            return Response(seri.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            combo_id = request.data.get('combo_id')
            coupon = Combo.objects.get(id=combo_id)
            serializer = ComboSerializer(coupon, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Combo.DoesNotExist:
            return Response({"error": "Combo not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            combo_id = request.data.get('combo_id')
            coupon = Combo.objects.get(id=combo_id)
            coupon.delete()
            return Response({"message": "Combo successfully deleted"}, status=status.HTTP_200_OK)
        except Combo.DoesNotExist:
            return Response({"error": "Combo not found"}, status=status.HTTP_404_NOT_FOUND)
