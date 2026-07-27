import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactGA from 'react-ga4';

// Initialize Google Analytics with your unique Measurement ID
// Replace "G-XXXXXXXXXX" with the ID you copied in Step 1
ReactGA.initialize("G-NLVNCZ1B92");

// Send an initial pageview when the site first loads
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Homepage" });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
