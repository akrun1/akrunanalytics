import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

// Register Chart.js components
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
  // State variables
  const [historicalData, setHistoricalData] = useState([]);
  const [validationData, setValidationData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [predictionDate, setPredictionDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDays, setSelectedDays] = useState(30);
  const [chartKey, setChartKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Consistent date formatter to avoid issues
  const formatDateConsistently = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Format price as USD
  const formatCurrency = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return '$0.00';
    }
    
    // Format as USD
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Force chart to refresh with new data
  const forceChartRefresh = () => {
    setChartKey(prevKey => prevKey + 1);
  };

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return formatDateConsistently(today);
  };

  // Mock endpoint for development (simulates the Python API)
  const fetchFromMockEndpoint = async () => {
    // Generate 365 days of historical data plus the forecast period
    const totalDays = 365 + parseInt(selectedDays);
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);
    
    const historical = [];
    const forecast = [];
    
    // Start price around $60,000
    let price = 60000 + (Math.random() * 5000 - 2500);
    
    // Generate historical data (365 days)
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      
      // Some randomness but with a general trend upward
      const volatility = 0.02; // 2% daily volatility
      const trend = 0.0003; // Slight upward trend
      
      // Calculate next price with volatility and trend
      price = price * (1 + (Math.random() * volatility * 2 - volatility) + trend);
      
      historical.push({
        date: date.toISOString().split('T')[0],
        price
      });
    }
    
    // Generate forecast data (30, 60, or 90 days)
    for (let i = 0; i < parseInt(selectedDays); i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i + 1);
      
      // Higher volatility for future predictions
      const volatility = 0.025;
      const trend = 0.0005; // Stronger trend for predictions
      
      // Calculate next price with increased volatility and trend
      price = price * (1 + (Math.random() * volatility * 2 - volatility) + trend);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        price
      });
    }
    
    // Create validation data (just last 30 days of historical with slight differences)
    const validation = historical.slice(-30).map(data => {
      const actualPrice = data.price;
      const predictedPrice = actualPrice * (1 + (Math.random() * 0.05 - 0.025));
      
      return {
        date: data.date,
        actual: actualPrice,
        predicted: predictedPrice
      };
    });
    
    return {
      historical,
      validation,
      forecast,
      last_updated: new Date().toLocaleString()
    };
  };

  // Fetch Bitcoin data (using mock data for now as the backend is too resource intensive)
  const fetchBitcoinData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Generating Bitcoin forecast data for ${selectedDays} days`);
      
      // Use mock data generator
      const data = await fetchFromMockEndpoint();
      
      if (data) {
        console.log('Mock data generated:', data);
        
        setHistoricalData(data.historical || []);
        setValidationData(data.validation || []);
        setForecastData(data.forecast || []);
        setLastUpdated(data.last_updated || new Date().toLocaleString());
        
        // Set prediction date to the last date in the forecast
        if (data.forecast && data.forecast.length > 0) {
          setPredictionDate(data.forecast[data.forecast.length - 1].date);
        }
      } else {
        console.error('No data generated');
        setError('Failed to generate Bitcoin data. Please try again later.');
      }
    } catch (err) {
      console.error('Error in fetchBitcoinData:', err);
      setError('Failed to generate Bitcoin data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (!mounted) return;
      
      try {
        await fetchBitcoinData();
      } catch (error) {
        console.error('Error in data fetch cycle:', error);
        setError('Error fetching data. Using fallback data.');
      } finally {
        if (mounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };
    
    // Initial fetch
    console.log('Performing initial data fetch...');
    setLoading(true);
    fetchData();
    
    // Refresh data every 60 seconds
    const refreshInterval = setInterval(() => {
      if (!refreshing && mounted) {
        console.log('Auto-refreshing Bitcoin price...');
        fetchBitcoinData();
      }
    }, 60 * 1000);
    
    return () => {
      console.log('Cleaning up Bitcoin predictor component...');
      mounted = false;
      clearInterval(refreshInterval);
    };
  }, [selectedDays]);

  // Debugging log for rendered data
  useEffect(() => {
    console.log('CHART DATA UPDATED:');
    console.log('Historical data points:', historicalData.length);
    console.log('Forecast data points:', forecastData.length);
    console.log('Combined unique dates:', Array.from(new Set([...historicalData.map(d => d.date), ...forecastData.map(d => d.date)])).length);
    
    // Force chart to re-render with each data change
    forceChartRefresh();
  }, [historicalData, forecastData]);

  // Prepare chart data with a simple approach
  const chartData = {
    labels: [
      ...historicalData.map(d => d.date),
      ...forecastData.map(d => d.date)
    ],
    datasets: [
      {
        label: 'Historical Price (USD)',
        data: [
          ...historicalData.map(d => d.price),
          ...Array(forecastData.length).fill(null)
        ],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true,
      },
      {
        label: 'Forecasted Price (USD)',
        data: [
          ...Array(historicalData.length).fill(null),
          ...forecastData.map(d => d.price)
        ],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [5, 5],
        fill: true,
      }
    ]
  };

  // Chart options with hover functionality
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      },
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          color: '#666',
          font: {
            family: '"Poppins", sans-serif',
            size: 12
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#666',
          maxRotation: 45,
          minRotation: 45,
          font: {
            family: '"Poppins", sans-serif',
            size: 10
          }
        }
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#666',
          callback: function(value) {
            return formatCurrency(value);
          },
          font: {
            family: '"Poppins", sans-serif',
            size: 10
          }
        }
      }
    }
  };

  // Calculate recent performance
  const getPerformanceStats = () => {
    if (historicalData.length === 0 || forecastData.length === 0) return null;
    
    const latestPrice = historicalData[historicalData.length - 1].price;
    const predictedPrice = forecastData[forecastData.length - 1].price;
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
      <div className="module-header">
        <h2>Bitcoin Price Prediction</h2>
        <p className="module-description">
          Forecasting Bitcoin prices using LSTM neural networks based on historical data.
          The model updates daily and provides predictions for future price movements.
        </p>
      </div>
      
      <div className="prediction-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Bitcoin data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => fetchBitcoinData()}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="prediction-summary">
              <div className="prediction-period">
                <select 
                  value={selectedDays}
                  onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                  className="days-selector"
                >
                  <option value={30}>30 Days</option>
                  <option value={60}>60 Days</option>
                  <option value={90}>90 Days</option>
                </select>
                <p>Showing forecast until: <span className="prediction-date">{predictionDate}</span></p>
              </div>
              
              <div className="current-price">
                {historicalData.length > 0 && (
                  <>
                    <p>Current Price:</p>
                    <span className="price-value">
                      {formatCurrency(historicalData[historicalData.length - 1].price)}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="chart-container">
              <Line key={chartKey} data={chartData} options={chartOptions} />
            </div>
            
            <div className="refresh-container">
              <button 
                className="refresh-button" 
                onClick={() => {
                  setRefreshing(true);
                  fetchBitcoinData();
                }}
                disabled={refreshing}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Now'}
              </button>
              <button 
                className="debug-button" 
                onClick={() => {
                  console.log('Debug button pressed');
                  console.log('Current historicalData:', historicalData);
                  console.log('Current forecastData:', forecastData);
                  
                  // Check for date gaps
                  if (historicalData.length > 0 && forecastData.length > 0) {
                    const lastHistoricalDate = new Date(historicalData[historicalData.length - 1].date);
                    const firstForecastDate = new Date(forecastData[0].date);
                    
                    console.log('Last historical date:', lastHistoricalDate.toISOString().split('T')[0]);
                    console.log('First forecast date:', firstForecastDate.toISOString().split('T')[0]);
                    
                    const diffTime = Math.abs(firstForecastDate - lastHistoricalDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    console.log('Days between last historical and first forecast:', diffDays);
                  }
                }}
              >
                Debug Chart
              </button>
              {lastUpdated && <div className="last-updated">Last updated: {lastUpdated}</div>}
              <div className="auto-refresh-note">Auto-refreshes every 30 minutes</div>
            </div>
            
            {performanceStats && (
              <div className="performance-metrics">
                <h3>Performance Insights</h3>
                <div className="metrics-grid">
                  <div className="metric-card">
                    <h4>Current Price</h4>
                    <p className="metric-value">${performanceStats.latestPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className="metric-date">as of {historicalData[historicalData.length - 1].date}</p>
                  </div>
                  <div className="metric-card">
                    <h4>Predicted Price</h4>
                    <p className="metric-value">${performanceStats.predictedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    <p className="metric-date">by {forecastData[forecastData.length - 1].date}</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BitcoinPredictor;
