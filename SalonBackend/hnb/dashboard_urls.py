from django.urls import path
from hnb.rest_views.Dashboard import sales_graph
urlpatterns = [
    path("sales_graph/", sales_graph, name='sales_graph'),
]
