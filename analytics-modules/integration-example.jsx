// This is an example of how to integrate the analytics modules into your main application

// 1. Import statements for App.jsx or main router file
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnalyticsDashboard from './analytics-modules/AnalyticsDashboard';

// 2. Example App component with routing
function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="logo">
              <Link to="/">akrun Analytics</Link>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="#services">Services</a></li>
                <li><Link to="/analytics-dashboard">Analytics Dashboard</Link></li>
                <li><Link to="/founder">About Founder</Link></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/founder" element={<FounderPage />} />
          {/* Add other routes as needed */}
        </Routes>
        
        {/* Footer component */}
      </div>
    </Router>
  );
}

// 3. Alternative approach: Add individual modules to specific pages
// Example of using just one module in an existing page
import BitcoinPredictor from './analytics-modules/bitcoin-prediction/BitcoinPredictor';

function FinanceInsightsPage() {
  return (
    <div className="finance-insights">
      <h1>Financial Market Insights</h1>
      <p>Our advanced analytics help you make informed financial decisions.</p>
      
      {/* Add the Bitcoin prediction module */}
      <section className="bitcoin-analysis">
        <BitcoinPredictor />
      </section>
      
      {/* Rest of the page content */}
    </div>
  );
}

// 4. Example of adding a direct link in the homepage to specific analytics
function ServiceSection() {
  return (
    <section id="services" className="services">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {/* Other service cards */}
        
        <div className="service-card">
          <h3>Advanced Analytics</h3>
          <p>Transform raw data into meaningful insights using advanced statistical analysis and visualization techniques.</p>
          <div className="service-links">
            <Link to="/analytics-dashboard?tab=bitcoin" className="service-link">Bitcoin Prediction</Link>
            <Link to="/analytics-dashboard?tab=clustering" className="service-link">Country Clustering</Link>
            <Link to="/analytics-dashboard?tab=inequality" className="service-link">Gender Inequality Map</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
