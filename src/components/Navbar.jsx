import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Shuffle } from 'lucide-react';
import SearchBar from './SearchBar';

const continentOptions = [
  { value: 'all', label: 'All' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'N. America' },
  { value: 'South America', label: 'S. America' },
  { value: 'Oceania', label: 'Oceania' }
];

/**
 * Top navigation bar with logo, search, continent filter, and random country button.
 */
export default function Navbar({ 
  onSearchSelect, 
  countries, 
  onContinentChange, 
  onRandomCountry, 
  selectedContinent 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-neon-cyan/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
              <Globe2 className="h-5 w-5 text-neon-cyan" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent hidden sm:block">
              GlobeXplorer
            </span>
          </div>

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-4">
            <SearchBar 
              onSelect={onSearchSelect}
              countries={countries}
              placeholder="Search country..."
            />
            
            {/* Continent filter */}
            <select
              value={selectedContinent}
              onChange={(e) => onContinentChange(e.target.value)}
              className="py-2 px-3 bg-dark-800/80 border border-neon-cyan/20 rounded-xl text-sm text-white focus:outline-none focus:border-neon-cyan/60 glass cursor-pointer"
            >
              {continentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Random country button */}
            <button
              onClick={onRandomCountry}
              className="p-2 bg-neon-purple/20 border border-neon-purple/30 rounded-xl hover:bg-neon-purple/30 transition flex items-center gap-1 group"
              title="Random country"
            >
              <Shuffle className="h-4 w-4 text-neon-purple group-hover:rotate-180 transition-transform duration-300" />
              <span className="text-sm text-neon-purple hidden lg:inline">Random</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg glass border border-neon-cyan/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 flex flex-col gap-3 pt-2"
          >
            <SearchBar 
              onSelect={(code) => { onSearchSelect(code); setIsMobileMenuOpen(false); }}
              countries={countries}
              placeholder="Search..."
            />
            <div className="flex gap-2">
              <select
                value={selectedContinent}
                onChange={(e) => onContinentChange(e.target.value)}
                className="flex-1 py-2 px-3 bg-dark-800/80 border border-neon-cyan/20 rounded-xl text-sm text-white glass"
              >
                {continentOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                onClick={() => { onRandomCountry(); setIsMobileMenuOpen(false); }}
                className="p-2 bg-neon-purple/20 border border-neon-purple/30 rounded-xl flex items-center gap-1"
              >
                <Shuffle className="h-4 w-4 text-neon-purple" />
                <span className="text-sm text-neon-purple">Random</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
