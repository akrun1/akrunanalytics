import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import SnakeGame from './SnakeGame.jsx'
import Analytics from './Analytics.jsx'
import Founder from './Founder.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/snake-game',
    element: <SnakeGame />
  },
  {
    path: '/analytics',
    element: <Analytics />
  },
  {
    path: '/founder',
    element: <Founder />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
