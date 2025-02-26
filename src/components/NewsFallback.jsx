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
      id: 'claude-anthropic-ai',
      title: 'Claude: Everything you need to know about Anthropic\'s AI',
      summary: 'Anthropic, one of the world\'s largest AI vendors, has a powerful family of generative AI models called Claude.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    },
    {
      id: 'chatgpt-pricing',
      title: 'How much does ChatGPT cost? Everything you need to know',
      summary: 'OpenAI offers an array of plans for ChatGPT, both paid and free. Latest update from TechCrunch.',
      date: today,
      url: 'https://techcrunch.com/category/artificial-intelligence/'
    },
    {
      id: 'ai-productivity',
      title: 'AI Tools Boosting Productivity in the Workplace',
      summary: 'How companies are leveraging artificial intelligence to transform workflows and increase efficiency.',
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
