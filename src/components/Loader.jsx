import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

/**
 * Fullscreen loader with spinning globe and neon glow
 */
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <Globe size={64} className="text-neon-cyan animate-glow" />
      </motion.div>
      <motion.p
        className="text-lg font-medium text-neon-cyan/80"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Loading world map...
      </motion.p>
    </motion.div>
  );
}
