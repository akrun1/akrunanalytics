// Netlify serverless function to handle contact form submissions
const axios = require('axios');
const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Check if we have email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('Email credentials not found in environment variables');
    return null;
  }
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send email function
const sendEmail = async (data) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email transporter could not be created');
    return false;
  }
  
  try {
    const info = await transporter.sendMail({
      from: `"Akrun Analytics Website" <${process.env.EMAIL_USER}>`,
      to: 'akrun111@gmail.com', // Hardcoded recipient email
      subject: `New Contact Form: ${data.subject || 'No Subject'}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || 'No Subject'}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Subject:</strong> ${data.subject || 'No Subject'}</p>
<h3>Message:</h3>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

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
    
    // Track success status
    let successStatus = false;

    // Try to forward to Heroku backend if it exists
    try {
      const apiUrl = process.env.HEROKU_API_URL || 'https://akrun-analytics-62aa25462087.herokuapp.com/api/contact';
      const response = await axios.post(apiUrl, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Heroku API response:', response.data);
      successStatus = true;
    } catch (apiError) {
      console.error('Error forwarding to Heroku:', apiError.message);
    }
    
    // Try to send email directly
    const emailSent = await sendEmail(data);
    if (emailSent) {
      successStatus = true;
    }
    
    // Return success if either method worked
    if (successStatus) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'Your message has been sent. Thank you!' 
        })
      };
    } else {
      // Both methods failed
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Unable to process your request. Please try again later.' 
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
