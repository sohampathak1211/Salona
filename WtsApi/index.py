import pywhatkit
import datetime

def send_marketing_message(phone_number, message):
    """Send a Marketing message immediately."""
    print("Sending Marketing Message...")
    current_time = datetime.datetime.now()
    pywhatkit.sendwhatmsg_instantly(
        phone_no=phone_number, 
        message=message, 
        # time_hour=current_time.hour, 
        # time_minute=(current_time.minute + 1) % 60,
        wait_time=10, 
        tab_close=True, 
        close_time=3
    )

def send_utility_message(phone_number, message):
    """Send a Utility message immediately."""
    print("Sending Utility Message...")
    current_time = datetime.datetime.now()
    pywhatkit.sendwhatmsg(
        phone_no=phone_number, 
        message=message, 
        time_hour=current_time.hour, 
        time_min=(current_time.minute + 1) % 60,
        wait_time=3, 
        tab_close=True, 
        close_time=3
    )

def send_authentication_message(phone_number, otp):
    """Send an Authentication message with OTP."""
    print("Sending Authentication Message...")
    pywhatkit.sendwhatmsg_instantly(
        phone_no=phone_number, 
        message=f"Your OTP is: {otp}", 
        wait_time=10, 
        tab_close=True
    )

def send_service_message(phone_number, message):
    """Send a Service message immediately in response to user initiation."""
    print("Sending Service Message...")
    pywhatkit.sendwhatmsg_instantly(
        phone_no=phone_number, 
        message=message, 
        wait_time=10, 
        tab_close=True
    )

# Example usage
if __name__ == "__main__":
    user_number = "+919822930004"  # Replace with the recipient's phone number
    
    # Trigger Marketing Message
    # send_marketing_message(user_number, "Check out our latest offers and discounts!")

    # Trigger Utility Message
    send_utility_message(user_number, "Your package is out for delivery. Track here: https://example.com/track")

    # Trigger Authentication Message
    # send_authentication_message(user_number, "123456")

    # # Trigger Service Message
    # send_service_message(user_number, "Here’s the information you requested. Let us know if you need help!")
