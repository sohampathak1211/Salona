from django.urls import path, include
from hnb.rest_views.Appointment import AppointmentRest
from hnb.rest_views.Salon import SalonRest
from hnb.rest_views.Branch import BranchRest
from hnb.rest_views.SalonOwner import SalonOwnerRest
from hnb.rest_views.Maintainer import MaintainerRest
from hnb.rest_views.Services import ServicesRest
from hnb.rest_views.Customer import CustomerREST
from hnb.rest_views.Coupon import CouponREST
from hnb.rest_views.Bill import BillREST
from hnb.rest_views.Combo import ComboREST
from hnb.rest_views.Product import ProductRest

urlpatterns = [
    path("auth/", include("hnb.auth_urls")),
    path("Appointment/", AppointmentRest.as_view()),
    path("salon/", SalonRest.as_view()),
    path("branch/", BranchRest.as_view()),
    path("salon_owner/", SalonOwnerRest.as_view()),
    path("salon_maintainer/", MaintainerRest.as_view()),
    path("service/", ServicesRest.as_view()),
    path("combo/", ComboREST.as_view()),
    path("customer/", CustomerREST.as_view()),
    path("coupon/", CouponREST.as_view()),
    path("bill/", BillREST.as_view()),
    path("product/", ProductRest.as_view()),
]
