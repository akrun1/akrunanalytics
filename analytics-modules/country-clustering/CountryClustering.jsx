import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import './CountryClustering.css';

// Register ChartJS components
ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const CountryClustering = () => {
  const [clusterData, setClusterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState({
    x: 'gdpPerCapita',
    y: 'unemploymentRate'
  });
  const [selectedCluster, setSelectedCluster] = useState(null);
  
  // Available metrics for analysis
  const metrics = [
    { id: 'gdpPerCapita', label: 'GDP Per Capita' },
    { id: 'unemploymentRate', label: 'Unemployment Rate (%)' },
    { id: 'inflationRate', label: 'Inflation Rate (%)' },
    { id: 'governmentDebt', label: 'Government Debt (% of GDP)' },
    { id: 'extremismIndex', label: 'Extremism Index' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch country clustering data
        const response = await fetch('/.netlify/functions/country-clusters');
        
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setClusterData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching country clustering data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle metric selection change
  const handleMetricChange = (axis, metricId) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [axis]: metricId
    }));
  };
  
  // Prepare chart data based on selected metrics
  const prepareChartData = () => {
    if (!clusterData) return null;
    
    // Define colors for clusters
    const clusterColors = [
      'rgba(255, 99, 132, 0.7)',   // red
      'rgba(54, 162, 235, 0.7)',   // blue
      'rgba(255, 206, 86, 0.7)',   // yellow
      'rgba(75, 192, 192, 0.7)',   // green
      'rgba(153, 102, 255, 0.7)',  // purple
    ];
    
    // Group countries by cluster
    const datasets = [];
    const clusterGroups = {};
    
    clusterData.countries.forEach(country => {
      if (!clusterGroups[country.cluster]) {
        clusterGroups[country.cluster] = [];
      }
      
      clusterGroups[country.cluster].push({
        x: country.metrics[selectedMetrics.x],
        y: country.metrics[selectedMetrics.y],
        country: country.name,
        cluster: country.cluster,
        metrics: country.metrics
      });
    });
    
    // Create a dataset for each cluster
    Object.keys(clusterGroups).forEach((cluster, index) => {
      datasets.push({
        label: `Cluster ${cluster}`,
        data: clusterGroups[cluster],
        backgroundColor: clusterColors[index % clusterColors.length],
        pointRadius: 8,
        pointHoverRadius: 12,
      });
    });
    
    return {
      datasets
    };
  };
  
  const chartData = prepareChartData();
  
  // Chart options
  const chartOptions = {
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
          label: function(context) {
            const point = context.raw;
            return [
              `Country: ${point.country}`,
              `Cluster: ${point.cluster}`,
              `${metrics.find(m => m.id === selectedMetrics.x)?.label}: ${point.x.toLocaleString()}`,
              `${metrics.find(m => m.id === selectedMetrics.y)?.label}: ${point.y.toLocaleString()}`
            ];
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements && elements.length > 0) {
        const datasetIndex = elements[0].datasetIndex;
        const dataIndex = elements[0].index;
        const country = chartData.datasets[datasetIndex].data[dataIndex];
        setSelectedCluster(country.cluster);
      } else {
        setSelectedCluster(null);
      }
    }
  };
  
  // Get cluster description based on analysis
  const getClusterDescription = (clusterId) => {
    if (!clusterData || !clusterData.clusterDescriptions) return '';
    return clusterData.clusterDescriptions[clusterId] || 'No description available for this cluster.';
  };
  
  // Get countries in a specific cluster
  const getCountriesInCluster = (clusterId) => {
    if (!clusterData) return [];
    return clusterData.countries
      .filter(country => country.cluster === clusterId)
      .sort((a, b) => a.name.localeCompare(b.name));
  };
  
  return (
    <div className="country-clustering">
      <h2>Country Clustering Analysis</h2>
      <div className="description">
        <p>
          This visualization clusters countries based on key economic and social indicators, 
          revealing patterns and relationships that might otherwise remain hidden in the data.
          Countries clustered together share similar characteristics in the selected metrics.
        </p>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading country data...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : chartData ? (
        <>
          <div className="metric-selectors">
            <div className="metric-selector">
              <label>X-Axis Metric:</label>
              <select 
                value={selectedMetrics.x} 
                onChange={(e) => handleMetricChange('x', e.target.value)}
              >
                {metrics.map(metric => (
                  <option key={`x-${metric.id}`} value={metric.id}>
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
                  <option key={`y-${metric.id}`} value={metric.id}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="chart-container">
            <Scatter data={chartData} options={chartOptions} />
          </div>
          
          <div className="cluster-analysis">
            <h3>Cluster Analysis</h3>
            {selectedCluster !== null ? (
              <div className="selected-cluster">
                <h4>Cluster {selectedCluster}</h4>
                <p className="cluster-description">{getClusterDescription(selectedCluster)}</p>
                
                <div className="countries-in-cluster">
                  <h5>Countries in this cluster:</h5>
                  <ul>
                    {getCountriesInCluster(selectedCluster).map(country => (
                      <li key={country.name}>
                        {country.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="selection-prompt">Click on a data point to view detailed cluster analysis.</p>
            )}
          </div>
          
          <div className="analysis-notes">
            <h3>Methodology</h3>
            <p>
              Our analysis uses k-means clustering algorithm to group countries with similar economic and social 
              characteristics. The algorithm identifies natural groups in the data without prior knowledge of 
              which countries should be grouped together.
            </p>
            <p>
              Each cluster represents countries that share similar patterns across multiple dimensions, including
              GDP per capita, unemployment rates, inflation, government debt levels, and extremism indicators.
              This multidimensional analysis reveals relationships that may not be apparent when looking at individual metrics.
            </p>
          </div>
        </>
      ) : (
        <div className="error">No data available for visualization</div>
      )}
    </div>
  );
};

export default CountryClustering;
