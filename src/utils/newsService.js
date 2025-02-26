// Mock news service that returns realistic tech news data
// Use this when you can't access the real API or during development

export const getMockNews = () => {
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return [
    {
      id: 'news-1',
      title: 'Apple Introduces New AI Features for iOS 18',
      summary: 'The latest iOS update brings advanced AI capabilities to iPhones, focusing on privacy and user experience.',
      date: today,
      url: 'https://techcrunch.com/category/apple/'
    },
    {
      id: 'news-2',
      title: 'Google\'s Latest Algorithm Update Focuses on AI-Generated Content',
      summary: 'Google has announced major changes to its search algorithm, prioritizing high-quality content regardless of whether it was created by humans or AI.',
      date: today,
      url: 'https://techcrunch.com/category/google/'
    },
    {
      id: 'news-3',
      title: 'Microsoft Unveils Next-Generation Azure AI Infrastructure',
      summary: 'The new Azure AI platform offers significantly improved performance for large language models and computer vision applications.',
      date: today,
      url: 'https://techcrunch.com/category/microsoft/'
    }
  ];
};
