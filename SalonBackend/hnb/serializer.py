from rest_framework import serializers
from .models import SalonOwner, Salon, User, Service, Appointment,SalonMaintainer,Branch, Combo, Coupon, Bill , Product,BillService,BillCombo,BillProduct,Customer

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
        
class SalonMaintainerBranchSerializer(serializers.ModelSerializer):
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
class ServiceNameIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id','name','price']
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

class ComboBranchSerializer(serializers.ModelSerializer):
    branch = BranchIdSerializer(many=False, read_only=True)
    class Meta:
        model = Combo
        fields = '__all__'
class ComboNameIdSerializer(serializers.ModelSerializer):
    # branch = BranchIdSerializer(many=False, read_only=True)
    class Meta:
        model = Combo
        fields = ['id','name','price']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'
class CouponComboServiceSerializer(serializers.ModelSerializer):
    branch = BranchNameIdSerializer(many=False, read_only=True)
    valid_services = ServiceNameIdSerializer(many=True, read_only=True)
    valid_combos = ComboNameIdSerializer(many=True, read_only=True)
    class Meta:
        model = Coupon
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    branch = BranchNameIdSerializer(read_only=True) 
    class Meta:
        model = Product
        fields = '__all__'  



class BillComboSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="combo.name")
    price = serializers.DecimalField(source="combo.price", max_digits=10, decimal_places=2)

    class Meta:
        model = BillCombo
        fields = ["combo_id", "name", "price", "quantity"]

class CouponSerializer(serializers.ModelSerializer):
    valid_services = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="name"
    )
    valid_combos = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="name"
    )

    class Meta:
        model = Coupon
        fields = [
            "id",
            "code",
            "by_percent",
            "discount_percentage",
            "discount_amount",
            "valid_services",
            "valid_combos",
            "valid_till",
            "is_minimum_purchase",
            "minimum_amount",
        ]

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "name", "phone"]

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ["id", "address"]


class BillServiceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="service.name")
    price = serializers.DecimalField(source="service.price", max_digits=10, decimal_places=2)

    class Meta:
        model = BillService
        fields = ["service_id", "name", "price", "quantity"]
        
class BillProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="product.name")
    price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2)
    class Meta:
        model = BillProduct
        fields = ["product_id", "name", "price", "quantity"]
        
class BillDetailSerializer(serializers.ModelSerializer):
    services = BillServiceSerializer(source="bill_services", many=True)
    combos = BillComboSerializer(source="bill_combos", many=True)
    product = BillProductSerializer(source="bill_products",many=True)
    coupons = CouponSerializer(many=True)
    customer = CustomerSerializer()
    branch = BranchSerializer()

    class Meta:
        model = Bill
        fields = [
            "id",
            "customer",
            "branch",
            "services",
            "combos",
            "product",
            "coupons",
            "total_amount",
            "discount_applied",
            "final_amount",
            "created_at",
        ]