import { memo, useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/**
 * Interactive world map with zoom/pan, hover glow, and click selection.
 */
const WorldMap = ({ 
  selectedCountry, 
  onSelectCountry, 
  hoveredCountry, 
  onHoverCountry,
  countriesData,
  continentFilter
}) => {
  // Filter geography based on continent filter if active
  const filteredCountries = continentFilter && continentFilter !== 'all'
    ? countriesData.filter(c => c.continent === continentFilter).map(c => c.id)
    : null;

  // Handle click on country
  const handleCountryClick = useCallback((geo) => {
    const countryCode = geo.id;
    const country = countriesData.find(c => c.id === countryCode);
    if (country) {
      onSelectCountry(countryCode);
    }
  }, [countriesData, onSelectCountry]);

  // Style each geography based on state
  const getFillColor = (geo) => {
    const code = geo.id;
    if (code === selectedCountry) return '#b300ff'; // neon purple
    if (code === hoveredCountry) return '#00f0ff'; // neon cyan
    // Dim countries not in filter
    if (filteredCountries && !filteredCountries.includes(code)) return '#1a1a3a';
    return '#1e1e3f';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full h-full rounded-2xl overflow-hidden glass border border-neon-cyan/10"
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.8}
        maxScale={8}
        centerOnInit
        wheel={{ step: 0.5 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-2">
              <button 
                onClick={() => zoomIn()} 
                className="p-2 bg-dark-800/70 border border-neon-cyan/30 rounded-full hover:bg-neon-cyan/20 transition"
                aria-label="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <button 
                onClick={() => zoomOut()} 
                className="p-2 bg-dark-800/70 border border-neon-cyan/30 rounded-full hover:bg-neon-cyan/20 transition"
                aria-label="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
              <button 
                onClick={() => resetTransform()} 
                className="p-2 bg-dark-800/70 border border-neon-cyan/30 rounded-full hover:bg-neon-cyan/20 transition"
                aria-label="Reset view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
              </button>
            </div>

            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 150,
                  center: [0, 20]
                }}
                style={{ width: '100%', height: '100%' }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      const isSelected = geo.id === selectedCountry;
                      const isHovered = geo.id === hoveredCountry;
                      const fill = getFillColor(geo);
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke="#00f0ff20"
                          strokeWidth={0.3}
                          style={{
                            default: { outline: 'none' },
                            hover: { 
                              outline: 'none',
                              fill: '#00f0ff',
                              filter: 'drop-shadow(0 0 6px #00f0ff)',
                              transition: 'all 0.2s ease'
                            },
                            pressed: { outline: 'none' }
                          }}
                          onMouseEnter={() => {
                            if (!isSelected) onHoverCountry(geo.id);
                          }}
                          onMouseLeave={() => {
                            onHoverCountry(null);
                          }}
                          onClick={() => handleCountryClick(geo)}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </motion.div>
  );
};

export default memo(WorldMap);
