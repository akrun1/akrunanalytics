import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Import full-featured components
import App from './App.jsx'
import Analytics from './Analytics.jsx'
import AnalyticsDashboard from './AnalyticsDashboard.jsx'
import TestHarness from './TestHarness.jsx'
import Founder from './Founder.jsx'
import SnakeGame from './SnakeGame.jsx'

console.log('main.jsx is running - using full-featured components')

// Add a listener for hash changes that we'll use for contact us links
window.addEventListener('load', () => {
  if (window.location.hash === '#contact') {
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#contact') {
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
});

try {
  const rootElement = document.getElementById('root')
  console.log('Root element:', rootElement)
  
  if (rootElement) {
    // Create router with full-featured components
    const router = createBrowserRouter([
      {
        path: '/',
        element: <App />
      },
      {
        path: '/analytics',
        element: <Analytics />
      },
      {
        path: '/analytics-dashboard',
        element: <AnalyticsDashboard />
      },
      {
        path: '/analytics-test',
        element: <TestHarness />
      },
      {
        path: '/founder',
        element: <Founder />
      },
      {
        path: '/snake-game',
        element: <SnakeGame />
      }
    ])
    
    // Render with router
    const root = createRoot(rootElement)
    root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    )
    console.log('Render completed with router (full-featured components)')
  } else {
    console.error('Root element not found!')
  }
} catch (error) {
  console.error('Error rendering app:', error)
  // Render fallback
  const rootElement = document.getElementById('root')
  if (rootElement) {
    const root = createRoot(rootElement)
    root.render(
      <div style={{ padding: '20px' }}>
        <h1>Error Loading App</h1>
        <p>Error: {error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
}
