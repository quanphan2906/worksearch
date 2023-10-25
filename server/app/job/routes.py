from flask import Blueprint, request, jsonify
from ..models import Company, JobPosting, JobSkill, CompanyIndustry
from ..helper import _extract_job_posting_data


job = Blueprint("jobs", __name__, url_prefix="/jobs")


@job.route("/company/<company_id>")
def company_postings(company_id):
    company = Company.query.get(company_id)

    if company is None:
        return jsonify({"message": "Company not found", "status": 404})

    job_posting_objects = company.job_postings
    return jsonify(
        {"data": _extract_job_posting_data(job_posting_objects), "status": 200}
    )


@job.route("/industry/<industry>")
def industry_postings(industry):
    # Query job postings associated with companies in the specified industry
    job_postings = (
        JobPosting.query.join(Company)
        .join(CompanyIndustry)
        .filter(CompanyIndustry.company_industry == industry)
        .all()
    )

    if not job_postings:
        return jsonify(
            {"message": "No job postings found for the industry", "status": 404}
        )

    return jsonify({"data": _extract_job_posting_data(job_postings), "status": 200})


@job.route("/skills")
def skill_postings():
    data = request.json
    skills = data["skills"]

    job_postings = JobPosting.query.filter(
        JobPosting.skills.any(JobSkill.skill.in_(skills))
    ).all()

    return jsonify({"data": _extract_job_posting_data(job_postings), "status": 200})
