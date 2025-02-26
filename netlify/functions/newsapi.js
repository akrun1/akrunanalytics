const axios = require('axios');

exports.handler = async function(event) {
  try {
    const API_KEY = process.env.VITE_NEWS_API_KEY;
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
    console.log('Error fetching news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' })
    };
  }
};
