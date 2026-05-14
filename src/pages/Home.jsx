import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import WorldMap from '../components/WorldMap';
import CountryCard from '../components/CountryCard';
import StatsPanel from '../components/StatsPanel';
import Loader from '../components/Loader';
import BackgroundParticles from '../components/BackgroundParticles';
import useCountryData from '../hooks/useCountryData';

/**
 * Main page assembling all components.
 * Manages selected country, hover, continent filter, and loading state.
 */
export default function Home() {
  const { 
    countries, 
    loading, 
    filterByContinent, 
    getCountryByCode, 
    getRandomCountry,
    continents 
  } = useCountryData();
  
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [hoveredCountryCode, setHoveredCountryCode] = useState(null);
  const [continentFilter, setContinentFilter] = useState('all');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Update filtered list when continent filter changes
  useEffect(() => {
    setFilteredCountries(filterByContinent(continentFilter));
  }, [continentFilter, filterByContinent]);

  // Simulate map loading (for loader)
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsMapLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Handle country selection (from map click or search)
  const handleSelectCountry = useCallback((code) => {
    setSelectedCountryCode(code);
  }, []);

  // Handle search result selection
  const handleSearchSelect = useCallback((code) => {
    setSelectedCountryCode(code);
    // Optionally zoom map to country would be handled by map ref
  }, []);

  // Handle continent change
  const handleContinentChange = useCallback((continent) => {
    setContinentFilter(continent);
    setSelectedCountryCode(null); // reset selection
  }, []);

  // Random country selector
  const handleRandomCountry = useCallback(() => {
    const random = getRandomCountry();
    if (random) {
      setSelectedCountryCode(random.id);
    }
  }, [getRandomCountry]);

  // Get selected country object
  const selectedCountry = selectedCountryCode ? getCountryByCode(selectedCountryCode) : null;

  return (
    <div className="relative min-h-screen bg-dark-900 font-space">
      {/* Background particles */}
      <BackgroundParticles />

      {/* Loading overlay */}
      <AnimatePresence>
        {isMapLoading && <Loader />}
      </AnimatePresence>

      {/* Navbar */}
      <Navbar
        onSearchSelect={handleSearchSelect}
        countries={countries}
        onContinentChange={handleContinentChange}
        onRandomCountry={handleRandomCountry}
        selectedContinent={continentFilter}
      />

      {/* Main content */}
      <main className="pt-20 px-4 pb-8 max-w-7xl mx-auto">
        {/* Stats panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <StatsPanel 
            countryCount={filteredCountries.length}
            continentCount={continents.length}
          />
        </motion.div>

        {/* Map container */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden border border-neon-cyan/10 shadow-2xl shadow-neon-cyan/5">
          {!isMapLoading && (
            <WorldMap
              selectedCountry={selectedCountryCode}
              onSelectCountry={handleSelectCountry}
              hoveredCountry={hoveredCountryCode}
              onHoverCountry={setHoveredCountryCode}
              countriesData={filteredCountries}
              continentFilter={continentFilter}
            />
          )}
        </div>
      </main>

      {/* Country detail card (slide-in panel) */}
      <CountryCard 
        country={selectedCountry}
        onClose={() => setSelectedCountryCode(null)}
      />
    </div>
  );
}
