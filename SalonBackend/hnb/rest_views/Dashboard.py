from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Sum, F
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
from datetime import datetime, timedelta
from hnb.models import Bill,Customer
from django.utils.timezone import now, timedelta



@api_view(['GET'])
def sales_graph(request):
    filter_type = request.query_params.get("filter", "daily")
    start_date = request.query_params.get("start_date")
    end_date = request.query_params.get("end_date")
    response_data = {"labels": [], "current_data": [], "last_period_data": []}
    branch_id = request.branch_id
    try:
        # If start_date and end_date are provided, parse them into datetime objects
        if start_date and end_date:
            try:
                start_date = datetime.strptime(start_date, "%Y-%m-%d")
                end_date = datetime.strptime(end_date, "%Y-%m-%d")
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Default values for analysis without custom date range
            today = datetime.now()
            start_date = start_date or today
            end_date = end_date or today

        # Filter based on the date range
        bill_queryset = Bill.objects.filter(branch_id__in=branch_id,created_at__gte=start_date, created_at__lte=end_date)

        if filter_type == "daily":
            current_sales = (
                bill_queryset
                .annotate(day=TruncDay("created_at"))
                .values("day")
                .annotate(total=Sum("final_amount"))
                .order_by("day")
            )

            # Calculate the previous period (one week ago) sales
            previous_start_date = start_date - timedelta(days=7)
            previous_end_date = end_date - timedelta(days=7)

            last_period_sales = (
                bill_queryset.filter(created_at__gte=previous_start_date, created_at__lte=previous_end_date)
                .annotate(day=TruncDay("created_at"))
                .values("day")
                .annotate(total=Sum("final_amount"))
                .order_by("day")
            )

            response_data["labels"] = [entry["day"].strftime("%d-%m-%Y") for entry in current_sales]
            response_data["current_data"] = [entry["total"] for entry in current_sales]
            response_data["last_period_data"] = [entry["total"] for entry in last_period_sales]

        elif filter_type == "weekly":
            current_week_sales = (
                bill_queryset
                .annotate(week=TruncWeek("created_at"))
                .values("week")
                .annotate(total=Sum("final_amount"))
                .order_by("week")
            )

            # Format labels as Month Abbreviation + Week N (e.g., Nov 1, Nov 2)
            response_data["labels"] = [
                entry["week"].strftime("%b") + " " + str(entry["week"].isocalendar()[1])
                for entry in current_week_sales
            ]

            # Previous week sales (for comparison)
            last_week_start_date = start_date - timedelta(weeks=1)
            last_week_end_date = end_date - timedelta(weeks=1)

            last_week_sales = (
                bill_queryset.filter(created_at__gte=last_week_start_date, created_at__lte=last_week_end_date)
                .annotate(week=TruncWeek("created_at"))
                .values("week")
                .annotate(total=Sum("final_amount"))
                .order_by("week")
            )

            response_data["current_data"] = [entry["total"] for entry in current_week_sales]
            response_data["last_period_data"] = [entry["total"] for entry in last_week_sales]

        elif filter_type == "yearly":
            current_year_sales = (
                bill_queryset
                .annotate(month=TruncMonth("created_at"))
                .values("month")
                .annotate(total=Sum("final_amount"))
                .order_by("month")
            )

            # Previous year sales (for comparison)
            last_year_start_date = start_date.replace(year=start_date.year - 1)
            last_year_end_date = end_date.replace(year=end_date.year - 1)

            last_year_sales = (
                bill_queryset.filter(created_at__gte=last_year_start_date, created_at__lte=last_year_end_date)
                .annotate(month=TruncMonth("created_at"))
                .values("month")
                .annotate(total=Sum("final_amount"))
                .order_by("month")
            )

            response_data["labels"] = [entry["month"].strftime("%B") for entry in current_year_sales]
            response_data["current_data"] = [entry["total"] for entry in current_year_sales]
            response_data["last_period_data"] = [entry["total"] for entry in last_year_sales]

        else:
            return Response({"error": "Invalid filter type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def dashboard_head(request):
    today = now().date()
    branch_id = request.branch_id
    # Define time periods
    start_of_year = today.replace(month=1, day=1)
    start_of_month = today.replace(day=1)
    start_of_last_month = (start_of_month - timedelta(days=1)).replace(day=1)
    start_of_week = today - timedelta(days=today.weekday())
    start_of_last_week = start_of_week - timedelta(weeks=1)
    end_of_last_week = start_of_week - timedelta(days=1)

    # Sales calculations
    total_sales_year = Bill.objects.filter(branch_id__in=branch_id,created_at__date__gte=start_of_year).aggregate(
        total=Sum('final_amount')
    )['total'] or 0

    total_sales_month = Bill.objects.filter(branch_id__in=branch_id,created_at__date__gte=start_of_month).aggregate(
        total=Sum('final_amount')
    )['total'] or 0

    total_sales_week = Bill.objects.filter(branch_id__in=branch_id,created_at__date__gte=start_of_week).aggregate(
        total=Sum('final_amount')
    )['total'] or 0

    total_sales_last_year = Bill.objects.filter(branch_id__in=branch_id,
        created_at__date__range=(start_of_year - timedelta(days=365), start_of_year - timedelta(days=1))
    ).aggregate(total=Sum('final_amount'))['total'] or 0

    total_sales_last_month = Bill.objects.filter(branch_id__in=branch_id,
        created_at__date__range=(start_of_last_month, start_of_month - timedelta(days=1))
    ).aggregate(total=Sum('final_amount'))['total'] or 0

    total_sales_last_week = Bill.objects.filter(branch_id__in=branch_id,
        created_at__date__range=(start_of_last_week, end_of_last_week)
    ).aggregate(total=Sum('final_amount'))['total'] or 0

    # New users calculations
    new_users_month = Customer.objects.filter(
        bills__branch_id__in=branch_id,
        bills__created_at__date__gte=start_of_month
    ).distinct().count()

    new_users_last_month = Customer.objects.filter(
        bills__branch_id__in=branch_id,
        bills__created_at__date__range=(start_of_last_month, start_of_month - timedelta(days=1))
    ).distinct().count()

    # Growth or reduction calculations
    def calculate_growth(current, previous):
        if previous == 0:
            return current, None  # No percentage change if previous is zero
        change = current - previous
        percent_change = (change / previous) * 100
        return change, percent_change

    sales_growth_year = calculate_growth(total_sales_year, total_sales_last_year)
    sales_growth_month = calculate_growth(total_sales_month, total_sales_last_month)
    sales_growth_week = calculate_growth(total_sales_week, total_sales_last_week)
    users_growth_month = calculate_growth(new_users_month, new_users_last_month)

    # Prepare response data
    data = {
        "total_sales": {
            "year": total_sales_year,
            "month": total_sales_month,
            "week": total_sales_week,
        },
        "sales_growth": {
            "year": {
                "change": sales_growth_year[0],
                "percentage": sales_growth_year[1],
            },
            "month": {
                "change": sales_growth_month[0],
                "percentage": sales_growth_month[1],
            },
            "week": {
                "change": sales_growth_week[0],
                "percentage": sales_growth_week[1],
            },
        },
        "new_users": {
            "month": new_users_month,
            "last_month": new_users_last_month,
            "growth": {
                "change": users_growth_month[0],
                "percentage": users_growth_month[1],
            },
        },
    }

    return Response(data)
