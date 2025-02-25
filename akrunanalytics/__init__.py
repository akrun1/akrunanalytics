from flask import Flask, render_template
import os
import logging
import sys

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Get package directory
package_dir = os.path.abspath(os.path.dirname(__file__))

# Create Flask app with explicit template folder
app = Flask(__name__,
           template_folder=os.path.join(package_dir, 'templates'))

# Enable debug mode
app.config['DEBUG'] = True

# Basic routes
@app.route('/')
def home():
    app.logger.debug(f'Python version: {sys.version}')
    app.logger.debug(f'Template folder: {app.template_folder}')
    app.logger.debug(f'Package directory: {package_dir}')
    app.logger.debug(f'Current directory: {os.getcwd()}')
    
    try:
        app.logger.debug(f'Directory contents: {os.listdir(os.getcwd())}')
        app.logger.debug(f'Package contents: {os.listdir(package_dir)}')
        app.logger.debug(f'Templates path exists: {os.path.exists(app.template_folder)}')
        if os.path.exists(app.template_folder):
            app.logger.debug(f'Templates directory contents: {os.listdir(app.template_folder)}')
    except Exception as e:
        app.logger.error(f'Error listing directories: {str(e)}')
    
    return render_template('index.html')

@app.route('/test')
def test():
    return 'Hello from AKrun Analytics!'
