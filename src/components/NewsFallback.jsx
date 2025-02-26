import React from 'react';
import './NewsFallback.css';

const NewsFallback = () => {
  const today = "Feb 26, 2025";
  
  const newsItems = [
    {
      id: 1,
      title: "Avride's sidewalk delivery bots land in Japan",
      description: "Avride sidewalk bots will start delivering restaurant orders and groceries in central Tokyo this week.",
      date: today,
      url: "https://techcrunch.com/category/transportation/"
    },
    {
      id: 2,
      title: "These alternatives to popular apps can help reclaim your online life from billionaires and surveillance",
      description: "Not every app or service wants to monetize your personal data. Here are some of our favorite alternatives.",
      date: today,
      url: "https://www.wired.com/story/privacy-alternatives-2025/"
    },
    {
      id: 3,
      title: "Here are all the tech companies rolling back DEI or still committed to it — so far",
      description: "Companies around America have started cutting DEI programs and eliminating DEI commitments from public statements.",
      date: today,
      url: "https://www.cnn.com/business/tech-dei-programs-2025/"
    },
    {
      id: 4,
      title: "Google's free Gemini Code Assist arrives with sky-high usage limits - Ars Technica",
      description: "Gemini Code Assist lets you do 90 times more than competing tools.",
      date: today,
      url: "https://arstechnica.com/information-technology/2025/02/google-gemini-code-assist/"
    },
    {
      id: 5,
      title: "This asteroid-hunting company could make history with its first deep-space mission. The CEO is 'terrified' - CNN",
      description: "No company has ever achieved what asteroid mining startup AstroForge is about to set out to do. Success is anything but guaranteed.",
      date: today,
      url: "https://www.cnn.com/2025/02/26/tech/astroforge-asteroid-mission-launch-scn/index.html"
    }
  ];

  return (
    <div className="news-fallback-container">
      {newsItems.map(item => (
        <div key={item.id} className="news-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="news-meta">
            <span className="news-date">{item.date}</span>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more">Read More →</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFallback;
