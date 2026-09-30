// =========================================================================
// COMFORT JOURNEY - BUILD-TIME SYNC UTILITY
// Synchronizes public/live-content.json into src/data/toursData.js & blogsData.js
// Guarantees that production bundles, static SSG, and client JS always reflect
// the exact latest content published via Content Studio CMS while preserving
// all accessory exports (HERO_SLIDES, REELS_DATA, BLOG_CATEGORIES, etc.).
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function syncLiveContentToDataFiles() {
  const liveContentPath = path.resolve(__dirname, '../public/live-content.json');
  const toursDataPath = path.resolve(__dirname, '../src/data/toursData.js');
  const blogsDataPath = path.resolve(__dirname, '../src/data/blogsData.js');

  if (!fs.existsSync(liveContentPath)) {
    console.log('ℹ️ [Sync] No public/live-content.json found, skipping build sync.');
    return;
  }

  try {
    const raw = fs.readFileSync(liveContentPath, 'utf8');
    const live = JSON.parse(raw);

    // 1. Sync Tours (preserve all exports before and after TOURS_DATA)
    if (Array.isArray(live.tours) && live.tours.length > 0 && fs.existsSync(toursDataPath)) {
      const currentTours = fs.readFileSync(toursDataPath, 'utf8');
      const startMarker = 'export const TOURS_DATA = [';
      const endMarker = 'export default TOURS_DATA;';
      const p1 = currentTours.indexOf(startMarker);
      const p2 = currentTours.indexOf(endMarker);

      if (p1 !== -1 && p2 !== -1 && p2 > p1) {
        const before = currentTours.slice(0, p1);
        const after = currentTours.slice(p2);
        const newToursContent = `${before}export const TOURS_DATA = ${JSON.stringify(live.tours, null, 2)};\n\n${after}`;
        fs.writeFileSync(toursDataPath, newToursContent, 'utf8');
        console.log(`✅ [Sync] Successfully synced ${live.tours.length} live tours into src/data/toursData.js (preserving all other exports)`);
      } else {
        console.warn('⚠️ [Sync] Could not locate TOURS_DATA markers in toursData.js');
      }
    }

    // 2. Sync Blogs (preserve all exports before and after BLOGS_DATA)
    if (Array.isArray(live.blogs) && live.blogs.length > 0 && fs.existsSync(blogsDataPath)) {
      const currentBlogs = fs.readFileSync(blogsDataPath, 'utf8');
      const startMarker = 'export const BLOGS_DATA = [';
      const endMarker = 'export function getBlogBySlug';
      const b1 = currentBlogs.indexOf(startMarker);
      const b2 = currentBlogs.indexOf(endMarker);

      if (b1 !== -1 && b2 !== -1 && b2 > b1) {
        const before = currentBlogs.slice(0, b1);
        const after = currentBlogs.slice(b2);
        const newBlogsContent = `${before}export const BLOGS_DATA = ${JSON.stringify(live.blogs, null, 2)};\n\n${after}`;
        fs.writeFileSync(blogsDataPath, newBlogsContent, 'utf8');
        console.log(`✅ [Sync] Successfully synced ${live.blogs.length} live blogs into src/data/blogsData.js (preserving all other exports)`);
      } else {
        console.warn('⚠️ [Sync] Could not locate BLOGS_DATA markers in blogsData.js');
      }
    }
  } catch (err) {
    console.warn('⚠️ [Sync] Error syncing live-content.json to data files:', err.message);
  }
}

// Auto-run if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncLiveContentToDataFiles();
}
