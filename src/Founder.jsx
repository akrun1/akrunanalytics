import { Link } from 'react-router-dom';
import './Founder.css';
import founderImage from './assets/founder.jpg';

function Founder() {
  return (
    <div className="founder-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">akrun Analytics</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/founder" className="active">About Founder</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="content">
        <div className="container">
          <section className="founder-intro">
            <div className="founder-image">
              <img src={founderImage} alt="Arun Kirshna Sasikala-Appukuttan" className="profile-image" />
            </div>
            <div className="founder-details">
              <h1>About the Founder</h1>
              <h2>Arun Kirshna Sasikala-Appukuttan</h2>
              <p className="founder-title">Data Scientist | Analytics Specialist | Analytics Consultant</p>
              
              <div className="founder-location">
                <p><span className="location-icon">📍</span> ON, Canada</p>
                <p><span className="email-icon">📧</span> akrun111@gmail.com</p>
              </div>
              
              <div className="founder-badge">
                <span>All-time Top 0.01% StackOverflow Contributor</span>
              </div>
              
              <p className="founder-bio">
                With over 15 years of experience in the fields of data science, machine learning, and business analytics, 
                Arun founded akrun Analytics with a vision to democratize data science and make advanced analytics 
                accessible to businesses of all sizes.
              </p>
            </div>
          </section>

          <section className="technical-expertise">
            <h2>Technical Expertise</h2>
            
            <div className="expertise-grid">
              <div className="expertise-card">
                <h3>Programming Languages</h3>
                <p>R, Python, SAS, Java, GoLang, Julia</p>
              </div>
              
              <div className="expertise-card">
                <h3>Development Tools</h3>
                <p>RStudio, PyCharm IntelliJ, Linux, Visual Studio Code, JupyterLab, Eclipse, git</p>
              </div>
              
              <div className="expertise-card">
                <h3>Machine Learning</h3>
                <p>PyTorch, TensorFlow, scikit-learn, Prophet, H2O, Keras</p>
                <p>Neural Networks, Deep Learning, ML Algorithms</p>
              </div>
              
              <div className="expertise-card">
                <h3>Big Data & Analytics</h3>
                <p>Hadoop, Spark, R, PostgreSQL, MongoDB, MySQL</p>
                <p>Statistical techniques and modeling</p>
              </div>
            </div>
          </section>
          
          <section className="founder-credentials">
            <h2>Education</h2>
            <div className="credential">
              <span className="credential-detail">Ph.D. in Computer Science, Stanford University</span>
            </div>
            
            <h2>Publications</h2>
            <div className="credential">
              <span className="credential-detail">25+ research papers in top-tier journals</span>
            </div>
          </section>
          
          <div className="cta-section">
            <h2>Connect with Arun</h2>
            <p>
              Interested in discussing how data science can transform your business?
            </p>
            <Link to="/#contact" className="cta-button">Get in Touch</Link>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} akrun Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Founder;
