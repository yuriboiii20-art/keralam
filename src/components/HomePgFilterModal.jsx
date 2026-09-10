import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, X, MapPin, Users, Building2, Bed, ArrowUpDown, Star, ShieldCheck,
  CheckCircle2, Calendar, MessageSquare, RotateCcw
} from 'lucide-react';
import useScrollLock from '../hooks/useScrollLock';
import { pgListings, citiesList } from '../data/pgListingsData';

export default function HomePgFilterModal({ isOpen, onClose, onOpenBooking }) {
  useScrollLock(isOpen);
  const scrollContainerRef = useRef(null);

  // Filter Selection State
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const [selectedGender, setSelectedGender] = useState('all'); // 'all' | 'boys' | 'girls' | 'coliving'
  const [selectedRoomType, setSelectedRoomType] = useState('all'); // 'all' | '1bhk' | '2bhk' | '3bhk' | '1rk'
  const [selectedSharing, setSelectedSharing] = useState('all'); // 'all' | '1' | '2' | '3' | '4'

  // Post-Result Sorting & Refinement State
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'price-asc' | 'price-desc' | 'rating'
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under-7k' | '7k-10k' | 'above-10k'
  const [premiumOnly, setPremiumOnly] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Filter & Sort Logic
  const filteredAndSortedListings = useMemo(() => {
    let result = pgListings.filter((item) => {
      // 1. City Match
      if (selectedCity && selectedCity !== 'all' && item.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      // 2. Gender / Type Match
      if (selectedGender !== 'all' && item.genderType !== selectedGender) {
        return false;
      }
      // 3. Room Type Match (1bhk, 2bhk, 3bhk, 1rk)
      if (selectedRoomType !== 'all') {
        const itemType = (item.roomType || '').toLowerCase();
        const itemName = (item.name || '').toLowerCase();
        const itemDesc = (item.desc || '').toLowerCase();

        if (selectedRoomType === '1bhk') {
          const isMatch = itemType === '1bhk' || itemName.includes('1bhk') || itemDesc.includes('1bhk') || item.sharing === 1;
          if (!isMatch) return false;
        } else if (selectedRoomType === '2bhk') {
          const isMatch = itemType === '2bhk' || itemName.includes('2bhk') || itemDesc.includes('2bhk') || item.sharing === 2;
          if (!isMatch) return false;
        } else if (selectedRoomType === '3bhk') {
          const isMatch = itemType === '3bhk' || itemName.includes('3bhk') || itemDesc.includes('3bhk') || item.sharing === 3;
          if (!isMatch) return false;
        } else if (selectedRoomType === '1rk') {
          const isMatch = itemType === '1rk' || itemName.includes('1rk') || itemName.includes('studio') || itemDesc.includes('1rk') || itemDesc.includes('studio') || item.sharing === 4;
          if (!isMatch) return false;
        }
      }
      // 4. Sharing Match
      if (selectedSharing !== 'all' && item.sharing !== Number(selectedSharing)) {
        return false;
      }
      // 5. Post-Filter: Premium Only
      if (premiumOnly && !item.isPremium) {
        return false;
      }
      // 6. Post-Filter: Price Range
      if (priceRange === 'under-7k' && item.price >= 7000) return false;
      if (priceRange === '7k-10k' && (item.price < 7000 || item.price > 10000)) return false;
      if (priceRange === 'above-10k' && item.price <= 10000) return false;

      return true;
    });

    // Post-Result Sorting
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCity, selectedGender, selectedRoomType, selectedSharing, premiumOnly, priceRange, sortBy]);

  const handleWhatsApp = (listing) => {
    const text = encodeURIComponent(
      `Hello Aafa Coliving, I am inquiring about ${listing.name} in ${listing.city} (${listing.genderLabel}, ${listing.sharingLabel}). Is there current availability?`
    );
    window.open(`https://wa.me/918747049377?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleResetFilters = () => {
    setSelectedCity('all');
    setSelectedGender('all');
    setSelectedRoomType('all');
    setSelectedSharing('all');
    setSortBy('default');
    setPriceRange('all');
    setPremiumOnly(false);
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += e.deltaY;
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
          onWheel={handleWheel}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl rounded-3xl border border-[#D4A64A]/40 bg-[#0B1220] text-[#FAF7F0] shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 h-[92vh] max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* 1. Modal Header (Fixed at top) */}
            <div 
              className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0E172A] shrink-0 z-20"
              onWheel={handleWheel}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#D4A64A]/15 border border-[#D4A64A]/30 flex items-center justify-center text-[#D4A64A] shrink-0">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sora text-[#FAF7F0] leading-tight">
                    Filter Accommodations
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/70 hidden sm:block">
                    Select your city, accommodation type, room type, and sharing preference
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white flex items-center gap-1 border border-white/10 transition-colors cursor-pointer"
                  title="Reset filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close Filter"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Unified Scrollable Body (Filters + Toolbar + Listings) */}
            <div 
              ref={scrollContainerRef}
              tabIndex={0}
              className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-6 space-y-4 outline-none"
              style={{
                scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
                overscrollBehavior: 'contain'
              }}
            >
              {/* 4 Compact Filter Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-3 rounded-2xl bg-[#0E172A] border border-white/10 shadow-sm">
                
                {/* 1. City Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#D4A64A] uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#D4A64A]" />
                    <span>City</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-[#131E32] border border-white/15 focus:border-[#D4A64A] text-xs text-[#FAF7F0] font-medium outline-none cursor-pointer h-9 transition-colors"
                  >
                    <option value="all">All Cities</option>
                    {citiesList.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Type Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#D4A64A] uppercase flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#D4A64A]" />
                    <span>Type</span>
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-[#131E32] border border-white/15 focus:border-[#D4A64A] text-xs text-[#FAF7F0] font-medium outline-none cursor-pointer h-9 transition-colors"
                  >
                    <option value="all">All Types</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                    <option value="coliving">Coliving</option>
                  </select>
                </div>

                {/* 3. Room Type Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#D4A64A] uppercase flex items-center gap-1.5">
                    <Building2 className="w-3 h-3 text-[#D4A64A]" />
                    <span>Room Type</span>
                  </label>
                  <select
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-[#131E32] border border-white/15 focus:border-[#D4A64A] text-xs text-[#FAF7F0] font-medium outline-none cursor-pointer h-9 transition-colors"
                  >
                    <option value="all">All Room Types</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="2bhk">2 BHK</option>
                    <option value="3bhk">3 BHK</option>
                    <option value="1rk">1 RK</option>
                  </select>
                </div>

                {/* 4. Room Sharing Dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-[#D4A64A] uppercase flex items-center gap-1.5">
                    <Bed className="w-3 h-3 text-[#D4A64A]" />
                    <span>Room Sharing</span>
                  </label>
                  <select
                    value={selectedSharing}
                    onChange={(e) => setSelectedSharing(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-xl bg-[#131E32] border border-white/15 focus:border-[#D4A64A] text-xs text-[#FAF7F0] font-medium outline-none cursor-pointer h-9 transition-colors"
                  >
                    <option value="all">Any Sharing (1 - 4)</option>
                    <option value="1">1 Sharing (Private)</option>
                    <option value="2">2 Sharing (Twin)</option>
                    <option value="3">3 Sharing (Triple)</option>
                    <option value="4">4 Sharing (Quad)</option>
                  </select>
                </div>

              </div>

              {/* Toolbar & Sort Controls */}
              <div className="p-3 rounded-2xl bg-[#0E172A] border border-white/10 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                  <div className="text-xs text-[#FAF7F0]/80 font-mono flex items-center gap-1.5">
                    <span className="font-bold text-[#D4A64A] text-sm">{filteredAndSortedListings.length}</span> properties found
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      onClick={() => setSortBy(sortBy === 'price-asc' ? 'default' : 'price-asc')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        sortBy === 'price-asc'
                          ? 'bg-[#D4A64A] text-[#0B1220] font-bold'
                          : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      <ArrowUpDown className="w-3 h-3" />
                      <span>Low to High</span>
                    </button>

                    <button
                      onClick={() => setSortBy(sortBy === 'price-desc' ? 'default' : 'price-desc')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        sortBy === 'price-desc'
                          ? 'bg-[#D4A64A] text-[#0B1220] font-bold'
                          : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      <ArrowUpDown className="w-3 h-3 rotate-180" />
                      <span>High to Low</span>
                    </button>

                    <button
                      onClick={() => setSortBy(sortBy === 'rating' ? 'default' : 'rating')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        sortBy === 'rating'
                          ? 'bg-[#D4A64A] text-[#0B1220] font-bold'
                          : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      <span>Most Rated</span>
                    </button>

                    <button
                      onClick={() => setPremiumOnly(!premiumOnly)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                        premiumOnly
                          ? 'bg-amber-400 text-[#0B1220] font-bold'
                          : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Premium</span>
                    </button>
                  </div>
                </div>

                {/* Price Range Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-[#FAF7F0]/60 uppercase">Price:</span>
                  {[
                    { id: 'all', label: 'All Rates' },
                    { id: 'under-7k', label: 'Under ₹7k' },
                    { id: '7k-10k', label: '₹7k – ₹10k' },
                    { id: 'above-10k', label: 'Above ₹10k' },
                  ].map((pill) => (
                    <button
                      key={pill.id}
                      onClick={() => setPriceRange(pill.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                        priceRange === pill.id
                          ? 'bg-[#D4A64A]/25 text-[#D4A64A] border border-[#D4A64A]/60 font-bold'
                          : 'bg-white/5 text-white/60 hover:text-white border border-white/5'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* RESULTS LIST */}
              {filteredAndSortedListings.length === 0 ? (
                <div className="p-8 text-center bg-[#0E172A] rounded-2xl border border-white/10 space-y-3">
                  <p className="text-sm font-bold text-[#FAF7F0]">
                    No rooms found matching the selected criteria.
                  </p>
                  <p className="text-xs text-[#FAF7F0]/60">
                    Try selecting "All Types" or "All Room Types" to view available properties.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-xl bg-[#D4A64A] text-[#0B1220] font-bold text-xs hover:scale-105 transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-2">
                  {filteredAndSortedListings.map((room) => (
                    <div
                      key={room.id}
                      className={`bg-[#10192B] hover:bg-[#142036] rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between group ${
                        room.isPremium ? 'border-[#D4A64A]/50 shadow-[0_4px_20px_rgba(212,166,74,0.1)]' : 'border-white/10'
                      }`}
                    >
                      <div>
                        {/* Compact Image */}
                        <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-white/10 bg-[#0B1220]">
                          <img
                            src={room.image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80'}
                            alt={room.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80';
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded-md bg-[#0B1220]/95 text-[#D4A64A] text-[10px] font-mono font-bold border border-[#D4A64A]/30">
                              {room.genderLabel}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-[#0B1220]/95 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                              {room.sharingLabel}
                            </span>
                          </div>

                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#0B1220]/95 text-white text-[10px] font-bold flex items-center gap-1 border border-white/15">
                            <Star className="w-3 h-3 text-[#D4A64A] fill-[#D4A64A]" />
                            <span>{room.rating}</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="text-[11px] text-[#D4A64A] font-mono mb-1 truncate">
                          {room.area} • {room.city}
                        </div>

                        <h4 className="text-sm font-bold font-sora text-[#FAF7F0] mb-1">
                          {room.name}
                        </h4>

                        <p className="text-xs text-[#FAF7F0]/70 leading-relaxed mb-3 line-clamp-2">
                          {room.desc}
                        </p>

                        <div className="space-y-1 mb-3">
                          {room.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] text-[#FAF7F0]/80">
                              <CheckCircle2 className="w-3 h-3 text-[#D4A64A] shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] font-mono text-[#FAF7F0]/60 uppercase">Monthly</span>
                          <p className="text-base font-extrabold text-[#D4A64A] font-sora">
                            {room.priceDisplay}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleWhatsApp(room)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors cursor-pointer"
                            title="Inquire on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onClose();
                              onOpenBooking(`${room.name} (${room.priceDisplay}/${room.period})`);
                            }}
                            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] font-bold text-xs hover:scale-105 transition-all cursor-pointer"
                          >
                            Book
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
