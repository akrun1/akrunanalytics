import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import ContactForm from './ContactForm'
import axios from 'axios'

function App() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using NewsAPI for technology and business news via Netlify proxy
        const response = await axios.get(
          `/api/v2/top-headlines?country=us&category=technology&pageSize=2&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
        );
        
        // Format the data from the API
        if (response.data && response.data.articles) {
          const formattedNews = response.data.articles.map((article, index) => ({
            id: `news-${index}`,
            title: article.title,
            summary: article.description || 'Click to read more about this story.',
            content: article.content,
            date: new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            url: article.url
          }));
          
          setNewsItems(formattedNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to static news if API fails
        setNewsItems([
          {
            id: 'claude-anthropic-ai',
            title: 'Claude: Everything you need to know about Anthropic\'s AI',
            summary: 'Anthropic, one of the world\'s largest AI vendors, has a powerful family of generative AI models called Claude.',
            date: 'Feb 26, 2025',
            url: 'https://www.techcrunch.com/claude-anthropic-ai'
          },
          {
            id: 'chatgpt-pricing',
            title: 'How much does ChatGPT cost? Everything you need to know about OpenAI\'s pricing plans',
            summary: 'OpenAI offers an array of plans for ChatGPT, both paid and free. 2024 TechCrunch.',
            date: 'Feb 25, 2025',
            url: 'https://www.techcrunch.com/chatgpt-pricing'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">akrun Analytics</Link>
          <nav className="main-nav">
            <ul>
              <li><Link to="#services">Services</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/founder">About Founder</Link></li>
              <li><Link to="#contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="main-content">
        <div className="left-content">
          {/* Hero Section */}
          <section className="hero">
            <h1>Transform Your Data into Actionable Insights</h1>
            <p>Leveraging advanced analytics and machine learning to drive business growth and innovation</p>
            <Link to="#contact" className="button primary">Get Started</Link>
          </section>

          {/* Services Section */}
          <section id="services" className="services">
            <h2 className="section-title">Our Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Data Analytics</h3>
                <p>Transform raw data into meaningful insights using advanced statistical analysis and visualization techniques.</p>
              </div>
              <div className="service-card">
                <h3>Machine Learning</h3>
                <p>Implement cutting-edge ML solutions for prediction, classification, and pattern recognition.</p>
              </div>
              <div className="service-card">
                <h3>Business Intelligence</h3>
                <p>Create interactive dashboards and reports to monitor KPIs and drive data-informed decisions.</p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section id="contact">
            <ContactForm />
          </section>
        </div>

        <div className="right-sidebar">
          {/* Snake Game */}
          <section className="games">
            <h3>Take a Break!</h3>
            <Link to="/snake-game" className="game-link">🎮 Play Snake Game</Link>
          </section>

          {/* Tech & Finance Updates */}
          <section className="updates">
            <h3>Tech & Finance Updates</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              newsItems.map((update, index) => (
                <div key={update.id} className="update-card">
                  <h4>{update.title}</h4>
                  <p>{update.summary}</p>
                  <span className="update-date">{update.date}</span>
                  <Link to={update.url} className="read-more" target="_blank">Read More →</Link>
                </div>
              ))
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} akrun Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
