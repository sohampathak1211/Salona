from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from hnb.models import Customer, Branch, Service, Combo, Coupon, Bill,Product
from django.utils.timezone import now

class BillREST(APIView):
    def post(self, request):
        data = request.data

        # Extract inputs from the request
        c_name = data.get("c_name")
        c_phone = data.get("c_phone")
        salon_id = request.salon_id
        branch_id = data.get("branch_id") if request.is_owner else request.branch_id
        services_ids = data.get("services_ids", [])
        combos_ids = data.get("combos_ids", [])
        coupon_code = data.get("coupon_code")
        product_ids = data.get("product_ids", [])

        # Fetch or create customer
        customer, created = Customer.objects.get_or_create(
            phone=c_phone,salon_id=salon_id, defaults={"name": c_name or f"Customer-{c_phone}"}
        )
        
        # Fetch other objects from the database
        branch = get_object_or_404(Branch, id=branch_id)
        services = Service.objects.filter(id__in=services_ids)
        combos = Combo.objects.filter(id__in=combos_ids)
        products = Product.objects.filter(id__in=product_ids)
        coupon = Coupon.objects.filter(code=coupon_code,branch=branch_id, valid_till__gte=now()).first()

        # Calculate the total amount before discount
        total_services = sum(service.price for service in services)
        total_combos = sum(combo.price for combo in combos)
        total_products = sum(product.price for product in products)
        total_amount = total_services + total_combos + total_products

        discount = 0  # Initialize discount

        # Apply coupon if valid and conditions are met
        if coupon and coupon.is_valid():
            eligible_amount = 0

            # Calculate eligible amount based on valid services and combos
            eligible_amount += sum(service.price for service in services if service in coupon.valid_services.all())
            eligible_amount += sum(combo.price for combo in combos if combo in coupon.valid_combos.all())

            # Apply percentage discount
            if coupon.by_percent and coupon.discount_percentage:
                discount += eligible_amount * (coupon.discount_percentage / 100)

            # Apply flat discount
            if not coupon.by_percent and coupon.discount_amount:
                discount += coupon.discount_amount

            # Ensure minimum purchase requirements are met
            if coupon.is_minimum_purchase and coupon.minimum_amount and total_amount < coupon.minimum_amount:
                discount = 0  # Reset discount if the minimum amount condition fails

        # Calculate the final amount
        final_amount = total_amount - discount
        final_amount = max(0, final_amount)  # Ensure it cannot go negative

        # Create and save the bill
        bill = Bill.objects.create(
            customer=customer,
            branch=branch,
            total_amount=total_amount,
            discount_applied=round(discount, 2),
            final_amount=round(final_amount, 2),
        )
        bill.services.add(*services)
        bill.combos.add(*combos)
        bill.products.add(*products)
        if coupon:
            bill.coupons.add(coupon)

        # Serialize and return the response
        response_data = {
            "bill_id": bill.id,
            "customer": customer.name,
            "branch": branch.address,
            "services": [service.name for service in services],
            "combos": [combo.name for combo in combos],
            "products": [product.name for product in products],
            "coupon": coupon.code if coupon else "No coupon applied",
            "discount": round(discount, 2),
            "total_amount": round(total_amount, 2),
            "final_amount": round(final_amount, 2),
            "created_at": bill.created_at,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
