import { useState } from 'react'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="header">
        <div className="container">
          <a href="/" className="logo">akrun Analytics</a>
          <nav className="main-nav">
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#analytics">Analytics</a></li>
              <li><a href="/founder">About Founder</a></li>
              <li><a href="#contact">Contact</a></li>
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
            <a href="#contact" className="button primary">Get Started</a>
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
            <a href="/snake-game" className="game-link">🎮 Play Snake Game</a>
          </section>

          {/* Tech & Finance Updates */}
          <section className="updates">
            <h3>Tech & Finance Updates</h3>
            <div className="update-card">
              <h4>Claude: Everything you need to know about Anthropic's AI</h4>
              <p>Anthropic, one of the world's largest AI vendors, has a powerful family of generative AI models cal...</p>
              <span className="update-date">Feb 26, 2025</span>
              <a href="/news/claude-anthropic-ai" className="read-more">Read More →</a>
            </div>
            <div className="update-card">
              <h4>How much does ChatGPT cost? Everything you need to know about OpenAI's pricing plans</h4>
              <p>OpenAI offers an array of plans for ChatGPT, both paid and free. 2024 TechCrunch. All rights rese...</p>
              <span className="update-date">Feb 25, 2025</span>
              <a href="/news/chatgpt-pricing" className="read-more">Read More →</a>
            </div>
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
