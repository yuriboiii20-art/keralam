import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Sparkles, Building2, UserCheck, CheckCircle2 } from 'lucide-react';

export default function TestimonialsOrbit() {
  const [filter, setFilter] = useState('all'); // 'all' | 'food' | 'wifi' | 'safety'

  const reviews = [
    {
      name: 'Rohan Kurien',
      role: 'Senior Frontend Engineer',
      stay: '1.5 Years at Aafa',
      category: 'wifi',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'The Wi-Fi speed and 100% generator backup saved my late-night production releases multiple times. Plus, the homestyle Kerala fish curry on Wednesdays feels just like home!',
      room: 'Single Executive Suite',
      badge: 'Verified Resident',
    },
    {
      name: 'Anjali Menon',
      role: 'UX Designer & Freelancer',
      stay: '9 Months at Aafa',
      category: 'safety',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      comment: 'As a woman moving to Bengaluru for the first time, safety was my #1 priority. The biometric entry, 24/7 CCTV, and friendly housekeeping staff made me feel completely protected.',
      room: 'Double Sharing Deluxe',
      badge: 'Verified Resident',
    },
    {
      name: 'Siddharth Varma',
      role: 'Cloud Architect @ HCL',
      stay: '2 Years at Aafa',
      category: 'wifi',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'Zero hidden charges, clean attached bathrooms, and zero landlord drama! Being 300m from HCL Gate means I literally walk to work in 2 minutes.',
      room: 'Single Private Room',
      badge: 'Verified Resident',
    },
    {
      name: 'Deepak Nambiar',
      role: 'Data Analyst',
      stay: '6 Months at Aafa',
      category: 'food',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      comment: 'The food is genuinely homestyle Kerala cooking — not oily hotel mess food. Sunday Malabar Biryani and evening Pazham Pori with filter coffee are unbeatable!',
      room: 'Double Sharing Deluxe',
      badge: 'Foodie Review',
    },
    {
      name: 'Meera Krishnan',
      role: 'Embedded Systems Engineer',
      stay: '1 Year at Aafa',
      category: 'safety',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      comment: 'Daily housekeeping keeps the rooms spotless. The peaceful environment in Sannidhi Layout is perfect for focused studying and good sleep.',
      room: '1 BHK Private Suite',
      badge: 'Verified Resident',
    },
    {
      name: 'Arjun Das',
      role: 'Product Specialist',
      stay: '₹499 Daily Stay Guest',
      category: 'food',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      comment: 'Booked the ₹499/day plan for a 3-day interview trip near HCL Gate. Pristine AC room, fast Wi-Fi, and delicious hot Puttu breakfast included. 10/10 value!',
      room: 'Daily Stay Special',
      badge: 'Short Stay Trial',
    },
  ];

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter((r) => r.category === filter);

  return (
    <section id="reviews" className="relative py-10 sm:py-20 px-3.5 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
          <Star className="w-4 h-4 text-[#D4A64A] fill-[#D4A64A]" />
          <span>Resident Stories & Google Ratings</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-3 sm:mb-4 font-sora tracking-tight">
          Loved by <span className="text-gradient-gold">500+ Co-Movers</span>
        </h2>
        <p className="text-[#FAF7F0]/80 text-xs sm:text-base leading-relaxed">
          Here is what engineers, researchers, and creators say about daily living at Aafa Coliving Jigani.
        </p>

        {/* Rating Breakdown Pill */}
        <div className="flex flex-col sm:inline-flex sm:flex-row items-center gap-2 sm:gap-4 mt-4 sm:mt-6 p-2.5 px-4 sm:px-5 rounded-2xl glass-card border border-[#D4A64A]/30 text-xs">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#D4A64A] text-[#D4A64A]" />
            ))}
          </div>
          <span className="font-bold text-[#FAF7F0] font-sora text-sm">4.9 / 5.0</span>
          <span className="text-[#FAF7F0]/60 font-mono text-[11px] sm:text-xs">140+ Verified Reviews on Google Maps</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-start sm:justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 overflow-x-auto pb-2 no-scrollbar max-w-full">
        {[
          { id: 'all', label: 'All Reviews' },
          { id: 'wifi', label: '⚡ WFH & Wi-Fi' },
          { id: 'food', label: '🍛 Kerala Food' },
          { id: 'safety', label: '🛡️ Safety & Housekeeping' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 scale-105'
                : 'glass-card text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
            }`}
            data-cursor="expand"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orbiting Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((rev, index) => (
            <motion.div
              layout
              key={rev.name}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between relative group overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4A64A]/10 group-hover:text-[#D4A64A]/20 transition-colors" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4A64A] text-[#D4A64A]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{rev.badge}</span>
                  </span>
                </div>

                {/* Review Content */}
                <p className="text-[#FAF7F0]/90 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Specs */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#D4A64A]/50 shadow-md shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#FAF7F0] font-sora">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[#D4A64A] font-medium">
                    {rev.role}
                  </p>
                  <p className="text-[10px] text-[#FAF7F0]/60 font-mono">
                    {rev.stay} • {rev.room}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
