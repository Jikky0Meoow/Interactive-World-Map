import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Search component with dropdown suggestions.
 * Filters countries as user types and allows selection.
 */
export default function SearchBar({ onSelect, countries, placeholder = "Search country..." }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Update search results when query changes
  useEffect(() => {
    if (query.length > 0) {
      const lower = query.toLowerCase();
      const filtered = countries.filter(c =>
        c.name.toLowerCase().includes(lower)
      ).slice(0, 8); // limit results
      setResults(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, countries]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country) => {
    onSelect(country.id);
    setQuery(country.name);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    onSelect(null); // reset selection
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neon-cyan/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 pl-9 pr-8 bg-dark-800/80 border border-neon-cyan/20 rounded-xl text-sm text-white placeholder-neon-cyan/40 focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/40 transition-all glass"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="h-3 w-3 text-neon-cyan/60" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 w-full bg-dark-800/90 backdrop-blur-xl border border-neon-cyan/20 rounded-xl shadow-2xl shadow-neon-cyan/10 overflow-hidden"
          >
            {results.map(country => (
              <motion.li
                key={country.id}
                onClick={() => handleSelect(country)}
                className="px-4 py-2 text-sm text-white/80 hover:bg-neon-cyan/10 hover:text-neon-cyan cursor-pointer transition-colors flex items-center justify-between"
                whileHover={{ x: 4 }}
              >
                <span>{country.name}</span>
                <span className="text-xs text-neon-purple/60">{country.continent}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
