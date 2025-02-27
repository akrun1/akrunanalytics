import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './BitcoinPredictor.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BitcoinPredictor = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch historical Bitcoin prices from CoinGecko
        const response = await fetch(
          `/.netlify/functions/bitcoin-data?days=${selectedTimeframe}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch Bitcoin data');
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setHistoricalData(data.historicalPrices);
        setPredictedData(data.predictions);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching Bitcoin data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [selectedTimeframe]);
  
  // Prepare chart data
  const chartData = {
    labels: [...historicalData.map(d => d.date), ...predictedData.map(d => d.date)],
    datasets: [
      {
        label: 'Historical Price (USD)',
        data: [...historicalData.map(d => d.price), ...Array(predictedData.length).fill(null)],
        borderColor: 'rgba(53, 162, 235, 1)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius: 2,
      },
      {
        label: 'Predicted Price (USD)',
        data: [...Array(historicalData.length).fill(null), ...predictedData.map(d => d.prediction)],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        pointRadius: 2,
      },
      {
        label: 'Upper Bound',
        data: [...Array(historicalData.length).fill(null), ...predictedData.map(d => d.upperBound)],
        borderColor: 'rgba(255, 99, 132, 0.3)',
        backgroundColor: 'transparent',
        borderDash: [2, 2],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Lower Bound',
        data: [...Array(historicalData.length).fill(null), ...predictedData.map(d => d.lowerBound)],
        borderColor: 'rgba(255, 99, 132, 0.3)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderDash: [2, 2],
        pointRadius: 0,
        fill: '+1', // Fill to the dataset above
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bitcoin Price Prediction',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            if (label) {
              return `${label}: $${context.parsed.y.toLocaleString(undefined, { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`;
            }
            return null;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };
  
  // Calculate recent performance
  const getPerformanceStats = () => {
    if (historicalData.length === 0 || predictedData.length === 0) return null;
    
    const latestPrice = historicalData[historicalData.length - 1].price;
    const predictedPrice = predictedData[predictedData.length - 1].prediction;
    const priceDifference = predictedPrice - latestPrice;
    const percentChange = (priceDifference / latestPrice) * 100;
    
    return {
      latestPrice,
      predictedPrice,
      priceDifference,
      percentChange
    };
  };
  
  const performanceStats = getPerformanceStats();
  
  return (
    <div className="bitcoin-predictor">
      <h2>Bitcoin Price Analysis & Prediction</h2>
      
      <div className="timeframe-selector">
        <label htmlFor="timeframe">Select Timeframe: </label>
        <select 
          id="timeframe" 
          value={selectedTimeframe} 
          onChange={(e) => setSelectedTimeframe(e.target.value)}
        >
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
          <option value="180">180 Days</option>
        </select>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading Bitcoin data...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
          
          {performanceStats && (
            <div className="performance-metrics">
              <h3>Performance Insights</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <h4>Current Price</h4>
                  <p className="metric-value">${performanceStats.latestPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="metric-card">
                  <h4>Predicted Price</h4>
                  <p className="metric-value">${performanceStats.predictedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                </div>
                <div className="metric-card">
                  <h4>Predicted Change</h4>
                  <p className={`metric-value ${performanceStats.percentChange >= 0 ? 'positive' : 'negative'}`}>
                    {performanceStats.percentChange >= 0 ? '+' : ''}
                    {performanceStats.percentChange.toFixed(2)}%
                  </p>
                </div>
                <div className="metric-card">
                  <h4>Price Difference</h4>
                  <p className={`metric-value ${performanceStats.priceDifference >= 0 ? 'positive' : 'negative'}`}>
                    {performanceStats.priceDifference >= 0 ? '+' : ''}
                    ${Math.abs(performanceStats.priceDifference).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="analysis-notes">
            <h3>Analysis Notes</h3>
            <p>
              Our predictive model combines technical analysis with machine learning to forecast Bitcoin's 
              price movements. The model analyzes historical patterns, volatility, and trading volumes to 
              generate predictions with confidence intervals.
            </p>
            <p>
              <strong>Note:</strong> These predictions are for informational purposes only. Cryptocurrency 
              markets are highly volatile and unpredictable. Past performance is not indicative of future results.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BitcoinPredictor;
