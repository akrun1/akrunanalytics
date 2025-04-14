import React from 'react';
import { Link } from 'react-router-dom';

function AppSimple() {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>akrun Analytics</h1>
        <p>A simplified version of the app for testing router functionality</p>
      </header>
      
      <main>
        <section style={{ marginBottom: '2rem' }}>
          <h2>Welcome to akrun Analytics</h2>
          <p>This is a simplified version of the App component that doesn't depend on external components or services.</p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Navigation</h3>
            <ul>
              <li>
                <Link to="/" style={{ color: '#3366cc' }}>Home</Link>
              </li>
              <li>
                <Link to="/analytics-test" style={{ color: '#3366cc' }}>Analytics Test Harness</Link>
              </li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2>Debug Information</h2>
          <p>Current URL: {window.location.href}</p>
          <p>Path: {window.location.pathname}</p>
        </section>
      </main>
      
      <footer style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <p> {new Date().getFullYear()} akrun Analytics</p>
      </footer>
    </div>
  );
}

export default AppSimple;
