/**
 * AKrun Analytics Contact Form Handler
 * 
 * This script handles the contact form submission to the backend API.
 * Include this in your frontend website hosted on Netlify.
 * 
 * Usage:
 * 1. Include this script in your HTML
 * 2. Make sure your form has id="contact-form" and fields with ids: name, email, subject, message
 * 3. Add a div with id="form-status" to display status messages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const API_ENDPOINT = 'https://api.akrunanalyticscorp.com/api/contact';
    
    // Get form element
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Get status message element
    const statusElement = document.getElementById('form-status');
    
    // Function to display status message
    function showStatus(message, isError = false) {
        if (!statusElement) return;
        
        statusElement.textContent = message;
        statusElement.classList.remove('success', 'error');
        statusElement.classList.add(isError ? 'error' : 'success');
        statusElement.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject') ? document.getElementById('subject').value.trim() : '',
            message: document.getElementById('message').value.trim()
        };
        
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
            // Show loading status
            showStatus('Sending your message...');
            
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
                form.reset();
                showStatus(result.message || 'Your message has been sent. Thank you!');
            } else {
                // API returned an error
                showStatus(result.message || 'An error occurred. Please try again.', true);
            }
        } catch (error) {
            // Network or other error
            console.error('Contact form submission error:', error);
            showStatus('Unable to connect to the server. Please try again later.', true);
        }
    });
});
