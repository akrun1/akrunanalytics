from setuptools import setup, find_packages

setup(
    name="akrunanalytics",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    package_data={
        'akrunanalytics': ['templates/*', '*.html'],
    },
    install_requires=[
        'flask>=3.0.0',
        'gunicorn>=21.2.0',
        'flask-login>=0.6.2',
        'flask-sqlalchemy>=3.0.0',
        'werkzeug>=3.0.0',
        'psycopg2>=2.9.9',
    ],
    python_requires='>=3.11',
)
