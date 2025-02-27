import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup,
  Sphere,
  Graticule
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import './GenderInequalityMap.css';

// URL to the world geography data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const GenderInequalityMap = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch gender inequality data
        const response = await fetch('/.netlify/functions/gender-inequality');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gender inequality data');
        }
        
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        setData(result.countries);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching gender inequality data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Scale for coloring countries based on inequality index
  // Lower values (more equality) are green, higher values (more inequality) are red
  const colorScale = scaleLinear()
    .domain([0, 0.3, 0.7, 1])
    .range(['#25a244', '#ffeb3b', '#ff9800', '#d32f2f']);
  
  // Handle map zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (pos) => {
    setPosition(pos);
  };
  
  // Handle tooltip content
  const handleMouseEnter = (geo, current) => {
    setTooltipContent(`
      <div class="country-tooltip">
        <h4>${geo.properties.name}</h4>
        ${current ? `
          <p><strong>Inequality Index:</strong> ${current.inequalityIndex.toFixed(3)}</p>
          <p><strong>Women in Leadership:</strong> ${current.womenInLeadership}%</p>
          <p><strong>Pay Gap:</strong> ${current.payGap}%</p>
          <p><strong>Education Gap:</strong> ${current.educationGap}%</p>
        ` : '<p>No data available</p>'}
      </div>
    `);
    setTooltipVisible(true);
  };
  
  const handleMouseLeave = () => {
    setTooltipContent('');
    setTooltipVisible(false);
  };
  
  const handleCountryClick = (geo, current) => {
    if (current) {
      setSelectedCountry({
        name: geo.properties.name,
        ...current
      });
    }
  };
  
  // Format data for ranking tables
  const getMostEqualCountries = () => {
    if (!data || data.length === 0) return [];
    return [...data]
      .sort((a, b) => a.inequalityIndex - b.inequalityIndex)
      .slice(0, 5);
  };
  
  const getLeastEqualCountries = () => {
    if (!data || data.length === 0) return [];
    return [...data]
      .sort((a, b) => b.inequalityIndex - a.inequalityIndex)
      .slice(0, 5);
  };
  
  const mostEqual = getMostEqualCountries();
  const leastEqual = getLeastEqualCountries();
  
  return (
    <div className="gender-inequality-map">
      <h2>Global Gender Inequality</h2>
      
      <div className="map-description">
        <p>
          This visualization shows gender inequality levels around the world, with a focus on economic
          and leadership positions. Countries colored in green have better gender equality, while 
          those in red face significant challenges.
        </p>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading gender inequality data...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="map-container" data-tip="">
            <div className="map-controls">
              <button onClick={handleZoomIn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button onClick={handleZoomOut}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            
            <ComposableMap 
              data-tip=""
              projectionConfig={{ 
                scale: 150,
                rotation: [-11, 0, 0]
              }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                maxZoom={4}
              >
                <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const current = data.find(d => d.iso === geo.properties.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={() => handleCountryClick(geo, current)}
                          onMouseEnter={() => handleMouseEnter(geo, current)}
                          onMouseLeave={handleMouseLeave}
                          fill={current ? colorScale(current.inequalityIndex) : "#F5F4F6"}
                          style={{
                            default: {
                              stroke: "#FFFFFF",
                              strokeWidth: 0.5,
                              outline: "none"
                            },
                            hover: {
                              stroke: "#FFFFFF",
                              strokeWidth: 1,
                              outline: "none",
                              fill: current ? colorScale(current.inequalityIndex * 0.8) : "#F5F4F6"
                            },
                            pressed: {
                              stroke: "#FFFFFF",
                              strokeWidth: 1,
                              outline: "none",
                              fill: current ? colorScale(current.inequalityIndex * 0.7) : "#F5F4F6"
                            }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            
            <ReactTooltip 
              className="map-tooltip" 
              html={true} 
              type="light"
              effect="float"
            >
              {tooltipContent}
            </ReactTooltip>
            
            <div className="color-legend">
              <div className="legend-item">
                <div className="color-box" style={{ backgroundColor: colorScale(0) }}></div>
                <span>High Equality</span>
              </div>
              <div className="legend-item">
                <div className="color-box" style={{ backgroundColor: colorScale(0.3) }}></div>
                <span>Moderate Equality</span>
              </div>
              <div className="legend-item">
                <div className="color-box" style={{ backgroundColor: colorScale(0.7) }}></div>
                <span>Moderate Inequality</span>
              </div>
              <div className="legend-item">
                <div className="color-box" style={{ backgroundColor: colorScale(1) }}></div>
                <span>High Inequality</span>
              </div>
            </div>
          </div>
          
          <div className="country-rankings">
            <div className="ranking-column">
              <h3>Most Equal Countries</h3>
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>Index</th>
                  </tr>
                </thead>
                <tbody>
                  {mostEqual.map((country, index) => (
                    <tr key={country.name}>
                      <td>{index + 1}</td>
                      <td>{country.name}</td>
                      <td className="positive">{country.inequalityIndex.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="ranking-column">
              <h3>Least Equal Countries</h3>
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    <th>Index</th>
                  </tr>
                </thead>
                <tbody>
                  {leastEqual.map((country, index) => (
                    <tr key={country.name}>
                      <td>{index + 1}</td>
                      <td>{country.name}</td>
                      <td className="negative">{country.inequalityIndex.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {selectedCountry && (
            <div className="country-detail">
              <h3>{selectedCountry.name} - Gender Inequality Profile</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <h4>Inequality Index</h4>
                  <div className="index-bar-container">
                    <div 
                      className="index-bar" 
                      style={{ 
                        width: `${selectedCountry.inequalityIndex * 100}%`,
                        backgroundColor: colorScale(selectedCountry.inequalityIndex)
                      }}
                    ></div>
                  </div>
                  <p className="index-value">{selectedCountry.inequalityIndex.toFixed(3)}</p>
                </div>
                
                <div className="detail-item">
                  <h4>Women in Leadership</h4>
                  <p className="detail-value">{selectedCountry.womenInLeadership}%</p>
                </div>
                
                <div className="detail-item">
                  <h4>Pay Gap</h4>
                  <p className="detail-value">{selectedCountry.payGap}%</p>
                </div>
                
                <div className="detail-item">
                  <h4>Education Gap</h4>
                  <p className="detail-value">{selectedCountry.educationGap}%</p>
                </div>
              </div>
              
              <p className="detail-description">
                {selectedCountry.description || "No detailed description available for this country."}
              </p>
            </div>
          )}
          
          <div className="analysis-notes">
            <h3>Methodology</h3>
            <p>
              This analysis uses a composite index to measure gender inequality across multiple dimensions.
              The index incorporates representation of women in leadership positions, wage gaps, educational
              attainment differences, and other socioeconomic factors.
            </p>
            <p>
              <strong>Inequality Index:</strong> A composite score between 0 and 1, where values closer to 0 
              represent more equality and values closer to 1 indicate greater inequality.
            </p>
            <p>
              <strong>Women in Leadership:</strong> Percentage of women in senior management positions, 
              corporate boards, and political leadership.
            </p>
            <p>
              <strong>Pay Gap:</strong> The percentage difference between male and female earnings.
            </p>
            <p>
              <strong>Education Gap:</strong> The percentage difference in tertiary education 
              enrollment and completion between men and women.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GenderInequalityMap;
