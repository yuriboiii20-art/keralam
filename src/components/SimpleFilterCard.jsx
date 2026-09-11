import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Users, Bed, Search, ArrowRight, ChevronDown, Check } from 'lucide-react';

export default function SimpleFilterCard({
  initialCategory = 'rooms',
  initialCity = 'Bengaluru',
  initialArea = 'Jigani',
  initialType = 'all',
  initialSharing = '2',
  onSearch,
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(initialCategory); // 'pg' | 'coliving' | 'rooms'
  const [city, setCity] = useState(initialCity);
  const [area, setArea] = useState(initialArea);
  const [type, setType] = useState(initialType);
  const [sharing, setSharing] = useState(initialSharing);

  // Active Dropdown Tracker: null | 'city' | 'area' | 'type' | 'sharing'
  const [openDropdown, setOpenDropdown] = useState(null);
  const cardRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dropdown Options
  const cityOptions = [
    { value: 'Bengaluru', label: 'Bengaluru' },
    { value: 'Kochi', label: 'Kochi' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'all', label: 'All Cities' },
  ];

  const areaOptions = [
    { value: 'Jigani', label: 'Jigani' },
    { value: 'Sannidhi Layout', label: 'Sannidhi Layout' },
    { value: 'Biocon Park', label: 'Biocon Park' },
    { value: 'all', label: 'All Areas' },
  ];

  const typeOptions = [
    { value: 'all', label: 'Any / Unisex' },
    { value: 'boys', label: 'Boys' },
    { value: 'girls', label: 'Girls' },
    { value: 'coliving', label: 'Coliving' },
  ];

  const sharingOptions = [
    { value: 'all', label: 'Any Sharing' },
    { value: '1', label: '1 Sharing' },
    { value: '2', label: '2 Sharing' },
    { value: '3', label: '3 Sharing' },
    { value: '4', label: '4 Sharing' },
  ];

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    let nextType = type;
    if (tabId === 'pg') {
      nextType = type === 'all' || type === 'coliving' ? 'boys' : type;
    } else if (tabId === 'coliving') {
      nextType = 'coliving';
    } else if (tabId === 'rooms') {
      nextType = 'all';
    }
    setType(nextType);
    if (onSearch) {
      onSearch({ category: tabId, city, area, type: nextType, sharing });
    }
  };

  const handleApply = () => {
    setOpenDropdown(null);
    if (onSearch) {
      onSearch({ category: activeTab, city, area, type, sharing });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`bg-[#0B1220] text-[#FAF7F0] rounded-[28px] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 w-full max-w-md mx-auto ${className}`}
    >
      {/* 1. Category Switcher Tabs (PG | Co-Living | Rooms) */}
      <div className="relative border-b border-white/10 pb-3 mb-5">
        <div className="flex items-center gap-6 sm:gap-8">
          {[
            { id: 'pg', label: 'PG' },
            { id: 'coliving', label: 'Co–Living' },
            { id: 'rooms', label: 'Rooms' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`relative pb-1 text-base sm:text-lg font-bold transition-colors cursor-pointer ${
                  isActive ? 'text-[#D4A64A]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-[13px] left-0 right-0 h-[3px] bg-[#D4A64A] rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 2x2 Grid of Selectors */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        
        {/* Selector 1: City */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'city' ? null : 'city')}
            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-[#10192B] border text-left flex items-center justify-between gap-1.5 transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
              openDropdown === 'city'
                ? 'border-[#D4A64A] ring-2 ring-[#D4A64A]/20 shadow-sm'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-[#D4A64A] shrink-0" />
              <span className="truncate text-[#FAF7F0]">
                {cityOptions.find((c) => c.value === city)?.label || city}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform duration-200 ${
                openDropdown === 'city' ? 'rotate-180 text-[#D4A64A]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'city' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 left-0 w-48 z-30 rounded-2xl bg-[#0E172A] border border-white/15 shadow-2xl overflow-hidden p-1 space-y-0.5 backdrop-blur-xl"
              >
                {cityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setCity(opt.value);
                      setOpenDropdown(null);
                      if (onSearch) onSearch({ category: activeTab, city: opt.value, area, type, sharing });
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      city === opt.value
                        ? 'bg-[#D4A64A]/15 text-[#D4A64A] font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {city === opt.value && <Check className="w-3.5 h-3.5 text-[#D4A64A]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selector 2: Area */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'area' ? null : 'area')}
            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-[#10192B] border text-left flex items-center justify-between gap-1.5 transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
              openDropdown === 'area'
                ? 'border-[#D4A64A] ring-2 ring-[#D4A64A]/20 shadow-sm'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Compass className="w-4 h-4 text-[#D4A64A] shrink-0" />
              <span className="truncate text-[#FAF7F0]">
                {areaOptions.find((a) => a.value === area)?.label || area}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform duration-200 ${
                openDropdown === 'area' ? 'rotate-180 text-[#D4A64A]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'area' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 right-0 w-48 z-30 rounded-2xl bg-[#0E172A] border border-white/15 shadow-2xl overflow-hidden p-1 space-y-0.5 backdrop-blur-xl"
              >
                {areaOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setArea(opt.value);
                      setOpenDropdown(null);
                      if (onSearch) onSearch({ category: activeTab, city, area: opt.value, type, sharing });
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      area === opt.value
                        ? 'bg-[#D4A64A]/15 text-[#D4A64A] font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {area === opt.value && <Check className="w-3.5 h-3.5 text-[#D4A64A]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selector 3: Occupancy / Gender */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-[#10192B] border text-left flex items-center justify-between gap-1.5 transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
              openDropdown === 'type'
                ? 'border-[#D4A64A] ring-2 ring-[#D4A64A]/20 shadow-sm'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Users className="w-4 h-4 text-[#D4A64A] shrink-0" />
              <span className="truncate text-[#FAF7F0]">
                {typeOptions.find((t) => t.value === type)?.label || type}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform duration-200 ${
                openDropdown === 'type' ? 'rotate-180 text-[#D4A64A]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'type' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 left-0 w-48 z-30 rounded-2xl bg-[#0E172A] border border-white/15 shadow-2xl overflow-hidden p-1 space-y-0.5 backdrop-blur-xl"
              >
                {typeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setType(opt.value);
                      setOpenDropdown(null);
                      if (onSearch) onSearch({ category: activeTab, city, area, type: opt.value, sharing });
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      type === opt.value
                        ? 'bg-[#D4A64A]/15 text-[#D4A64A] font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {type === opt.value && <Check className="w-3.5 h-3.5 text-[#D4A64A]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selector 4: Room Sharing */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'sharing' ? null : 'sharing')}
            className={`w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-[#10192B] border text-left flex items-center justify-between gap-1.5 transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
              openDropdown === 'sharing'
                ? 'border-[#D4A64A] ring-2 ring-[#D4A64A]/20 shadow-sm'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Bed className="w-4 h-4 text-[#D4A64A] shrink-0" />
              <span className="truncate text-[#FAF7F0]">
                {sharingOptions.find((s) => s.value === sharing)?.label || `${sharing} Sharing`}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform duration-200 ${
                openDropdown === 'sharing' ? 'rotate-180 text-[#D4A64A]' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDropdown === 'sharing' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1.5 right-0 w-48 z-30 rounded-2xl bg-[#0E172A] border border-white/15 shadow-2xl overflow-hidden p-1 space-y-0.5 backdrop-blur-xl"
              >
                {sharingOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSharing(opt.value);
                      setOpenDropdown(null);
                      if (onSearch) onSearch({ category: activeTab, city, area, type, sharing: opt.value });
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-colors ${
                      sharing === opt.value
                        ? 'bg-[#D4A64A]/15 text-[#D4A64A] font-bold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {sharing === opt.value && <Check className="w-3.5 h-3.5 text-[#D4A64A]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 3. Primary CTA Button: Find Your Space */}
      <button
        type="button"
        onClick={handleApply}
        className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-[#12372A] hover:bg-[#164333] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 border border-emerald-500/30 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer group"
      >
        <Search className="w-4 h-4 text-emerald-400 transition-transform group-hover:scale-110" />
        <span>Find Your Space</span>
        <ArrowRight className="w-4 h-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
      </button>

    </div>
  );
}
