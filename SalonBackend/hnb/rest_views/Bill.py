from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from hnb.models import Customer, Branch, Service, Combo, Coupon, Bill

class BillREST(APIView):
    def post(self, request):
        data = request.data

        # Extract inputs from the request
        customer_id = data.get("customer_id")
        branch_id = data.get("branch_id")
        services_ids = data.get("services_ids", [])
        combos_ids = data.get("combos_ids", [])
        coupon_code = data.get("coupon_code")

        # Fetch objects from the database
        customer = get_object_or_404(Customer, id=customer_id)
        branch = get_object_or_404(Branch, id=branch_id)
        services = Service.objects.filter(id__in=services_ids)
        combos = Combo.objects.filter(id__in=combos_ids)
        coupon = Coupon.objects.filter(code=coupon_code).first()

        # Calculate the total amount before discount
        total_services = sum(service.price for service in services)
        total_combos = sum(combo.price for combo in combos)
        total_amount = total_services + total_combos

        discount = 0  # Initialize discount

        # Apply coupon if valid and minimum purchase value is met
        if coupon and coupon.is_valid():
            # Calculate percentage discount
            if coupon.discount_percentage:
                discount += (
                    sum(service.price for service in services if service in coupon.valid_services.all()) +
                    sum(combo.price for combo in combos if combo in coupon.valid_combos.all())
                ) * (coupon.discount_percentage / 100)

            # Add flat discount
            if coupon.discount_amount:
                discount += coupon.discount_amount

            # Ensure total amount cannot go negative
            total_amount -= discount
            total_amount = max(0, total_amount)

        # Create and save the bill
        bill = Bill.objects.create(
            customer=customer,
            branch=branch,
            total_amount=total_amount
        )
        bill.services.add(*services)
        bill.combos.add(*combos)
        bill.coupons.add(*coupon)

        # Serialize and return the response
        response_data = {
            "bill_id": bill.id,
            "customer": customer.name,
            "branch": branch.address,
            "services": [service.name for service in services],
            "combos": [combo.name for combo in combos],
            "coupon": coupon.code if coupon else "No coupon applied",
            "discount": round(discount, 2),
            "total_amount": round(total_amount, 2),
            "created_at": bill.created_at
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
