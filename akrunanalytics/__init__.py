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
