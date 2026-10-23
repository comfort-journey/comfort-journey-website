import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getLandingPageBySlug } from './data/landingPagesData';
import './index.css';
import './styles/liquidGlass.css';

// Clean SEO Routing: All pre-rendered clean URLs (/tour/<slug>/, /blog/<slug>/, /about/, /<campaign>/)
// are directly handled by App.jsx without forcing hash routes in the browser address bar.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
