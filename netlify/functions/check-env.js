// A simple function to check environment variables
exports.handler = async function(event) {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV || 'not set',
    NETLIFY: process.env.NETLIFY || 'not set',
    NEWS_API_KEY_EXISTS: process.env.NEWS_API_KEY ? 'set' : 'not set',
    VITE_NEWS_API_KEY_EXISTS: process.env.VITE_NEWS_API_KEY ? 'set' : 'not set',
    // Add any other environment variables you want to check
  };
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Environment variables check',
      variables: envVars
    })
  };
};
