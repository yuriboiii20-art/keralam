import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Footprints, Bike, Car, Building, HeartPulse, Sparkles, ExternalLink, CheckCircle } from 'lucide-react';

export default function NeighborhoodExplorer() {
  const [activeMode, setActiveMode] = useState('bike'); // 'walk' | 'bike' | 'car'
  const [selectedCategory, setSelectedCategory] = useState('tech'); // 'all' | 'tech' | 'transit' | 'essential'

  const destinations = [
    {
      id: 'hcl-gate',
      name: 'HCL Technologies Gate 1 & 2',
      category: 'tech',
      distance: '300 Meters',
      times: { walk: '2 mins', bike: '1 min', car: '1 min' },
      tag: 'Walk to Office',
      icon: Building,
      desc: 'Right next door! Step out and walk to your shifts with zero traffic hassle.',
      highlight: true
    },
    {
      id: 'biocon-park',
      name: 'Biocon Park & Jigani Industrial Hub',
      category: 'tech',
      distance: '1.8 km',
      times: { walk: '18 mins', bike: '5 mins', car: '6 mins' },
      tag: 'Pharma & Tech Hub',
      icon: Building,
      desc: 'Seamless direct commute along Jigani-Anekal main road.',
    },
    {
      id: 'bommasandra-metro',
      name: 'Bommasandra Yellow Line Metro',
      category: 'transit',
      distance: '3.8 km',
      times: { walk: '35 mins', bike: '8 mins', car: '10 mins' },
      tag: 'Upcoming Metro',
      icon: Navigation,
      desc: 'Direct rapid transit connection to Silk Board, BTM Layout, and Central Bengaluru.',
      highlight: true
    },
    {
      id: 'ecity-phase1',
      name: 'Electronic City Phase 1 & Infosys',
      category: 'tech',
      distance: '6.5 km',
      times: { walk: '55 mins', bike: '12 mins', car: '15 mins' },
      tag: 'Major IT Cluster',
      icon: Building,
      desc: 'Wipro, Infosys, Tech Mahindra & Siemens corporate campuses within quick reach.',
    },
    {
      id: 'narayana-health',
      name: 'Narayana Health City (Mazumdar Shaw)',
      category: 'essential',
      distance: '3.2 km',
      times: { walk: '30 mins', bike: '7 mins', car: '9 mins' },
      tag: 'Multi-Specialty Care',
      icon: HeartPulse,
      desc: 'World-class 24/7 emergency medical care and hospital facilities.',
    },
    {
      id: 'supermarkets',
      name: 'Jigani Daily Market & Supermarkets',
      category: 'essential',
      distance: '400 Meters',
      times: { walk: '3 mins', bike: '1 min', car: '2 mins' },
      tag: 'Daily Essentials',
      icon: Sparkles,
      desc: 'Fresh fruits, Kerala grocery stores, pharmacies, and ATMs right around the corner.',
    },
  ];

  const filteredDestinations = selectedCategory === 'all'
    ? destinations
    : destinations.filter((d) => d.category === selectedCategory);

  return (
    <section className="relative py-10 sm:py-20 px-3.5 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
          <Navigation className="w-4 h-4 text-[#D4A64A]" />
          <span>Prime Jigani Location</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-3 sm:mb-4 font-sora tracking-tight">
          2-Minute Walk to <span className="text-gradient-gold">HCL Gate</span>
        </h2>
        <p className="text-[#FAF7F0]/80 text-xs sm:text-base leading-relaxed">
          Strategically located in Sannidhi Layout, Jigani — cut your daily commute to zero and reclaim your personal evening time.
        </p>
      </div>

      {/* Commute Mode + Category Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 p-3 sm:p-4 rounded-3xl glass-card border border-[#D4A64A]/30">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'All Places' },
            { id: 'tech', label: 'Tech & Offices' },
            { id: 'transit', label: 'Metro & Transit' },
            { id: 'essential', label: 'Essentials & Care' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D4A64A] text-[#0B1220] shadow-md shadow-[#D4A64A]/25'
                  : 'bg-white/5 text-[#FAF7F0]/70 hover:text-[#FAF7F0] hover:bg-white/10'
              }`}
              data-cursor="expand"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Travel Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-[#0B1220]/80 p-1.5 rounded-2xl border border-white/10 shrink-0 w-full sm:w-auto justify-center">
          <span className="text-[11px] font-mono text-[#FAF7F0]/60 mr-2 hidden sm:inline">Commute via:</span>
          {[
            { id: 'walk', label: 'Walking', icon: Footprints },
            { id: 'bike', label: 'Two-Wheeler', icon: Bike },
            { id: 'car', label: 'Cab / Auto', icon: Car },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMode === mode.id
                    ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-sm'
                    : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
                }`}
                data-cursor="expand"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map((place, idx) => {
            const Icon = place.icon;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={place.id}
                className={`rounded-3xl p-6 glass-card glass-card-hover border flex flex-col justify-between group relative overflow-hidden ${
                  place.highlight ? 'border-[#D4A64A]/50 shadow-[0_0_25px_rgba(212,166,74,0.12)]' : 'border-white/10'
                }`}
              >
                <div>
                  {/* Top Badge & Time Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 font-bold">
                      {place.tag}
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{place.times[activeMode]}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4A64A]/15 text-[#D4A64A] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#FAF7F0] font-sora group-hover:text-[#D4A64A] transition-colors">
                        {place.name}
                      </h4>
                      <p className="text-xs text-[#D4A64A] font-mono mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{place.distance} from Aafa PG</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#FAF7F0]/75 leading-relaxed mb-4">
                    {place.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FAF7F0]/60 font-mono">
                  <span>Fastest Route: 1-way lane</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Zero Stress
                  </span>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Map Action Banner */}
      <div className="rounded-3xl glass-card border border-[#D4A64A]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl bg-gradient-to-r from-[#D4A64A]/15 via-transparent to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D4A64A] text-[#0B1220] flex items-center justify-center shrink-0 shadow-lg shadow-[#D4A64A]/30">
            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base sm:text-xl font-bold text-[#FAF7F0] font-sora">
              Exact Address: Sannidhi Layout, Bande Nalla Sandra Rd
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/80">
              Directly opposite Meghana PG, 300m before HCL Gate, Jigani, Bengaluru — 560105
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=Aafa+Coliving+Jigani+Bengaluru"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-[#D4A64A] text-[#0B1220] font-extrabold text-xs shrink-0 shadow-lg shadow-[#D4A64A]/25 hover:shadow-[#D4A64A]/45 hover:scale-105 transition-all flex items-center gap-2 btn-shimmer"
          data-cursor="expand"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
