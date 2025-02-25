from flask import Flask, render_template

# Create Flask app
app = Flask(__name__)

# Basic routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test')
def test():
    return 'Hello from AKrun Analytics!'

load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')

# Configure database
try:
    database_url = os.getenv('DATABASE_URL')
    if database_url:
        # Heroku provides DATABASE_URL, but we need to modify it for SQLAlchemy
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://', 1)
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
        app.logger.info(f'Using database URL: {database_url}')
    else:
        # Local development uses SQLite
        sqlite_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'analytics.db')
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{sqlite_path}'
        app.logger.info(f'Using SQLite database at: {sqlite_path}')

    # Additional database configuration
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_size': 5,
        'max_overflow': 2,
        'pool_timeout': 30,
        'pool_recycle': 1800,
    }
except Exception as e:
    app.logger.error(f'Error configuring database: {str(e)}')
    # Set a fallback SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.logger.info('Using fallback in-memory SQLite database')

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

def init_db():
    """Initialize the database and create default user"""
    try:
        # Drop all tables first to handle schema changes
        db.drop_all()
        app.logger.info('Dropped existing tables')
        
        # Create tables with updated schema
        db.create_all()
        app.logger.info('Database tables created successfully')
        
        # Create default user
        default_user = User(
            email='admin@akrun.com',
            password=generate_password_hash('admin123', method='sha256')
        )
        db.session.add(default_user)
        db.session.commit()
        app.logger.info('Created default admin user')
            
    except Exception as e:
        app.logger.error(f'Database initialization error: {str(e)}')
        db.session.rollback()
        raise

# Initialize database
try:
    with app.app_context():
        # Try to query the database to check connection
        db.engine.execute('SELECT 1')
        app.logger.info('Database connection successful')
        
        # Initialize database
        init_db()
except Exception as e:
    app.logger.error(f'Could not initialize database: {str(e)}')
    # Don't raise the exception - let the app continue without DB

class User(UserMixin, db.Model):
    """User model with increased password field length for scrypt hashes"""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)  # Increased length for scrypt hash

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
    try:
        app.logger.info('Accessing home route')
        app.logger.info(f'Available templates: {os.listdir(app.template_folder)}')
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f'Error in home route: {str(e)}')
        return str(e), 500

@app.route('/test')
def test():
    return 'Hello from AKrun Analytics!'

@app.route('/founder')
def founder():
    return render_template('founder.html')

@app.route('/snake-game')
def snake_game():
    return render_template('snake-game.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')
            app.logger.debug(f'Login attempt for email: {email}')
            
            try:
                user = User.query.filter_by(email=email).first()
                if user:
                    app.logger.debug('User found, checking password')
                    if check_password_hash(user.password, password):
                        login_user(user)
                        app.logger.info(f'Successful login for {email}')
                        return redirect(url_for('dashboard'))
                    app.logger.warning(f'Invalid password for {email}')
                else:
                    app.logger.warning(f'No user found with email: {email}')
                return 'Invalid credentials'
            except Exception as db_error:
                app.logger.error(f'Database error during login: {str(db_error)}')
                return 'Login service temporarily unavailable', 503
        
        return render_template('login.html')
    except Exception as e:
        app.logger.error(f'Error in login route: {str(e)}')
        return 'Login page temporarily unavailable', 503

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    try:
        return render_template('dashboard.html')
    except Exception as e:
        app.logger.error(f'Error accessing dashboard: {str(e)}')
        return 'Dashboard temporarily unavailable', 503

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
