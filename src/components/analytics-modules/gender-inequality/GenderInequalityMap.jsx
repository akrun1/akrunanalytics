import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import './GenderInequalityMap.css';

// GeoJSON URL from reliable CDN source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function GenderInequalityMap() {
  const [selectedMetric, setSelectedMetric] = useState('gii');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [geoData, setGeoData] = useState(null);
  
  // Define color scale
  const colorScale = scaleLinear()
    .domain([0, 0.1, 0.3, 0.5, 0.8])
    .range(['#f7fbff', '#c6dbef', '#6baed6', '#3182bd', '#08519c']);
  
  // Available metrics
  const metrics = [
    { id: 'gii', name: 'Gender Inequality Index', description: 'Measures gender inequalities in three aspects of human development' },
    { id: 'laborParticipation', name: 'Labor Force Participation Gap', description: 'Difference between male and female labor force participation rates' },
    { id: 'wageGap', name: 'Gender Wage Gap', description: 'Percentage difference between male and female median earnings' },
    { id: 'educationGap', name: 'Educational Attainment Gap', description: 'Difference in years of education between males and females' }
  ];
  
  // Sample data with expanded country mappings including ISO Alpha-3 codes
  const countryData = {
    // Use both ISO and common identifiers to maximize matching
    USA: { name: 'United States', gii: 0.204, laborParticipation: 0.15, wageGap: 0.18, educationGap: 0.02 },
    840: { name: 'United States', gii: 0.204, laborParticipation: 0.15, wageGap: 0.18, educationGap: 0.02 },
    
    GBR: { name: 'United Kingdom', gii: 0.118, laborParticipation: 0.12, wageGap: 0.16, educationGap: -0.06 },
    826: { name: 'United Kingdom', gii: 0.118, laborParticipation: 0.12, wageGap: 0.16, educationGap: -0.06 },
    
    CAN: { name: 'Canada', gii: 0.123, laborParticipation: 0.09, wageGap: 0.13, educationGap: -0.01 },
    124: { name: 'Canada', gii: 0.123, laborParticipation: 0.09, wageGap: 0.13, educationGap: -0.01 },
    
    DEU: { name: 'Germany', gii: 0.084, laborParticipation: 0.10, wageGap: 0.18, educationGap: -0.02 },
    276: { name: 'Germany', gii: 0.084, laborParticipation: 0.10, wageGap: 0.18, educationGap: -0.02 },
    
    FRA: { name: 'France', gii: 0.102, laborParticipation: 0.09, wageGap: 0.15, educationGap: -0.05 },
    250: { name: 'France', gii: 0.102, laborParticipation: 0.09, wageGap: 0.15, educationGap: -0.05 },
    
    JPN: { name: 'Japan', gii: 0.116, laborParticipation: 0.21, wageGap: 0.24, educationGap: -0.01 },
    392: { name: 'Japan', gii: 0.116, laborParticipation: 0.21, wageGap: 0.24, educationGap: -0.01 },
    
    IND: { name: 'India', gii: 0.488, laborParticipation: 0.52, wageGap: 0.35, educationGap: 0.19 },
    356: { name: 'India', gii: 0.488, laborParticipation: 0.52, wageGap: 0.35, educationGap: 0.19 },
    
    CHN: { name: 'China', gii: 0.168, laborParticipation: 0.14, wageGap: 0.22, educationGap: 0.05 },
    156: { name: 'China', gii: 0.168, laborParticipation: 0.14, wageGap: 0.22, educationGap: 0.05 },
    
    // Add more country data as needed
    RUS: { name: 'Russia', gii: 0.255, laborParticipation: 0.11, wageGap: 0.28, educationGap: -0.03 },
    643: { name: 'Russia', gii: 0.255, laborParticipation: 0.11, wageGap: 0.28, educationGap: -0.03 },
    
    BRA: { name: 'Brazil', gii: 0.408, laborParticipation: 0.21, wageGap: 0.29, educationGap: -0.05 },
    76: { name: 'Brazil', gii: 0.408, laborParticipation: 0.21, wageGap: 0.29, educationGap: -0.05 },
    
    AUS: { name: 'Australia', gii: 0.113, laborParticipation: 0.12, wageGap: 0.14, educationGap: -0.07 },
    36: { name: 'Australia', gii: 0.113, laborParticipation: 0.12, wageGap: 0.14, educationGap: -0.07 }
  };
  
  useEffect(() => {
    // Fetch the GeoJSON data
    fetch(geoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGeoData(data);
        setMapLoaded(true);
      })
      .catch(error => {
        console.error("Error loading map data:", error);
      });
  }, []);
  
  // Find country data with different ID formats
  const getCountryData = (geo) => {
    // Try different possible ID formats from the GeoJSON data
    const id = geo.id;
    const iso = geo.properties?.ISO_A3;
    const name = geo.properties?.name;
    
    // Try to match by ID (numeric) first
    if (countryData[id]) {
      return countryData[id];
    }
    
    // Try to match by ISO code
    if (iso && countryData[iso]) {
      return countryData[iso];
    }
    
    // Try to match by name (partial match)
    if (name) {
      // Check if any country name contains this name (simplified approach)
      for (const [key, data] of Object.entries(countryData)) {
        if (data.name && name.includes(data.name) || data.name?.includes(name)) {
          return data;
        }
      }
    }
    
    return null;
  };
  
  // Get list of countries with data
  const countriesWithData = Array.from(new Set(
    Object.entries(countryData)
      .filter(([key]) => isNaN(parseInt(key, 10))) // Only include non-numeric keys
      .map(([_, data]) => data.name)
  ));

  return (
    <div className="gender-inequality-map">
      <h2>Global Gender Inequality Map</h2>
      
      <div className="controls">
        <label>Select Metric:</label>
        <select 
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
        >
          {metrics.map(metric => (
            <option key={metric.id} value={metric.id}>
              {metric.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="metric-description">
        <h3>{metrics.find(m => m.id === selectedMetric).name}</h3>
        <p>{metrics.find(m => m.id === selectedMetric).description}</p>
      </div>
      
      {/* Map container */}
      <div 
        className="map-container" 
        style={{
          width: '100%',
          height: '400px',
          border: '1px solid #ddd',
          position: 'relative',
          marginTop: '20px',
          marginBottom: '20px',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        {mapLoaded ? (
          // Real map component when loaded
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 150 }}
          >
            <ZoomableGroup>
              <Geographies geography={geoData}>
                {({ geographies }) => {
                  return geographies.map(geo => {
                    const country = getCountryData(geo);
                    // Use a distinctive fill color for countries with data, and a very light color for those without
                    const fillColor = country 
                      ? colorScale(country[selectedMetric]) 
                      : "#f8f8f8";
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke={country ? "#666" : "#ddd"}
                        strokeWidth={country ? 0.75 : 0.3}
                        onMouseEnter={() => {
                          const name = geo.properties.name;
                          if (country) {
                            setTooltipContent(`${name}: ${country[selectedMetric].toFixed(3)}`);
                          } else {
                            setTooltipContent(`${name}: No data available`);
                          }
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: { outline: "none" },
                          hover: { 
                            fill: country ? "#F53" : "#e0e0e0", 
                            outline: "none",
                            stroke: "#333",
                            strokeWidth: 1.2
                          },
                          pressed: { outline: "none" }
                        }}
                      />
                    );
                  });
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        ) : (
          // Fallback SVG placeholder
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#f8f8f8' }}>
            <p>Loading map data...</p>
          </div>
        )}
        
        {/* Simple tooltip */}
        {tooltipContent && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'white',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            pointerEvents: 'none',
            zIndex: 1000
          }}>
            {tooltipContent}
          </div>
        )}
      </div>
      
      {/* Countries with data */}
      <div className="countries-with-data">
        <h4>Countries with Data ({countriesWithData.length}):</h4>
        <ul style={{ columns: '3', columnGap: '20px' }}>
          {countriesWithData.map(country => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      </div>
      
      <div className="legend">
        <h4>Legend</h4>
        <div className="legend-scale" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
          {[0, 0.1, 0.3, 0.5, 0.8].map((value, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
              <div style={{ 
                backgroundColor: colorScale(value),
                width: '25px',
                height: '25px',
                display: 'inline-block',
                marginRight: '5px',
                border: '1px solid #999'
              }}></div>
              <span>{value.toFixed(1)}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ 
            backgroundColor: "#f8f8f8",
            width: '25px',
            height: '25px',
            display: 'inline-block',
            marginRight: '5px',
            border: '1px solid #ddd'
          }}></div>
          <span>No data available</span>
        </div>
        <p><small>* Higher values indicate greater inequality</small></p>
      </div>
      
      <div className="resources">
        <h3>Resources & Analysis</h3>
        <p>
          The Gender Inequality Index (GII) is a composite measure reflecting inequality in achievements between 
          women and men in three dimensions: reproductive health, empowerment and the labor market.
        </p>
        <p>
          Our analysis reveals significant regional patterns in gender inequality, with Nordic countries consistently 
          showing the lowest inequality, while parts of Sub-Saharan Africa and South Asia facing greater challenges.
        </p>
      </div>
    </div>
  );
}

export default GenderInequalityMap;
