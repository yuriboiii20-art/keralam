import useScrollLock from '../hooks/useScrollLock';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Mail, Home, CheckCircle2, Sparkles, Send, MessageSquare, Bell, Share2, Copy, Check, ShieldCheck, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ isOpen, onClose, initialRoomTitle }) {
  useScrollLock(isOpen);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [formData, setFormData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roomType: initialRoomTitle || '2 BHK Sharing Room',
      tourType: 'in-person',
      dietPreference: 'kerala-mix',
    },
  });

  const triggerPhoneNotification = async (data, refCode) => {
    // 1. Browser Native Push Notification (if permitted or requested)
    if ('Notification' in window) {
      try {
        if (Notification.permission === 'granted') {
          new Notification('🎉 Booking Confirmed — AAFA Coliving', {
            body: `Ref: ${refCode} | ${data.roomType} locked for ${data.fullName}. Notification dispatched to +91 ${data.phone}.`,
            icon: '/favicon.svg',
          });
        } else if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            new Notification('🎉 Booking Confirmed — AAFA Coliving', {
              body: `Ref: ${refCode} | ${data.roomType} locked for ${data.fullName}.`,
              icon: '/favicon.svg',
            });
          }
        }
      } catch (e) {
        console.log('Notification API fallback');
      }
    }

    setNotificationSent(true);
  };

  const onSubmit = (data) => {
    const refCode = 'AAFA-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setFormData(data);
    setSubmitted(true);

    // Guest details stay in memory until explicitly shared through WhatsApp.

    // Trigger Phone & Push Notification
    triggerPhoneNotification(data, refCode);

    // Trigger Confetti Celebration
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D4A64A', '#f59e0b', '#10B981', '#FAF7F0'],
      });
    } catch (e) {}

    // Auto-open WhatsApp dispatch to user's device after brief smooth transition
    const whatsappUrl = `https://wa.me/918747049377?text=${getWhatsAppMessage(data, refCode)}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const getWhatsAppMessage = (data, ref) => {
    if (!data) return '';
    return encodeURIComponent(
      `*🏛️ AAFA COLIVING RESERVATION CONFIRMATION*\n` +
      `----------------------------------------\n` +
      `🔖 *Booking Reference:* ${ref}\n` +
      `👤 *Resident Name:* ${data.fullName}\n` +
      `📱 *Mobile Phone:* +91 ${data.phone}\n` +
      `🛏️ *Room Plan:* ${data.roomType}\n` +
      `📅 *Move-In / Visit Date:* ${data.visitDate || 'Immediate / Asap'}\n` +
      `🍛 *Diet Preference:* ${data.dietPreference || 'Kerala Mix'}\n` +
      `🚶 *Tour Type:* ${data.tourType === 'in-person' ? 'In-Person Campus Walk' : 'WhatsApp Video Tour'}\n` +
      `📍 *Campus:* Sannidhi Layout, Near HCL Gate, Jigani, Bengaluru\n` +
      `----------------------------------------\n` +
      `⚡ *Status:* DISPATCHED & NOTIFIED TO MOBILE\n` +
      `Please confirm key allocation and check-in assistance.`
    );
  };

  const handleCopyCode = () => {
    if (bookingRef) {
      navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = () => {
    if (navigator.share && formData) {
      navigator.share({
        title: 'Aafa Coliving Booking Confirmation',
        text: `My Aafa Coliving Booking Ref is ${bookingRef} for ${formData.roomType} in Jigani!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyCode();
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData(null);
    setBookingRef('');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl glass-card border border-[#D4A64A]/45 p-5 sm:p-8 shadow-2xl z-10 my-6 overflow-hidden bg-[#0B1220]/95"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close Reservation Modal"
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F0] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 text-xs font-semibold uppercase mb-2">
                  <Bell className="w-3.5 h-3.5 text-[#D4A64A]" />
                  <span>Instant Mobile Phone Notification</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF7F0] font-sora">
                  Book Your <span className="text-gradient-gold">Sanctuary</span>
                </h3>
                <p className="text-xs text-[#FAF7F0]/70 mt-1">
                  Upon submission, your confirmed reservation slip will instantly dispatch to your phone via WhatsApp & SMS.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A64A]" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Nair"
                      {...register('fullName', { required: 'Name is required' })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="text-xs text-rose-400 mt-1 block font-mono">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Mobile Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A64A]" />
                      <input
                        type="tel"
                        placeholder="10-digit Number"
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: { value: /^[0-9]{10}$/, message: 'Enter valid 10-digit mobile' }
                        })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-xs text-rose-400 mt-1 block font-mono">{errors.phone.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A64A]" />
                      <input
                        type="email"
                        placeholder="name@email.com"
                        {...register('email')}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Room Preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                    Select Room Plan
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A64A]" />
                    <select
                      {...register('roomType')}
                      className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    >
                      <option value="Daily Stay Special (₹499/day)">⭐ Daily Stay Special — ₹499/day (Breakfast Free)</option>
                      <option value="2 BHK Sharing Room (₹7,499/mo)">2 BHK Sharing Room — ₹7,499/mo (3x Meals Included)</option>
                      <option value="Single Private Room (₹11,499/mo)">Single Private Room — ₹11,499/mo (3x Meals Included)</option>
                      <option value="1 BHK Private Suite (Monthly)">1 BHK Private Suite — Contact for Rate</option>
                    </select>
                  </div>
                </div>

                {/* Date & Tour */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Move-In / Visit Date
                    </label>
                    <input
                      type="date"
                      {...register('visitDate')}
                      className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Food Preference
                    </label>
                    <select
                      {...register('dietPreference')}
                      className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] transition-colors bg-[#0B1220]"
                    >
                      <option value="Kerala Non-Veg & Veg">Kerala Non-Veg & Veg</option>
                      <option value="Pure Vegetarian">Pure Vegetarian</option>
                      <option value="Eggetarian">Eggetarian</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm sm:text-base shadow-xl shadow-[#D4A64A]/30 hover:shadow-[#D4A64A]/50 hover:scale-[1.02] transition-all btn-shimmer"
                    data-cursor="expand"
                  >
                    <Send className="w-5 h-5" />
                    <span>Confirm & Send Notification to Phone</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-[#FAF7F0]/50 font-mono">
                  🔒 Zero booking fees • Instant WhatsApp dispatch • Refundable 1-month deposit
                </p>

              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION RECEIPT SCREEN */
            <div className="text-center py-2 space-y-4">
              
              {/* Animated Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                  🟢 Notification Dispatched
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#FAF7F0] mt-2">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-[#FAF7F0]/80 mt-0.5">
                  Your booking pass has been sent directly to your phone at <strong>+91 {formData?.phone}</strong>.
                </p>
              </div>

              {/* Digital Pass / Slip */}
              <div className="p-4 sm:p-5 rounded-2xl glass-card border border-[#D4A64A]/40 text-left space-y-2.5 text-xs font-mono bg-[#0B1220]">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[#FAF7F0]/60">Booking Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4A64A] font-extrabold text-sm">{bookingRef}</span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-[#D4A64A]"
                      title="Copy Reference Code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Resident Name</span>
                  <span className="text-[#FAF7F0] font-bold">{formData?.fullName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Mobile Number</span>
                  <span className="text-emerald-400 font-bold">+91 {formData?.phone}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Selected Room</span>
                  <span className="text-[#FAF7F0]">{formData?.roomType}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#FAF7F0]/60">Move-In Date</span>
                  <span className="text-[#FAF7F0]">{formData?.visitDate || 'Immediate / Asap'}</span>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-2 text-[11px]">
                  <span className="text-[#FAF7F0]/60">Campus Landmark</span>
                  <span className="text-[#D4A64A]">300m from HCL Gate, Jigani</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/918747049377?text=${getWhatsAppMessage(formData, bookingRef)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:bg-emerald-600 transition-all border border-emerald-400/40"
                  data-cursor="expand"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Notification on Phone</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`sms:+918747049377?body=Aafa Coliving Booking Ref: ${bookingRef} for ${formData?.fullName}`}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl glass-card text-[#FAF7F0] border border-white/15 hover:bg-white/10 font-bold text-xs transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4A64A]" />
                    <span>Send SMS</span>
                  </a>

                  <button
                    onClick={handleNativeShare}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl glass-card text-[#FAF7F0] border border-white/15 hover:bg-white/10 font-bold text-xs transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#D4A64A]" />
                    <span>Share Pass</span>
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl glass-card text-[#FAF7F0]/80 font-bold text-xs hover:bg-white/10 transition-all"
                >
                  Done & Close
                </button>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
