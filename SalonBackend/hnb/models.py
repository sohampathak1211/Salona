from django.db import models
from pytz import timezone

class SalonOwner(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=13)
    password = models.CharField(max_length=100)
    is_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
class Salon(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.TextField()
    email = models.CharField(max_length=100,null=True)
    phone = models.CharField(max_length=15)
    description = models.TextField()
    share_location = models.CharField(max_length=400)
    instagram_acc = models.CharField(max_length=100)
    facebook_acc = models.CharField(max_length=400)
    whatsapp_link = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.OneToOneField(SalonOwner, on_delete=models.CASCADE, related_name='salons')

    def __str__(self):
        return self.name

class Branch(models.Model):
    id = models.AutoField(primary_key=True)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    salon = models.ForeignKey(Salon, on_delete=models.DO_NOTHING, related_name='branches')
    def __str__(self):
        return self.address

class SalonMaintainer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=13)
    password = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch,on_delete=models.DO_NOTHING,related_name="Maintains")
    
    def __str__(self):
        return self.name

class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True,null=True)
    phone = models.CharField(max_length=13)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='customer')
    def __str__(self):
        return self.name 

class Service(models.Model):
    id = models.AutoField(primary_key=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='branch_service')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.branch.address} - {self.name}"

class Combo(models.Model):
    id = models.AutoField(primary_key=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='branch_combo')
    name = models.CharField(max_length=100)
    description = models.TextField()
    services = models.ManyToManyField(Service, related_name='combos')
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.branch.address} - {self.name}"

class Coupon(models.Model):
    branch = models.ForeignKey("Branch", on_delete=models.CASCADE, related_name="coupon", null=True, blank=True)
    code = models.CharField(max_length=20, unique=True)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # e.g., 10.00 for 10%
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)     # e.g., 200 for flat 200 off
    valid_services = models.ManyToManyField(Service, blank=True, related_name="coupons")
    valid_combos = models.ManyToManyField(Combo, blank=True, related_name="coupons")
    valid_till = models.DateTimeField()

    def is_valid(self):
        return self.valid_till >= timezone.now()

    def __str__(self):
        return f"Coupon {self.code} ({'Flat ₹' + str(self.discount_amount) if self.discount_amount else str(self.discount_percentage) + '% off'})"

class Bill(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey("Customer", on_delete=models.CASCADE, related_name="bills")
    branch = models.ForeignKey("Branch", on_delete=models.CASCADE, related_name="bills", null=True, blank=True)
    services = models.ManyToManyField("Service", related_name="bills", blank=True)
    combos = models.ManyToManyField("Combo", related_name="bills", blank=True)
    coupons = models.ManyToManyField('Coupon',related_name="bills",blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount_applied = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    final_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_totals(self):
        """
        Calculate total, apply discounts, and update fields.
        """
        service_total = sum(service.price for service in self.services.all())
        combo_total = sum(combo.price for combo in self.combos.all())
        self.total_amount = service_total + combo_total

        # Assuming discount_applied is set beforehand
        self.final_amount = self.total_amount - self.discount_applied
        self.save()

    def __str__(self):
        return f"Bill {self.id} - Customer: {self.customer.name}"





########################################EXTRA MODELS################################################
class UserManager(models.Manager):
    def create_user(self, name, email, phone, otp, is_phone_verified=False, **extra_fields):
        if not phone:
            raise ValueError('The phone field must be set')
        user = self.model(name=name, email=email, phone=phone, otp=otp, is_phone_verified=is_phone_verified, **extra_fields)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, phone, otp, **extra_fields):
        extra_fields.setdefault('is_phone_verified', True)
        return self.create_user(name, email, phone, otp, **extra_fields)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    is_phone_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    otp = models.IntegerField()
    is_otp_verified = models.BooleanField(default=False)
    is_user_agreement = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone'  # Define the unique field to be used for authentication
    REQUIRED_FIELDS = []  # Fields required for creating a user

    objects = UserManager()  # Assign custom manager to handle user creation

    def __str__(self):
        return self.name
class Appointment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    appointment_time = models.TimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.service.name} at {self.appointment_date}"