import os
import sys
import logging
from flask import Flask, render_template, send_from_directory, request
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
import datetime

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

# Set up database
if os.environ.get('DATABASE_URL'):
    # Use PostgreSQL on Heroku
    postgresql_url = os.environ.get('DATABASE_URL')
    # Heroku's DATABASE_URL starts with postgres://, but SQLAlchemy requires postgresql://
    if postgresql_url.startswith('postgres://'):
        postgresql_url = postgresql_url.replace('postgres://', 'postgresql://', 1)
    logger.info(f'Using PostgreSQL database from environment variable')
    app.config['SQLALCHEMY_DATABASE_URI'] = postgresql_url
else:
    # Use SQLite locally
    logger.info('Using SQLite database')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

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
        logger.info('Creating database tables if they do not exist')
        # Check if tables exist before creating them
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        logger.info(f'Existing tables: {tables}')
        
        if 'user' not in tables:
            logger.info('Creating user table')
            db.create_all()
        else:
            logger.info('Tables already exist, skipping creation')
        
        # Check if user exists - use raw SQL to avoid SQLAlchemy object conflicts
        try:
            # Use direct engine connection to check if user exists
            user_exists = False
            with db.engine.connect() as conn:
                result = conn.execute(db.text("SELECT COUNT(*) FROM user WHERE email = 'admin@akrun.com'"))
                count = result.scalar()
                user_exists = count > 0
                logger.info(f'Admin user exists check: {user_exists}')
            
            if not user_exists:
                logger.info('Creating default admin user')
                # Use direct SQL to insert user to avoid SQLAlchemy object conflicts
                with db.engine.connect() as conn:
                    hashed_password = generate_password_hash('admin123')
                    conn.execute(
                        db.text("INSERT INTO user (email, password) VALUES (:email, :password)"),
                        {"email": "admin@akrun.com", "password": hashed_password}
                    )
                    conn.commit()
                    logger.info('Default admin user created via direct SQL')
            else:
                logger.info('Default admin user already exists, skipping creation')
        except Exception as e:
            logger.exception(f'Error checking or creating user: {e}')
            # Continue despite user creation error
except Exception as e:
    logger.exception(f'Error during database initialization: {e}')
    logger.warning('Continuing application startup despite database error')

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def home():
    logger.info('Home route accessed')
    try:
        logger.info('Attempting to render index.html template')
        logger.debug(f'Template folder is: {app.template_folder}')
        logger.debug(f'Index template exists: {os.path.exists(os.path.join(app.template_folder, "index.html"))}')
        
        # List all templates for debugging
        template_path = os.path.join(app.template_folder, "index.html")
        logger.info(f'Absolute template path: {template_path}')
        
        return render_template('index.html')
    except Exception as e:
        logger.exception(f'Error rendering index.html: {e}')
        # Return a simple HTML page if template rendering fails
        return f'''
        <!DOCTYPE html>
        <html>
        <head>
            <title>AKrun Analytics - Error</title>
            <style>
                body {{ font-family: Arial, sans-serif; padding: 20px; }}
                h1 {{ color: #d9534f; }}
                pre {{ background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }}
            </style>
        </head>
        <body>
            <h1>Template Rendering Error</h1>
            <p>There was an error rendering the index.html template. Please check the logs for more details.</p>
            <pre>{str(e)}</pre>
            <p>Template folder: {app.template_folder}</p>
            <p>Template exists: {os.path.exists(os.path.join(app.template_folder, "index.html"))}</p>
        </body>
        </html>
        '''

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

@app.route('/plaintext')
def plaintext():
    logger.info('Plaintext route accessed')
    return 'This is a plain text response from the Flask app. It should always work.'

@app.route('/health')
def health_check():
    logger.info('Health check route accessed')
    response_data = {
        'status': 'ok',
        'timestamp': str(datetime.datetime.now()),
        'app_name': 'AKrun Analytics',
        'python_version': sys.version,
        'environment': os.environ.get('FLASK_ENV', 'unknown'),
        'workers': os.environ.get('WEB_CONCURRENCY', 'unknown'),
        'dyno': os.environ.get('DYNO', 'unknown'),
        'request_id': request.headers.get('X-Request-ID', 'unknown'),
        'host': request.host,
        'path': request.path,
        'url': request.url,
        'method': request.method,
        'user_agent': request.headers.get('User-Agent', 'unknown'),
        'template_folder': app.template_folder,
        'template_folder_exists': os.path.exists(app.template_folder),
        'template_files': os.listdir(app.template_folder) if os.path.exists(app.template_folder) else [],
    }
    
    # Add available template engines
    try:
        response_data['template_engines'] = str(app.jinja_env.list_templates())
    except Exception as e:
        response_data['template_engines_error'] = str(e)
    
    # Convert to HTML
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Health Check</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: green; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>AKrun Analytics Health Check</h1>
        <table>
            <tr>
                <th>Property</th>
                <th>Value</th>
            </tr>
    """
    
    for key, value in response_data.items():
        if isinstance(value, list):
            html += f"<tr><td>{key}</td><td>{', '.join(value)}</td></tr>"
        else:
            html += f"<tr><td>{key}</td><td>{value}</td></tr>"
    
    html += """
        </table>
    </body>
    </html>
    """
    
    return html

@app.route('/debug')
def debug_info():
    logger.info('Debug route accessed')
    
    try:
        # Collect debug information
        debug_data = {
            'sys.path': sys.path,
            'current_dir': os.getcwd(),
            'package_dir': package_dir,
            'template_dir': templates_dir,
            'template_dir_exists': os.path.exists(templates_dir),
            'app_template_folder': app.template_folder,
        }
        
        # Get selected environment variables (avoid exposing all for security)
        env_vars = {}
        important_vars = ['PYTHONPATH', 'PATH', 'PWD', 'FLASK_APP', 'FLASK_ENV', 
                         'DYNO', 'PORT', 'DATABASE_URL']
        for var in important_vars:
            env_vars[var] = os.environ.get(var, 'Not set')
        debug_data['environment_selected'] = env_vars
        
        # Check if template directory exists and list contents
        if os.path.exists(templates_dir):
            try:
                debug_data['template_files'] = os.listdir(templates_dir)
            except Exception as e:
                debug_data['template_files_error'] = str(e)
        
        # Build HTML response
        html = ['<!DOCTYPE html><html><head><title>Debug Info</title><style>body { font-family: Arial; padding: 20px; }</style></head><body>']
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
    except Exception as e:
        logger.exception(f"Error in debug route: {e}")
        return f"""
        <!DOCTYPE html>
        <html>
        <head><title>Debug Error</title></head>
        <body>
            <h1>Error in Debug Route</h1>
            <p>An error occurred while gathering debug information: {str(e)}</p>
        </body>
        </html>
        """

@app.route('/static_test_file')
def serve_static_test():
    logger.info('Static test file route accessed')
    try:
        static_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static_test.html')
        logger.info(f'Static test file path: {static_file_path}')
        logger.info(f'Static test file exists: {os.path.exists(static_file_path)}')
        
        if os.path.exists(static_file_path):
            with open(static_file_path, 'r') as f:
                content = f.read()
            return content
        else:
            return f'''
            <!DOCTYPE html>
            <html>
            <head>
                <title>Static Test - Not Found</title>
            </head>
            <body>
                <h1>Static Test File Not Found</h1>
                <p>The static test file does not exist at: {static_file_path}</p>
                <p>Current working directory: {os.getcwd()}</p>
                <p>__file__: {__file__}</p>
                <p>Parent directory: {os.path.dirname(os.path.dirname(__file__))}</p>
            </body>
            </html>
            '''
    except Exception as e:
        logger.exception(f'Error serving static test file: {e}')
        return f'Error serving static test file: {str(e)}'

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
