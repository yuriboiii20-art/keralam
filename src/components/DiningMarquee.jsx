import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Clock, HeartHandshake, Sparkles, CheckCircle, Flame } from 'lucide-react';

export default function DiningMarquee() {
  const [activeMeal, setActiveMeal] = useState('breakfast');

  const menuItems = {
    breakfast: [
      { name: 'Appam with Vegetable / Chicken Stew', desc: 'Soft laced rice pancakes with fragrant coconut milk gravy.', tag: 'Kerala Classic' },
      { name: 'Puttu & Black Kadala Curry', desc: 'Steamed rice cylinder topped with fresh grated coconut & spicy chickpea curry.', tag: 'High Protein' },
      { name: 'Crispy Masala Dosa & Sambar', desc: 'Golden roasted dosa served with coconut chutney & homestyle sambar.', tag: 'Daily Favorite' },
      { name: 'Idiyappam with Egg Curry', desc: 'String hoppers served with spicy caramelized onion gravy.', tag: 'Traditional' },
    ],
    lunch: [
      { name: 'Kerala Sadhya Style Fish / Veg Meal', desc: 'Matta red rice, Fish Curry / Thoran, Avial, Sambar, & Payasam.', tag: 'Authentic Feast' },
      { name: 'Malabar Chicken Biryani (Sunday Special)', desc: 'Kaima rice slow-cooked with ghee, aromatic spices, and tender chicken.', tag: 'Weekend Special' },
      { name: 'Nadan Chicken Curry with Rice', desc: 'Roasted coconut gravy with tender chicken cuts.', tag: 'Resident Pick' },
      { name: 'Parippu & Moru Curry Thali', desc: 'Comforting yellow lentils with tempered buttermilk curry.', tag: 'Homestyle' },
    ],
    snacks: [
      { name: 'Pazham Pori (Banana Fritters)', desc: 'Ripe Nendran bananas fried to golden crispy perfection.', tag: 'Tea Time' },
      { name: 'Fresh Kerala Filter Coffee & Chai', desc: 'Brewed hot & fresh every evening at 4:30 PM.', tag: 'Daily Ritual' },
      { name: 'Hot Parippu Vada & Chutney', desc: 'Crunchy lentil fritters spiced with ginger & curry leaves.', tag: 'Crispy' },
    ],
    dinner: [
      { name: 'Malabar Porotta & Chicken / Paneer Curry', desc: 'Flaky layered Kerala porotta served hot with rich curry.', tag: 'Popular Night' },
      { name: 'Soft Wheat Chappathi & Dal Tadka', desc: 'Light homestyle whole wheat rotis with tempered yellow lentils.', tag: 'Healthy & Light' },
      { name: 'Kerala Special Ghee Rice', desc: 'Aromatic short grain rice toasted in pure cow ghee.', tag: 'Special' },
    ],
  };

  const marqueeItems = [
    '🍛 Authentic Kerala Home Cooking',
    '⚡ 3X Daily Hot Meals Included',
    '🥥 Fresh Coconut & Pure Ghee Ingredients',
    '🥗 Veg & Non-Veg Segregated Kitchens',
    '☕ Evening Filter Coffee & Snacks',
    '🍌 Weekend Special Biryani & Sadhya',
  ];

  return (
    <section id="dining" className="relative py-10 sm:py-20 z-10 overflow-hidden">
      
      {/* Infinite Marquee Banner */}
      <div className="w-full bg-gradient-to-r from-[#D4A64A] via-amber-400 to-yellow-600 py-2.5 sm:py-3 text-[#0B1220] font-extrabold text-xs sm:text-sm tracking-wide overflow-hidden shadow-xl mb-10 sm:mb-14 rotate-[-0.8deg]">
        <div className="flex whitespace-nowrap animate-marquee gap-8">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-2 font-sora">
              <span>{item}</span>
              <span className="text-[#0B1220] font-black">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Utensils className="w-4 h-4 text-[#D4A64A]" />
            <span>The Aafa Mess Experience</span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-3 sm:mb-4 font-sora tracking-tight">
            Kerala Hospitality <span className="text-gradient-gold">On Your Plate</span>
          </h2>
          <p className="text-[#FAF7F0]/80 text-xs sm:text-base leading-relaxed">
            Say goodbye to bland PG food. Our in-house chefs cook fresh, hygienic, home-style Kerala delicacies 3 times a day using zero artificial preservatives.
          </p>
        </div>

        {/* Meal Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {[
            { id: 'breakfast', label: '🌅 Breakfast (7:30 - 9:30 AM)' },
            { id: 'lunch', label: '☀️ Lunch (12:30 - 2:30 PM)' },
            { id: 'snacks', label: '☕ Evening Tea (4:30 - 6:00 PM)' },
            { id: 'dinner', label: '🌙 Dinner (7:30 - 9:30 PM)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMeal(tab.id)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeMeal === tab.id
                  ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-lg shadow-[#D4A64A]/25 scale-105'
                  : 'glass-card text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
              }`}
              data-cursor="expand"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          <AnimatePresence mode="wait">
            {menuItems[activeMeal].map((dish, idx) => (
              <motion.div
                key={`${activeMeal}-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D4A64A]/15 border border-[#D4A64A]/30 flex items-center justify-center shrink-0 text-[#D4A64A]">
                  <Utensils className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#FAF7F0] font-sora">
                      {dish.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 font-bold whitespace-nowrap">
                      {dish.tag}
                    </span>
                  </div>
                  <p className="text-[#FAF7F0]/75 text-xs sm:text-sm leading-relaxed">
                    {dish.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dietary Guarantee Card */}
        <div className="rounded-3xl glass-card border border-[#D4A64A]/35 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl bg-gradient-to-r from-[#D4A64A]/10 via-transparent to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 flex items-center justify-center shrink-0 text-[#D4A64A]">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-[#FAF7F0] font-sora">
                Hygienic & Custom Dietary Preferences
              </h4>
              <p className="text-[#FAF7F0]/75 text-xs sm:text-sm mt-0.5">
                Separate veg & non-veg preparation counters. Pure RO drinking water used for all cooking.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 font-mono">
              <CheckCircle className="w-4 h-4" />
              100% In-House Clean Mess
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
