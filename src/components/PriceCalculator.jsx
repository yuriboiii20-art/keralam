import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2, Calendar, Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PriceCalculator({ onOpenBooking }) {
  const [roomType, setRoomType] = useState('2bhk');
  const [durationMonths, setDurationMonths] = useState(1);

  const roomRates = {
    '1bhk': { base: 14999, name: '1 BHK Suite', badge: 'Full Privacy & Kitchen' },
    '2bhk': { base: 7499, name: '2 BHK Sharing Room', badge: 'Popular Choice' },
    'single': { base: 11499, name: 'Single Private Room', badge: 'Solo Techie Pick' },
    'daily': { base: 499, name: 'Daily Stay (Per Day)', badge: 'Free Breakfast' },
  };

  const selectedRate = roomRates[roomType];
  const isDaily = roomType === 'daily';
  const multiplier = durationMonths;
  const totalCost = selectedRate.base * multiplier;

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Aafa Coliving Team! I calculated an estimate on your website for *${selectedRate.name}* for *${durationMonths} ${isDaily ? (durationMonths === 1 ? 'day' : 'days') : (durationMonths === 1 ? 'month' : 'months')}* (Est. Total: ₹${totalCost.toLocaleString('en-IN')}).\n\nIs this plan available for immediate move-in?`
    );
    window.open(`https://wa.me/918747049377?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="rounded-3xl glass-card border border-[#D4A64A]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      
      <div className="flex items-center gap-3.5 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center shrink-0 shadow-lg shadow-[#D4A64A]/20">
          <Calculator className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <span className="text-xs font-mono uppercase text-[#D4A64A] font-bold">Interactive Budget Estimator</span>
          <h3 className="text-xl sm:text-3xl font-extrabold text-[#FAF7F0] font-sora">
            Calculate Your Total Living Budget
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Room Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 text-[#FAF7F0]/80 font-mono">
              1. Select Room Plan
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: '1bhk', name: '1 BHK Suite' },
                { id: '2bhk', name: '2 BHK Sharing' },
                { id: 'single', name: 'Single Room' },
                { id: 'daily', name: 'Daily Stay' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoomType(r.id)}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all ${
                    roomType === r.id
                      ? 'bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] shadow-md shadow-[#D4A64A]/30 scale-[1.03]'
                      : 'glass-card text-[#FAF7F0]/80 hover:text-[#FAF7F0] hover:border-[#D4A64A]/30'
                  }`}
                  data-cursor="expand"
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stay Duration Slider */}
          <div>
            <div className="flex justify-between items-center mb-2.5 text-xs font-bold">
              <span className="uppercase tracking-wider text-[#FAF7F0]/80 font-mono">
                2. {isDaily ? 'Stay Duration (Days)' : 'Stay Duration (Months)'}
              </span>
              <span className="font-mono text-[#D4A64A] text-sm font-extrabold px-3 py-1 rounded-xl bg-[#D4A64A]/15 border border-[#D4A64A]/30">
                {durationMonths} {isDaily ? (durationMonths === 1 ? 'Day' : 'Days') : (durationMonths === 1 ? 'Month' : 'Months')}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={isDaily ? 30 : 12}
              value={durationMonths}
              onChange={(e) => setDurationMonths(parseInt(e.target.value))}
              className="w-full h-2.5 bg-[#FAF7F0]/15 rounded-lg appearance-none cursor-pointer accent-[#D4A64A]"
            />
            <div className="flex justify-between text-[10px] text-[#FAF7F0]/50 font-mono mt-1">
              <span>Min: 1 {isDaily ? 'day' : 'month'}</span>
              <span>Max: {isDaily ? '30 days' : '12 months'}</span>
            </div>
          </div>

          {/* Included Features Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FAF7F0]/85 pt-3 border-t border-[#FAF7F0]/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3x Daily Kerala Meals Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1GBPS Dual Fiber Wi-Fi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Generator Power Backup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Daily Maid & Attached Bath</span>
            </div>
          </div>

        </div>

        {/* Right Output Result Box */}
        <div className="lg:col-span-5 rounded-3xl glass-card border-2 border-[#D4A64A]/50 p-6 sm:p-8 text-center shadow-2xl bg-gradient-to-b from-[#D4A64A]/15 via-[#0B1220]/60 to-transparent">
          <span className="text-[11px] font-mono uppercase text-[#D4A64A] font-bold px-3 py-1 rounded-full bg-[#D4A64A]/15 border border-[#D4A64A]/30">
            {selectedRate.badge}
          </span>
          <h4 className="text-4xl sm:text-5xl font-extrabold text-[#D4A64A] font-sora mt-3 mb-1">
            ₹{totalCost.toLocaleString('en-IN')}
          </h4>
          <p className="text-xs text-[#FAF7F0]/70 mb-6 font-mono">
            {isDaily ? `For ${durationMonths} Days of Stay` : `For ${durationMonths} Months of All-Inclusive Living`}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => onOpenBooking(selectedRate.name)}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#D4A64A]/30 hover:shadow-[#D4A64A]/50 transition-all btn-shimmer"
              data-cursor="expand"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Reserve at This Estimated Rate</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl glass-card text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/15 font-bold text-xs transition-all"
              data-cursor="expand"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Ask Availability on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
