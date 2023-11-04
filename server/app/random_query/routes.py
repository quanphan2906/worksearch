from flask import Blueprint, jsonify
from sqlalchemy import func, case, cast, desc, extract

from ..extension import db
from ..models import CompanyIndustry, JobPosting, Company, JobSkill, JobCategory


random_query = Blueprint("random_query", __name__, url_prefix="/random_query")

"""
Show the top 5 sectors by number of job posts, and the average salary range for each
SELECT
    ci.company_industry,
    COUNT(j.job_id) AS job_posting_count,
    AVG(
        CASE
            WHEN j.salary LIKE '% to % EGP Per Month' THEN
                (CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(j.salary, ' to ', 1), ' EGP', 1) AS SIGNED) +
                CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(j.salary, ' to ', -1), ' EGP', 1) AS SIGNED)) / 2
            ELSE NULL
        END
    ) AS average_salary_range
FROM
    company AS c
    JOIN company_industry AS ci ON ci.company_id = c.company_id
    JOIN job_posting AS j ON j.company_id = c.company_id
GROUP BY ci.company_industry
ORDER BY job_posting_count DESC
LIMIT 5;
"""


@random_query.route("/top_company_industries")
def top_company_industries():
    query = (
        db.session.query(
            CompanyIndustry.company_industry.label("company_industry"),
            func.count(JobPosting.job_id).label("job_posting_count"),
            func.avg(
                case(
                    (
                        JobPosting.salary.like("% to % EGP Per Month"),
                        (
                            cast(
                                func.substring_index(
                                    func.substring_index(JobPosting.salary, " to ", 1),
                                    " EGP",
                                    1,
                                ),
                                db.Float,
                            )
                            + cast(
                                func.substring_index(
                                    func.substring_index(JobPosting.salary, " to ", -1),
                                    " EGP",
                                    1,
                                ),
                                db.Float,
                            )
                        )
                        / 2,
                    ),
                    else_=None,
                )
            ).label("average_salary_range"),
        )
        .join(Company, CompanyIndustry.company_id == Company.company_id)
        .join(JobPosting, JobPosting.company_id == Company.company_id)
        .group_by(CompanyIndustry.company_industry)
        .order_by(desc("job_posting_count"))
        .limit(5)
    )

    industry_counts = query.all()

    # Extract and format the results
    result = [
        {
            "industry": industry,
            "job_post_count": job_post_count,
            "average_salary": "Not available"
            if (average_salary is None or average_salary == 0)
            else round(average_salary, 2),
        }
        for industry, job_post_count, average_salary in industry_counts
    ]

    return jsonify({"data": result}), 200


"""
Show the top 5 skills that are in the highest demand
"""


@random_query.route("/top_skills")
def top_skills():
    skill_counts = (
        db.session.query(JobSkill.skill, func.count(JobPosting.job_id).label("count"))
        .join(JobPosting, JobSkill.job_id == JobPosting.job_id)
        .group_by(JobSkill.skill)
        .order_by(desc("count"))
        .limit(5)
    )

    top_skills = skill_counts.all()
    result = [{"skill": skill, "count": count} for skill, count in top_skills]

    return jsonify({"data": result}), 200


"""
Show the top 5 growing startups in Egypt by the amount of vacancies they have compared to their foundation date

TODO: I need a formal definition of startup.
Startup = Small-size company or recently found company (3 years)
"""


@random_query.route("/top_startups")
def top_startups():
    startups_query = (
        db.session.query(
            Company.company_id,
            Company.name,
            Company.established_year,
            func.count(JobPosting.job_id).label("vacancies"),
        )
        .join(JobPosting, Company.company_id == JobPosting.company_id)
        .filter(
            extract("year", func.now()) - Company.established_year <= 3,
            Company.name != "",
        )
        .group_by(Company.company_id)
        .having(func.count(JobPosting.job_id) > 0)
        .order_by(desc("vacancies"))
        .limit(5)
    )

    top_startups = startups_query.all()
    result = [
        {
            "company_id": company_id,
            "company_name": name,
            "established_year": established_year,
            "vacancies": vacancies,
        }
        for company_id, name, established_year, vacancies in top_startups
    ]

    return jsonify({"data": result}), 200


"""
Show the top 5 most paying companies in the field in Egypt
"""


@random_query.route("/top_paying_companies")
def top_paying_companies():
    query = (
        db.session.query(
            JobPosting.company_id,
            Company.name,
            func.avg(
                case(
                    (
                        JobPosting.salary.like("% to % EGP Per Month"),
                        (
                            cast(
                                func.substring_index(
                                    func.substring_index(JobPosting.salary, " to ", 1),
                                    " EGP",
                                    1,
                                ),
                                db.Float,
                            )
                            + cast(
                                func.substring_index(
                                    func.substring_index(JobPosting.salary, " to ", -1),
                                    " EGP",
                                    1,
                                ),
                                db.Float,
                            )
                        )
                        / 2,
                    ),
                    else_=None,
                )
            ).label("average_salary"),
        )
        .where(Company.name != "")
        .join(Company, Company.company_id == JobPosting.company_id)
        .group_by(JobPosting.company_id, Company.name)
        .order_by(desc("average_salary"))
        .limit(5)
    )

    top_paying_companies = query.all()

    result = [
        {"company_id": company_id, "company_name": name, "average_salary": avg_salary}
        for company_id, name, avg_salary in top_paying_companies
    ]

    return jsonify({"data": result}), 200


"""
Show the top 5 categories (other than IT/Software Development) that the postings are cross listed under based on the volume of postings
"""


@random_query.route("/top_categories")
def top_categories():
    excluded_category = "IT/Software Development"
    limit = 5

    category_counts = (
        db.session.query(
            JobCategory.job_category,
            func.count(JobCategory.job_id).label("postings_count"),
        )
        .filter(JobCategory.job_category != excluded_category)
        .group_by(JobCategory.job_category)
        .order_by(desc("postings_count"))
        .limit(limit)
    )

    # Execute the query and fetch the results
    top_categories = category_counts.all()

    # Convert the results to a list of dictionaries
    result = [
        {"category": category, "postings_count": count}
        for category, count in top_categories
    ]

    return jsonify({"data": result}), 200
