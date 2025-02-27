import React from 'react';
import './GenderInequalityMap.css';

// Enhanced placeholder component with visual elements
function GenderInequalityMap() {
  // Mock data for gender inequality index
  const mockRegions = [
    { name: 'North America', gii: 0.18, color: '#3498db' },
    { name: 'Europe', gii: 0.16, color: '#2ecc71' },
    { name: 'Asia', gii: 0.32, color: '#f39c12' },
    { name: 'South America', gii: 0.39, color: '#9b59b6' },
    { name: 'Africa', gii: 0.56, color: '#e74c3c' },
    { name: 'Oceania', gii: 0.22, color: '#1abc9c' }
  ];

  return (
    <div className="gender-inequality-map-container">
      <h2>Global Gender Inequality Index</h2>
      <p className="description">
        This visualization maps the Gender Inequality Index (GII) across regions, highlighting areas 
        where disparities in reproductive health, empowerment, and economic status between genders 
        are most pronounced.
      </p>
      
      <div className="visualization-container">
        <div className="world-map">
          {/* Static world map visualization with region blocks */}
          <div className="map-container">
            <div className="north-america region" style={{ backgroundColor: mockRegions[0].color }}>
              <span className="region-name">North America</span>
            </div>
            <div className="europe region" style={{ backgroundColor: mockRegions[1].color }}>
              <span className="region-name">Europe</span>
            </div>
            <div className="asia region" style={{ backgroundColor: mockRegions[2].color }}>
              <span className="region-name">Asia</span>
            </div>
            <div className="south-america region" style={{ backgroundColor: mockRegions[3].color }}>
              <span className="region-name">South America</span>
            </div>
            <div className="africa region" style={{ backgroundColor: mockRegions[4].color }}>
              <span className="region-name">Africa</span>
            </div>
            <div className="oceania region" style={{ backgroundColor: mockRegions[5].color }}>
              <span className="region-name">Oceania</span>
            </div>
          </div>
          
          <div className="map-legend">
            <h3>Gender Inequality Index (GII)</h3>
            <div className="legend-scale">
              <div className="scale-gradient"></div>
              <div className="scale-labels">
                <span>0.0 (Equality)</span>
                <span>1.0 (Inequality)</span>
              </div>
            </div>
            
            <ul className="region-list">
              {mockRegions.map((region, index) => (
                <li key={index} className="region-item">
                  <span className="region-color" style={{ backgroundColor: region.color }}></span>
                  <span className="region-name">{region.name}:</span>
                  <span className="region-value">GII {region.gii.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="key-indicators">
        <h3>Key Indicators</h3>
        <div className="indicators-grid">
          <div className="indicator-card">
            <h4>Maternal Mortality</h4>
            <p>Deaths per 100,000 live births</p>
            <div className="indicator-bar-container">
              <div className="indicator-bar" style={{ width: '70%' }}></div>
              <span className="indicator-value">211</span>
            </div>
          </div>
          
          <div className="indicator-card">
            <h4>Adolescent Birth Rate</h4>
            <p>Births per 1,000 women ages 15-19</p>
            <div className="indicator-bar-container">
              <div className="indicator-bar" style={{ width: '60%' }}></div>
              <span className="indicator-value">42.5</span>
            </div>
          </div>
          
          <div className="indicator-card">
            <h4>Parliament Seats</h4>
            <p>% held by women</p>
            <div className="indicator-bar-container">
              <div className="indicator-bar" style={{ width: '25%' }}></div>
              <span className="indicator-value">25.6%</span>
            </div>
          </div>
          
          <div className="indicator-card">
            <h4>Secondary Education</h4>
            <p>% of female population with at least some secondary education</p>
            <div className="indicator-bar-container">
              <div className="indicator-bar" style={{ width: '65%' }}></div>
              <span className="indicator-value">65.1%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="analysis-notes">
        <h3>Insights</h3>
        <p>
          Gender inequality remains a significant challenge globally, with stark regional variations. 
          The Gender Inequality Index (GII) reflects inequalities in reproductive health, empowerment, 
          and economic status.
        </p>
        <p>
          Countries with high gender equality typically show stronger economic performance, highlighting 
          that closing gender gaps isn't just a moral imperative but also an economic opportunity for 
          sustainable development.
        </p>
      </div>
    </div>
  );
}

export default GenderInequalityMap;
