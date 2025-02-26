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
              <li><a href="https://akrunanalyticscorp.com/founder">About Founder</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Transform Your Data into Actionable Insights</h1>
          <p>Leveraging advanced analytics and machine learning to drive business growth and innovation</p>
          <a href="#contact" className="button primary">Get Started</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
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
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section id="analytics" className="analytics">
        <div className="container">
          <h2 className="section-title">Analytics Dashboard</h2>
          <div className="dashboard-preview">
            {/* Placeholder for dashboard visualization */}
            <div className="dashboard-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Let's transform your data into actionable insights</p>
          <a href="#contact" className="button primary">Contact Us</a>
        </div>
      </section>

      {/* Snake Game */}
      <section className="games">
        <div className="container">
          <h3>Take a Break!</h3>
          <a href="https://akrunanalyticscorp.com/snake-game" className="game-link">🎮 Play Snake Game</a>
        </div>
      </section>

      {/* Tech & Finance Updates */}
      <section className="updates">
        <div className="container">
          <h3>Tech & Finance Updates</h3>
          {/* Updates content here */}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact">
        <ContactForm />
      </section>

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
