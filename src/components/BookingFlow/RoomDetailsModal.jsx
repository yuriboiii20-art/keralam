import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X,
  Star,
  MapPin,
  CheckCircle2,
  Utensils,
  Wifi,
  Zap,
  ShieldCheck,
  Bed,
  Calendar,
  Phone,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import useScrollLock from '../../hooks/useScrollLock';

export default function RoomDetailsModal({
  isOpen,
  onClose,
  room,
  currentStayType = 'day',
  onProceedToBooking,
}) {
  useScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-[#0B1220]/90 backdrop-blur-md">
      {/* Floating High-Contrast Close Button - Desktop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="hidden sm:flex fixed top-4 right-4 z-[100000] px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-extrabold text-xs items-center gap-1.5 shadow-[0_10px_25px_rgba(239,68,68,0.5)] border-2 border-white/30 transition-all cursor-pointer"
      >
        <X className="w-4 h-4 stroke-[3]" />
        <span>Close (Esc)</span>
      </button>

      {/* Backdrop click dismisser */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Flex container that prevents top clipping */}
      <div className="min-h-full flex items-start sm:items-center justify-center p-2 sm:p-4 pt-16 sm:pt-6 pb-8 relative pointer-events-none">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0B1220] border-2 border-[#D4A64A]/50 text-[#FAF7F0] shadow-[0_25px_80px_rgba(0,0,0,0.98)] z-10 overflow-hidden flex flex-col max-h-[calc(100vh-5rem)] sm:max-h-[88vh] my-auto pointer-events-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-30 p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#0E172A] shadow-md">
            {/* Back Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[#FAF7F0] text-xs font-bold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer shadow-sm hover:border-[#D4A64A]/50 group"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4A64A] group-hover:-translate-x-0.5 transition-transform" />
              <span>← Back to Rooms</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#D4A64A]/15 text-[#D4A64A] text-xs font-mono font-bold border border-[#D4A64A]/30">
                {room.genderLabel}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                {room.sharingLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-red-500/40 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>Close</span>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Image Showcase */}
            <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B1220]/90 text-[#FAF7F0] text-xs font-bold flex items-center gap-1.5 border border-white/15">
                <Star className="w-3.5 h-3.5 text-[#D4A64A] fill-[#D4A64A]" />
                <span>{room.rating} Rating (140+ Reviews)</span>
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#D4A64A] font-mono mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{room.area} • {room.city}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sora text-[#FAF7F0] mb-2">
                {room.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed">
                {room.desc}
              </p>
            </div>

            {/* 3 Stay Rates Comparison */}
            <div className="rounded-2xl bg-[#10192B] border border-white/10 p-4 space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#D4A64A] uppercase tracking-wider">
                Available Stay Plans for this Room
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-white/60 block">Day Stay</span>
                  <span className="text-lg font-bold text-[#FAF7F0] font-sora block">
                    {room.stayRates?.dayDisplay || '₹499'}
                    <span className="text-xs font-normal text-white/50">/day</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Breakfast Free</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1220] border border-white/10 text-center">
                  <span className="text-[10px] font-mono text-white/60 block">Weekly Stay</span>
                  <span className="text-lg font-bold text-[#FAF7F0] font-sora block">
                    {room.stayRates?.weekDisplay || '₹2,199'}
                    <span className="text-xs font-normal text-white/50">/week</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">Breakfast & Dinner</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0B1220] border border-[#D4A64A]/40 text-center bg-gradient-to-b from-[#D4A64A]/10 to-transparent">
                  <span className="text-[10px] font-mono text-[#D4A64A] font-bold block">Monthly (Best Value)</span>
                  <span className="text-lg font-bold text-[#D4A64A] font-sora block">
                    {room.stayRates?.monthDisplay || room.priceDisplay}
                    <span className="text-xs font-normal text-white/50">/month</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">3x Daily Kerala Meals</span>
                </div>
              </div>
            </div>

            {/* Included Amenities Grid */}
            <div>
              <h4 className="text-xs font-mono font-bold text-[#D4A64A] uppercase tracking-wider mb-3">
                Included Living Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(room.highlights || room.amenitiesSummary || []).map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-[#FAF7F0]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4A64A] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-[#0E172A] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold text-white/90 transition-all cursor-pointer flex items-center gap-1.5 border border-white/15 hover:border-[#D4A64A]/40"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D4A64A]" />
              <span>Back to Rooms</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onProceedToBooking) onProceedToBooking(room);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] text-xs sm:text-sm font-extrabold shadow-lg shadow-[#D4A64A]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer btn-shimmer"
            >
              <span>Choose Stay Plan & Book</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
  );
}
