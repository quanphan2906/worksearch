from flask import Blueprint, request, jsonify

from ..extension import db
from ..models import Application


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
        return jsonify({"message": "Missing email", "status": 400})
    if not job_id:
        return jsonify({"message": "Missing job id", "status": 400})

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
        return jsonify(
            {"message": str(e.args[0]), "status": getattr(e, "status", None)}
        )

    return jsonify({"message": "Successfully applied", "status": 200})
