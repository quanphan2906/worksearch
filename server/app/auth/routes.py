from flask import Blueprint, request, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from ..extension import db
from ..models import User


auth = Blueprint("auth", __name__, url_prefix="/auth")


@auth.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    gender = data.get("gender")
    birth_date = data.get("birthdate")
    gpa = data.get("gpa")
    user_name = data.get("user_name")

    if email is None or password is None:
        return jsonify({"message": "Make sure email and password exists"}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Email already exists."}), 200

    if len(email) < 4:
        return jsonify({"message": "Email must be greater than 3 characters."}), 400

    if len(password) < 7:
        return jsonify({"message": "Password must be at least 7 characters."}), 400

    new_user = User(
        email=email,
        password=generate_password_hash(password, method="sha256"),
        gender=gender,
        birth_date=birth_date,
        gpa=gpa,
        user_name=user_name,
    )
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user, remember=True)

    user_data = {
        "email": new_user.email,
        "gender": new_user.gender,
        "birth_date": new_user.birth_date,
        "gpa": new_user.gpa,
        "user_name": new_user.user_name,
    }

    return jsonify({"message": "Registration succeeds", "data": user_data}), 200


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Email does not exist"}), 400

    if not check_password_hash(user.password, password):
        return jsonify({"message": "Incorrect password, try again"}), 400

    login_user(user, remember=True)
    print("current_user.is_authenticated", current_user.is_authenticated)

    # Return the user data in the response
    user_data = {
        "email": user.email,
        "gender": user.gender,
        "birth_date": user.birth_date,
        "gpa": user.gpa,
        "user_name": user.user_name,
    }

    return jsonify({"message": "Logged in", "data": user_data}), 200


@auth.route("/logout")
# @login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out succeed!"}), 200
