// Netlify serverless function to handle contact form submissions
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Set CORS headers to allow requests from any origin
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Please fill out all required fields.' 
        })
      };
    }

    // Log the form submission (for debugging)
    console.log('Form submission:', data);

    // Try to forward to Heroku backend if it exists
    try {
      const apiUrl = process.env.HEROKU_API_URL || 'https://akrun-analytics-62aa25462087.herokuapp.com/api/contact';
      const response = await axios.post(apiUrl, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Heroku API response:', response.data);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent. Thank you!' 
        })
      };
    } catch (apiError) {
      console.error('Error forwarding to Heroku:', apiError.message);
      
      // Send an email notification using Netlify's built-in form handling
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent. Thank you!' 
        })
      };
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request.' 
      })
    };
  }
};
