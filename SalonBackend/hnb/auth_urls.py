from django.urls import path
from hnb.rest_views.Auth import salon_owner_signup, salon_maintainer_signin, salon_owner_signin
from hnb.views import SignupView, SigninView, OtpVerificationView, OtpResendView

urlpatterns = [
    path("salon_owner/signup/", salon_owner_signup, name='salon_owner_signup'),
    path("salon_owner/signin/", salon_owner_signin, name='salon_owner_signin'),
    path("salon_maintainer/signin/", salon_maintainer_signin, name='salon_maintainer_signin'),
    path("signup/", SignupView.as_view(), name="signup"),
    path("signin/", SigninView.as_view(), name="signin"),
    path("otp-verification/", OtpVerificationView.as_view(), name="otp_verification"),
    path("resend-otp/", OtpResendView.as_view(), name="otp_resend"),
]
