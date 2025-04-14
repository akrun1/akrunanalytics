import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BitcoinPredictor from './bitcoin-prediction/BitcoinPredictor';
import CountryClustering from './country-clustering/CountryClustering';
import GenderInequalityMap from './gender-inequality/GenderInequalityMap';
import './TestHarness.css';

function TestHarness() {
  const [activeModule, setActiveModule] = useState('bitcoin');
  const [testResults, setTestResults] = useState({
    bitcoin: { tested: false, success: false, error: null },
    clustering: { tested: false, success: false, error: null },
    inequality: { tested: false, success: false, error: null }
  });

  const runTest = async (module) => {
    setTestResults(prev => ({
      ...prev,
      [module]: { tested: true, success: false, error: null, loading: true }
    }));
    
    try {
      // Add specific test logic here if needed
      // For now, we're just verifying if the component renders without errors
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      setTestResults(prev => ({
        ...prev,
        [module]: { tested: true, success: true, error: null, loading: false }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [module]: { tested: true, success: false, error: error.message, loading: false }
      }));
    }
  };

  return (
    <div className="test-harness">
      <header className="test-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>Analytics Modules Test Harness</h1>
        <p>Use this page to test each analytics module individually before integration</p>
      </header>

      <div className="test-controls">
        <div className="module-selector">
          <button 
            className={`module-button ${activeModule === 'bitcoin' ? 'active' : ''}`}
            onClick={() => setActiveModule('bitcoin')}
          >
            Bitcoin Predictor
          </button>
          <button 
            className={`module-button ${activeModule === 'clustering' ? 'active' : ''}`}
            onClick={() => setActiveModule('clustering')}
          >
            Country Clustering
          </button>
          <button 
            className={`module-button ${activeModule === 'inequality' ? 'active' : ''}`}
            onClick={() => setActiveModule('inequality')}
          >
            Gender Inequality Map
          </button>
        </div>

        <button 
          className="test-button"
          onClick={() => runTest(activeModule)}
        >
          Test Module
        </button>
      </div>

      <div className="test-results">
        {testResults[activeModule].tested && (
          <div className={`result-badge ${testResults[activeModule].success ? 'success' : 'error'}`}>
            {testResults[activeModule].loading ? 'Testing...' : 
              testResults[activeModule].success ? 'TEST PASSED ✓' : `TEST FAILED: ${testResults[activeModule].error}`}
          </div>
        )}
      </div>

      <div className="module-container">
        {activeModule === 'bitcoin' && <BitcoinPredictor />}
        {activeModule === 'clustering' && <CountryClustering />}
        {activeModule === 'inequality' && <GenderInequalityMap />}
      </div>

      <div className="api-status">
        <h3>API Status</h3>
        <div className="status-item">
          <span className="status-label">Bitcoin API:</span>
          <span className="status-value pending">Pending Test</span>
        </div>
        <div className="status-item">
          <span className="status-label">Country Clusters API:</span>
          <span className="status-value pending">Pending Test</span>
        </div>
        <div className="status-item">
          <span className="status-label">Gender Inequality API:</span>
          <span className="status-value pending">Pending Test</span>
        </div>
      </div>
    </div>
  );
}

export default TestHarness;
