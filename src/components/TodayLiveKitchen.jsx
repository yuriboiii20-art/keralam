import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Clock, Flame, ThumbsUp, Heart, Sparkles, ChefHat, CheckCircle } from 'lucide-react';

export default function TodayLiveKitchen() {
  const [currentMeal, setCurrentMeal] = useState('lunch');
  const [likes, setLikes] = useState({ breakfast: 48, lunch: 92, snacks: 64, dinner: 85 });
  const [hasLiked, setHasLiked] = useState({});

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 11) {
      setCurrentMeal('breakfast');
    } else if (hour >= 11 && hour < 16) {
      setCurrentMeal('lunch');
    } else if (hour >= 16 && hour < 19) {
      setCurrentMeal('snacks');
    } else {
      setCurrentMeal('dinner');
    }
  }, []);

  const mealSchedule = {
    breakfast: {
      timeSlot: '7:30 AM - 9:30 AM',
      name: 'Hot Kerala Breakfast',
      mainDish: 'Steamed Puttu & Spicy Kadala Curry',
      sideDish: 'Fresh Grated Coconut, Kerala Banana & Hot Chai',
      tag: 'Morning Fuel',
      chefSpecial: 'Freshly ground black chickpea gravy with coconut milk',
      diet: 'High Protein Vegetarian',
      status: currentMeal === 'breakfast' ? '🟢 Serving Live Now' : 'Scheduled',
    },
    lunch: {
      timeSlot: '12:30 PM - 2:30 PM',
      name: 'Homestyle Kerala Meals',
      mainDish: 'Authentic Kerala Fish Curry / Paneer Butter Masala',
      sideDish: 'Matta Red Rice, Cabbage Thoran, Avial, Moru Curry & Crispy Pappad',
      tag: 'Afternoon Feast',
      chefSpecial: 'Seer fish cooked in roasted coconut & Malabar kokum gravy',
      diet: 'Veg & Non-Veg Segregated',
      status: currentMeal === 'lunch' ? '🟢 Serving Live Now' : 'Scheduled',
    },
    snacks: {
      timeSlot: '4:30 PM - 6:00 PM',
      name: 'Kerala Evening Chai & Bites',
      mainDish: 'Crispy Pazham Pori (Golden Banana Fritters) & Parippu Vada',
      sideDish: 'Strong Kerala Filter Coffee & Fresh Cardamom Tea',
      tag: 'Evening Refresh',
      chefSpecial: 'Ripe Nendran bananas fried to crisp perfection',
      diet: 'Pure Vegetarian',
      status: currentMeal === 'snacks' ? '🟢 Serving Live Now' : 'Scheduled',
    },
    dinner: {
      timeSlot: '7:30 PM - 9:30 PM',
      name: 'Night Comfort Dinner',
      mainDish: 'Layered Malabar Porotta / Soft Wheat Chappathi',
      sideDish: 'Homestyle Chicken Gravy / Veg Korma & Dal Tadka',
      tag: 'Resident Favorite',
      chefSpecial: 'Multi-layered flaky porottas prepared hot on the griddle',
      diet: 'Veg & Non-Veg Segregated',
      status: currentMeal === 'dinner' ? '🟢 Serving Live Now' : 'Scheduled',
    },
  };

  const handleVote = (mealKey) => {
    if (hasLiked[mealKey]) return;
    setLikes((prev) => ({ ...prev, [mealKey]: prev[mealKey] + 1 }));
    setHasLiked((prev) => ({ ...prev, [mealKey]: true }));
  };

  const active = mealSchedule[currentMeal];

  return (
    <section className="relative py-10 sm:py-20 px-3.5 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
          <ChefHat className="w-4 h-4 text-[#D4A64A]" />
          <span>Live In-House Kitchen</span>
        </div>
        <h2 className="text-2xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-3 sm:mb-4 font-sora tracking-tight">
          What’s Cooking <span className="text-gradient-gold">Today at Aafa?</span>
        </h2>
        <p className="text-[#FAF7F0]/80 text-xs sm:text-base leading-relaxed">
          Prepared 3 times daily by dedicated Kerala chefs using pure coconut oil, fresh spices, and zero frozen shortcuts.
        </p>
      </div>

      {/* Meal Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
        {[
          { id: 'breakfast', label: '🌅 Breakfast', time: '7:30 - 9:30 AM' },
          { id: 'lunch', label: '☀️ Lunch', time: '12:30 - 2:30 PM' },
          { id: 'snacks', label: '☕ Evening Tea', time: '4:30 - 6:00 PM' },
          { id: 'dinner', label: '🌙 Dinner', time: '7:30 - 9:30 PM' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentMeal(tab.id)}
            className={`p-2.5 sm:p-3.5 rounded-2xl text-left border transition-all ${
              currentMeal === tab.id
                ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] border-[#D4A64A] shadow-lg shadow-[#D4A64A]/30 scale-[1.02]'
                : 'glass-card border-white/10 text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
            }`}
            data-cursor="expand"
          >
            <span className="font-bold font-sora text-xs sm:text-sm block">{tab.label}</span>
            <span className={`text-[10px] font-mono mt-0.5 block ${currentMeal === tab.id ? 'text-[#0B1220]/80 font-bold' : 'text-[#FAF7F0]/50'}`}>
              {tab.time}
            </span>
          </button>
        ))}
      </div>

      {/* Live Spotlight Card */}
      <motion.div
        key={currentMeal}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl glass-card border border-[#D4A64A]/40 p-4 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-5">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{active.status}</span>
              </span>
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 font-bold">
                {active.tag}
              </span>
              <span className="text-xs text-[#FAF7F0]/60 font-mono">
                🕒 Timing: {active.timeSlot}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#FAF7F0] font-sora">
                {active.mainDish}
              </h3>
              <p className="text-sm sm:text-base text-[#D4A64A] font-medium mt-1">
                + {active.sideDish}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4A64A] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#FAF7F0] block">Chef’s Special Note:</span>
                <p className="text-xs text-[#FAF7F0]/75 leading-relaxed">{active.chefSpecial}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#FAF7F0]/80 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>{active.diet}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#D4A64A]">
                <Flame className="w-4 h-4" />
                <span>Unlimited Portions for Residents</span>
              </div>
            </div>

          </div>

          {/* Right Resident Love Box */}
          <div className="lg:col-span-4 rounded-2xl glass-card border border-[#D4A64A]/30 p-6 text-center bg-gradient-to-b from-[#D4A64A]/10 to-transparent flex flex-col items-center justify-center">
            <span className="text-[11px] font-mono text-[#FAF7F0]/70 uppercase">Resident Dish Rating</span>
            <div className="flex items-center justify-center gap-2 my-2">
              <span className="text-4xl font-extrabold text-[#D4A64A] font-sora">
                {likes[currentMeal]}
              </span>
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <p className="text-xs text-[#FAF7F0]/70 mb-4">
              Residents loved this dish today
            </p>

            <button
              onClick={() => handleVote(currentMeal)}
              disabled={hasLiked[currentMeal]}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                hasLiked[currentMeal]
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-[#D4A64A] text-[#0B1220] hover:scale-105 shadow-md shadow-[#D4A64A]/30'
              }`}
              data-cursor="expand"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{hasLiked[currentMeal] ? 'Voted Delicious! ❤️' : 'Vote This Dish (+1)'}</span>
            </button>
          </div>

        </div>
      </motion.div>

    </section>
  );
}
