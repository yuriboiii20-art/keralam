import useScrollLock from '../hooks/useScrollLock';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Sparkles, Calendar, ChevronRight, ChevronLeft, Bed, Tv, Wifi, Wind } from 'lucide-react';

export default function RoomModal({ room, onClose, onBookNow }) {
  useScrollLock(!!room);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1220]/80 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl glass-card border border-[#D4A64A]/30 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Close Button with aria-label */}
          <button
            onClick={onClose}
            aria-label="Close Room Details Modal"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F0] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Image Carousel */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/15">
                <img
                  src={room.images[activeImageIndex] || room.image}
                  alt={`${room.title} interior preview`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Image Navigation Arrows */}
                {room.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex(
                          (prev) => (prev === 0 ? room.images.length - 1 : prev - 1)
                        )
                      }
                      aria-label="Previous Room Image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0B1220]/80 text-[#FAF7F0] hover:bg-[#0B1220] transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex(
                          (prev) => (prev === room.images.length - 1 ? 0 : prev + 1)
                        )
                      }
                      aria-label="Next Room Image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0B1220]/80 text-[#FAF7F0] hover:bg-[#0B1220] transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {room.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View Room Image ${idx + 1}`}
                      className={`relative h-20 w-28 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#D4A64A] scale-105 shadow-lg'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Detailed Room Specs & Booking */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 text-xs font-semibold uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{room.sharing}</span>
                </div>

                <h3 className="text-3xl font-extrabold text-[#FAF7F0] mb-2 font-sora">
                  {room.title}
                </h3>

                <p className="text-[#FAF7F0]/80 text-sm leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* Features Breakdown */}
                <h4 className="text-xs font-bold text-[#D4A64A] uppercase tracking-wider mb-3 font-mono">
                  Included Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#FAF7F0]/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl glass-card border border-white/10 mb-6">
                  <p className="text-xs text-[#D4A64A] mb-1 font-mono uppercase font-bold">Zero Hidden Costs Guarantee</p>
                  <p className="text-xs text-[#FAF7F0]/75">
                    Includes 3 meals daily, electricity, water, house-keeping, and Wi-Fi. Refundable security deposit: 1 month rent only.
                  </p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#FAF7F0]/60 uppercase font-mono">Monthly Rent</p>
                  <p className="text-2xl font-bold text-[#FAF7F0] font-sora">
                    ₹{room.price.toLocaleString('en-IN')}{' '}
                    <span className="text-xs font-normal text-[#FAF7F0]/60">/ {room.period}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onBookNow(room.title);
                  }}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] to-yellow-600 text-[#0B1220] font-bold text-sm shadow-xl shadow-[#D4A64A]/25 hover:shadow-[#D4A64A]/40 transition-all"
                  data-cursor="expand"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span>Reserve Room</span>
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
