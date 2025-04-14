const axios = require('axios');
// Note: In a production environment, you would use proper TensorFlow.js
// This is a simplified implementation for demonstration purposes

exports.handler = async function(event) {
  try {
    // Get days parameter (defaults to 30)
    const days = event.queryStringParameters?.days || '30';
    
    // Fetch historical Bitcoin data from CoinGecko API
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    
    // Process the historical price data
    const prices = response.data.prices;
    
    // Convert timestamp to readable date and format price
    const historicalPrices = prices.map(([timestamp, price]) => {
      return {
        timestamp,
        date: new Date(timestamp).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        price: parseFloat(price.toFixed(2))
      };
    });
    
    // Generate predictions for the next 7 days
    const predictions = generatePredictions(historicalPrices);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        historicalPrices,
        predictions
      })
    };
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    
    // Return error with 200 status to avoid Netlify function failing
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Error fetching or processing Bitcoin data: ' + error.message,
        // Provide mock data when API fails
        historicalPrices: generateMockHistoricalData(),
        predictions: generateMockPredictions()
      })
    };
  }
};

// Simple prediction function (in reality, you would use a proper ML model)
function generatePredictions(historicalData) {
  if (!historicalData || historicalData.length === 0) {
    return [];
  }
  
  // Use the last 14 days to generate a trend
  const recentPrices = historicalData.slice(-14).map(d => d.price);
  const lastPrice = recentPrices[recentPrices.length - 1];
  
  // Calculate a simple moving average
  const sum = recentPrices.reduce((acc, val) => acc + val, 0);
  const avg = sum / recentPrices.length;
  
  // Calculate a simple trend multiplier
  const recentTrend = lastPrice / recentPrices[0];
  const trendPerDay = Math.pow(recentTrend, 1 / recentPrices.length);
  
  // Calculate volatility for confidence intervals
  const differences = recentPrices.map((price, i) => {
    if (i === 0) return 0;
    return Math.abs((price - recentPrices[i - 1]) / recentPrices[i - 1]);
  });
  const volatility = differences.reduce((acc, val) => acc + val, 0) / differences.length;
  
  // Generate predictions for the next 7 days
  const predictions = [];
  let currentDate = new Date(historicalData[historicalData.length - 1].timestamp);
  let simulatedPrice = lastPrice;
  
  for (let i = 1; i <= 7; i++) {
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Simulate price movement with some randomness
    const randomFactor = 0.98 + Math.random() * 0.04; // Random between 0.98 and 1.02
    simulatedPrice = simulatedPrice * trendPerDay * randomFactor;
    
    // Calculate confidence interval bounds (wider as we go further into the future)
    const interval = volatility * simulatedPrice * (1 + i * 0.1);
    
    predictions.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      prediction: parseFloat(simulatedPrice.toFixed(2)),
      upperBound: parseFloat((simulatedPrice + interval).toFixed(2)),
      lowerBound: parseFloat((simulatedPrice - interval).toFixed(2))
    });
  }
  
  return predictions;
}

// Generate mock data in case the API call fails
function generateMockHistoricalData() {
  const mockData = [];
  const basePrice = 38000 + Math.random() * 4000;
  const today = new Date();
  
  // Generate data for the last 30 days
  for (let i = 30; i >= 1; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Add some randomness to the price
    const randomFactor = 0.95 + Math.random() * 0.1;
    const price = basePrice * (1 + (30 - i) * 0.01) * randomFactor;
    
    mockData.push({
      timestamp: date.getTime(),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return mockData;
}

function generateMockPredictions() {
  const mockPredictions = [];
  const today = new Date();
  const basePrice = 40000 + Math.random() * 2000;
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    // Simulate an upward trend with randomness
    const predictedPrice = basePrice * (1 + i * 0.015 + (Math.random() * 0.02 - 0.01));
    const volatility = 0.03 * (1 + i * 0.1); // increasing volatility with time
    
    mockPredictions.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      prediction: parseFloat(predictedPrice.toFixed(2)),
      upperBound: parseFloat((predictedPrice * (1 + volatility)).toFixed(2)),
      lowerBound: parseFloat((predictedPrice * (1 - volatility)).toFixed(2))
    });
  }
  
  return mockPredictions;
}
