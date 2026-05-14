import { useState, useEffect, useCallback } from 'react';
import countriesData from '../data/countries.json';

/**
 * Custom hook that provides country data operations:
 * - All countries
 * - Search by name
 * - Filter by continent
 * - Get country by code
 * - Random country selector
 */
export default function useCountryData() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading (can be replaced with API call)
    const timer = setTimeout(() => {
      setCountries(countriesData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Search countries by name (case insensitive)
  const searchCountries = useCallback((query) => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return countries.filter(c => c.name.toLowerCase().includes(lower));
  }, [countries]);

  // Filter countries by continent
  const filterByContinent = useCallback((continent) => {
    if (!continent || continent === 'all') return countries;
    return countries.filter(c => c.continent === continent);
  }, [countries]);

  // Get a single country by its code (used for map highlighting)
  const getCountryByCode = useCallback((code) => {
    return countries.find(c => c.id === code) || null;
  }, [countries]);

  // Select a random country
  const getRandomCountry = useCallback(() => {
    if (countries.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }, [countries]);

  // Get unique continents for filter dropdown
  const continents = [...new Set(countries.map(c => c.continent))].sort();

  return {
    countries,
    loading,
    searchCountries,
    filterByContinent,
    getCountryByCode,
    getRandomCountry,
    continents
  };
}
