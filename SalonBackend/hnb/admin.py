from django.contrib import admin
from django import forms
from django.utils.html import format_html
from .models import (
    SalonOwner, Salon, SalonMaintainer, Service, Combo,
    Coupon, Bill, Branch, Customer, Appointment, User
)

from django.contrib import admin
from .models import SalonOwner, Salon
from django.contrib.auth.hashers import make_password

# SalonOwner Admin
@admin.register(SalonOwner)
class SalonOwnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'is_enabled')  # Fields displayed in the admin list
    list_filter = ('is_enabled',)  # Allows filtering by enabled/disabled status
    search_fields = ('name', 'email', 'phone')  # Search functionality for the specified fields
    ordering = ('name',)  # Default ordering by name

    actions = ['enable_selected', 'disable_selected']

    def enable_selected(self, request, queryset):
        queryset.update(is_enabled=True)
        self.message_user(request, "Selected owners have been enabled.")
    enable_selected.short_description = "Enable selected owners"

    def disable_selected(self, request, queryset):
        queryset.update(is_enabled=False)
        self.message_user(request, "Selected owners have been disabled.")
    disable_selected.short_description = "Disable selected owners"

    def save_model(self, request, obj, form, change):
        # Check if password is being set or updated
        if 'password' in form.changed_data:
            obj.password = make_password(obj.password)  # Hash the password
        super().save_model(request, obj, form, change)

# Salon Admin
@admin.register(Salon)
class SalonAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'owner','created_at')  # Fields to display in the list view
    list_filter = ('created_at', 'owner')  # Filters for creation date and owner
    search_fields = ('name', 'phone', 'address', 'owner__name')  # Search fields
    ordering = ('-created_at',)  # Order by creation date in descending order

    # Adding custom actions
    actions = ['clear_instagram_account']

    def clear_instagram_account(self, request, queryset):
        queryset.update(instagram_acc='')
        self.message_user(request, "Instagram account cleared for the selected salons.")
    clear_instagram_account.short_description = "Clear Instagram account for selected salons"

    # Read-only fields
    readonly_fields = ('created_at',)

    # Show related salons when viewing a SalonOwner
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related('owner')  # Optimizes queries by reducing database hits


# Custom filters
class BranchFilter(admin.SimpleListFilter):
    title = 'Branch'
    parameter_name = 'branch'

    def lookups(self, request, model_admin):
        branches = Branch.objects.all()
        return [(branch.id, branch.address) for branch in branches]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(branch__id=self.value())
        return queryset


# Service Admin
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'duration', 'branch')
    list_filter = (BranchFilter,)
    search_fields = ('name', 'category', 'description')

class ComboForm(forms.ModelForm):
    class Meta:
        model = Combo
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['services'].queryset = self.instance.services.all()
        else:
            self.fields['services'].queryset = Service.objects.none()

# Combo Admin
@admin.register(Combo)
class ComboAdmin(admin.ModelAdmin):
    form = ComboForm
    list_display = ('name', 'price', 'branch')
    list_filter = (BranchFilter,)
    search_fields = ('name', 'description')

# Coupon Admin
class CouponForm(forms.ModelForm):
    class Meta:
        model = Combo
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['valid_services'].queryset = self.instance.valid_services.all()
        else:
            self.fields['valid_services'].queryset = Service.objects.none()
        if self.instance.pk:
            self.fields['valid_combos'].queryset = self.instance.valid_combos.all()
        else:
            self.fields['valid_combos'].queryset = Service.objects.none()

@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    form = CouponForm
    list_display = ('code', 'discount_percentage', 'discount_amount', 'valid_till')
    search_fields = ('code',)

# Salon Maintainer Admin
@admin.register(SalonMaintainer)
class SalonMaintainerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'branch')
    search_fields = ('name', 'email', 'phone')

# Bill Admin
@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'branch', 'total_amount', 'discount_applied', 'final_amount', 'created_at')
    list_filter = (BranchFilter,)
    search_fields = ('customer__name', 'branch__address')
    ordering = ('-created_at',)

    def get_ordering(self, request):
        return [request.GET.get('o', 'id')]

# Branch Admin
@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    list_display = ('address', 'phone')
    search_fields = ('address', 'phone')
    list_filter = ('created_at', 'salon')

# Customer Admin
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')
    search_fields = ('name', 'email', 'phone')

##################################THIS IS FOR LATER VERSIONS###################################################
# Appointment Admin
# @admin.register(Appointment)
# class AppointmentAdmin(admin.ModelAdmin):
#     list_display = ('user', 'service', 'appointment_date', 'status')
#     list_filter = ('status',)
#     search_fields = ('user__name', 'service__name')

# User Admin
# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('name', 'email', 'phone', 'is_phone_verified', 'created_at')
#     search_fields = ('name', 'email', 'phone')
