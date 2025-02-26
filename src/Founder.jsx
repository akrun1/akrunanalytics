import { Link } from 'react-router-dom';
import './Founder.css';

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
              {/* Placeholder for founder image */}
              <div className="image-placeholder">
                <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#1a1a1a" />
                  <circle cx="100" cy="80" r="50" fill="#333" />
                  <circle cx="100" cy="230" r="100" fill="#333" />
                </svg>
              </div>
            </div>
            <div className="founder-details">
              <h1>About the Founder</h1>
              <h2>Arun Kumar</h2>
              <p className="founder-title">Founder & CEO, Data Scientist</p>
              <p className="founder-bio">
                With over 15 years of experience in the fields of data science, machine learning, and business analytics, 
                Arun Kumar founded akrun Analytics with a vision to democratize data science and make advanced analytics 
                accessible to businesses of all sizes.
              </p>
              <p className="founder-bio">
                Prior to founding akrun Analytics, Arun held leadership positions at several Fortune 500 companies 
                where he led data science teams and spearheaded digital transformation initiatives that generated 
                millions in revenue and operational efficiencies.
              </p>
              <div className="founder-credentials">
                <div className="credential">
                  <span className="credential-type">Education</span>
                  <span className="credential-detail">Ph.D. in Computer Science, Stanford University</span>
                </div>
                <div className="credential">
                  <span className="credential-type">Expertise</span>
                  <span className="credential-detail">Machine Learning, Predictive Analytics, Neural Networks</span>
                </div>
                <div className="credential">
                  <span className="credential-type">Publications</span>
                  <span className="credential-detail">25+ research papers in top-tier journals</span>
                </div>
              </div>
            </div>
          </section>

          <section className="founder-journey">
            <h2>Professional Journey</h2>
            
            <div className="journey-timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2023 - Present</h3>
                  <h4>Founder & CEO</h4>
                  <p>akrun Analytics</p>
                  <p>
                    Founded akrun Analytics to provide cutting-edge data science and analytics 
                    solutions to businesses seeking to harness the power of their data assets.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2018 - 2023</h3>
                  <h4>Chief Data Scientist</h4>
                  <p>Global Tech Innovations</p>
                  <p>
                    Led a team of 30 data scientists and engineers to develop AI-driven 
                    solutions that increased business efficiency by 42% and customer 
                    satisfaction by 28%.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2015 - 2018</h3>
                  <h4>Head of Analytics</h4>
                  <p>FinTech Solutions Inc.</p>
                  <p>
                    Established the analytics department from the ground up, implementing 
                    data-driven strategies that contributed to 125% revenue growth 
                    over three years.
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3>2010 - 2015</h3>
                  <h4>Research Scientist</h4>
                  <p>Advanced Analytics Research Institute</p>
                  <p>
                    Conducted groundbreaking research in machine learning algorithms 
                    that resulted in 12 patents and numerous publications.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="founder-philosophy">
            <h2>Leadership Philosophy</h2>
            <div className="philosophy-content">
              <blockquote>
                "Data without insights is just numbers. Our mission is to transform data into 
                actionable intelligence that drives meaningful business outcomes and innovation."
              </blockquote>
              
              <p>
                Arun believes in a collaborative approach to data science, where technical 
                expertise is combined with deep business understanding to create solutions 
                that not only solve immediate problems but also establish sustainable 
                frameworks for continued growth and adaptation.
              </p>
              
              <p>
                Under his leadership, akrun Analytics has developed a reputation for delivering 
                high-impact analytics solutions that are technically sophisticated yet 
                accessible and implementable for businesses at various stages of data maturity.
              </p>
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
