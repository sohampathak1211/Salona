import random
from datetime import datetime, timedelta
from hnb.models import Bill, Customer, Branch

def create_yearly_bills(branch_id):
    try:
        # Fetch the branch by ID
        branch = Branch.objects.get(id=branch_id)

        # Fetch or create a customer associated with the branch's salon
        customer, _ = Customer.objects.get_or_create(
            name="Yearly Test Customer",
            email="yearly.customer@example.com",
            phone="1234567890",
            salon=branch.salon,
        )

        # Clear previous test data for this customer (optional)
        # Bill.objects.filter(customer=customer).delete()

        # Generate data for the whole year, from January 1 to December 31
        start_date = datetime(datetime.now().year-2, 1, 1)  # Start of the year
        end_date = datetime(datetime.now().year-2, 12, 31)  # End of the year
        delta = timedelta(days=1)

        current_date = start_date
        while current_date <= end_date:
            # Create 1 to 2 bills per day
            for _ in range(random.randint(1, 2)):
                total_amount = random.uniform(100, 5000)  # Random total amount
                discount_applied = random.uniform(0, total_amount * 0.3)  # Up to 30% discount
                final_amount = total_amount - discount_applied

                Bill.objects.create(
                    customer=customer,
                    branch=branch,
                    total_amount=total_amount,
                    discount_applied=discount_applied,
                    final_amount=final_amount,
                    created_at=current_date,  # Use the current date for each bill
                )

            # Move to the next day
            current_date += delta

        print(f"Dummy data created for the entire year for branch ID {branch_id}.")
    except Branch.DoesNotExist:
        print(f"Branch with ID {branch_id} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Run the function
create_yearly_bills(branch_id=11)
