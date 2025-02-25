from flask import Flask, render_template, jsonify, request, current_app, redirect, url_for, flash
from flask_cors import CORS
from flask_login import LoginManager, login_required, UserMixin, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import logging
import sys
import os

app = Flask(__name__)
CORS(app)

# Configure logging
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)

# Enable debugging
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Configure SQLAlchemy and Login Manager
from dotenv import load_dotenv

load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///analytics.db')
if app.config['SQLALCHEMY_DATABASE_URI'].startswith('postgres://'):
    app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'].replace('postgres://', 'postgresql://', 1)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Create tables and add a default user if none exists
with app.app_context():
    db.create_all()
    if not User.query.filter_by(email='admin@akrun.com').first():
        default_user = User(email='admin@akrun.com',
                          password=generate_password_hash('admin123'))
        db.session.add(default_user)
        db.session.commit()

# Remove login_required from home route
@app.route('/')
def home():
    app.logger.info('Accessing home route')
    try:
        app.logger.debug(f'Template folder: {current_app.template_folder}')
        app.logger.debug(f'Available templates: {os.listdir(current_app.template_folder)}')
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f'Error rendering home page: {str(e)}')
        return f'Error: {str(e)}', 500

@app.route('/founder')
def founder():
    return render_template('founder.html')

@app.route('/snake-game')
def snake_game():
    return render_template('snake-game.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        return 'Invalid credentials'
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/analytics/summary')
@login_required
def get_analytics_summary():
    data = {
        'total_users': 1000,
        'active_users': 750,
        'revenue_growth': 15.5,
        'key_metrics': {
            'engagement_rate': 68.5,
            'conversion_rate': 12.3,
            'retention_rate': 85.2
        }
    }
    return jsonify(data)
