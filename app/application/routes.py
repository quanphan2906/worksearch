from flask import Blueprint, request, jsonify

from ..extension import db
from ..models import User, Application


application = Blueprint("application", __name__, url_prefix="/application")
