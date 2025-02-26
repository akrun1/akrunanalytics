// Simple debugging component to verify React is mounting correctly
import React, { useEffect } from 'react';

const Debug = () => {
  useEffect(() => {
    console.log('Debug component mounted');
    const rootElement = document.getElementById('root');
    console.log('Root element:', rootElement);
    
    // Check if styles are applied
    if (rootElement) {
      const styles = window.getComputedStyle(rootElement);
      console.log('Root styles:', {
        maxWidth: styles.maxWidth,
        margin: styles.margin,
        padding: styles.padding,
        textAlign: styles.textAlign
      });
    }
  }, []);

  return (
    <div style={{ border: '2px solid red', padding: '20px', margin: '20px', backgroundColor: '#333' }}>
      <h2 style={{ color: 'white' }}>Debug Component</h2>
      <p style={{ color: 'white' }}>If you can see this, React is rendering correctly</p>
    </div>
  );
};

export default Debug;
