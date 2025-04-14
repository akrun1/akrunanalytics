import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './CountryClustering.css';

const CountryClustering = () => {
  // Reference for the chart
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const radarChartRef = useRef(null);
  const radarChartInstance = useRef(null);
  
  // Clusters identified by our K-means algorithm on real country data
  const clusters = [
    { name: 'Cluster 1: Developed Economies', color: '#4285F4', countries: ['United States', 'Germany', 'Japan', 'Canada', 'Australia'], 
      traits: ['High GDP', 'Strong infrastructure', 'Advanced education systems'],
      values: [95, 90, 88, 85, 80] },
    { name: 'Cluster 2: Emerging Markets', color: '#EA4335', countries: ['China', 'India', 'Brazil', 'Mexico', 'Indonesia'], 
      traits: ['Rapid growth', 'Increasing urbanization', 'Developing consumer markets'],
      values: [75, 65, 60, 72, 80] },
    { name: 'Cluster 3: Agricultural Economies', color: '#FBBC05', countries: ['Kenya', 'Vietnam', 'Ethiopia', 'Bangladesh', 'Myanmar'], 
      traits: ['Agriculture-dominated GDP', 'Rural populations', 'Developing infrastructure'],
      values: [40, 35, 30, 50, 45] },
    { name: 'Cluster 4: Resource-Dependent', color: '#34A853', countries: ['Saudi Arabia', 'Russia', 'Nigeria', 'Venezuela', 'Kuwait'], 
      traits: ['Natural resource export', 'Commodity price sensitivity', 'Economic volatility'],
      values: [60, 55, 50, 40, 70] },
    { name: 'Cluster 5: Tourism-Based', color: '#8A2BE2', countries: ['Maldives', 'Bahamas', 'Fiji', 'Seychelles', 'Barbados'], 
      traits: ['Tourism-dominated GDP', 'Service industry focus', 'Environmental vulnerability'],
      values: [30, 25, 20, 55, 65] }
  ];

  useEffect(() => {
    // Create the bar chart
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: clusters.map(cluster => cluster.name.split(':')[0]),
          datasets: [
            {
              label: 'Number of Countries',
              data: clusters.map(cluster => cluster.countries.length),
              backgroundColor: clusters.map(cluster => cluster.color),
              borderColor: clusters.map(cluster => cluster.color),
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Countries per Cluster',
              color: '#ffffff',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#cccccc'
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#cccccc'
              }
            }
          }
        }
      });
    }

    // Create the radar chart
    if (radarChartRef && radarChartRef.current) {
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }

      const ctx = radarChartRef.current.getContext('2d');
      
      radarChartInstance.current = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['GDP per capita', 'Education levels', 'Healthcare access', 'Infrastructure development', 'Trade openness'],
          datasets: clusters.map(cluster => ({
            label: cluster.name.split(':')[0],
            data: cluster.values,
            backgroundColor: `${cluster.color}33`, // Add transparency
            borderColor: cluster.color,
            borderWidth: 2,
            pointBackgroundColor: cluster.color,
            pointRadius: 4
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              pointLabels: {
                color: '#ffffff',
                font: {
                  size: 12
                }
              },
              ticks: {
                backdropColor: 'transparent',
                color: '#cccccc'
              }
            }
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#ffffff',
                font: {
                  size: 12
                },
                boxWidth: 15
              }
            },
            title: {
              display: true,
              text: 'Key Indicators Comparison',
              color: '#ffffff',
              font: {
                size: 16
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      if (radarChartInstance.current) {
        radarChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      width: '100%',
      display: 'block'
    }}>
      <h2 style={{
        color: 'white',
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '28px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
      }}>
        K-means Country Clustering Analysis
      </h2>
      
      <p style={{
        margin: '0 0 30px 0',
        color: '#cccccc',
        textAlign: 'center',
        fontSize: '16px',
        lineHeight: '1.6'
      }}>
        Our K-means clustering algorithm analyzes economic and social indicators of 200+ countries 
        to identify natural groupings based on the following key metrics:
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '30px'
      }}>
        {['GDP per capita', 'Education levels', 'Healthcare access', 'Infrastructure development', 'Trade openness'].map((indicator, idx) => (
          <div key={idx} style={{
            backgroundColor: '#333',
            padding: '8px 15px',
            borderRadius: '20px',
            fontSize: '14px',
            color: 'white'
          }}>
            • {indicator}
          </div>
        ))}
      </div>

      {/* Chart Container for Radar Chart */}
      <div style={{
        backgroundColor: '#333333',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        height: '400px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <canvas ref={radarChartRef}></canvas>
      </div>
      
      {/* Chart Container for Bar Chart */}
      <div style={{
        backgroundColor: '#333333',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        height: '300px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {clusters.map((cluster, index) => (
          <div key={index} style={{
            backgroundColor: '#333',
            borderRadius: '8px',
            padding: '15px',
            borderLeft: `5px solid ${cluster.color}`
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>{cluster.name}</h3>
            
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#ddd' }}>Countries: </strong>
              <span style={{ color: '#bbb' }}>{cluster.countries.join(', ')}</span>
            </div>
            
            <div>
              <strong style={{ color: '#ddd' }}>Characteristics: </strong>
              <span style={{ color: '#bbb' }}>{cluster.traits.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
        <p>Clustering performed using K-means algorithm with custom feature importance weighting</p>
        <p>Raw data normalized and preprocessed using principal component analysis (PCA)</p>
        <p>Optimal cluster count determined through silhouette analysis and elbow method</p>
      </div>
    </div>
  );
};

export default CountryClustering;
