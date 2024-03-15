from faker import Faker
import json
import uuid
from datetime import datetime

faker = Faker()


# Assuming Application structure will be provided later
def generate_fake_user():
    user = {
        "email": faker.email(),
        "user_name": faker.user_name(),
        "gender": faker.random_element(elements=("male", "female", "other")),
        "birth_date": faker.date_of_birth(minimum_age=18, maximum_age=65).isoformat(),
        "gpa": round(faker.random_number(digits=2) / 10, 2),
        "skills": faker.words(nb=5),  # Generate 5 random skills for now
        "applications": [],  # Placeholder for application details
    }
    return user


def generate_fake_job_posting():
    job_posting = {
        "job_id": str(uuid.uuid4()),
        "title": faker.job(),
        "location": faker.city(),
        "company_name": faker.company(),
        "experience_needed": faker.random_element(
            elements=(None, "1-3 years", "3-5 years", "5+ years")
        ),
        "career_level": faker.random_element(
            elements=(None, "Entry Level", "Mid Level", "Senior Level", "Manager")
        ),
        "education_level": faker.random_element(
            elements=(None, "High School", "Bachelor's", "Master's", "PhD")
        ),
        "salary": (
            faker.random_element(
                elements=(None, "30000-50000", "50000-70000", "70000-90000", "90000+")
            )
            if faker.boolean(chance_of_getting_true=50)
            else None
        ),
        "description": (
            faker.text(max_nb_chars=200)
            if faker.boolean(chance_of_getting_true=50)
            else None
        ),
        "requirements": (
            faker.text(max_nb_chars=100)
            if faker.boolean(chance_of_getting_true=50)
            else None
        ),
        "company_id": str(uuid.uuid4()),
        "categories": faker.words(nb=3),
        "skills": faker.words(nb=5),
        "employment_basis": (
            faker.random_elements(
                elements=("Full-time", "Part-time", "Contract", "Temporary"),
                unique=True,
            )
            if faker.boolean(chance_of_getting_true=50)
            else None
        ),
    }
    return job_posting


# Generate a single fake user for demonstration
fake_user = generate_fake_user()
fake_user_json = json.dumps(fake_user, indent=4)

print(fake_user_json)
