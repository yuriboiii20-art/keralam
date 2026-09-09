import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Utensils, Zap, ShieldCheck, Sparkles, Shirt, Gamepad2, Laptop, Droplet, Car, Tv, Sun, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function AmenitiesPage({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const amenitiesList = [
    { category: 'dining', icon: Utensils, title: '3x Daily Kerala Home Meals', tag: 'Included Free', desc: 'Freshly cooked breakfast, lunch, and dinner prepared with authentic Kerala recipes.' },
    { category: 'work', icon: Wifi, title: '1 GBPS Dual Fiber Wi-Fi', tag: 'Zero Downtime', desc: 'High-speed dual fiber connections across all bedrooms and common areas.' },
    { category: 'work', icon: Zap, title: '100% Power Backup', tag: '24/7 Generator', desc: 'Automatic commercial generator line keeping laptop chargers, Wi-Fi, and lights on 24/7.' },
    { category: 'security', icon: ShieldCheck, title: 'Biometric Facial Entry', tag: '24/7 CCTV', desc: 'Smart keyless entry gate with round-the-clock CCTV surveillance for complete peace of mind.' },
    { category: 'comfort', icon: Sparkles, title: 'Daily Housekeeping', tag: 'Hygienic', desc: 'Professional staff cleans rooms, attached washrooms, and common zones daily.' },
    { category: 'comfort', icon: Shirt, title: 'Automated Washing Machines', tag: 'Laundry Access', desc: 'Self-service automatic washing machines and spacious rooftop drying racks.' },
    { category: 'leisure', icon: Gamepad2, title: 'Gaming & Chill Lounge', tag: 'Social Zone', desc: 'Recharge with PS5, 65" 4K Smart TV, acoustic bean bags, and board games.' },
    { category: 'work', icon: Laptop, title: 'Ergonomic Work Nooks', tag: 'WFH Ready', desc: 'Dedicated study tables with surge-protected power strips and warm reading lights.' },
    { category: 'comfort', icon: Droplet, title: 'Mineral RO Water Purifiers', tag: 'Pure Drinking', desc: 'Multi-stage reverse osmosis water purifiers installed on every floor.' },
    { category: 'security', icon: Car, title: '2-Wheeler & 4-Wheeler Parking', tag: 'Secure Parking', desc: 'Spacious covered parking lot protected by security cameras.' },
    { category: 'comfort', icon: Tv, title: 'Smart TV & Fridge Access', tag: 'Furnished', desc: 'Shared refrigerator in dining hall and Smart TV installed in penthouse suites.' },
    { category: 'leisure', icon: Sun, title: 'Rooftop Chill Terrace', tag: 'Outdoor Space', desc: 'Open-air rooftop terrace with evening breeze and city skyline views.' },
  ];

  const categories = [
    { id: 'all', label: 'All 12 Amenities' },
    { id: 'work', label: '⚡ WFH & Power' },
    { id: 'dining', label: '🍛 Kerala Dining' },
    { id: 'comfort', label: '✨ Comfort & Clean' },
    { id: 'security', label: '🛡️ Safety & Security' },
    { id: 'leisure', label: '🎮 Lounge & Rooftop' },
  ];

  const filteredAmenities = activeCategory === 'all'
    ? amenitiesList
    : amenitiesList.filter(item => item.category === activeCategory);

  return (
    <PageTransition>
      <div className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#D4A64A]" />
            <span>Zero-Gravity Amenities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-4 font-sora tracking-tight">
            Designed for <span className="text-gradient-gold">Uncompromised Living</span>
          </h1>
          <p className="text-[#FAF7F0]/80 text-sm sm:text-base leading-relaxed">
            Every amenity at Aafa Coliving is engineered for maximum convenience, safety, and productivity near HCL Gate in Jigani.
          </p>
        </div>

        {/* Low-Scroll Category Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between group"
                  data-cursor="expand"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4A64A]/15 border border-[#D4A64A]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#D4A64A]" />
                    </div>

                    <span className="inline-block text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 mb-2">
                      {item.tag}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold text-[#FAF7F0] mb-2 font-sora">
                      {item.title}
                    </h3>

                    <p className="text-[#FAF7F0]/75 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#FAF7F0]/10 flex items-center gap-1.5 text-xs text-[#D4A64A] font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Included in All Plans</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* CTA Card */}
        <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-[#FAF7F0] font-sora mb-2">
            Experience Zero-Gravity Living in Jigani Today
          </h2>
          <p className="text-xs text-[#FAF7F0]/80 mb-6 max-w-xl mx-auto">
            Book your room or reserve a ₹499 daily stay plan with free breakfast included.
          </p>

          <button
            onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-bold text-sm shadow-xl shadow-[#D4A64A]/25 hover:shadow-[#D4A64A]/45 transition-all"
            data-cursor="expand"
          >
            Reserve Your Room Now — ₹499/day
          </button>
        </div>

      </div>
    </PageTransition>
  );
}
