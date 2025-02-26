const axios = require('axios');

// Mock news data for when the API key isn't available
const getMockNews = () => {
  const today = new Date('2025-02-26').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return {
    status: "ok",
    totalResults: 3,
    articles: [
      {
        source: { id: "forbes", name: "Forbes" },
        author: "Jason Evangelho",
        title: "Meet Framework Desktop, A Monster Mini PC Powered By AMD Ryzen AI Max",
        description: "Framework is bringing its consumer-friendly, DIY approach to the desktop PC space. It worked with AMD to launch a mini PC with AMD's monster Strix Halo processors.",
        url: "https://www.forbes.com/sites/jasonevangelho/2025/02/26/framework-desktop-amd-ryzen-strix/",
        urlToImage: "https://imageio.forbes.com/specials-images/imageserve/65dbcf7c9ed8b8c189af1d46/0x0.jpg",
        publishedAt: new Date('2025-02-26').toISOString(),
        content: "Framework is bringing its consumer-friendly, DIY approach to the desktop PC space with the introduction of the Framework Desktop with AMD's latest Ryzen AI Max processors."
      },
      {
        source: { id: "tech-crunch", name: "TechCrunch" },
        author: "Tech Reporter",
        title: "Claude: Everything you need to know about Anthropic's AI",
        description: "Anthropic, one of the world's largest AI vendors, has a powerful family of generative AI models called Claude that rival OpenAI's ChatGPT and Google's Gemini.",
        url: "https://techcrunch.com/category/artificial-intelligence/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2023/07/anthropic-claude.jpg",
        publishedAt: new Date('2025-02-26').toISOString(),
        content: "Anthropic's Claude AI models offer longer context windows, improved reasoning capabilities, and better instruction-following compared to competitors."
      },
      {
        source: { id: "tech-crunch", name: "TechCrunch" },
        author: "AI Correspondent",
        title: "AI Tools Revolutionizing Software Development in 2025",
        description: "How AI-powered coding assistants are transforming the way developers work and boosting productivity.",
        url: "https://techcrunch.com/category/artificial-intelligence/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2025/02/ai-coding-tools.jpg",
        publishedAt: new Date('2025-02-26').toISOString(),
        content: "AI coding assistants are transforming software development with advanced capabilities like auto-completing code, generating test cases, and fixing bugs automatically."
      }
    ]
  };
};

exports.handler = async function(event) {
  try {
    // Get API key from environment variables - try both formats
    const API_KEY = process.env.VITE_NEWS_API_KEY || process.env.NEWS_API_KEY;
    
    if (!API_KEY) {
      console.log('API key not found in environment variables. Using mock data.');
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
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=3&apiKey=${API_KEY}`;
    
    console.log('Requesting from URL:', url.replace(API_KEY, '[REDACTED]'));
    const response = await axios.get(url);
    
    console.log('NewsAPI Response Status:', response.status);
    console.log('NewsAPI Articles Found:', response.data?.articles?.length || 0);
    
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
