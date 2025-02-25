from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_login import LoginManager, login_required
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import os

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

# Configure SQLAlchemy and Login Manager
import os
from dotenv import load_dotenv

load_dotenv()

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///analytics.db')
if app.config['SQLALCHEMY_DATABASE_URI'].startswith('postgres://'):
    app.config['SQLALCHEMY_DATABASE_URI'] = app.config['SQLALCHEMY_DATABASE_URI'].replace('postgres://', 'postgresql://', 1)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

@app.route('/')
def home():
    return send_from_directory('public', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('public', path)):
        return send_from_directory('public', path)
    return send_from_directory('public', 'index.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/analytics/summary')
@login_required
def get_analytics_summary():
    # Example analytics endpoint
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

@app.route('/api/analytics/predict', methods=['POST'])
@login_required
def predict_metrics():
    data = request.get_json()
    
    # Example predictive analytics
    try:
        df = pd.DataFrame(data['metrics'])
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df)
        
        # Simple example prediction (replace with actual ML model)
        prediction = np.mean(scaled_data, axis=0) * 1.1
        
        return jsonify({
            'success': True,
            'prediction': prediction.tolist(),
            'confidence': 0.85
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=8080, debug=True)
