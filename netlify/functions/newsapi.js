const axios = require('axios');

// Mock news data for when the API key isn't available
const getMockNews = () => {
  // Explicitly set the date to February 26, 2025
  const today = "February 26, 2025";
  
  console.log('Using mock news data with date:', today);
  
  return {
    status: "ok",
    totalResults: 5,
    articles: [
      {
        source: { id: "tech-crunch", name: "TechCrunch" },
        author: "Mobility Reporter",
        title: "Avride's sidewalk delivery bots land in Japan",
        description: "Avride sidewalk bots will start delivering restaurant orders and groceries in central Tokyo this week.",
        url: "https://techcrunch.com/category/transportation/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2025/02/avride-delivery-bot.jpg",
        publishedAt: "2025-02-26T14:30:00Z",
        content: "Avride's autonomous sidewalk robots are expanding to Japan, starting with central Tokyo this week. The bots will deliver food and grocery orders, navigating crowded urban environments safely."
      },
      {
        source: { id: "wired", name: "Wired" },
        author: "Privacy Correspondent",
        title: "These alternatives to popular apps can help reclaim your online life from billionaires and surveillance",
        description: "Not every app or service wants to monetize your personal data. Here are some of our favorite alternatives.",
        url: "https://www.wired.com/story/privacy-alternatives-2025/",
        urlToImage: "https://wired.com/wp-content/uploads/2025/02/privacy-apps.jpg",
        publishedAt: "2025-02-26T12:45:00Z",
        content: "As tech companies continue to collect vast amounts of personal data, more users are seeking alternatives that respect privacy and don't turn users into products."
      },
      {
        source: { id: "cnn", name: "CNN" },
        author: "Business Reporter",
        title: "Here are all the tech companies rolling back DEI or still committed to it — so far",
        description: "Companies around America have started cutting DEI programs and eliminating DEI commitments from public statements.",
        url: "https://www.cnn.com/business/tech-dei-programs-2025/",
        urlToImage: "https://cnn.com/business/2025/02/dei-tech-companies.jpg",
        publishedAt: "2025-02-26T11:15:00Z",
        content: "Following recent court decisions and political pressures, major tech companies are reexamining their diversity, equity and inclusion commitments, with some scaling back programs while others are doubling down."
      },
      {
        source: { id: "ars-technica", name: "Ars Technica" },
        author: "Jon Brodkin",
        title: "Google's free Gemini Code Assist arrives with sky-high usage limits - Ars Technica",
        description: "Gemini Code Assist lets you do 90 times more than competing tools.",
        url: "https://arstechnica.com/information-technology/2025/02/google-gemini-code-assist/",
        urlToImage: "https://cdn.arstechnica.net/wp-content/uploads/2025/02/gemini-code-assist-760x380.jpg",
        publishedAt: "2025-02-26T09:30:00Z",
        content: "Google has released Gemini Code Assist with generous free tier limits that dwarf competing AI coding assistants, raising questions about how long these limits will remain in place."
      },
      {
        source: { id: "cnn", name: "CNN" },
        author: "Space Correspondent",
        title: "This asteroid-hunting company could make history with its first deep-space mission. The CEO is 'terrified' - CNN",
        description: "No company has ever achieved what asteroid mining startup AstroForge is about to set out to do. Success is anything but guaranteed.",
        url: "https://www.cnn.com/2025/02/26/tech/astroforge-asteroid-mission-launch-scn/index.html",
        urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/250226100028-astroforge-asteroid-mission-super-tease.jpg",
        publishedAt: "2025-02-26T08:15:00Z",
        content: "AstroForge is about to launch the first commercial mission to identify and potentially mine valuable resources from an asteroid, a feat that has never been accomplished by a private company before."
      }
    ]
  };
};

exports.handler = async function(event) {
  // Log environment info for debugging
  console.log('Function Version: 2025-02-26-v4');
  console.log('Environment variables available:', Object.keys(process.env).filter(key => !key.includes('KEY') && !key.includes('SECRET')));
  console.log('API keys present:', {
    NEWS_API_KEY: process.env.NEWS_API_KEY ? 'Present' : 'Missing',
    VITE_NEWS_API_KEY: process.env.VITE_NEWS_API_KEY ? 'Present' : 'Missing'
  });
  
  try {
    // Get API key from environment variables - try both formats
    const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;
    
    if (!API_KEY) {
      console.log('API key not found in environment variables. Using mock data.');
      console.log('Available env vars:', Object.keys(process.env).join(', '));
      // Return mock data instead of an error
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(getMockNews())
      };
    }
    
    console.log('Fetching news with API key (first 4 chars):', API_KEY.substring(0, 4) + '...');
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=5&apiKey=${API_KEY}`;
    
    console.log('Requesting from URL:', url.replace(API_KEY, '[REDACTED]'));
    const response = await axios.get(url);
    
    console.log('NewsAPI Response Status:', response.status);
    console.log('NewsAPI Articles Found:', response.data?.articles?.length || 0);
    
    // Force the date to be February 26, 2025 for all articles
    if (response.data && response.data.articles) {
      response.data.articles.forEach(article => {
        article.publishedAt = "2025-02-26T12:00:00Z";
      });
    }
    
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
    if (error.response) {
      console.log('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    // Return mock data on error as a fallback
    return {
      statusCode: 200,  // Still return 200 with mock data
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(getMockNews())
    };
  }
};
