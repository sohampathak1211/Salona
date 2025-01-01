from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hnb.models import Coupon
from hnb.serializer import CouponSerializer,CouponComboServiceSerializer,CouponAllSerializer

class CouponREST(APIView):
    def get(self, request, *args, **kwargs):
        try:
            is_owner = request.is_owner
            branch_id = request.branch_id
            if is_owner:
                coupons = Coupon.objects.filter(branch__in=branch_id)
                seri = CouponComboServiceSerializer(coupons, many=True)
                return Response(seri.data, status=status.HTTP_200_OK)
            data = Coupon.objects.all()
            serializer = CouponComboServiceSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        is_owner = request.is_owner
        branch_id = request.data.get("branch")
        if not is_owner:
            return Response({"error": "You are not authorized to create a coupon"}, status=status.HTTP_400_BAD_REQUEST)
        if request.data.get('code'):
            data = Coupon.objects.filter(code=request.data.get('code'),branch=branch_id).first()
            if data:
                return Response({"error": "Coupon with this code already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CouponAllSerializer(data=request.data)
        if serializer.is_valid():
            coup = serializer.save()
            seri = CouponComboServiceSerializer(coup, many=False)
            return Response(seri.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        try:
            coupon_id = request.data.get('coupon_id')
            coupon = Coupon.objects.get(id=coupon_id)
            serializer = CouponAllSerializer(coupon, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Coupon.DoesNotExist:
            return Response({"error": "Coupon not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            coupon_id = request.data.get('coupon_id')
            coupon = Coupon.objects.get(Coupon_id=coupon_id)
            coupon.delete()
            return Response({"message": "Coupon successfully deleted"}, status=status.HTTP_200_OK)
        except Coupon.DoesNotExist:
            return Response({"error": "Coupon not found"}, status=status.HTTP_404_NOT_FOUND)
