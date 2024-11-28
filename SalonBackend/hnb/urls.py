from django.urls import path
from django.contrib import admin
from hnb.rest_views.Appointment import AppointmentRest
from hnb.rest_views.Salon import SalonRest
from hnb.rest_views.SalonOwner import SalonOwnerRest
from hnb.rest_views.Services import ServicesRest
from hnb.rest_views.User import UserRest
from hnb.views import SignupView, SigninView, OtpVerificationView, OtpResendView

urlpatterns = [
    path("Appointment/", AppointmentRest.as_view()),
    path("salon/", SalonRest.as_view()),
    path("salon_owner/", SalonOwnerRest.as_view()),
    path("services/", ServicesRest.as_view()),
    path("users/", UserRest.as_view()),
    path("salon_owner/signup/", SignupView.as_view(), name="signup"),
    path("salon_owner/signin/", SigninView.as_view(), name="signin"),
    path("salon_owner/otp-verification/", OtpVerificationView.as_view(), name="otp_verification"),
    path("salon_owner/resend-otp/", OtpResendView.as_view(), name="otp_resend"),
]
