import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, Maximize2, Globe } from 'lucide-react';

/**
 * Slide-in panel displaying detailed info about selected country.
 */
export default function CountryCard({ country, onClose }) {
  if (!country) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="country-card"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed right-4 top-20 md:right-8 md:top-24 w-80 z-40"
      >
        <div className="glass-strong rounded-2xl p-6 border-neon-cyan/20 shadow-2xl shadow-neon-cyan/5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                {country.name}
              </h2>
              <p className="text-white/60 text-sm flex items-center gap-1 mt-1">
                <Globe className="h-3 w-3 text-neon-purple" />
                {country.continent}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="h-5 w-5 text-neon-cyan/70" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
              <MapPin className="h-5 w-5 text-neon-cyan" />
              <div>
                <p className="text-xs text-white/40 uppercase">Capital</p>
                <p className="font-medium">{country.capital}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
              <Users className="h-5 w-5 text-neon-purple" />
              <div>
                <p className="text-xs text-white/40 uppercase">Population</p>
                <p className="font-medium">{country.population.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
              <Maximize2 className="h-5 w-5 text-neon-pink" />
              <div>
                <p className="text-xs text-white/40 uppercase">Area (km²)</p>
                <p className="font-medium">{country.area.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Decorative bottom glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-neon-cyan/20 blur-xl rounded-full" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
