import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Home as HomeIcon, DoorClosed, Clock, CheckCircle2, Calendar, ArrowRight, Phone, MessageSquare, Sparkles, ShieldCheck, Calculator, Coins } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import PriceCalculator from '../components/PriceCalculator';
import SavingsCalculator from '../components/SavingsCalculator';

export default function RoomsPage({ onOpenBooking }) {
  const [activeSection, setActiveSection] = useState('plans'); // 'plans' | 'calculator' | 'savings' | 'all'
  const [activeTab, setActiveTab] = useState('all');

  const plans = [
    {
      id: 'daily-stay',
      title: 'Daily Stay Special ⭐',
      category: 'daily',
      price: '₹499',
      period: 'day',
      badge: 'Breakfast Free',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      includes: ['Hot Kerala Breakfast Included', 'Split AC / Fan Room', 'High-Speed 1Gbps Wi-Fi', 'Daily Clean Washroom', 'Zero Security Deposit', '300m Walk to HCL Gate'],
      description: 'Ideal for short business trips, interviews, or trial stays in Jigani with fresh Puttu/Dosa breakfast included every morning.',
      icon: Clock,
      highlight: true,
    },
    {
      id: '2bhk-sharing',
      title: '2 BHK Sharing Deluxe',
      category: 'monthly',
      price: '₹7,499',
      period: 'month',
      badge: 'Most Popular',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      includes: ['3x Daily Kerala Homestyle Meals', 'Personal Study Desk & Chair', 'Individual Locked Wardrobe', 'High-Speed Fiber Wi-Fi', '100% Commercial Generator', 'Daily Maid Housekeeping'],
      description: 'Comfortable twin sharing room designed for tech professionals and students balancing community and privacy.',
      icon: Bed,
      highlight: true,
    },
    {
      id: 'single-room',
      title: 'Single Executive Suite',
      category: 'monthly',
      price: '₹11,499',
      period: 'month',
      badge: '100% Private',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      includes: ['Private Single Bedroom (No Roommates)', '3x Daily Kerala Meals Included', 'Ergonomic Workstation Desk', 'Pristine Attached Bathroom', 'Private Balcony Greenery View', 'High-Speed 1Gbps Fiber Wi-Fi'],
      description: 'Dedicated private room with zero roommate interference. Move-in ready sanctuary for high-output IT professionals.',
      icon: DoorClosed,
      highlight: true,
    },
    {
      id: '1bhk',
      title: '1 BHK Independent Suite',
      category: 'monthly',
      price: 'Contact for Rate',
      period: 'monthly rate',
      badge: 'Full Suite & Kitchen',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      includes: ['Private Living Room & Bedroom', 'Kitchen Space Access', 'High-Speed WiFi 6', 'Daily Maid Service', '100% Power Backup', 'Biometric 24/7 Security'],
      description: 'Private 1BHK suite with your own spacious living hall and independent kitchen access in Sannidhi Layout.',
      icon: HomeIcon,
    },
  ];

  const filteredPlans = activeTab === 'all'
    ? plans
    : plans.filter((p) => p.category === activeTab);

  const handleWhatsApp = (title) => {
    const text = encodeURIComponent(`Hello Aafa Coliving Team! I am interested in checking availability for *${title}* in Jigani. Could you share current move-in dates?`);
    window.open(`https://wa.me/918747049377?text=${text}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Bed className="w-4 h-4 text-[#D4A64A]" />
            <span>Rooms & Pricing Plans</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-4 font-sora tracking-tight">
            Flexible Accommodation <span className="text-gradient-gold">Tailored for You</span>
          </h1>
          <p className="text-[#FAF7F0]/80 text-sm sm:text-base leading-relaxed">
            Choose from 1BHK suites, 2BHK sharing, single private rooms, or flexible ₹499/day stays near HCL Gate in Jigani.
          </p>
        </div>

        {/* Top-Level Low-Scroll Section Controller */}
        <div className="flex justify-center mb-8">
          <div className="p-1.5 rounded-2xl glass-card border border-[#D4A64A]/30 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'plans', label: '🛏️ Living Sanctuaries', icon: Bed },
              { id: 'calculator', label: '💰 Custom Rate Estimator', icon: Calculator },
              { id: 'savings', label: '⚖️ Savings vs Renting Flat', icon: Coins },
              { id: 'all', label: '📜 View All Sequentially', icon: Sparkles },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 scale-105'
                    : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
                }`}
                data-cursor="expand"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Plans */}
        {(activeSection === 'plans' || activeSection === 'all') && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            {/* Filter Tabs */}
            <div className="flex justify-center gap-2.5 mb-10 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All Living Plans' },
                { id: 'daily', label: '⭐ Daily Stay (₹499/day)' },
                { id: 'monthly', label: 'Monthly Co-Living' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#D4A64A] text-[#0B1220] shadow-md shadow-[#D4A64A]/30'
                      : 'glass-card text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
                  }`}
                  data-cursor="expand"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPlans.map((plan, idx) => {
                  const Icon = plan.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      key={plan.id}
                      className={`glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border flex flex-col justify-between group relative overflow-hidden ${
                        plan.highlight ? 'border-[#D4A64A]/40 shadow-xl' : 'border-white/10'
                      }`}
                      data-cursor="expand"
                    >
                      <div>
                        {/* Image Preview */}
                        <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
                          <img
                            src={plan.image}
                            alt={plan.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1220]/85 backdrop-blur-md text-[#D4A64A] border border-[#D4A64A]/30 text-xs font-bold font-mono">
                            {plan.badge}
                          </div>
                        </div>

                        {/* Header */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl bg-[#D4A64A]/15 border border-[#D4A64A]/30 flex items-center justify-center text-[#D4A64A] shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#FAF7F0] font-sora">
                            {plan.title}
                          </h3>
                        </div>

                        <p className="text-[#FAF7F0]/80 text-xs sm:text-sm leading-relaxed mb-6">
                          {plan.description}
                        </p>

                        {/* Price Pill */}
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-baseline justify-between">
                          <div>
                            <p className="text-[10px] text-[#FAF7F0]/60 uppercase font-mono">Pricing Rate</p>
                            <p className="text-2xl sm:text-3xl font-extrabold text-[#D4A64A] font-sora">
                              {plan.price} <span className="text-xs font-normal text-[#FAF7F0]/60">/ {plan.period}</span>
                            </p>
                          </div>
                          {plan.id === 'daily-stay' && (
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-xl border border-emerald-500/30 font-mono">
                              Breakfast Included
                            </span>
                          )}
                        </div>

                        {/* Includes List */}
                        <h4 className="text-xs font-bold text-[#D4A64A] uppercase tracking-wider mb-3 font-mono">
                          What's Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                          {plan.includes.map((inc, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#FAF7F0]/90">
                              <CheckCircle2 className="w-4 h-4 text-[#D4A64A] shrink-0" />
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                        <button
                          onClick={() => onOpenBooking(plan.title)}
                          className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs sm:text-sm shadow-lg shadow-[#D4A64A]/30 hover:shadow-[#D4A64A]/50 transition-all btn-shimmer"
                        >
                          <Calendar className="w-4 h-4 stroke-[2.5]" />
                          <span>Book Room</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleWhatsApp(plan.title)}
                          className="w-full sm:w-auto px-4 py-3.5 rounded-xl glass-card text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/15 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                          title="Enquire on WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-400" />
                          <span>WhatsApp</span>
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Section 2: Interactive Cost Calculator */}
        {(activeSection === 'calculator' || activeSection === 'all') && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-4 sm:p-8">
              <PriceCalculator onOpenBooking={onOpenBooking} />
            </div>
          </motion.div>
        )}

        {/* Section 3: Savings Tool */}
        {(activeSection === 'savings' || activeSection === 'all') && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-4 sm:p-8">
              <SavingsCalculator onOpenBooking={onOpenBooking} />
            </div>
          </motion.div>
        )}

      </div>
    </PageTransition>
  );
}
