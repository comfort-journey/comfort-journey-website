import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)', name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)', name: 'Euro' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)', name: 'British Pound' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)', name: 'UAE Dirham' },
  AUD: { symbol: 'A$ ', rate: 0.018, label: 'AUD (A$)', name: 'Australian Dollar' }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('cj_currency');
      return saved && CURRENCIES[saved] ? saved : 'INR';
    } catch {
      return 'INR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cj_currency', currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const formatPrice = (inrPrice) => {
    if (!inrPrice && inrPrice !== 0) return '';
    const current = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = Math.round(inrPrice * current.rate);
    
    if (currency === 'INR') {
      return `${current.symbol}${converted.toLocaleString('en-IN')}`;
    }
    return `${current.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
