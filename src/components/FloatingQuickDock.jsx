import React, { useState, useEffect } from 'react';
import { Bed, Utensils, Navigation, Star, ArrowUp, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingQuickDock({
  activeMasterDeck,
  onSelectMasterDeck,
  onOpenBooking,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling 250px down
      setVisible(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDeck = (deckId) => {
    onSelectMasterDeck(deckId);
    const element = document.getElementById('experience-hub');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'living', label: 'Rooms', icon: Bed },
    { id: 'dining', label: 'Dining', icon: Utensils },
    { id: 'campus', label: 'Campus', icon: Navigation },
    { id: 'reviews', label: 'Reviews & FAQ', icon: Star },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Quick navigation dock"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-fit"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#0B1220]/90 backdrop-blur-xl border border-[#D4A64A]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            
            {/* Master Hub Switcher Pills */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMasterDeck === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToDeck(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30'
                        : 'text-[#FAF7F0]/75 hover:text-[#FAF7F0] hover:bg-white/10'
                    }`}
                    title={`Jump to ${item.label}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-white/15 mx-0.5 sm:mx-1" />

            {/* Quick Book Button */}
            <button
              onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl sm:rounded-full bg-[#D4A64A]/20 hover:bg-[#D4A64A]/30 border border-[#D4A64A]/50 text-[#D4A64A] text-xs font-bold transition-all shadow-sm"
              title="Instant Book Room"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap font-mono text-[11px] sm:text-xs">Book ₹499</span>
            </button>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-xl sm:rounded-full glass-card hover:bg-white/15 text-[#FAF7F0]/70 hover:text-[#FAF7F0] flex items-center justify-center transition-all"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
