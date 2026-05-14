import { motion } from 'framer-motion';
import { Users, MapPin, Globe2, Compass } from 'lucide-react';

/**
 * Animated statistics cards showing world data
 */
const StatCard = ({ icon: Icon, label, value, delay, color = 'neon-cyan' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass rounded-2xl p-4 flex items-center gap-4 hover:border-neon-cyan/40 transition-all duration-300"
  >
    <div className={`p-3 rounded-xl bg-${color}/10 border border-${color}/20`}>
      <Icon className={`h-6 w-6 text-${color}`} />
    </div>
    <div>
      <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-bold text-${color}`}>{value}</p>
    </div>
  </motion.div>
);

export default function StatsPanel({ countryCount, continentCount }) {
  const stats = [
    {
      icon: Globe2,
      label: "Countries",
      value: countryCount,
      color: "neon-cyan",
      delay: 0.1
    },
    {
      icon: Compass,
      label: "Continents",
      value: continentCount,
      color: "neon-purple",
      delay: 0.2
    },
    {
      icon: Users,
      label: "Population",
      value: "7.9B+",
      color: "neon-pink",
      delay: 0.3
    },
    {
      icon: MapPin,
      label: "Capitals",
      value: countryCount,
      color: "neon-cyan",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
}
