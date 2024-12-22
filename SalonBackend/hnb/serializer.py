from rest_framework import serializers
from .models import SalonOwner, Salon, User, Service, Appointment,SalonMaintainer,Branch, Combo, Coupon, Bill , Product

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
        
class SalonMaintainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalonMaintainer
        fields = '__all__'


class SalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = '__all__'

class SalonIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['id']
class SearchSalonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['name','address']
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'
class BranchNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id','address']
class BranchIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id']
        

    
    class Meta:
        model = Branch
        fields = ['id']

class SearchBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salon
        fields = ['name','address']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
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

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
class ServiceBranchIdSerilaizer(serializers.ModelSerializer):
    # salon = SalonSerializer(many=False,read_only=True)
    branch = BranchNameIdSerializer(many=False,read_only=True)
    class Meta:
        model = Service
        fields = ['id', 'branch', 'name', 'category', 'description', 'price', 'duration']


class GetSalonBranchComboSerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()
    branch = BranchNameIdSerializer()
    class Meta:
        model = Combo
        fields = ['id', 'name', 'description', 'price', 'branch' , 'services']
    def get_services(self, obj):
        return obj.services.values('id', 'name')

class ComboSerializer(serializers.ModelSerializer):
    class Meta:
        model = Combo
        fields = '__all__'

class ComboSerializer(serializers.ModelSerializer):
    branch = BranchIdSerializer(many=False, read_only=True)
    class Meta:
        model = Combo
        fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    combos = ComboSerializer(many=True, read_only=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    branch_address = serializers.CharField(source='branch.address', read_only=True)

    class Meta:
        model = Bill
        fields = ['id', 'customer_name', 'branch_address', 'services', 'combos', 'total_amount', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  