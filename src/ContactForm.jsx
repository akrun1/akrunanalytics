import { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    message: '',
    isError: false,
    isVisible: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const showStatus = (message, isError = false) => {
    setStatus({
      message,
      isError,
      isVisible: true
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setStatus(prev => ({
        ...prev,
        isVisible: false
      }));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showStatus('Please fill out all required fields.', true);
      return;
    }
    
    // Valid email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showStatus('Please enter a valid email address.', true);
      return;
    }
    
    try {
      setIsSubmitting(true);
      showStatus('Sending your message...');
      
      // API endpoint - update this to your actual endpoint
      const API_ENDPOINT = 'https://api.akrunanalyticscorp.com/api/contact';
      
      // Submit form data to API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      // Parse response
      const result = await response.json();
      
      if (result.success) {
        // Success - clear form and show success message
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        showStatus(result.message || 'Your message has been sent. Thank you!');
      } else {
        // API returned an error
        showStatus(result.message || 'An error occurred. Please try again.', true);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      showStatus('Unable to connect to the server. Please try again later.', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-wrapper">
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            {status.isVisible && (
              <div className={`form-status ${status.isError ? 'error' : 'success'}`}>
                {status.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p><a href="mailto:contact@akrunanalyticscorp.com">contact@akrunanalyticscorp.com</a></p>
            </div>
            <div className="info-item">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" aria-label="Twitter">
                  Twitter
                </a>
                <a href="#" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="#" aria-label="GitHub">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
