from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20  # Default page size

    def get_paginated_response(self, data):
        # Return pagination metadata with page number and other info
        return Response({
            'results': data,
            'current_page': self.page.number,
            'next_page': self.page.next_page_number() if self.page.has_next() else None,
            'previous_page': self.page.previous_page_number() if self.page.has_previous() else None,
            'total_pages': self.page.paginator.num_pages,
            'total_count': self.page.paginator.count
        })