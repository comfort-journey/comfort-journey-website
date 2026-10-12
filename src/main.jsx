import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { getLandingPageBySlug } from './data/landingPagesData';
import './index.css';
import './styles/liquidGlass.css';

// Pre-rendered clean URLs (/solo-travel/, /blog/<slug>/, /tour/<slug>/, /about/)
// are static HTML snapshots for search engines and link previews. Before React
// renders, map them to the matching in-app route and move the document back to
// the site root, so relative asset paths and in-app navigation keep working.
(function bootstrapCleanUrl() {
  try {
    if (window.location.hash && window.location.hash.length > 2) return;
    const segs = window.location.pathname.split('/').filter((x) => x && x !== 'index.html');
    if (!segs.length) return;
    const last = decodeURIComponent(segs[segs.length - 1]).toLowerCase();
    const prev = (segs[segs.length - 2] || '').toLowerCase();
    let route = null;
    let drop = 0;
    if (prev === 'blog') { route = `#/blog/${last}`; drop = 2; }
    else if (prev === 'tour' || prev === 'itinerary') { route = `#/itinerary/${last}`; drop = 2; }
    else if (last === 'about') { route = '#/about'; drop = 1; }
    else if (last === 'blog') { route = '#/blog'; drop = 1; }
    else {
      const lp = getLandingPageBySlug(last);
      if (lp) { route = `#/${lp.slug}`; drop = 1; }
    }
    if (!route) return;
    const keep = segs.slice(0, segs.length - drop);
    const rootPath = '/' + keep.join('/') + (keep.length ? '/' : '');
    window.history.replaceState(null, '', rootPath + window.location.search + route);
  } catch (e) {
    /* never block the app from booting */
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
