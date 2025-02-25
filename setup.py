from setuptools import setup, find_packages

setup(
    name="akrunanalytics",
    version="1.0.0",
    packages=find_packages(),
    include_package_data=True,
    package_data={
        'akrunanalytics': [
            'templates/*',
            'static/*',
        ],
    },
    install_requires=[
        'flask',
        'flask-cors',
        'flask-login',
        'flask-sqlalchemy',
        'gunicorn',
        'python-dotenv',
        'plotly',
        'dash',
        'pandas',
        'numpy',
        'scikit-learn',
        'psycopg2-binary',
    ],
    python_requires='>=3.11',
)
