from Salon.settings import EMAIL_HOST_USER

from django.core.mail import send_mail

def send_otp(to_email,otp):
    try:
        subject = "Salona OTP Verification"
        message = f"Your otp is {otp}"
        from_email = EMAIL_HOST_USER
        recipient = [to_email]
        send_mail(subject,message,from_email,recipient)
    except Exception as e:
        print(e)
    