from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Sum
from django.db.models.functions import TruncDay, TruncWeek, TruncMonth
from datetime import datetime, timedelta
from hnb.models import Bill

@api_view(['GET'])
def sales_graph(request):
    filter_type = request.query_params.get("filter", "daily")
    start_date = request.query_params.get("start_date")
    end_date = request.query_params.get("end_date")
    response_data = {"labels": [], "current_data": [], "last_period_data": []}

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
        bill_queryset = Bill.objects.filter(created_at__gte=start_date, created_at__lte=end_date)

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
