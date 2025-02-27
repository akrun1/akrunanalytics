import React from 'react';
import './CountryClustering.css';

// Improved placeholder component with visual elements
function CountryClustering() {
  // Mock data for cluster display
  const mockClusters = [
    { name: 'Cluster 1', color: '#4285F4', description: 'Developed economies with high GDP' },
    { name: 'Cluster 2', color: '#EA4335', description: 'Emerging markets with rapid growth' },
    { name: 'Cluster 3', color: '#FBBC05', description: 'Developing economies with agricultural focus' },
    { name: 'Cluster 4', color: '#34A853', description: 'Oil-dependent economies' },
    { name: 'Cluster 5', color: '#8A2BE2', description: 'Small island nations and tourism-based economies' }
  ];

  return (
    <div className="country-clustering-container">
      <h2>Country Clustering Analysis</h2>
      <p className="description">
        Our machine learning model groups countries based on economic, social, and developmental indicators 
        to identify patterns and similarities between nations.
      </p>
      
      <div className="visualization-container">
        <div className="cluster-scatter-plot">
          {/* Mock scatter plot with circles representing clusters */}
          <div className="mock-chart">
            {/* Grid lines */}
            <div className="grid-lines x"></div>
            <div className="grid-lines y"></div>
            
            {/* Axis labels */}
            <div className="axis x-axis">
              <span className="axis-title">GDP Per Capita →</span>
            </div>
            <div className="axis y-axis">
              <span className="axis-title">Life Expectancy →</span>
            </div>
            
            {/* Plotted points */}
            {[...Array(50)].map((_, i) => {
              // Random cluster assignment
              const cluster = mockClusters[Math.floor(Math.random() * mockClusters.length)];
              // Random position with some grouping based on cluster
              const clusterIndex = mockClusters.indexOf(cluster);
              const baseX = 20 + (clusterIndex * 15);
              const baseY = 20 + (clusterIndex * 15);
              const x = baseX + (Math.random() * 20) - 10;
              const y = baseY + (Math.random() * 20) - 10;
              
              return (
                <div 
                  key={i}
                  className="data-point"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    backgroundColor: cluster.color
                  }}
                  title={`Sample Country ${i+1}: ${cluster.name}`}
                ></div>
              );
            })}
          </div>
        </div>
        
        <div className="cluster-legend">
          <h3>Cluster Definitions</h3>
          <ul>
            {mockClusters.map((cluster, index) => (
              <li key={index} className="cluster-item">
                <span className="cluster-color" style={{ backgroundColor: cluster.color }}></span>
                <span className="cluster-name">{cluster.name}:</span>
                <span className="cluster-description">{cluster.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="analysis-notes">
        <h3>Insights</h3>
        <p>
          This clustering analysis reveals patterns in global economic development, showing how countries 
          with similar characteristics tend to face similar challenges and opportunities, despite 
          geographical differences.
        </p>
        <p>
          Policy makers can use these clusters to identify peer nations for benchmarking and to develop 
          targeted economic strategies based on proven success within similar economies.
        </p>
      </div>
    </div>
  );
}

export default CountryClustering;
