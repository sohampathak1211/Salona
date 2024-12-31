from django.urls import path
from hnb.rest_views.Dashboard import sales_graph,dashboard_head
urlpatterns = [
    path("sales_graph/", sales_graph, name='sales_graph'),
    path("head/", dashboard_head, name='dashboard_head'),
]
