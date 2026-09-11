import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';

/**
 * Hook to subscribe to live tour packages.
 * Automatically updates whenever any tour is created, updated, or deleted in CMS.
 */
export function useLiveTours() {
  const [tours, setTours] = useState(() => contentService.getTours());

  useEffect(() => {
    const handleToursUpdated = (e) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setTours([...e.detail]);
      } else {
        setTours([...contentService.getTours()]);
      }
    };

    window.addEventListener('cj_tours_updated', handleToursUpdated);
    return () => window.removeEventListener('cj_tours_updated', handleToursUpdated);
  }, []);

  return tours;
}

/**
 * Hook to subscribe to live editorial blogs.
 * Automatically updates whenever any blog is authored or published in CMS.
 */
export function useLiveBlogs() {
  const [blogs, setBlogs] = useState(() => contentService.getBlogs());

  useEffect(() => {
    const handleBlogsUpdated = (e) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setBlogs([...e.detail]);
      } else {
        setBlogs([...contentService.getBlogs()]);
      }
    };

    window.addEventListener('cj_blogs_updated', handleBlogsUpdated);
    return () => window.removeEventListener('cj_blogs_updated', handleBlogsUpdated);
  }, []);

  return blogs;
}
