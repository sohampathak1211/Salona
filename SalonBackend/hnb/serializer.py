from rest_framework import serializers
from .models import SalonOwner, Salon, User, Service, Appointment

class SalonOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonOwner
        fields = '__all__'

class SalonOwnerSignIn(serializers.ModelSerializer):
    class Meta:
        model = SalonOwner
        fields = ['email', 'password']
        
class SalonOwnerSignUp(serializers.ModelSerializer):
    class Meta:
        model = SalonOwner
        fields = ['name', 'email','phone','password']


class SalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
