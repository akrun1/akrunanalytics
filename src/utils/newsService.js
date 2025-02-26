// Mock news service that returns realistic tech news data
// Use this when you can't access the real API or during development

export const getMockNews = () => {
  // Explicitly set the date to February 26, 2025
  const today = "February 26, 2025";
  
  return [
    {
      id: 'news-1',
      title: 'Meet Framework Desktop, A Monster Mini PC Powered By AMD Ryzen AI Max',
      summary: 'Framework is bringing its consumer-friendly, DIY approach to the desktop PC space. It worked with AMD to launch a mini PC with AMD\'s monster Strix Halo processors.',
      date: today,
      url: 'https://www.forbes.com/sites/jasonevangelho/2025/02/26/framework-desktop-amd-ryzen-strix/'
    },
    {
      id: 'news-2',
      title: 'Claude: Everything you need to know about Anthropic\'s AI',
      summary: 'Anthropic\'s powerful family of generative AI models called Claude rival OpenAI\'s ChatGPT and Google\'s Gemini.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    },
    {
      id: 'news-3',
      title: 'AI Tools Revolutionizing Software Development in 2025',
      summary: 'How AI-powered coding assistants are transforming the way developers work and boosting productivity.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    }
  ];
};
