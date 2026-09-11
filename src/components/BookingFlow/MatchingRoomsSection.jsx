import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  MapPin,
  CheckCircle2,
  Utensils,
  Wifi,
  Zap,
  Home,
  ShieldCheck,
  Calendar,
  SlidersHorizontal,
  RotateCcw,
  Eye,
  ArrowRight,
  Flame,
  Check,
} from 'lucide-react';
import { allEnrichedListings } from '../../data/pgListingsData';

export default function MatchingRoomsSection({
  filters = {
    location: 'Jigani',
    stayType: 'day',
    roomType: 'all',
    sharing: '2',
    gender: 'all',
    checkInDate: '',
    duration: '1 Day',
    durationValue: 1,
  },
  onEditFilters,
  onViewDetails,
  onSelectRoom,
}) {
  // Filtering Logic
  const matchingListings = useMemo(() => {
    return allEnrichedListings.filter((item) => {
      // 1. Location match
      if (filters.location && filters.location !== 'all') {
        const target = filters.location.toLowerCase();
        const itemArea = (item.area || '').toLowerCase();
        const itemCity = (item.city || '').toLowerCase();
        if (!itemArea.includes(target) && !itemCity.includes(target)) {
          return false;
        }
      }

      // 2. Room Type match
      if (filters.roomType && filters.roomType !== 'all') {
        if (item.roomType !== filters.roomType) return false;
      }

      // 3. Sharing match
      if (filters.sharing && filters.sharing !== 'all') {
        if (item.sharing !== Number(filters.sharing)) return false;
      }

      // 4. Gender match
      if (filters.gender && filters.gender !== 'all') {
        if (item.genderType !== filters.gender && item.genderType !== 'coliving') {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  // Price helper based on selected stayType
  const getDisplayPrice = (room) => {
    if (filters.stayType === 'day') {
      return {
        amount: room.stayRates.dayDisplay,
        period: 'day',
        subtext: 'Free Breakfast Included',
      };
    } else if (filters.stayType === 'week') {
      return {
        amount: room.stayRates.weekDisplay,
        period: 'week',
        subtext: 'Better Value • Flexible',
      };
    } else {
      return {
        amount: room.stayRates.monthDisplay,
        period: 'month',
        subtext: '3x Daily Kerala Meals',
      };
    }
  };

  // Label helpers
  const locationLabel =
    filters.location === 'all' ? 'All Locations' : filters.location;
  const stayTypeLabel =
    filters.stayType === 'day'
      ? 'Day Stay'
      : filters.stayType === 'week'
      ? 'Weekly Stay'
      : 'Monthly Stay';
  const sharingLabel =
    filters.sharing === 'all'
      ? 'All Sharing'
      : `${filters.sharing} Sharing`;

  return (
    <div id="matching-rooms-results" className="w-full space-y-6 pt-4">
      {/* Top Compact Summary Bar with "Edit Filters" button */}
      <div className="rounded-2xl glass-card border border-white/10 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg bg-[#0B1220]/80">
        
        {/* Summary text */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-mono text-[#FAF7F0]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-[#D4A64A] text-sm sm:text-base whitespace-nowrap">
            {matchingListings.length} {matchingListings.length === 1 ? 'Space Available' : 'Spaces Available'}
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm text-[#FAF7F0]/85">
            Rooms in <strong className="text-[#FAF7F0]">{locationLabel}</strong> • {sharingLabel} • <strong className="text-emerald-400">{stayTypeLabel}</strong>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={onEditFilters}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#D4A64A]/20 border border-white/15 hover:border-[#D4A64A]/50 text-xs text-[#FAF7F0] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4A64A]" />
            <span>Edit Filters</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {matchingListings.length === 0 ? (
        /* Empty State with Helpful Relaxation Suggestions */
        <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#0E172A] border border-white/10 shadow-2xl space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold font-sora text-[#FAF7F0] mb-1">
              No matching rooms found for this specific combination
            </h4>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/70 max-w-md mx-auto">
              Try switching your sharing preference or selecting "Any / Unisex" to view available rooms nearby.
            </p>
          </div>

          {/* Quick Filter Relaxation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => onEditFilters({ sharing: 'all', gender: 'all' })}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#D4A64A]/20 border border-white/15 text-xs text-[#FAF7F0] hover:text-[#D4A64A] transition-all cursor-pointer"
            >
              Show All Sharing Types
            </button>
            <button
              onClick={() => onEditFilters({ location: 'Bengaluru' })}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#D4A64A]/20 border border-white/15 text-xs text-[#FAF7F0] hover:text-[#D4A64A] transition-all cursor-pointer"
            >
              Search All of Bengaluru
            </button>
            <button
              onClick={() => onEditFilters({ roomType: 'all', sharing: 'all', gender: 'all', location: 'Jigani' })}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] font-bold text-xs transition-all cursor-pointer"
            >
              Reset to Recommended
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {matchingListings.map((room, idx) => {
              const priceInfo = getDisplayPrice(room);

              return (
                <motion.div
                  layout
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`rounded-3xl p-5 bg-[#10192B] hover:bg-[#132038] border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                    room.isPremium
                      ? 'border-[#D4A64A]/50 shadow-[0_4px_30px_rgba(212,166,74,0.12)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Room Image Container */}
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-white/10 bg-[#0B1220]">
                      <img
                        src={room.image}
                        alt={room.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0B1220]/90 backdrop-blur-md text-[#D4A64A] text-[10px] font-mono font-bold border border-[#D4A64A]/30">
                          {room.genderLabel}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#0B1220]/90 backdrop-blur-md text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                          {room.sharingLabel}
                        </span>
                      </div>

                      {/* Rating & Availability */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0B1220]/90 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/15">
                          <Star className="w-3 h-3 text-[#D4A64A] fill-[#D4A64A]" />
                          <span>{room.rating}</span>
                        </span>
                      </div>

                      {/* Availability banner */}
                      <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-md bg-[#0B1220]/95 text-emerald-400 text-[10px] font-mono font-semibold flex items-center gap-1 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>Move-In Ready</span>
                      </div>
                    </div>

                    {/* Location & Title */}
                    <div className="flex items-center gap-1 text-[11px] text-[#D4A64A] font-mono mb-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{room.area}</span>
                    </div>

                    <h4 className="text-base font-bold font-sora text-[#FAF7F0] mb-1.5 line-clamp-1 group-hover:text-[#D4A64A] transition-colors">
                      {room.name}
                    </h4>

                    <p className="text-xs text-[#FAF7F0]/70 leading-relaxed mb-4 line-clamp-2">
                      {room.desc}
                    </p>

                    {/* Core Features Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-[#0B1220]/60 border border-white/5 text-[10px] text-[#FAF7F0]/80 font-medium">
                      <div className="flex items-center gap-1.5 truncate">
                        <Utensils className="w-3.5 h-3.5 text-[#D4A64A] shrink-0" />
                        <span className="truncate">Kerala Meals</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Wifi className="w-3.5 h-3.5 text-[#D4A64A] shrink-0" />
                        <span className="truncate">1 Gbps Dual Wi-Fi</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Zap className="w-3.5 h-3.5 text-[#D4A64A] shrink-0" />
                        <span className="truncate">100% Gen Power</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Biometric Entry</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Dual Action Buttons ("View Details" and "Book Now") */}
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#FAF7F0]/60 uppercase tracking-wider block">
                          {stayTypeLabel} Rate
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-[#D4A64A] font-sora">
                            {priceInfo.amount}
                          </span>
                          <span className="text-xs text-[#FAF7F0]/60 font-normal">
                            /{priceInfo.period}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {priceInfo.subtext}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetails && onViewDetails(room)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-[#FAF7F0] border border-white/10 hover:border-white/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4A64A]" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectRoom && onSelectRoom(room)}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] text-xs font-extrabold shadow-md shadow-[#D4A64A]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer btn-shimmer"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
