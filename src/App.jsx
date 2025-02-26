import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import ContactForm from './ContactForm'
import NewsFallback from './components/NewsFallback'
import { getMockNews } from './utils/newsService'
import axios from 'axios'

function App() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log('Fetching news...');
        
        // Try the NewsAPI directly first with a CORS proxy for development
        try {
          const apiKey = import.meta.env.VITE_NEWS_API_KEY;
          console.log('Using API Key (masked):', apiKey ? `${apiKey.substring(0, 4)}...` : 'Not found');
          
          const response = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=3&apiKey=${apiKey}`,
            { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
          );
          
          console.log('API Response:', response.status);
          
          // Format the data from the API
          if (response.data && response.data.articles) {
            console.log('Articles found:', response.data.articles.length);
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
            return; // Exit early if successful
          }
        } catch (apiError) {
          console.error('Direct API call failed:', apiError.message);
          // Continue to fallback if direct API call fails
        }
        
        // If we're here, the direct API call failed
        console.log('Using local mock news data');
        setNewsItems(getMockNews());
      } catch (error) {
        console.error('Error fetching news:', error.message);
        // We'll use the NewsFallback component
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch news immediately on mount
    fetchNews();
    
    // Set up interval to refresh news every hour (3600000 ms)
    const intervalId = setInterval(() => {
      console.log('Refreshing news...');
      fetchNews();
    }, 3600000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only on mount

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
            ) : newsItems.length > 0 ? (
              newsItems.map((update, index) => (
                <div key={update.id} className="update-card">
                  <h4>{update.title}</h4>
                  <p>{update.summary}</p>
                  <span className="update-date">{update.date}</span>
                  <Link to={update.url} className="read-more" target="_blank">Read More →</Link>
                </div>
              ))
            ) : (
              <NewsFallback />
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
