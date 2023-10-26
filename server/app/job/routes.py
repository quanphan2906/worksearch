from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from ..models import Company, JobPosting, JobSkill, CompanyIndustry, EmploymentBasis
from ..helper import _extract_job_posting_data
from ..extension import db

from collections import defaultdict


job = Blueprint("jobs", __name__, url_prefix="/jobs")


@job.route("/company/<company_id>")
def company_postings(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return jsonify({"data": [], "status": 200})

    job_posting_objects = company.job_postings
    return jsonify({"data": _extract_job_posting_data(job_posting_objects)}), 200


@job.route("/industry/<industry>")
def industry_postings(industry):
    job_postings = (
        JobPosting.query.join(Company)
        .join(CompanyIndustry)
        .filter(CompanyIndustry.company_industry == industry)
        .options(
            joinedload("company"), joinedload("skills"), joinedload("employment_basis")
        )
        .all()
    )
    return jsonify({"data": _extract_job_posting_data(job_postings)}), 200


@job.route("/industry2/<industry>")
def industry_postings2(industry):
    query = (
        db.session.query(
            JobPosting, Company, CompanyIndustry, JobSkill, EmploymentBasis
        )
        .join(Company, Company.company_id == JobPosting.company_id)
        .join(CompanyIndustry, CompanyIndustry.company_id == Company.company_id)
        .filter(CompanyIndustry.company_industry == industry)
        .join(EmploymentBasis, JobPosting.job_id == EmploymentBasis.job_id)
        .join(JobSkill, JobPosting.job_id == JobSkill.job_id)
    )

    results = query.all()
    job_postings_dict = defaultdict(list)

    for result in results:
        job_posting = result[0]
        skill = result[3]
        employment_basis = result[4]

        job_id = job_posting.job_id
        if job_id not in job_postings_dict:
            job_postings_dict[job_id] = {
                "job_id": job_id,
                "title": job_posting.title,
                "location": job_posting.location,
                "experience_needed": job_posting.experience_needed,
                "career_level": job_posting.career_level,
                "education_level": job_posting.education_level,
                "salary": job_posting.salary,
                "description": job_posting.description,
                "requirements": job_posting.requirements,
                "open_positions": job_posting.open_positions,
                "company_id": job_posting.company_id,
                "skills": [],
                "employment_basis": [],
            }

        job_postings_dict[job_id]["skills"].append(skill.skill)
        job_postings_dict[job_id]["employment_basis"].append(
            employment_basis.employment_basis
        )

    # Now, job_postings_dict contains a dictionary for each job posting with associated skills and employment basis lists.
    job_postings_list = list(job_postings_dict.values())
    return jsonify({"Data": job_postings_list}), 200


@job.route("/skills")
def skill_postings():
    param = request.args.get("skills")
    skills = param.split(",")

    job_postings = (
        JobPosting.query.filter(JobPosting.skills.any(JobSkill.skill.in_(skills)))
        .options(
            joinedload("company"), joinedload("skills"), joinedload("employment_basis")
        )
        .all()
    )

    return jsonify({"data": _extract_job_posting_data(job_postings)}), 200
