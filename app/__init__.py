from flask import Flask
from .extension import db
from .auth.routes import auth
from .application.routes import application
from flask_login import LoginManager


def create_app(config_file="config.py"):
    # Init
    app = Flask(__name__)

    # Init db and config
    app.config.from_pyfile(config_file)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth)
    app.register_blueprint(application)

    # Login Manager
    from .models import User

    login_manager = LoginManager()
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(email):
        return User.query.get(email)

    return app
