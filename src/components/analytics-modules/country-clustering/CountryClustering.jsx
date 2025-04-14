import React from 'react';
import './CountryClustering.css';

// Simplified placeholder component that doesn't depend on react-chartjs-2
function CountryClustering() {
  return (
    <div className="country-clustering-container" style={{
      padding: '20px',
      border: '1px solid #333',
      borderRadius: '4px',
      margin: '20px 0',
      textAlign: 'center'
    }}>
      <h2>Country Clustering Analysis</h2>
      <p>Clustering visualization is available when viewing this page in the browser.</p>
      <div style={{
        backgroundColor: '#1e1e1e',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        margin: '20px 0'
      }}>
        <div>Loading clustering data... Please wait.</div>
      </div>
    </div>
  );
}

export default CountryClustering;
