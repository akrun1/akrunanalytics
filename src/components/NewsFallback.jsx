import React from 'react';

const NewsFallback = () => {
  // Get current date formatted as Feb 26, 2025
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const staticNews = [
    {
      id: 'framework-desktop-amd',
      title: 'Meet Framework Desktop, A Monster Mini PC Powered By AMD Ryzen AI Max',
      summary: 'Framework is bringing its consumer-friendly, DIY approach to the desktop PC space with AMD\'s powerful Strix Halo processors.',
      date: today,
      url: 'https://www.forbes.com/sites/jasonevangelho/2025/02/26/framework-desktop-amd-ryzen-strix/'
    },
    {
      id: 'claude-anthropic-ai',
      title: 'Claude: Everything you need to know about Anthropic\'s AI',
      summary: 'Anthropic, one of the world\'s largest AI vendors, has a powerful family of generative AI models called Claude.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    },
    {
      id: 'ai-productivity',
      title: 'AI Tools Revolutionizing Software Development in 2025',
      summary: 'How AI-powered coding assistants are transforming the way developers work and boosting productivity.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    }
  ];

  return (
    <div className="news-fallback">
      {staticNews.map(item => (
        <div key={item.id} className="update-card">
          <h4>{item.title}</h4>
          <p>{item.summary}</p>
          <span className="update-date">{item.date}</span>
          <a href={item.url} className="read-more" target="_blank" rel="noopener noreferrer">
            Read More →
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsFallback;
