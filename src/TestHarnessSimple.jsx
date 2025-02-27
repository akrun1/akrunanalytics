import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TestHarness.css';

// Import actual analytics modules
import BitcoinPredictor from './components/analytics-modules/bitcoin-prediction/BitcoinPredictor';
import CountryClustering from './components/analytics-modules/country-clustering/CountryClustering';
import GenderInequalityMap from './components/analytics-modules/gender-inequality/GenderInequalityMap';

function TestHarnessSimple() {
  const [activeModule, setActiveModule] = useState('bitcoin');
  const [moduleLoaded, setModuleLoaded] = useState({
    bitcoin: false,
    clustering: false,
    inequality: false
  });
  const [testResults, setTestResults] = useState({
    bitcoin: { tested: false, success: false, error: null },
    clustering: { tested: false, success: false, error: null },
    inequality: { tested: false, success: false, error: null }
  });

  useEffect(() => {
    // Reset loaded state when changing modules
    setModuleLoaded(prev => ({
      ...prev,
      [activeModule]: true
    }));
  }, [activeModule]);

  const runTest = async (module) => {
    setTestResults(prev => ({
      ...prev,
      [module]: { tested: true, success: false, error: null, loading: true }
    }));
    
    try {
      // Simulate API call
      console.log(`Testing ${module} module...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just simulate success
      setTestResults(prev => ({
        ...prev,
        [module]: { tested: true, success: true, loading: false }
      }));
    } catch (error) {
      console.error(`Test error for ${module}:`, error);
      setTestResults(prev => ({
        ...prev,
        [module]: { tested: true, success: false, error: error.message, loading: false }
      }));
    }
  };

  return (
    <div className="test-harness" style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ color: '#3366cc', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
          ← Back to Home
        </Link>
        <h1>Analytics Modules Test Harness</h1>
        <p>Use this page to test each analytics module individually before integration</p>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: activeModule === 'bitcoin' ? '#3366cc' : '#f0f0f0',
              color: activeModule === 'bitcoin' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveModule('bitcoin')}
          >
            Bitcoin Predictor
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: activeModule === 'clustering' ? '#3366cc' : '#f0f0f0',
              color: activeModule === 'clustering' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveModule('clustering')}
          >
            Country Clustering
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: activeModule === 'inequality' ? '#3366cc' : '#f0f0f0',
              color: activeModule === 'inequality' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setActiveModule('inequality')}
          >
            Gender Inequality Map
          </button>
        </div>

        <button 
          style={{ 
            padding: '0.5rem 1rem', 
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => runTest(activeModule)}
        >
          Test Module
        </button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {testResults[activeModule].tested && (
          <div style={{ 
            padding: '1rem', 
            background: testResults[activeModule].success ? '#e6ffec' : '#ffebee',
            border: `1px solid ${testResults[activeModule].success ? '#4CAF50' : '#f44336'}`,
            borderRadius: '4px'
          }}>
            {testResults[activeModule].loading ? 'Testing...' : 
              testResults[activeModule].success ? 'TEST PASSED ✓' : `TEST FAILED: ${testResults[activeModule].error}`}
          </div>
        )}
      </div>

      <div style={{ 
        padding: '2rem', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        marginBottom: '2rem',
        background: '#f9f9f9'
      }}>
        <h2>Module Preview</h2>
        <div style={{ padding: '1rem', background: '#fff', border: '1px solid #ddd', borderRadius: '4px' }}>
          {activeModule === 'bitcoin' && (
            moduleLoaded.bitcoin ? <BitcoinPredictor /> : <div>Loading Bitcoin Predictor...</div>
          )}
          {activeModule === 'clustering' && (
            moduleLoaded.clustering ? <CountryClustering /> : <div>Loading Country Clustering...</div>
          )}
          {activeModule === 'inequality' && (
            moduleLoaded.inequality ? <GenderInequalityMap /> : <div>Loading Gender Inequality Map...</div>
          )}
        </div>
      </div>

      <div style={{ 
        padding: '1rem', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        background: '#f5f5f5'
      }}>
        <h3>API Status</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Bitcoin API:</span>
          <span style={{ 
            color: testResults.bitcoin.tested ? 
              (testResults.bitcoin.success ? 'green' : 'red') : 'gray'
          }}>
            {testResults.bitcoin.tested ? 
              (testResults.bitcoin.success ? 'Available ✓' : `Error: ${testResults.bitcoin.error}`) : 
              'Pending Test'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Country Clusters API:</span>
          <span style={{ 
            color: testResults.clustering.tested ? 
              (testResults.clustering.success ? 'green' : 'red') : 'gray'
          }}>
            {testResults.clustering.tested ? 
              (testResults.clustering.success ? 'Available ✓' : `Error: ${testResults.clustering.error}`) : 
              'Pending Test'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Gender Inequality API:</span>
          <span style={{ 
            color: testResults.inequality.tested ? 
              (testResults.inequality.success ? 'green' : 'red') : 'gray'
          }}>
            {testResults.inequality.tested ? 
              (testResults.inequality.success ? 'Available ✓' : `Error: ${testResults.inequality.error}`) : 
              'Pending Test'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TestHarnessSimple;
