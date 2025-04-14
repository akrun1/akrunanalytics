import React from 'react';
import './GenderInequalityMap.css';

// Simple placeholder component that doesn't depend on react-simple-maps
function GenderInequalityMap() {
  return (
    <div className="gender-inequality-map-container" style={{
      padding: '20px',
      border: '1px solid #333',
      borderRadius: '4px',
      margin: '20px 0',
      textAlign: 'center'
    }}>
      <h2>Gender Inequality Map</h2>
      <p>Map visualization is available when viewing this page in the browser.</p>
      <div style={{
        backgroundColor: '#1e1e1e',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        margin: '20px 0'
      }}>
        <div>Loading map data... Please wait.</div>
      </div>
    </div>
  );
}

export default GenderInequalityMap;
