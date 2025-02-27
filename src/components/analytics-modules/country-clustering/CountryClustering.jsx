import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './CountryClustering.css';

// Register ChartJS components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function CountryClustering() {
  const [clusterData, setClusterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState({
    x: 'gdpPerCapita',
    y: 'healthExpenditure'
  });
  const [selectedCluster, setSelectedCluster] = useState(null);
  
  // Available metrics for analysis
  const metrics = [
    { id: 'gdpPerCapita', label: 'GDP Per Capita' },
    { id: 'healthExpenditure', label: 'Health Expenditure (% of GDP)' },
    { id: 'lifeExpectancy', label: 'Life Expectancy' },
    { id: 'educationIndex', label: 'Education Index' },
    { id: 'unemploymentRate', label: 'Unemployment Rate' }
  ];
  
  useEffect(() => {
    const fetchClusterData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching country data from World Bank API');
        
        // Use World Bank API for real data
        // Note: In real production, we'd use proper country clustering with ML
        // This is a simplified version using real World Bank data
        
        // Fetch World Bank data for health expenditure
        const healthResponse = await fetch(
          'https://api.worldbank.org/v2/country/all/indicator/SH.XPD.CHEX.GD.ZS?format=json&date=2020&per_page=300'
        );
        
        // Fetch World Bank data for GDP per capita
        const gdpResponse = await fetch(
          'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&date=2020&per_page=300'
        );
        
        // Fetch World Bank data for life expectancy
        const lifeExpResponse = await fetch(
          'https://api.worldbank.org/v2/country/all/indicator/SP.DYN.LE00.IN?format=json&date=2020&per_page=300'
        );
        
        // Fetch World Bank data for unemployment rate
        const unemploymentResponse = await fetch(
          'https://api.worldbank.org/v2/country/all/indicator/SL.UEM.TOTL.ZS?format=json&date=2020&per_page=300'
        );
        
        // Fetch World Bank data for education index (using secondary enrollment as proxy)
        const educationResponse = await fetch(
          'https://api.worldbank.org/v2/country/all/indicator/SE.SEC.ENRR?format=json&date=2020&per_page=300'
        );
        
        if (!healthResponse.ok || !gdpResponse.ok || !lifeExpResponse.ok || 
            !unemploymentResponse.ok || !educationResponse.ok) {
          throw new Error('One or more API requests failed');
        }
        
        const healthData = await healthResponse.json();
        const gdpData = await gdpResponse.json();
        const lifeExpData = await lifeExpResponse.json();
        const unemploymentData = await unemploymentResponse.json();
        const educationData = await educationResponse.json();
        
        // Process and combine the data
        const countryMap = new Map();
        
        // Process GDP data first
        if (gdpData && gdpData[1]) {
          gdpData[1].forEach(item => {
            if (item.value !== null) {
              countryMap.set(item.country.id, {
                country: item.country.value,
                gdpPerCapita: item.value,
                healthExpenditure: null,
                lifeExpectancy: null,
                educationIndex: null,
                unemploymentRate: null
              });
            }
          });
        }
        
        // Add health expenditure data
        if (healthData && healthData[1]) {
          healthData[1].forEach(item => {
            if (item.value !== null && countryMap.has(item.country.id)) {
              const country = countryMap.get(item.country.id);
              country.healthExpenditure = item.value;
              countryMap.set(item.country.id, country);
            }
          });
        }
        
        // Add life expectancy data
        if (lifeExpData && lifeExpData[1]) {
          lifeExpData[1].forEach(item => {
            if (item.value !== null && countryMap.has(item.country.id)) {
              const country = countryMap.get(item.country.id);
              country.lifeExpectancy = item.value;
              countryMap.set(item.country.id, country);
            }
          });
        }
        
        // Add unemployment data
        if (unemploymentData && unemploymentData[1]) {
          unemploymentData[1].forEach(item => {
            if (item.value !== null && countryMap.has(item.country.id)) {
              const country = countryMap.get(item.country.id);
              country.unemploymentRate = item.value;
              countryMap.set(item.country.id, country);
            }
          });
        }
        
        // Add education data
        if (educationData && educationData[1]) {
          educationData[1].forEach(item => {
            if (item.value !== null && countryMap.has(item.country.id)) {
              const country = countryMap.get(item.country.id);
              country.educationIndex = item.value / 100; // Normalize to 0-1 scale
              countryMap.set(item.country.id, country);
            }
          });
        }
        
        // Filter to countries with complete data
        const completeData = Array.from(countryMap.values())
          .filter(c => c.gdpPerCapita !== null && 
                      c.healthExpenditure !== null && 
                      c.lifeExpectancy !== null &&
                      c.educationIndex !== null &&
                      c.unemploymentRate !== null);
        
        // Simple K-means clustering (in production, we'd use a proper ML clustering algorithm)
        // Divide countries into 3 clusters based on GDP per capita for this demo
        const sortedByGDP = [...completeData].sort((a, b) => a.gdpPerCapita - b.gdpPerCapita);
        
        const clusterSize = Math.floor(sortedByGDP.length / 3);
        const cluster1 = sortedByGDP.slice(0, clusterSize).map(c => ({ ...c, cluster: 0 }));
        const cluster2 = sortedByGDP.slice(clusterSize, clusterSize * 2).map(c => ({ ...c, cluster: 1 }));
        const cluster3 = sortedByGDP.slice(clusterSize * 2).map(c => ({ ...c, cluster: 2 }));
        
        const clusteredData = [...cluster1, ...cluster2, ...cluster3];
        setClusterData(clusteredData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching country data:', err);
        setError('Failed to fetch country data. Using fallback data instead.');
        
        // If API fails, use mock data as fallback
        const generateMockData = () => {
          console.log('Using mock country clustering data as fallback');
          
          // Generate mock cluster data
          const generateMockCountry = (name, cluster, gdp, health, life, edu, unemployment) => ({
            country: name,
            cluster,
            gdpPerCapita: gdp,
            healthExpenditure: health,
            lifeExpectancy: life,
            educationIndex: edu,
            unemploymentRate: unemployment
          });
          
          const mockData = [
            // Cluster 0 - Lower Income Countries
            generateMockCountry("Ethiopia", 0, 936, 4.2, 66.2, 0.32, 19.1),
            generateMockCountry("Nigeria", 0, 2097, 3.9, 54.7, 0.42, 9.7),
            generateMockCountry("Bangladesh", 0, 1969, 2.3, 72.6, 0.54, 5.4),
            generateMockCountry("Pakistan", 0, 1194, 3.4, 67.3, 0.45, 4.5),
            generateMockCountry("Vietnam", 0, 2785, 5.9, 75.4, 0.63, 2.3),
            generateMockCountry("Cambodia", 0, 1512, 6.5, 69.8, 0.47, 0.7),
            generateMockCountry("Kenya", 0, 1838, 5.2, 66.7, 0.55, 5.7),
            generateMockCountry("Tanzania", 0, 1077, 4.1, 65.5, 0.38, 2.2),
            generateMockCountry("India", 0, 1927, 3.5, 69.7, 0.58, 8.0),
            generateMockCountry("Egypt", 0, 3548, 4.7, 72.0, 0.71, 9.2),
            
            // Cluster 1 - Middle Income Countries
            generateMockCountry("China", 1, 10500, 5.3, 77.4, 0.75, 5.0),
            generateMockCountry("Brazil", 1, 6796, 9.5, 75.9, 0.68, 13.5),
            generateMockCountry("Mexico", 1, 8329, 5.4, 75.1, 0.72, 4.7),
            generateMockCountry("Thailand", 1, 7189, 3.8, 77.7, 0.82, 1.0),
            generateMockCountry("Malaysia", 1, 10412, 3.8, 76.2, 0.79, 4.5),
            generateMockCountry("Russia", 1, 10126, 5.6, 72.6, 0.82, 5.7),
            generateMockCountry("Turkey", 1, 8538, 4.3, 77.7, 0.81, 13.1),
            generateMockCountry("South Africa", 1, 5656, 8.3, 64.1, 0.86, 28.5),
            generateMockCountry("Colombia", 1, 5332, 7.7, 77.3, 0.77, 15.0),
            generateMockCountry("Argentina", 1, 8442, 9.5, 76.7, 0.88, 11.5),
            
            // Cluster 2 - High Income Countries
            generateMockCountry("United States", 2, 63544, 16.8, 78.8, 0.97, 8.1),
            generateMockCountry("Germany", 2, 46208, 11.7, 81.2, 0.94, 3.8),
            generateMockCountry("United Kingdom", 2, 40285, 10.2, 81.3, 0.93, 4.5),
            generateMockCountry("Japan", 2, 40113, 10.7, 84.4, 0.95, 2.8),
            generateMockCountry("France", 2, 39030, 11.1, 82.5, 0.96, 8.0),
            generateMockCountry("Canada", 2, 43242, 10.8, 82.3, 0.97, 9.5),
            generateMockCountry("Australia", 2, 51693, 9.4, 83.4, 0.95, 6.5),
            generateMockCountry("Sweden", 2, 51925, 10.9, 82.4, 0.94, 8.3),
            generateMockCountry("Singapore", 2, 59798, 4.5, 83.5, 0.93, 3.0),
            generateMockCountry("Norway", 2, 67294, 10.5, 82.8, 0.96, 4.4)
          ];
          
          setClusterData(mockData);
          setLoading(false);
        };
        
        generateMockData();
      }
    };
    
    fetchClusterData();
  }, []);
  
  // Prepare scatter plot data
  const getScatterData = () => {
    if (!clusterData) return null;
    
    const datasets = [...new Set(clusterData.map(c => c.cluster))].map(cluster => {
      const clusterCountries = clusterData.filter(c => c.cluster === cluster);
      
      return {
        label: `Cluster ${cluster}`,
        data: clusterCountries.map(country => ({
          x: country[selectedMetrics.x],
          y: country[selectedMetrics.y],
          country: country.country
        })),
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
        pointRadius: 8,
        pointHoverRadius: 10
      };
    });
    
    return { datasets };
  };
  
  // Scatter plot options
  const scatterOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: metrics.find(m => m.id === selectedMetrics.x)?.label || selectedMetrics.x
        }
      },
      y: {
        title: {
          display: true,
          text: metrics.find(m => m.id === selectedMetrics.y)?.label || selectedMetrics.y
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return `${point.country}: (${point.x.toFixed(1)}, ${point.y.toFixed(1)})`;
          }
        }
      }
    }
  };
  
  const handleMetricChange = (axis, metricId) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [axis]: metricId
    }));
  };
  
  const toggleClusterSelection = (clusterId) => {
    if (selectedCluster === clusterId) {
      setSelectedCluster(null);
    } else {
      setSelectedCluster(clusterId);
    }
  };
  
  return (
    <div className="country-clustering">
      <h2>Country Economic Clustering Analysis</h2>
      
      <div className="controls">
        <div className="metric-selector">
          <label>X-Axis Metric:</label>
          <select 
            value={selectedMetrics.x}
            onChange={(e) => handleMetricChange('x', e.target.value)}
          >
            {metrics.map(metric => (
              <option key={metric.id} value={metric.id}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="metric-selector">
          <label>Y-Axis Metric:</label>
          <select 
            value={selectedMetrics.y}
            onChange={(e) => handleMetricChange('y', e.target.value)}
          >
            {metrics.map(metric => (
              <option key={metric.id} value={metric.id}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Loading cluster data...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="scatter-container">
            <Scatter data={getScatterData()} options={scatterOptions} />
          </div>
          
          <div className="cluster-info">
            <h3>Cluster Information</h3>
            <div className="cluster-buttons">
              {[...new Set(clusterData.map(c => c.cluster))].map(cluster => (
                <button
                  key={cluster}
                  className={`cluster-button ${selectedCluster === cluster ? 'selected' : ''}`}
                  style={{ backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)` }}
                  onClick={() => toggleClusterSelection(cluster)}
                >
                  Cluster {cluster}
                </button>
              ))}
            </div>
            
            {selectedCluster !== null && (
              <div className="cluster-details">
                <h4>Cluster {selectedCluster}</h4>
                <p>Countries in this cluster share similar economic and development characteristics.</p>
                <ul>
                  {clusterData
                    .filter(country => country.cluster === selectedCluster)
                    .map(country => (
                      <li key={country.country}>{country.country}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CountryClustering;
