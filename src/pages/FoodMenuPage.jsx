import useScrollLock from '../hooks/useScrollLock';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, Calendar, Phone, Sparkles, Star, HeartHandshake, ZoomIn, X, CheckCircle2, Clock, Flame } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function FoodMenuPage({ onOpenBooking }) {
  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const todayDayName = dayNames[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(todayDayName);
  const [activeImageModal, setActiveImageModal] = useState(null);
  useScrollLock(!!activeImageModal);
  const [customMenu, setCustomMenu] = useState(null);

  // Load custom CMS menu if edited by client
  useEffect(() => {
    const loadCMS = () => {
      try {
        const stored = localStorage.getItem('aafa_cms_data');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.menu) setCustomMenu(parsed.menu);
        }
      } catch (e) {}
    };

    loadCMS();
    window.addEventListener('aafa_cms_updated', loadCMS);
    return () => window.removeEventListener('aafa_cms_updated', loadCMS);
  }, []);

  const defaultMenuData = [
    {
      day: "MONDAY",
      tag: "Protein Kickoff",
      breakfast: { name: customMenu?.MONDAY?.breakfast || "Puttu & Kadala Curry", img: "https://images.unsplash.com/photo-1591940597372-bd266c6eb29e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHV0dHUlMjAlMjYlMjBLYWRhbGElMjBDdXJyeXxlbnwwfHwwfHx8MA%3D%3D", tag: "High Fiber" },
      lunch: { name: customMenu?.MONDAY?.lunch || "Rice, Moru Curry, Uppari", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", tag: "Probiotic Moru" },
      dinner: { name: customMenu?.MONDAY?.dinner || "Chappathi & Dal Masala", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcGF0aSUyMGFuZCUyMGRhbCUyMG1hc2FsYXxlbnwwfHwwfHx8MA%3D%3D", tag: "Light & Digestic" }
    },
    {
      day: "TUESDAY",
      tag: "Homestyle Delights",
      breakfast: { name: customMenu?.TUESDAY?.breakfast || "Idly & Sambar, Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", tag: "Traditional Breakfast" },
      lunch: { name: customMenu?.TUESDAY?.lunch || "Rice, Fish Curry / Veg Gravy", img: "https://media.istockphoto.com/id/2148568590/photo/bengali-non-veg-lunch-thali-with-plain-rice-vegetables-and-fish.webp?a=1&b=1&s=612x612&w=0&k=20&c=qgoRnnT5BuO-_X5Ppydvo76I8RgvvVfbvhyL0y0M0nQ=", tag: "Fresh Coastal Curry" },
      dinner: { name: customMenu?.TUESDAY?.dinner || "Chappathi & Chicken Gravy", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", tag: "Spicy Kerala Gravy" }
    },
    {
      day: "WEDNESDAY",
      tag: "Midweek Coastal Special",
      breakfast: { name: customMenu?.WEDNESDAY?.breakfast || "Dosa & Coconut Chutney", img: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80", tag: "Traditional South Indian" },
      lunch: { name: customMenu?.WEDNESDAY?.lunch || "Kerala Rice, Sambar, Aviyal", img: "https://assets.vogue.in/photos/5f4cddb9e07cbbc0d15b6866/2:3/w_1920,c_limit/Onam-2020.jpg", tag: "Traditional Sadhya" },
      dinner: { name: customMenu?.WEDNESDAY?.dinner || "Veg / Chicken Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", tag: "Basmati Spice" }
    },
    {
      day: "THURSDAY",
      tag: "Tradition & Spice",
      breakfast: { name: customMenu?.THURSDAY?.breakfast || "Poori Baji", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", tag: "Crispy Golden" },
      lunch: { name: customMenu?.THURSDAY?.lunch || "Rice, Pulissery, Thoran", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80", tag: "Traditional Avial" },
      dinner: { name: customMenu?.THURSDAY?.dinner || "Ghee Rice & Liver Curry / Veg", img: "https://images.unsplash.com/photo-1710091691802-7dedb8af9a77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2hlZSUyMFJpY2UlMjAlMjYlMjBMaXZlciUyMEN1cnJ5JTIwJTJGJTIwVmVnfGVufDB8fDB8fHww", tag: "Pure Cow Ghee" }
    },
    {
      day: "FRIDAY",
      tag: "Weekend Countdown",
      breakfast: { name: customMenu?.FRIDAY?.breakfast || "Appam & Veg Stew", img: "https://images.unsplash.com/photo-1738986586839-93af00b40dd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwYW0lMjBhbmQlMjB2ZWclMjBzdGV3fGVufDB8fDB8fHww", tag: "Steamed Soft" },
      lunch: { name: customMenu?.FRIDAY?.lunch || "Rice, Fish Fry, Rasam", img: "https://images.unsplash.com/photo-1756741987051-a6a38f28838b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmljZSUyMGZpc2glMjBmcnklMjByYXNhbXxlbnwwfHwwfHx8MA%3D%3D", tag: "Homestyle Meal" },
      dinner: { name: customMenu?.FRIDAY?.dinner || "Chappathi & Dal Curry", img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcGF0aSUyMGFuZCUyMGRhbCUyMG1hc2FsYXxlbnwwfHwwfHx8MA%3D%3D", tag: "High Protein Dal" }
    },
    {
      day: "SATURDAY",
      tag: "Weekend Feast",
      breakfast: { name: customMenu?.SATURDAY?.breakfast || "Idiyappam & Egg Curry", img: "https://media.istockphoto.com/id/665702302/photo/kerala-breakfast-idiyappam-or-appam.webp?a=1&b=1&s=612x612&w=0&k=20&c=42qmfT132_9KZ2iMoyxmoI-8VN9jHCFM8oR0V_AczGQ=", tag: "Fermented Batter" },
      lunch: { name: customMenu?.SATURDAY?.lunch || "Egg Fried Rice & Raitha", img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80", tag: "Wok Tossed" },
      dinner: { name: customMenu?.SATURDAY?.dinner || "Malabar Parotta & Chicken", img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", tag: "Chef Special" }
    },
    {
      day: "SUNDAY",
      tag: "Malabar Biryani Day",
      breakfast: { name: customMenu?.SUNDAY?.breakfast || "Uppumavu & Banana", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80", tag: "Roasted Rava" },
      lunch: { name: customMenu?.SUNDAY?.lunch || "Special Sunday Chicken Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", tag: "⭐ Sunday Royal Feast" },
      dinner: { name: customMenu?.SUNDAY?.dinner || "Kanji, Cherupayar & Pappad", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", tag: "Comforting Rice Kanji" }
    },
  ];

  const filteredMenu = selectedDay === 'ALL'
    ? defaultMenuData
    : defaultMenuData.filter(d => d.day === selectedDay);

  const marqueeText = "AAFA ROOMS & PG — 1BHK, 2BHK, SINGLE ROOM, DAILY & MONTHLY";

  return (
    <PageTransition>
      <div className="relative pt-24 pb-20 z-10 overflow-hidden">
        
        {/* SLIM ANIMATED MARQUEE STRIP */}
        <div className="w-full bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 py-2 text-[#0B1220] font-extrabold text-xs tracking-widest uppercase overflow-hidden shadow-md mb-8">
          <div className="flex whitespace-nowrap animate-marquee gap-8">
            {[...Array(6)].map((_, idx) => (
              <span key={idx} className="flex items-center gap-6 font-mono">
                <span>{marqueeText}</span>
                <span>•</span>
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* GLASS BANNER PAGE HEADER */}
          <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-8 sm:p-12 text-center mb-8 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
              <Utensils className="w-4 h-4 text-[#D4A64A]" />
              <span>3x Daily Kerala Mess Schedule</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#D4A64A] font-sora tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(212,166,74,0.3)]">
              FOOD MENU & DINING
            </h1>
            
            <p className="text-[#FAF7F0]/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Authentic Kerala homestyle cooking prepared daily with fresh coconut, coconut oil, ground spices, and zero artificial preservatives.
            </p>
          </div>

          {/* MEAL TIMINGS STRIP */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
            {[
              { meal: '🌅 Breakfast', time: '7:30 AM – 9:30 AM', desc: 'Fresh Puttu, Dosa, Idly & Coffee' },
              { meal: '☀️ Lunch', time: '12:30 PM – 2:30 PM', desc: 'Kerala Matta Rice & Curries' },
              { meal: '☕ Evening Snack', time: '5:00 PM – 6:00 PM', desc: 'Pazham Pori & Filter Tea' },
              { meal: '🌙 Dinner', time: '7:30 PM – 9:30 PM', desc: 'Hot Chappathi & Chicken/Dal' },
            ].map((timing, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-4 border border-white/10 text-center">
                <p className="text-xs font-bold font-sora text-[#D4A64A] mb-1">{timing.meal}</p>
                <p className="text-xs font-mono font-bold text-[#FAF7F0] mb-0.5">{timing.time}</p>
                <p className="text-[10px] text-[#FAF7F0]/60">{timing.desc}</p>
              </div>
            ))}
          </div>

          {/* GENTLE PULSE FLOATING BADGE */}
          <div className="flex justify-center mb-10">
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
                boxShadow: [
                  "0 0 15px rgba(212, 166, 74, 0.2)",
                  "0 0 25px rgba(212, 166, 74, 0.5)",
                  "0 0 15px rgba(212, 166, 74, 0.2)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
              className="glass-card rounded-2xl px-6 py-3.5 border border-[#D4A64A]/50 flex items-center gap-3 cursor-pointer group"
              data-cursor="expand"
            >
              <div className="w-8 h-8 rounded-full bg-[#D4A64A]/20 flex items-center justify-center text-[#D4A64A] font-bold text-sm">
                ⭐
              </div>
              <div>
                <span className="text-sm font-bold text-[#FAF7F0] font-sora group-hover:text-[#D4A64A] transition-colors">
                  Breakfast FREE with Daily Stay — ₹499/day
                </span>
                <span className="block text-[10px] text-[#FAF7F0]/60 font-mono">
                  Click to reserve daily stay plan →
                </span>
              </div>
            </motion.div>
          </div>

          {/* DAY-BY-DAY FILTER TABS */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-mono">
            {['ALL', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'].map((day) => {
              const isToday = day === todayDayName;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap font-bold border flex items-center gap-1.5 ${
                    selectedDay === day
                      ? 'bg-[#D4A64A] text-[#0B1220] border-[#D4A64A] shadow-lg shadow-[#D4A64A]/30 scale-105'
                      : 'glass-card border-white/10 text-[#FAF7F0]/80 hover:text-[#D4A64A]'
                  }`}
                  data-cursor="expand"
                >
                  {isToday && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                  <span>{day === 'ALL' ? '📅 Full Week' : day}</span>
                  {isToday && <span className="text-[10px] font-bold opacity-80">(Today)</span>}
                </button>
              );
            })}
          </div>

          {/* CARD-LIKE DAY-BY-DAY MENU CARDS GRID */}
          <div className="space-y-10 mb-16">
            {filteredMenu.map((row, idx) => (
              <motion.div
                key={row.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-[#D4A64A]/30 shadow-2xl space-y-6"
              >
                {/* Day Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center font-bold">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-[#D4A64A] font-sora tracking-wide">
                        {row.day}
                      </h3>
                      <span className="text-[10px] font-mono text-[#FAF7F0]/60 uppercase">
                        {row.tag}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono uppercase bg-[#D4A64A]/15 text-[#D4A64A] px-3.5 py-1 rounded-full border border-[#D4A64A]/30 font-bold">
                    3 Fresh Meals Included
                  </span>
                </div>

                {/* 3 Meal Cards Grid (Breakfast, Lunch, Dinner) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Breakfast Card */}
                  <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#D4A64A]/40 transition-all flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sora text-[#D4A64A]">🌅 Breakfast</span>
                      <span className="text-[9px] font-mono bg-white/5 text-[#FAF7F0]/70 px-2 py-0.5 rounded border border-white/10">
                        {row.breakfast.tag}
                      </span>
                    </div>

                    <div 
                      onClick={() => setActiveImageModal(row.breakfast)}
                      className="relative h-44 rounded-xl overflow-hidden border border-white/10 mb-3 cursor-pointer shadow-md group-hover:scale-[1.02] transition-transform"
                      data-cursor="expand"
                    >
                      <img
                        src={row.breakfast.img}
                        alt={row.breakfast.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#FAF7F0]">
                        <span>Click to Enlarge 🔍</span>
                      </div>
                    </div>

                    <p className="text-sm font-extrabold text-[#FAF7F0] font-sora leading-snug">
                      {row.breakfast.name}
                    </p>
                  </div>

                  {/* Lunch Card */}
                  <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#D4A64A]/40 transition-all flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sora text-[#D4A64A]">☀️ Lunch</span>
                      <span className="text-[9px] font-mono bg-white/5 text-[#FAF7F0]/70 px-2 py-0.5 rounded border border-white/10">
                        {row.lunch.tag}
                      </span>
                    </div>

                    <div 
                      onClick={() => setActiveImageModal(row.lunch)}
                      className="relative h-44 rounded-xl overflow-hidden border border-white/10 mb-3 cursor-pointer shadow-md group-hover:scale-[1.02] transition-transform"
                      data-cursor="expand"
                    >
                      <img
                        src={row.lunch.img}
                        alt={row.lunch.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#FAF7F0]">
                        <span>Click to Enlarge 🔍</span>
                      </div>
                    </div>

                    <p className="text-sm font-extrabold text-[#FAF7F0] font-sora leading-snug">
                      {row.lunch.name}
                    </p>
                  </div>

                  {/* Dinner Card */}
                  <div className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#D4A64A]/40 transition-all flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold font-sora text-[#D4A64A]">🌙 Dinner</span>
                      <span className="text-[9px] font-mono bg-white/5 text-[#FAF7F0]/70 px-2 py-0.5 rounded border border-white/10">
                        {row.dinner.tag}
                      </span>
                    </div>

                    <div 
                      onClick={() => setActiveImageModal(row.dinner)}
                      className="relative h-44 rounded-xl overflow-hidden border border-white/10 mb-3 cursor-pointer shadow-md group-hover:scale-[1.02] transition-transform"
                      data-cursor="expand"
                    >
                      <img
                        src={row.dinner.img}
                        alt={row.dinner.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-[#FAF7F0]">
                        <span>Click to Enlarge 🔍</span>
                      </div>
                    </div>

                    <p className="text-sm font-extrabold text-[#FAF7F0] font-sora leading-snug">
                      {row.dinner.name}
                    </p>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>

          {/* PAGE FOOTER STRIP */}
          <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-8 sm:p-10 text-center shadow-2xl">
            <h3 className="text-xl font-bold text-[#FAF7F0] font-sora mb-4">
              Direct Contact Hotlines for Mess & Booking
            </h3>

            {/* Click-to-Call Gold Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <a
                href="tel:+918747049377"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/25 hover:scale-105 transition-all"
                data-cursor="expand"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call 8747049377</span>
              </a>

              <a
                href="tel:+919686193084"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/25 hover:scale-105 transition-all"
                data-cursor="expand"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call 9686193084</span>
              </a>

              <a
                href="tel:+919745688880"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/25 hover:scale-105 transition-all"
                data-cursor="expand"
              >
                <Phone className="w-4 h-4 stroke-[2.5]" />
                <span>Call 9745688880</span>
              </a>
            </div>

            {/* Text Banner */}
            <div className="pt-6 border-t border-[#FAF7F0]/10">
              <p className="text-sm sm:text-base font-semibold text-[#D4A64A] font-sora italic">
                "Welcome to the Aafa Family — Wishing You a Wonderful Stay!"
              </p>
            </div>
          </div>

        </div>

        {/* Dish Image Lightbox Modal */}
        <AnimatePresence>
          {activeImageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveImageModal(null)}
                className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-2xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="relative max-w-xl w-full rounded-3xl overflow-hidden glass-card border border-[#D4A64A]/40 p-4 shadow-2xl z-10"
              >
                <button
                  onClick={() => setActiveImageModal(null)}
                  aria-label="Close Dish Image Preview Modal"
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-[#0B1220]/80 text-[#FAF7F0] hover:bg-[#0B1220] transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="h-80 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={activeImageModal.img}
                    alt={activeImageModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="px-4 py-2">
                  <span className="text-xs font-mono uppercase text-[#D4A64A]">Authentic Kerala Recipe</span>
                  <h3 className="text-xl font-bold font-sora mt-0.5 text-[#FAF7F0]">{activeImageModal.name}</h3>
                  <p className="text-xs text-[#FAF7F0]/70 mt-1">
                    Freshly prepared in-house with zero artificial colors or preservatives.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
