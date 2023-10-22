from .extension import db
from flask_login import UserMixin


class Company(db.Model):
    __tablename__ = "company"
    company_id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255))
    established_year = db.Column(db.Integer)
    size = db.Column(db.String(255))
    location = db.Column(db.String(255))
    description = db.Column(db.Text)
    website = db.Column(db.String(255))

    # relationships
    industries = db.relationship("CompanyIndustry", back_populates="company")
    job_postings = db.relationship("JobPosting", back_populates="company")


class CompanyIndustry(db.Model):
    __tablename__ = "company_industry"
    company_id = db.Column(
        db.String(255), db.ForeignKey("company.company_id"), primary_key=True
    )
    company_industry = db.Column(db.String(255), primary_key=True)

    # relationships
    company = db.relationship("Company", back_populates="industries")


class JobPosting(db.Model):
    __tablename__ = "job_posting"
    job_id = db.Column(db.String(255), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    experience_needed = db.Column(db.String(255))
    career_level = db.Column(db.String(255))
    education_level = db.Column(db.String(255))
    salary = db.Column(db.String(255))
    description = db.Column(db.Text)
    requirements = db.Column(db.Text)
    open_positions = db.Column(db.Integer)
    company_id = db.Column(db.String(255), db.ForeignKey("company.company_id"))

    # relationships
    company = db.relationship("Company", back_populates="job_postings")
    categories = db.relationship("JobCategory", back_populates="job_posting")
    skills = db.relationship("JobSkill", back_populates="job_posting")
    employment_basis = db.relationship("EmploymentBasis", back_populates="job_posting")
    applications = db.relationship("Application", back_populates="job_posting")


class JobCategory(db.Model):
    __tablename__ = "job_category"
    job_id = db.Column(
        db.String(255), db.ForeignKey("job_posting.job_id"), primary_key=True
    )
    job_category = db.Column(db.String(255), primary_key=True)

    # relationships
    job_posting = db.relationship("JobPosting", back_populates="categories")


class JobSkill(db.Model):
    __tablename__ = "job_skill"
    job_id = db.Column(
        db.String(255), db.ForeignKey("job_posting.job_id"), primary_key=True
    )
    skill = db.Column(db.String(255), primary_key=True)

    # relationships
    job_posting = db.relationship("JobPosting", back_populates="skills")


class EmploymentBasis(db.Model):
    __tablename__ = "employment_basis"
    job_id = db.Column(
        db.String(255), db.ForeignKey("job_posting.job_id"), primary_key=True
    )
    employment_basis = db.Column(db.String(255), primary_key=True)

    # relationships
    job_posting = db.relationship("JobPosting", back_populates="employment_basis")


class User(db.Model, UserMixin):
    __tablename__ = "user"
    email = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(255))
    birth_date = db.Column(db.Date)
    gpa = db.Column(db.Numeric(3, 2))
    user_name = db.Column(db.String(255))

    # relationships
    skills = db.relationship("UserSkill", back_populates="user")
    applications = db.relationship("Application", back_populates="user")

    # methods
    def get_id(self):
        return self.email


class UserSkill(db.Model):
    __tablename__ = "user_skill"
    user_email = db.Column(
        db.String(255), db.ForeignKey("user.email"), primary_key=True
    )
    user_skill = db.Column(db.String(255), primary_key=True)

    # relationships
    user = db.relationship("User", back_populates="skills")


class Application(db.Model):
    __tablename__ = "application"
    user_email = db.Column(
        db.String(255), db.ForeignKey("user.email"), primary_key=True
    )
    job_id = db.Column(
        db.String(255), db.ForeignKey("job_posting.job_id"), primary_key=True
    )
    application_date = db.Column(db.Date)
    cover_letter = db.Column(db.Text)

    # relationships
    user = db.relationship("User", back_populates="applications")
    job_posting = db.relationship("JobPosting", back_populates="applications")
