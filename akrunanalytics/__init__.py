from flask import Flask, render_template
import os
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)

# Basic routes
@app.route('/')
def home():
    app.logger.debug(f'Template folder: {app.template_folder}')
    app.logger.debug(f'Current directory: {os.getcwd()}')
    app.logger.debug(f'Directory contents: {os.listdir(os.getcwd())}')
    app.logger.debug(f'Templates directory contents: {os.listdir(app.template_folder)}')
    return render_template('index.html')

@app.route('/test')
def test():
    return 'Hello from AKrun Analytics!'
