import useScrollLock from '../hooks/useScrollLock';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Sparkles, ChevronRight, CheckCircle2, Bell, Building2, Navigation, ArrowRight, X, ExternalLink } from 'lucide-react';
import { locations } from '../data/locationsData';

export default function LocationBar({ isOpen, onClose, onSelectCity }) {
  useScrollLock(isOpen);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'live' | 'upcoming'

  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'live'
          ? loc.status === 'live'
          : loc.status !== 'live';

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesFilter;

      const inCity = loc.city.toLowerCase().includes(q);
      const inArea = loc.area.toLowerCase().includes(q);
      const inState = loc.state.toLowerCase().includes(q);
      const inTech = loc.techParks?.some((tp) => tp.toLowerCase().includes(q));
      const inCompanies = loc.popularCompanies?.some((c) => c.toLowerCase().includes(q));

      return matchesFilter && (inCity || inArea || inState || inTech || inCompanies);
    });
  }, [searchQuery, activeFilter]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[220] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 25 }}
          className="relative w-full max-w-4xl rounded-3xl glass-card border border-[#D4A64A]/40 p-5 sm:p-8 shadow-2xl z-10 my-6 overflow-hidden bg-[#0B1220]/98 flex flex-col max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close Location Explorer Modal"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F0] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 text-xs font-semibold uppercase mb-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Pan-India Coliving Hubs</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FAF7F0] font-sora tracking-tight">
              Explore Aafa <span className="text-gradient-gold">Campus Locations</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/75 mt-1">
              Select your city to check room availability, commute times to IT parks, and homestyle dining plans.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A64A]" />
              <input
                type="text"
                placeholder="Search city, area, or tech park (e.g. HCL, Hinjawadi, OMR, Infopark)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card text-xs sm:text-sm text-[#FAF7F0] placeholder-[#FAF7F0]/50 focus:outline-none focus:border-[#D4A64A] border border-white/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#FAF7F0]/60 hover:text-[#FAF7F0]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Cities' },
                { id: 'live', label: '🟢 Live (Bengaluru)' },
                { id: 'upcoming', label: '🚀 Upcoming (5)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeFilter === tab.id
                      ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 scale-105'
                      : 'glass-card text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Locations Grid Container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLocations.map((loc, idx) => (
                  <motion.div
                    key={loc.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`rounded-2xl glass-card border overflow-hidden flex flex-col justify-between group transition-all ${
                      loc.status === 'live'
                        ? 'border-[#D4A64A]/50 bg-gradient-to-b from-[#D4A64A]/10 via-[#0B1220] to-[#0B1220]'
                        : 'border-white/10 hover:border-[#D4A64A]/30'
                    }`}
                  >
                    <div>
                      {/* Thumbnail Header */}
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={loc.heroImage}
                          alt={loc.city}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              loc.status === 'live'
                                ? 'bg-emerald-500 text-[#0B1220] shadow-md font-mono'
                                : 'bg-[#0B1220]/80 text-[#D4A64A] border border-[#D4A64A]/40 backdrop-blur-md'
                            }`}
                          >
                            {loc.status === 'live' ? '🟢 Live Campus' : `⏳ ${loc.launchTimeline}`}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs">
                          <span className="text-[10px] font-mono text-[#D4A64A] uppercase bg-[#0B1220]/80 px-2 py-0.5 rounded">
                            {loc.state}
                          </span>
                          <span className="text-[10px] text-[#FAF7F0]/80 font-mono">
                            {loc.pricingStarting}
                          </span>
                        </div>
                      </div>

                      {/* City Info */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold font-sora text-[#FAF7F0] group-hover:text-[#D4A64A] transition-colors flex items-center justify-between">
                          <span>{loc.city}</span>
                          <span className="text-xs font-mono font-normal text-emerald-400">
                            {loc.status === 'live' && 'Open 7 AM - 11 PM'}
                          </span>
                        </h4>

                        <p className="text-xs text-[#FAF7F0]/70 mt-1 flex items-start gap-1.5 line-clamp-2">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A64A] shrink-0 mt-0.5" />
                          <span>{loc.area}</span>
                        </p>

                        {/* Tech Parks Tags */}
                        {loc.techParks && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {loc.techParks.slice(0, 2).map((tp, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#FAF7F0]/75 border border-white/10"
                              >
                                {tp}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-4 pt-0">
                      <Link
                        to={`/locations/${loc.slug}`}
                        onClick={onClose}
                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                          loc.status === 'live'
                            ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 hover:scale-[1.02]'
                            : 'glass-card text-[#FAF7F0]/80 hover:text-[#D4A64A] border border-white/10 hover:border-[#D4A64A]/40'
                        }`}
                      >
                        <span>{loc.status === 'live' ? 'Enter Campus Hub' : 'View Hub Blueprint'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card rounded-2xl border border-white/10">
                <Building2 className="w-10 h-10 text-[#D4A64A] mx-auto mb-2 opacity-60" />
                <p className="text-sm font-bold text-[#FAF7F0]">No cities matching "{searchQuery}"</p>
                <p className="text-xs text-[#FAF7F0]/60 mt-1">Try searching for Bengaluru, Pune, Mumbai, Delhi, Chennai, or Kerala.</p>
              </div>
            )}
          </div>

          {/* Footer Quick Action */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#FAF7F0]/75 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-[#D4A64A] shrink-0" />
              <span>Headquarters: Sannidhi Layout, 300m from HCL Gate, Jigani, Bengaluru</span>
            </div>

            <Link
              to="/locations"
              onClick={onClose}
              className="text-[#D4A64A] hover:underline font-bold font-mono flex items-center gap-1 shrink-0"
            >
              <span>View Full Pan-India Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
