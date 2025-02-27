import React, { useState, useEffect } from 'react';
import BitcoinPredictor from './bitcoin-prediction/BitcoinPredictor';
import CountryClustering from './country-clustering/CountryClustering';
import GenderInequalityMap from './gender-inequality/GenderInequalityMap';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('bitcoin');
  
  const handleContactClick = (e) => {
    e.preventDefault();
    window.location.href = '/#contact';
  };
  
  const renderActiveTab = () => {
    // Remove delayed mounting logic to ensure visualizations load immediately
    switch (activeTab) {
      case 'bitcoin':
        return <BitcoinPredictor />;
      case 'clustering':
        return <CountryClustering />;
      case 'inequality':
        return <GenderInequalityMap />;
      default:
        return <BitcoinPredictor />;
    }
  };
  
  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <h1>Data Analytics Showcase</h1>
        <button className="home-link" onClick={() => { window.location.replace('/'); }}>← Back to Home</button>
      </div>
      
      <div className="dashboard-description">
        <p>
          Welcome to our analytics showcase, demonstrating the power of data science and machine learning
          through interactive visualizations. Explore our case studies to see how we transform data into
          actionable insights.
        </p>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'bitcoin' ? 'active' : ''}`}
          onClick={() => setActiveTab('bitcoin')}
        >
          <span className="tab-icon">📈</span>
          Bitcoin Prediction
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'clustering' ? 'active' : ''}`}
          onClick={() => setActiveTab('clustering')}
        >
          <span className="tab-icon">🌐</span>
          Country Clustering
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'inequality' ? 'active' : ''}`}
          onClick={() => setActiveTab('inequality')}
        >
          <span className="tab-icon">⚖️</span>
          Gender Inequality Map
        </button>
      </div>
      
      <div className="tab-content">
        <div className="visualization-content">
          {renderActiveTab()}
        </div>
      </div>
      
      <div className="dashboard-footer">
        <h3>How We Can Help Your Organization</h3>
        <div className="services-grid">
          <div className="service-card">
            <h4>Predictive Analytics</h4>
            <p>
              Leverage historical data to forecast future trends, identify opportunities, and mitigate risks.
              Our predictive models help you stay ahead in a rapidly changing business environment.
            </p>
          </div>
          
          <div className="service-card">
            <h4>Pattern Recognition</h4>
            <p>
              Uncover hidden patterns and relationships in your data through advanced clustering and
              classification techniques. Transform complex datasets into clear, actionable insights.
            </p>
          </div>
          
          <div className="service-card">
            <h4>Interactive Visualizations</h4>
            <p>
              Communicate complex findings effectively through custom interactive dashboards. Make data
              accessible and meaningful to all stakeholders, regardless of technical background.
            </p>
          </div>
        </div>
        
        <div className="cta-section">
          <h4>Ready to transform your data into actionable insights?</h4>
          <button className="cta-button" onClick={() => { window.location.replace('/'); }}>Back to Home</button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
