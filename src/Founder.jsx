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
              <span className="credential-detail">Ph.D. in Quantitative Genetics, University of Maryland, College Park</span>
            </div>
            
            <h2>Publications</h2>
            <div className="credential">
              <h3>Journal Articles</h3>
              <ul className="publications-list">
                <li>AK, Sasikala-Appukuttan et al. (2008). "The feeding value of corn distillers solubles for lactating dairy cows". In: <em>Journal of Dairy Science</em> 91.1, p. 279-287.</li>
                <li>AK, Sasikala-Appukuttan et al. (2010). "Genetic variation in nitrogen and phosphorus content in broiler excreta". In: <em>Genomics and Quantitative Genetics</em> 1, p. 4-12.</li>
                <li>AK, Sasikala-Appukuttan et al. (2013). "Location and dynamics of the immunodominant CD8 T cell response to SIV∆nef immunization and SIVmac251 vaginal challenge". In: <em>PLOS ONE</em> 8(12), e81623.</li>
                <li>CHEN, Qing et al. (2023). "Global gene expression analysis reveals complex cuticle organization of the Tribolium compound eye". In: <em>Genome Biology and Evolution</em> 15.1, evac181.</li>
              </ul>
            </div>
            
            <div className="credential">
              <h3>Conference Proceedings</h3>
              <ul className="publications-list">
                <li>AK, Sasikala-Appukuttan et Friedrich M (2012). "A functional genomic screen for phototransduction genes in Tribolium". In: <em>Drosophila Annual Research Conference</em>. IL, USA.</li>
                <li>F, Siewerdt et Sasikala-Appukuttan AK (2008). "Genetic variation in fecal nitrogen and phosphorus levels in broilers: opportunity for improving both birds and the environment". In: <em>Proceedings of the 57<sup>th</sup> National Breeders Roundtable</em>. MO, USA.</li>
                <li>Q, Luan, Sasikala-Appukuttan AK et Friedrich M (2012). "Region specific patterning function of pax6 in the developing embryonic head of Tribolium". In: <em>Drosophila Annual Research Conference</em>. IL, USA.</li>
              </ul>
            </div>
            
            <div className="credential">
              <h3>Thesis</h3>
              <ul className="publications-list">
                <li>AK, Sasikala-Appukuttan (2006). "The feeding value of Corn Distillers Solubles for Lactating Dairy Cows". MSc thesis. SD, USA: South Dakota State University.</li>
                <li>(2010). "Genetic variation in nitrogen and phosphorus levels in broiler excreta: Opportunity for improving both birds and the environment". Thèse de doct. MD, USA: University of Maryland.</li>
              </ul>
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
