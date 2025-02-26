const axios = require('axios');

exports.handler = async function(event) {
  try {
    // Get API key from environment variables - try both formats
    const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;
    
    if (!API_KEY) {
      console.log('ERROR: News API key not found in environment variables');
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'API key not configured',
          message: 'The News API key is missing from environment variables'
        })
      };
    }
    
    console.log('Fetching news with API key (first 4 chars):', API_KEY.substring(0, 4) + '...');
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=3&apiKey=${API_KEY}`;
    
    const response = await axios.get(url);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.log('Error fetching news:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch news',
        message: error.message 
      })
    };
  }
};
