import { Link } from 'react-router-dom';
import './Analytics.css';

function Analytics() {
  return (
    <div className="analytics-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">akrun Analytics</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/analytics" className="active">Analytics</Link></li>
              <li><Link to="/founder">About Founder</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="content">
        <div className="container">
          <h1>Analytics Solutions</h1>
          
          <section className="analytics-overview">
            <h2>Our Analytics Expertise</h2>
            <p>
              At akrun Analytics, we transform raw data into actionable business intelligence. 
              Our team specializes in deploying sophisticated analytical methods to help organizations 
              unlock the full potential of their data assets.
            </p>
            
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Descriptive Analytics</h3>
                <p>
                  Understand what happened with comprehensive data summaries, 
                  visualizations, and historical trend analysis that distills complex information 
                  into clear, actionable insights.
                </p>
              </div>
              
              <div className="analytics-card">
                <h3>Diagnostic Analytics</h3>
                <p>
                  Discover why events occurred through correlation analysis, 
                  drill-down exploration, and root cause identification to understand 
                  the factors driving your business outcomes.
                </p>
              </div>
              
              <div className="analytics-card">
                <h3>Predictive Analytics</h3>
                <p>
                  Anticipate future trends using machine learning models, 
                  forecasting algorithms, and pattern recognition to help you 
                  prepare for what's coming next.
                </p>
              </div>
              
              <div className="analytics-card">
                <h3>Prescriptive Analytics</h3>
                <p>
                  Determine optimal actions with decision support systems, 
                  optimization algorithms, and scenario modeling that helps you 
                  make the right strategic choices.
                </p>
              </div>
            </div>
          </section>
          
          <section className="tools-section">
            <h2>Analytics Toolkit</h2>
            <p>
              We leverage industry-leading technologies and frameworks to deliver 
              robust analytics solutions tailored to your specific needs.
            </p>
            
            <div className="tools-grid">
              <div className="tool-item">
                <h4>Data Processing</h4>
                <ul>
                  <li>Python (Pandas, NumPy)</li>
                  <li>R Studio</li>
                  <li>Apache Spark</li>
                  <li>SQL & NoSQL databases</li>
                </ul>
              </div>
              
              <div className="tool-item">
                <h4>Data Visualization</h4>
                <ul>
                  <li>Tableau</li>
                  <li>Power BI</li>
                  <li>D3.js</li>
                  <li>Matplotlib & Seaborn</li>
                </ul>
              </div>
              
              <div className="tool-item">
                <h4>Machine Learning</h4>
                <ul>
                  <li>Scikit-learn</li>
                  <li>TensorFlow</li>
                  <li>PyTorch</li>
                  <li>XGBoost</li>
                </ul>
              </div>
              
              <div className="tool-item">
                <h4>Cloud Platforms</h4>
                <ul>
                  <li>AWS (Amazon SageMaker)</li>
                  <li>Google Cloud (BigQuery)</li>
                  <li>Azure (Azure Synapse)</li>
                  <li>Databricks</li>
                </ul>
              </div>
            </div>
          </section>
          
          <section className="case-studies">
            <h2>Client Success Stories</h2>
            
            <div className="case-study">
              <h3>Retail Inventory Optimization</h3>
              <p>
                Developed a predictive inventory management system for a retail chain 
                that reduced stockouts by 37% and decreased carrying costs by 18%, 
                resulting in annual savings of $2.4 million.
              </p>
            </div>
            
            <div className="case-study">
              <h3>Healthcare Patient Flow Analysis</h3>
              <p>
                Created a patient journey analytics platform for a hospital network 
                that improved resource allocation, reduced wait times by 24%, and 
                increased patient satisfaction scores by 15%.
              </p>
            </div>
            
            <div className="case-study">
              <h3>Financial Risk Assessment</h3>
              <p>
                Built a machine learning-based risk scoring model for a financial institution 
                that increased fraud detection by 42% while reducing false positives by 31%, 
                protecting over $50 million in transactions.
              </p>
            </div>
          </section>
          
          <div className="cta-section">
            <h2>Ready to Transform Your Data?</h2>
            <p>
              Discover how our analytics solutions can drive growth and innovation for your organization.
            </p>
            <Link to="/#contact" className="cta-button">Get Started</Link>
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

export default Analytics;
