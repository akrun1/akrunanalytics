import os
import sys
import logging
from flask import Flask, render_template, request
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

# Setup more detailed logging
logging.basicConfig(level=logging.DEBUG, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('akrunanalytics')
logger.setLevel(logging.DEBUG)

# Log essential startup information
logger.info('Starting AKrun Analytics application')
logger.debug(f'Current working directory: {os.getcwd()}')
logger.debug(f'Python path: {sys.path}')

package_dir = os.path.abspath(os.path.dirname(__file__))
logger.info(f'Package directory: {package_dir}')

# Explicitly set template folder
templates_dir = os.path.join(package_dir, 'templates')
logger.info(f'Templates directory: {templates_dir}')

# Create Flask app with explicit template_folder
app = Flask(__name__, template_folder=templates_dir)
logger.info('Flask app created with explicit template folder')

# Log template directory contents
try:
    if os.path.exists(templates_dir):
        logger.info(f'Template directory exists: {templates_dir}')
        template_files = os.listdir(templates_dir)
        logger.info(f'Template files: {template_files}')
    else:
        logger.error(f'Template directory does not exist: {templates_dir}')
except Exception as e:
    logger.exception(f'Error checking template directory: {e}')

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
logger.info('Flask app configured')

# Initialize database
db = SQLAlchemy(app)
logger.info('Database initialized')

# Login manager
login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)
logger.info('Login manager initialized')

# Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

# Create database and default user
try:
    with app.app_context():
        logger.info('Creating database tables')
        db.create_all()
        
        # Create default user if not exists
        if not User.query.filter_by(email='admin@akrun.com').first():
            logger.info('Creating default admin user')
            default_user = User(email='admin@akrun.com', password=generate_password_hash('admin123'))
            db.session.add(default_user)
            db.session.commit()
            logger.info('Default admin user created')
        else:
            logger.info('Default admin user already exists')
except Exception as e:
    logger.exception(f'Error during database initialization: {e}')

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def home():
    logger.info('Home route accessed')
    try:
        logger.debug(f'Attempting to render template: index.html')
        response = render_template('index.html')
        logger.debug('Template rendered successfully')
        return response
    except Exception as e:
        logger.exception(f'Error rendering index.html: {e}')
        return f'Error rendering template: {str(e)}'

@app.route('/test')
def test():
    logger.info('Test route accessed')
    return 'Hello from AKrun Analytics!'

@app.route('/static_test')
def static_test():
    logger.info('Static test route accessed')
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>AKrun Static Test</title>
    </head>
    <body>
        <h1>This is a static test page</h1>
        <p>If you can see this, the server is working correctly but may have issues with templates.</p>
    </body>
    </html>
    '''

@app.route('/static_file')
def static_file():
    logger.info('Static file route accessed')
    static_file_path = os.path.join(package_dir, 'static_index.html')
    logger.debug(f'Static file path: {static_file_path}')
    logger.debug(f'Static file exists: {os.path.exists(static_file_path)}')
    
    try:
        with open(static_file_path, 'r') as f:
            content = f.read()
        logger.debug('Static file read successfully')
        return content
    except Exception as e:
        logger.exception(f'Error reading static file: {e}')
        return f'Error reading static file: {str(e)}'

@app.route('/debug')
def debug_info():
    logger.info('Debug route accessed')
    
    # Collect debug information
    debug_data = {
        'environment': dict(os.environ),
        'sys.path': sys.path,
        'current_dir': os.getcwd(),
        'package_dir': package_dir,
        'template_dir': templates_dir,
        'template_dir_exists': os.path.exists(templates_dir),
        'app_template_folder': app.template_folder,
    }
    
    # Check if template directory exists and list contents
    if os.path.exists(templates_dir):
        debug_data['template_files'] = os.listdir(templates_dir)
    
    # Build HTML response
    html = ['<!DOCTYPE html><html><head><title>Debug Info</title></head><body>']
    html.append('<h1>AKrun Analytics Debug Info</h1>')
    
    # Add each debug section
    for section, data in debug_data.items():
        html.append(f'<h2>{section}</h2>')
        if isinstance(data, dict):
            html.append('<ul>')
            for key, value in data.items():
                html.append(f'<li><strong>{key}:</strong> {value}</li>')
            html.append('</ul>')
        elif isinstance(data, list):
            html.append('<ul>')
            for item in data:
                html.append(f'<li>{item}</li>')
            html.append('</ul>')
        else:
            html.append(f'<p>{data}</p>')
    
    html.append('</body></html>')
    return '\n'.join(html)

# Add error handlers to log issues
@app.errorhandler(404)
def page_not_found(e):
    logger.error(f'404 error: {request.path}')
    return 'Page not found', 404

@app.errorhandler(500)
def server_error(e):
    logger.error(f'500 error: {str(e)}')
    return 'Server error', 500

logger.info('AKrun Analytics app initialization complete')
