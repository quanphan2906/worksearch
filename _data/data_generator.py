from faker import Faker
import json
import uuid
from datetime import datetime

faker = Faker()


# Assuming Application structure will be provided later
def generate_fake_user():

    email = faker.email()
    user = {
        "id": email,
        "email": email,
        "password": faker.sha256(raw_output=False),
        "gender": faker.random_element(elements=("male", "female", "other")),
        "birth_date": faker.date_of_birth(minimum_age=18, maximum_age=65).isoformat(),
        "skills": faker.words(nb=5),  # Generate 5 random skills for now
        "applications": [],  # Placeholder for application details
    }
    return user


def generate_fake_job_posting():
    job_id = str(uuid.uuid4())
    job_posting = {
        "id": job_id,
        "job_id": job_id,
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
        "description": (faker.text(max_nb_chars=200)),
        "requirements": (faker.text(max_nb_chars=100)),
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


def generate_fake_company():
    company_sizes = ["Small", "Medium", "Large"]
    industries = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing"]

    company_id = str(uuid.uuid4())
    company = {
        "id": company_id,
        "company_id": company_id,
        "name": faker.company(),
        "established_year": faker.year(),
        "size": faker.random_element(elements=company_sizes),
        "location": faker.city(),
        "description": faker.catch_phrase(),
        "website": faker.url(),
        "industries": faker.random_elements(
            elements=industries,
            unique=True,
            length=faker.random_int(min=1, max=len(industries)),
        ),
    }

    return company


def generate_fake_application(
    user, job_posting, include_user_details=False, include_job_posting_details=False
):
    application = {
        "user_email": user["email"],
        "job_id": job_posting["job_id"],
        "application_date": faker.date_between(
            start_date="-2y", end_date="today"
        ).isoformat(),
        "cover_letter": faker.text(max_nb_chars=500),
    }

    if include_user_details:
        application["user"] = user

    if include_job_posting_details:
        application["job_posting"] = job_posting

    return application


# Number of each entity to generate
num_users = 5
num_job_postings = 30
num_applications = 10


# Generate lists of fake users and job postings
users = [generate_fake_user() for _ in range(num_users)]
job_postings = [generate_fake_job_posting() for _ in range(num_job_postings)]

# Generate a list of fake applications, randomly pairing users and job postings
applications = []
for _ in range(num_applications):
    user = faker.random_element(elements=users)
    job_posting = faker.random_element(elements=job_postings)
    application = generate_fake_application(user, job_posting)
    applications.append(application)

# Assemble the final object
data_object = {
    "job_postings": job_postings,
    "users": users,
    "applications": applications,
}

with open("db.json", "w") as json_file:
    json.dump(data_object, json_file, indent=4)
