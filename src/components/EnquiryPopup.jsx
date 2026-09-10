import useScrollLock from '../hooks/useScrollLock';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Mail, CheckCircle2, Sparkles, Send, Clock, MessageSquare, Bell, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EnquiryPopup({ isOpen, onClose }) {
  useScrollLock(isOpen);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      timeSlot: '10:00 AM - 12:00 PM',
      roomType: '2 BHK Sharing Room',
    },
  });

  const onSubmit = (data) => {
    const mockRef = 'WALK-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(mockRef);
    setFormData(data);
    setSubmitted(true);

    // Trigger Browser Push Notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('📅 Campus Visit Scheduled — AAFA Coliving', {
          body: `Pass: ${mockRef} | Scheduled for ${data.fullName} on ${data.visitDate}.`,
          icon: '/favicon.svg',
        });
      } catch (e) {}
    }

    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4A64A', '#f59e0b', '#FAF7F0'],
      });
    } catch (e) {}

    // Open WhatsApp confirmation link automatically
    const whatsappUrl = `https://wa.me/918747049377?text=${encodeURIComponent(
      `*🏛️ AAFA CAMPUS WALKTHROUGH SCHEDULED*\n` +
      `----------------------------------------\n` +
      `🔖 *Pass Ref:* ${mockRef}\n` +
      `👤 *Visitor Name:* ${data.fullName}\n` +
      `📱 *Mobile Phone:* +91 ${data.phone}\n` +
      `📅 *Date:* ${data.visitDate}\n` +
      `⏰ *Time Slot:* ${data.timeSlot}\n` +
      `🛏️ *Interested In:* ${data.roomType}\n` +
      `📍 *Campus:* Sannidhi Layout, Jigani near HCL Gate`
    )}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl glass-card border border-[#D4A64A]/45 p-5 sm:p-8 shadow-2xl z-10 my-6 overflow-hidden bg-[#0B1220]/95"
        >
          <button
            onClick={handleClose}
            aria-label="Close Walkthrough Popup"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F0] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 text-xs font-semibold uppercase mb-2">
                  <Bell className="w-3.5 h-3.5" />
                  <span>Free Campus Walkthrough & Food Tasting</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF7F0] font-sora">
                  Schedule <span className="text-gradient-gold">Campus Visit</span>
                </h3>
                <p className="text-xs text-[#FAF7F0]/70 mt-1">
                  Inspect our rooms, test our 1Gbps Wi-Fi, and sample our Kerala lunch near HCL Gate.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Nair"
                    {...register('fullName', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-rose-400 mt-1 block font-mono">{errors.fullName.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit Mobile"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Valid 10-digit mobile' }
                      })}
                      className="w-full px-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors"
                    />
                    {errors.phone && (
                      <span className="text-xs text-rose-400 mt-1 block font-mono">{errors.phone.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Visit Date *
                    </label>
                    <input
                      type="date"
                      {...register('visitDate', { required: 'Date is required' })}
                      className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Time Slot
                    </label>
                    <select
                      {...register('timeSlot')}
                      className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10 AM - 12 PM)</option>
                      <option value="01:00 PM - 03:00 PM">Lunch Hours (1 PM - 3 PM)</option>
                      <option value="05:00 PM - 07:00 PM">Evening Tea (5 PM - 7 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Room Interest
                    </label>
                    <select
                      {...register('roomType')}
                      className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    >
                      <option value="2 BHK Sharing Room">2 BHK Sharing Room</option>
                      <option value="Single Private Room">Single Private Room</option>
                      <option value="Daily Stay Special (₹499/day)">Daily Stay (₹499/day)</option>
                      <option value="1 BHK Private Suite">1 BHK Suite</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm sm:text-base shadow-xl shadow-[#D4A64A]/30 hover:shadow-[#D4A64A]/50 transition-all btn-shimmer"
                    data-cursor="expand"
                  >
                    <Send className="w-5 h-5" />
                    <span>Confirm & Send Pass to Phone</span>
                  </button>
                </div>

              </form>
            </div>
          ) : (
            <div className="text-center py-3 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  🟢 Notification Dispatched
                </span>
                <h3 className="text-2xl font-extrabold font-sora text-[#FAF7F0] mt-2">
                  Visit Pass Generated!
                </h3>
                <p className="text-xs text-[#FAF7F0]/80">
                  Notification pass sent to your phone at <strong>+91 {formData?.phone}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-card border border-[#D4A64A]/35 text-left text-xs font-mono space-y-2 bg-[#0B1220]">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#FAF7F0]/60">Walkthrough Pass</span>
                  <span className="text-[#D4A64A] font-extrabold">{refCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Visitor</span>
                  <span className="text-[#FAF7F0]">{formData?.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Visit Slot</span>
                  <span className="text-[#FAF7F0]">{formData?.visitDate} ({formData?.timeSlot})</span>
                </div>
              </div>

              <a
                href={`https://wa.me/918747049377?text=Pass%20${refCode}%20scheduled%20for%20${formData?.fullName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs shadow-lg hover:bg-emerald-600 transition-all"
                data-cursor="expand"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Pass on Phone</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl glass-card text-[#FAF7F0]/80 font-bold text-xs hover:bg-white/10 transition-all"
              >
                Close
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
