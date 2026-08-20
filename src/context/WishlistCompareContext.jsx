import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistCompareContext = createContext();

export function WishlistCompareProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('cj_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cj_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (tourId) => {
    setWishlist((prev) =>
      prev.includes(tourId) ? prev.filter((id) => id !== tourId) : [...prev, tourId]
    );
  };

  const isInWishlist = (tourId) => wishlist.includes(tourId);

  const toggleCompare = (tour) => {
    setCompareList((prev) => {
      const exists = prev.some((t) => t.id === tour.id);
      if (exists) {
        return prev.filter((t) => t.id !== tour.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 tour packages side-by-side.');
        return prev;
      }
      return [...prev, tour];
    });
  };

  const isComparing = (tourId) => compareList.some((t) => t.id === tourId);

  const clearCompare = () => setCompareList([]);

  return (
    <WishlistCompareContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isComparing,
        clearCompare,
        isWishlistOpen,
        setIsWishlistOpen,
        isCompareOpen,
        setIsCompareOpen
      }}
    >
      {children}
    </WishlistCompareContext.Provider>
  );
}

export function useWishlistCompare() {
  const context = useContext(WishlistCompareContext);
  if (!context) {
    throw new Error('useWishlistCompare must be used within WishlistCompareProvider');
  }
  return context;
}
