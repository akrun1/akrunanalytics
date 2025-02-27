// This script will run if the main application fails to load properly
document.addEventListener('DOMContentLoaded', function() {
  // Check if the application has rendered anything after a short delay
  setTimeout(function() {
    const rootElement = document.getElementById('root');
    
    // If the root element exists but is empty or just has a blank div
    if (rootElement && (!rootElement.children.length || rootElement.innerHTML.trim() === '')) {
      console.log('Application failed to render, showing fallback UI');
      
      // Create a simple fallback UI
      rootElement.innerHTML = `
        <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
          <header style="margin-bottom: 2rem; text-align: center;">
            <h1>Akrun Analytics</h1>
            <p>Data Science & Analytics Solutions</p>
          </header>
          
          <nav style="margin-bottom: 2rem; background-color: #1a1a1a; padding: 1rem; border-radius: 8px;">
            <ul style="display: flex; list-style: none; padding: 0; margin: 0; justify-content: center; gap: 2rem;">
              <li><a href="/" style="color: #646cff;">Home</a></li>
              <li><a href="/analytics" style="color: #646cff;">Analytics</a></li>
              <li><a href="/founder" style="color: #646cff;">About</a></li>
            </ul>
          </nav>
          
          <main>
            <section style="margin-bottom: 3rem;">
              <h2>Professional Data Analysis Solutions</h2>
              <p>We provide in-depth data analysis and visualization services to help businesses make informed decisions.</p>
            </section>
            
            <section style="margin-bottom: 3rem;">
              <h2>Our Services</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem;">
                <div class="service-card">
                  <h3>Predictive Analytics</h3>
                  <p>Leveraging machine learning to predict future trends and outcomes.</p>
                </div>
                <div class="service-card">
                  <h3>Data Visualization</h3>
                  <p>Creating interactive dashboards to understand complex data patterns.</p>
                </div>
                <div class="service-card">
                  <h3>Statistical Analysis</h3>
                  <p>In-depth statistical models to extract meaningful insights from your data.</p>
                </div>
              </div>
            </section>
          </main>
          
          <footer style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #333;">
            <p>© 2025 Akrun Analytics. All rights reserved.</p>
          </footer>
        </div>
      `;
    }
  }, 3000); // Check after 3 seconds
});
