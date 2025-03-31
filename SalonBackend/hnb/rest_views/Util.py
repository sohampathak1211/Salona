from django.http import JsonResponse
import os
from django.contrib.auth import get_user_model
from django.core.management import call_command

User = get_user_model()  # Get the custom user model

def create_superuser_view(request):
    if request.GET.get("secret") != os.getenv('SUPER_SECRET'):
        return JsonResponse({"error": "Unauthorized"}, status=403)

    # Check if a superuser already exists
    if User.objects.filter(is_superuser=True).exists():
        return JsonResponse({"status": "Superuser already exists!"})

    os.environ["DJANGO_SUPERUSER_USERNAME"] = os.getenv('SUPER_USERNAME')
    os.environ["DJANGO_SUPERUSER_EMAIL"] = os.getenv('SUPER_EMAIL') 
    os.environ["DJANGO_SUPERUSER_PASSWORD"] = os.getenv('SUPER_PASSWORD')

    try:
        call_command("createsuperuser", interactive=False)
        return JsonResponse({"status": "Superuser created successfully!"})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
