import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, label: 'INR (₹)', name: 'Indian Rupee' },
  USD: { symbol: '$', rate: 0.012, label: 'USD ($)', name: 'US Dollar' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR (€)', name: 'Euro' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)', name: 'UAE Dirham' },
  GBP: { symbol: '£', rate: 0.0095, label: 'GBP (£)', name: 'British Pound' }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('INR');

  const formatPrice = (inrPrice) => {
    if (!inrPrice) return '';
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
