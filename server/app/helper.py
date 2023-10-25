def _extract_job_posting_data(job_posting_objects, populate_related=False):
    job_postings = []

    for posting in job_posting_objects:
        job_posting_data = {
            "job_id": posting.job_id,
            "title": posting.title,
            "location": posting.location,
            "experience_needed": posting.experience_needed,
            "career_level": posting.career_level,
            "education_level": posting.education_level,
            "salary": posting.salary,
            "description": posting.description,
            "requirements": posting.requirements,
            "open_positions": posting.open_positions,
            "company_id": posting.company_id,
            "company_name": "Confidential"
            if posting.company is None
            else posting.company.name,
            "skills": posting.skills,
            "employment_basis": posting.employment_basis,
        }

        if populate_related:
            if posting.company:
                job_posting_data["company_name"] = posting.company.name
            job_posting_data["categories"] = [
                category.job_category for category in posting.categories
            ]
            job_posting_data["skills"] = [skill.skill for skill in posting.skills]
            job_posting_data["employment_basis"] = [
                basis.employment_basis for basis in posting.employment_basis
            ]

        job_postings.append(job_posting_data)

    return job_postings
