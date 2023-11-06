from flask import Blueprint, request, jsonify

from ..extension import db
from ..models import Application, User, JobPosting, Company


application = Blueprint("application", __name__, url_prefix="/application")


# add an application for existing job posting
@application.route("/", methods=["POST"])
def apply():
    data = request.json
    user_email = data.get("user_email")
    job_id = data.get("job_id")
    application_date = data.get("application_date")
    cover_letter = data.get("cover_letter")

    if not user_email:
        return jsonify({"message": "Missing email"}), 400
    if not job_id:
        return jsonify({"message": "Missing job id"}), 400

    user = User.query.filter_by(email=user_email).first()
    job_posting = JobPosting.query.filter_by(job_id=job_id).first()
    if not user:
        return jsonify({"message": "User doesn't exist"}), 400
    if not job_posting:
        return jsonify({"message": "Job posting doesn't exist"}), 400

    new_application = Application(
        user_email=user_email,
        job_id=job_id,
        application_date=application_date,
        cover_letter=cover_letter,
    )

    try:
        db.session.add(new_application)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e.args[0])}), 500

    return jsonify({"message": "Successfully applied"}), 200


@application.route("/u/<user_email>")
def get_user_applications(user_email):
    # Perform an explicit join and select only the required columns
    applications = (
        db.session.query(
            Application.application_date,
            Application.cover_letter,
            JobPosting.title,
            JobPosting.location,
            Company.name,
        )
        .join(JobPosting, Application.job_id == JobPosting.job_id)
        .outerjoin(Company, JobPosting.company_id == Company.company_id)
        .filter(Application.user_email == user_email)
        .order_by(Application.application_date.desc())
        .all()
    )

    # Construct the applications list with only the necessary information
    applications_list = [
        {
            "application_date": application_date.isoformat()
            if application_date
            else None,
            "cover_letter": cover_letter,
            "job_title": title,
            "job_location": location,
            "company_name": name,
        }
        for application_date, cover_letter, title, location, name in applications
    ]

    return jsonify(applications_list), 200
