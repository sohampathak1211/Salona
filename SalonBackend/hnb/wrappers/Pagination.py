from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20  # Default page size (you can also set this dynamically if needed)

    def get_paginated_response(self, data):
        # Return only the paginated results, without metadata like 'count', 'next', 'previous'
        return Response(data)
