import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Utensils, Zap, ShieldCheck, Sparkles, Shirt, Gamepad2, Laptop, Droplet, Car, Sun, CheckCircle } from 'lucide-react';

export default function AmenitiesGrid() {
  const [activeCategory, setActiveCategory] = useState('all');

  const amenities = [
    {
      category: 'dining',
      icon: Utensils,
      title: 'Kerala Home Meals',
      description: 'Fresh 3x daily meals prepared with authentic Kerala spice blends, pure coconut oil, and quality ingredients.',
      tag: 'Foodie Favorite',
      highlight: true
    },
    {
      category: 'work',
      icon: Wifi,
      title: '1 GBPS Dual Wi-Fi',
      description: 'Ultra-fast fiber connections with zero-latency backup connection for seamless WFH and video calls.',
      tag: 'WFH Ready',
      highlight: true
    },
    {
      category: 'work',
      icon: Zap,
      title: '100% Power Backup',
      description: 'Automatic commercial generator and dual inverter line to keep lights, Wi-Fi, and laptop chargers on 24/7.',
      tag: 'Zero Downtime',
      highlight: true
    },
    {
      category: 'security',
      icon: ShieldCheck,
      title: 'Biometric Security',
      description: 'Smart keycard & facial recognition entry points with round-the-clock CCTV surveillance for resident safety.',
      tag: 'Safe & Secure'
    },
    {
      category: 'comfort',
      icon: Sparkles,
      title: 'Daily Housekeeping',
      description: 'Professional staff cleans rooms, attached washrooms, and common zones daily with hospital-grade sanitizers.',
      tag: 'Hygienic'
    },
    {
      category: 'comfort',
      icon: Shirt,
      title: 'Automated Laundry',
      description: 'Top-tier automatic washing machines, steam irons, and covered drying terraces for easy wardrobe care.',
      tag: 'Self-Service'
    },
    {
      category: 'leisure',
      icon: Gamepad2,
      title: 'Gaming & Chill Lounge',
      description: 'Recharge with PS5, 65" 4K Smart TV, acoustic bean bags, board games, and community movie nights.',
      tag: 'Social Zone'
    },
    {
      category: 'work',
      icon: Laptop,
      title: 'Ergonomic Work Nooks',
      description: 'Quiet study tables equipped with surge-protected power strips and warm LED reading lights.',
      tag: 'Productivity'
    },
  ];

  const categories = [
    { id: 'all', label: 'All 8 Amenities' },
    { id: 'work', label: '⚡ WFH & Power' },
    { id: 'dining', label: '🍛 Dining' },
    { id: 'comfort', label: '✨ Comfort & Clean' },
    { id: 'security', label: '🛡️ Safety & Security' },
    { id: 'leisure', label: '🎮 Lounge & Social' },
  ];

  const filteredAmenities = activeCategory === 'all'
    ? amenities
    : amenities.filter((a) => a.category === activeCategory);

  return (
    <section id="amenities" className="relative py-10 sm:py-20 px-3.5 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4 text-[#D4A64A]" />
          <span>Zero-Gravity Amenities</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-3 sm:mb-4 font-sora tracking-tight">
          Designed for <span className="text-gradient-gold">Uncompromised Living</span>
        </h2>
        <p className="text-[#FAF7F0]/80 text-xs sm:text-base leading-relaxed">
          Every amenity at Aafa Coliving is built around convenience, comfort, and peace of mind so you can focus on your career and life.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-start sm:justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 overflow-x-auto pb-2 no-scrollbar max-w-full">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 scale-105'
                : 'glass-card text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
            }`}
            data-cursor="expand"
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAmenities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-3xl p-6 glass-card glass-card-hover border flex flex-col justify-between group relative overflow-hidden ${
                  item.highlight ? 'border-[#D4A64A]/40' : 'border-white/10'
                }`}
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A64A]/25 to-amber-500/10 border border-[#D4A64A]/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-[#D4A64A]" />
                  </div>

                  <div className="inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 mb-2 font-bold">
                    {item.tag}
                  </div>

                  <h3 className="text-xl font-bold text-[#FAF7F0] mb-2 font-sora group-hover:text-[#D4A64A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[#FAF7F0]/75 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>100% Included in Monthly Rent</span>
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
}
