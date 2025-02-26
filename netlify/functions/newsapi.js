const axios = require('axios');

// Mock news data for when the API key isn't available
const getMockNews = () => {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return {
    status: "ok",
    totalResults: 3,
    articles: [
      {
        source: { id: "mock-source", name: "Tech News" },
        author: "Tech Reporter",
        title: "Apple Introduces New AI Features for iOS 18",
        description: "The latest iOS update brings advanced AI capabilities to iPhones, focusing on privacy and user experience.",
        url: "https://techcrunch.com/category/apple/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2021/01/apple-ios-14.jpg",
        publishedAt: new Date().toISOString(),
        content: "Apple's latest iOS update includes new AI features that enhance user privacy and experience."
      },
      {
        source: { id: "mock-source", name: "Tech News" },
        author: "Tech Reporter",
        title: "Google's Latest Algorithm Update Focuses on AI-Generated Content",
        description: "Google has announced major changes to its search algorithm, prioritizing high-quality content regardless of whether it was created by humans or AI.",
        url: "https://techcrunch.com/category/google/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2021/01/google-search.jpg",
        publishedAt: new Date().toISOString(),
        content: "Google's new algorithm update will prioritize high-quality content, whether created by humans or AI."
      },
      {
        source: { id: "mock-source", name: "Tech News" },
        author: "Tech Reporter",
        title: "Microsoft Unveils Next-Generation Azure AI Infrastructure",
        description: "The new Azure AI platform offers significantly improved performance for large language models and computer vision applications.",
        url: "https://techcrunch.com/category/microsoft/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2021/01/microsoft-azure.jpg",
        publishedAt: new Date().toISOString(),
        content: "Microsoft's new Azure AI infrastructure provides better performance for AI workloads."
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
