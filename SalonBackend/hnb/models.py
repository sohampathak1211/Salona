from django.db import models

class SalonOwner(models.Model):
    owner_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=13)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Salon(models.Model):
    salon_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.TextField()
    phone = models.CharField(max_length=15)
    description = models.TextField()
    share_location = models.CharField(max_length=400)
    instagram_acc = models.CharField(max_length=100)
    facebook_acc = models.CharField(max_length=400)
    whatsapp_link = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(SalonOwner, on_delete=models.CASCADE, related_name='salons')

    def __str__(self):
        return self.name

class SalonMaintainer(models.Model):
    maintainer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=13)
    password = models.CharField(max_length=100)
    salon = models.ForeignKey(Salon,on_delete=models.DO_NOTHING,related_name="Maintains")
    def __str__(self):
        return self.name
    
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
    user_id = models.AutoField(primary_key=True)
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

class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.DurationField()

    def __str__(self):
        return self.name

class Appointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE, related_name='appointments')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    appointment_time = models.TimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.service.name} at {self.appointment_date}"
