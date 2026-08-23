import { useState, useEffect } from 'react';
import { DESTINATION_WEATHER } from '../data/toursData';

const WEATHER_DESTINATIONS = [
  { city: 'Kashmir', lat: 34.0837, lon: 74.7973, fallbackIcon: '❄️', fallbackCondition: 'Crisp & Mountain Breeze' },
  { city: 'Swiss Alps', lat: 46.6863, lon: 7.8632, fallbackIcon: '🏔️', fallbackCondition: 'Alpine Cool' },
  { city: 'Bali', lat: -8.6500, lon: 115.2167, fallbackIcon: '🌴', fallbackCondition: 'Tropical Breeze' },
  { city: 'Dubai', lat: 25.2048, lon: 55.2708, fallbackIcon: '☀️', fallbackCondition: 'Clear Skies' },
  { city: 'Iceland', lat: 64.1466, lon: -21.9426, fallbackIcon: '🌌', fallbackCondition: 'Arctic Aurora' },
  { city: 'Amalfi Coast', lat: 40.6281, lon: 14.4850, fallbackIcon: '🌊', fallbackCondition: 'Mediterranean Sun' },
  { city: 'Kenya', lat: -1.2921, lon: 36.8219, fallbackIcon: '🦁', fallbackCondition: 'Savannah Warmth' },
  { city: 'Andaman', lat: 11.6234, lon: 92.7265, fallbackIcon: '🏖️', fallbackCondition: 'Azure Island Waters' },
  { city: 'Japan', lat: 35.6762, lon: 139.6503, fallbackIcon: '🌸', fallbackCondition: 'Sakura Breeze' },
  { city: 'Maldives', lat: 4.1755, lon: 73.5093, fallbackIcon: '🏝️', fallbackCondition: 'Lagoon Warmth' },
  { city: 'Paris', lat: 48.8566, lon: 2.3522, fallbackIcon: '🗼', fallbackCondition: 'Mild & Romantic' },
  { city: 'Norway', lat: 69.6492, lon: 18.9553, fallbackIcon: '⚓', fallbackCondition: 'Fjord Mist' },
];

function parseWmoWeather(code) {
  if (code === 0) return { icon: '☀️', condition: 'Clear Sky' };
  if (code === 1 || code === 2) return { icon: '🌤️', condition: 'Mainly Sunny' };
  if (code === 3) return { icon: '⛅', condition: 'Partly Cloudy' };
  if (code === 45 || code === 48) return { icon: '🌫️', condition: 'Misty Fog' };
  if (code >= 51 && code <= 55) return { icon: '🌦️', condition: 'Light Drizzle' };
  if (code >= 61 && code <= 65) return { icon: '🌧️', condition: 'Rain' };
  if (code >= 71 && code <= 77) return { icon: '❄️', condition: 'Snowfall' };
  if (code >= 80 && code <= 82) return { icon: '🌦️', condition: 'Passing Showers' };
  if (code >= 95) return { icon: '⛈️', condition: 'Thunderstorm' };
  return { icon: '☀️', condition: 'Fair Weather' };
}

const CACHE_KEY = 'cj_live_weather_cache';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function useLiveWeather() {
  const [weatherList, setWeatherList] = useState(() => {
    // Attempt cache read
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION_MS && Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }
    return DESTINATION_WEATHER;
  });

  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchRealWeather() {
      try {
        const lats = WEATHER_DESTINATIONS.map(d => d.lat).join(',');
        const lons = WEATHER_DESTINATIONS.map(d => d.lon).join(',');
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,weather_code&timezone=auto`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);

        const result = await response.json();
        const dataArr = Array.isArray(result) ? result : [result];

        const liveData = WEATHER_DESTINATIONS.map((dest, idx) => {
          const current = dataArr[idx]?.current;
          if (current && typeof current.temperature_2m === 'number') {
            const tempRounded = Math.round(current.temperature_2m);
            const { icon, condition } = parseWmoWeather(current.weather_code);
            return {
              city: dest.city,
              temp: `${tempRounded > 0 ? '' : ''}${tempRounded}°C`,
              condition: condition,
              icon: icon,
              isRealLive: true
            };
          }
          return {
            city: dest.city,
            temp: DESTINATION_WEATHER[idx]?.temp || '24°C',
            condition: dest.fallbackCondition,
            icon: dest.fallbackIcon,
            isRealLive: false
          };
        });

        if (isMounted) {
          setWeatherList(liveData);
          setIsLive(true);
          setIsLoading(false);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: liveData, timestamp: Date.now() }));
          } catch {
            // Ignore storage quota
          }
        }
      } catch (err) {
        console.warn('Real live weather engine fallback to regional verified averages:', err.message);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRealWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  return { weatherList, isLive, isLoading };
}
