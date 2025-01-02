from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from hnb.models import (
    Customer,
    Branch,
    Service,
    Combo,
    Coupon,
    Bill,
    Product,
    BillService,
    BillCombo,
    BillProduct,
)
from hnb.serializer import BillDetailSerializer
from hnb.wrappers.Pagination import CustomPageNumberPagination
class BillREST(APIView):
    pagination_class = CustomPageNumberPagination
    
    def get(self, request, *args, **kwargs):
        try:
            branch_id = request.branch_id
            phone = request.query_params.get('phone')

            # Fetch bills based on user's role and branch_id
            paginator = CustomPageNumberPagination()
            if phone:
                # Fetch bills for the customer with the provided phone number
                customer = Customer.objects.filter(phone=phone).first()
                if not customer:
                    return paginator.get_paginated_response([])  # No bills found for this phone
                # Retrieve bills for the found customer
                bills = Bill.objects.filter(customer=customer).order_by('-created_at')
            else:
                # Fetch bills based on the user's role
                if request.is_owner:
                    bills = Bill.objects.filter(branch_id__in=branch_id).order_by('-created_at')
                else:
                    bills = Bill.objects.filter(branch=branch_id).order_by('-created_at')
            # Apply pagination to the queryset
            paginated_bills = paginator.paginate_queryset(bills, request)

            # Serialize the paginated results
            serializer = BillDetailSerializer(paginated_bills, many=True)

            # Return only the paginated results (with metadata)
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({'error': str(e)}, status=400)
    
    def post(self, request):
        data = request.data

        # Extract inputs
        c_name = data.get("c_name")
        c_phone = data.get("c_phone")
        salon_id = request.salon_id
        branch_id = data.get("branch_id") if request.is_owner else request.branch_id
        services_data = data.get("services", [])
        combos_data = data.get("combos", [])
        products_data = data.get("products", [])
        coupon_id = data.get("coupon")

        # Fetch or create customer
        customer, created = Customer.objects.get_or_create(
            phone=c_phone,
            salon_id=salon_id,
            defaults={"name": c_name or f"Customer-{c_phone}"},
        )

        # Fetch branch
        branch = get_object_or_404(Branch, id=branch_id)

        # Fetch services, combos, and products
        services = [
            {"service": get_object_or_404(Service, id=item["id"]), "quantity": item["quantity"]}
            for item in services_data
        ]
        combos = [
            {"combo": get_object_or_404(Combo, id=item["id"]), "quantity": item["quantity"]}
            for item in combos_data
        ]
        products = [
            {"product": get_object_or_404(Product, id=item["id"]), "quantity": item["quantity"]}
            for item in products_data
        ]

        # Fetch coupon
        coupon = Coupon.objects.filter(
            id=coupon_id, branch=branch_id, valid_till__gte=now()
        ).first()

        # Calculate totals
        total_services = sum(item["service"].price * item["quantity"] for item in services)
        total_combos = sum(item["combo"].price * item["quantity"] for item in combos)
        total_products = sum(item["product"].price * item["quantity"] for item in products)
        total_amount = total_services + total_combos + total_products

        discount = 0

        # Apply coupon if valid
        if coupon and coupon.is_valid():
            if coupon.is_minimum_purchase:
                # Check minimum purchase requirement
                if total_amount >= coupon.minimum_amount:
                    if coupon.by_percent:
                        discount = total_amount * (coupon.discount_percentage / 100)
                    else:
                        discount = coupon.discount_amount
            else:
                # Calculate discount for eligible services and combos
                eligible_services = sum(
                    item["service"].price * item["quantity"]
                    for item in services
                    if item["service"] in coupon.valid_services.all()
                )
                eligible_combos = sum(
                    item["combo"].price * item["quantity"]
                    for item in combos
                    if item["combo"] in coupon.valid_combos.all()
                )
                print(eligible_services)
                print(eligible_combos)
                eligible_amount = eligible_services + eligible_combos

                if eligible_amount > 0:
                    if coupon.by_percent:
                        discount = eligible_amount * (coupon.discount_percentage / 100)
                    else:
                        discount = min(eligible_amount, coupon.discount_amount)

        # Final amount
        final_amount = total_amount - discount
        final_amount = max(0, final_amount)  # Ensure final amount is non-negative

        # Create bill
        bill = Bill.objects.create(
            customer=customer,
            branch=branch,
            total_amount=total_amount,
            discount_applied=round(discount, 2),
            final_amount=round(final_amount, 2),
        )

        # Add services, combos, and products to bill
        for item in services:
            BillService.objects.create(bill=bill, service=item["service"], quantity=item["quantity"])
        for item in combos:
            BillCombo.objects.create(bill=bill, combo=item["combo"], quantity=item["quantity"])
        for item in products:
            product = item["product"]
            product.quantity -= item["quantity"]
            if product.quantity < 0:
                return Response(
                    {"error": f"Insufficient stock for product {product.name}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            product.save()
            BillProduct.objects.create(bill=bill, product=item["product"], quantity=item["quantity"])

        # Associate coupon with bill
        if coupon:
            bill.coupons.add(coupon)

        # Prepare response
        response_data = {
            "bill_id": bill.id,
            "customer": customer.name,
            "branch": branch.address,
            "services": [
                {"name": item["service"].name, "quantity": item["quantity"]} for item in services
            ],
            "combos": [
                {"name": item["combo"].name, "quantity": item["quantity"]} for item in combos
            ],
            "products": [
                {"name": item["product"].name, "quantity": item["quantity"]} for item in products
            ],
            "coupon": coupon.code if coupon else "No coupon applied",
            "discount": round(discount, 2),
            "total_amount": round(total_amount, 2),
            "final_amount": round(final_amount, 2),
            "created_at": bill.created_at,
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
