from flask import Blueprint, request, jsonify
from ..models import Company, JobPosting, JobSkill


query = Blueprint("query", __name__, url_prefix="/query")
