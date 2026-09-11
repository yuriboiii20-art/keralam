import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Phone,
  Utensils,
  ShieldCheck,
  Zap,
  Wifi,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  MessageSquare,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import useScrollLock from '../../hooks/useScrollLock';
import BookingProgressSteps from './BookingProgressSteps';

export default function StayPlanModal({
  isOpen,
  onClose,
  room,
  initialStayType = 'day',
  initialCheckInDate = '',
  initialDurationValue = 1,
  onBookingConfirmed,
}) {
  useScrollLock(isOpen);

  // Active step inside this modal: 3 (Choose Stay Plan) or 4 (Confirm Booking)
  const [step, setStep] = useState(3);

  // Selected Plan state
  const [selectedPlan, setSelectedPlan] = useState(initialStayType || 'day'); // 'day' | 'week' | 'month'

  const todayStr = new Date().toISOString().split('T')[0];
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate || todayStr);

  const [duration, setDuration] = useState(initialDurationValue || 1);

  // Guest details form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [diet, setDiet] = useState('Non-Veg');
  const [note, setNote] = useState('');

  // Confirmation state
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset when room changes
  useEffect(() => {
    if (isOpen) {
      setStep(3);
      setSelectedPlan(initialStayType || 'day');
      setCheckInDate(initialCheckInDate || todayStr);
      setDuration(initialDurationValue || 1);
      setIsConfirmed(false);
    }
  }, [isOpen, room, initialStayType, initialCheckInDate, initialDurationValue]);

  if (!isOpen || !room) return null;

  // Rates calculation
  const dayRate = room.stayRates?.day || 499;
  const weekRate = room.stayRates?.week || 2199;
  const monthRate = room.stayRates?.month || room.price || 7499;

  let currentRate = dayRate;
  let periodLabel = 'day';
  let durationUnits = 'Days';

  if (selectedPlan === 'day') {
    currentRate = dayRate;
    periodLabel = 'day';
    durationUnits = duration === 1 ? 'Day' : 'Days';
  } else if (selectedPlan === 'week') {
    currentRate = weekRate;
    periodLabel = 'week';
    durationUnits = duration === 1 ? 'Week' : 'Weeks';
  } else {
    currentRate = monthRate;
    periodLabel = 'month';
    durationUnits = duration === 1 ? 'Month' : 'Months';
  }

  const totalPrice = currentRate * duration;

  const handleContinueToStep4 = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert('Please enter your full name and phone number to proceed.');
      return;
    }

    const generatedRef = 'AAFA-' + Math.floor(100000 + Math.random() * 900000);
    setRefNumber(generatedRef);
    setIsConfirmed(true);

    // Confetti
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#D4A64A', '#f59e0b', '#10B981', '#FAF7F0'],
      });
    } catch (err) {}

    // Browser Notification
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('🎉 Room Reserved — AAFA Coliving', {
          body: `Ref: ${generatedRef} | ${room.name} (${selectedPlan.toUpperCase()} STAY) locked for ${fullName}.`,
          icon: '/favicon.svg',
        });
      } catch (err) {}
    }

    if (onBookingConfirmed) {
      onBookingConfirmed({
        ref: generatedRef,
        room,
        selectedPlan,
        checkInDate,
        duration,
        durationUnits,
        totalPrice,
        fullName,
        phone,
        diet,
      });
    }
  };

  const getWhatsAppMessage = () => {
    const text = `*NEW BOOKING RESERVATION — AAFA COLIVING*
Ref Code: *${refNumber}*
Room: *${room.name}*
Sharing: *${room.sharingLabel}*
Plan: *${selectedPlan.toUpperCase()} STAY*
Check-In: *${checkInDate}*
Duration: *${duration} ${durationUnits}*
Total Amount: *₹${totalPrice.toLocaleString('en-IN')}*

Guest: *${fullName}*
Phone: *${phone}*
Diet: *${diet}*
${note ? `Note: ${note}` : ''}

Please confirm my room check-in availability at Jigani near HCL Gate. Thank you!`;
    return encodeURIComponent(text);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[450] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1220]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#0B1220] border border-[#D4A64A]/40 text-[#FAF7F0] shadow-[0_25px_80px_rgba(0,0,0,0.95)] z-10 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Progress Indicator Header */}
          <div className="p-3 sm:p-4 border-b border-white/10 bg-[#0E172A] relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <BookingProgressSteps
              currentStep={isConfirmed ? 4 : step}
              onStepClick={(targetStep) => {
                if (!isConfirmed && targetStep === 3) setStep(3);
              }}
            />
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            
            {/* SUCCESS CONFIRMATION STATE */}
            {isConfirmed ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] text-xs font-mono font-bold border border-[#D4A64A]/30">
                    Booking Request Dispatched
                  </span>
                  <h3 className="text-2xl font-bold font-sora text-[#FAF7F0] mt-2">
                    Room Reserved Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF7F0]/70 max-w-md mx-auto mt-1">
                    Your booking reference is <strong className="text-[#D4A64A] font-mono">{refNumber}</strong>. We've queued your reservation for instant confirmation.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="rounded-2xl bg-[#10192B] border border-white/10 p-4 text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Property:</span>
                    <span className="font-bold text-[#FAF7F0]">{room.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Plan:</span>
                    <span className="text-[#D4A64A] font-bold uppercase">{selectedPlan} Stay ({duration} {durationUnits})</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Check-in:</span>
                    <span className="text-[#FAF7F0]">{checkInDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Total Estimated:</span>
                    <span className="text-emerald-400 font-bold text-sm">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-white/60">Guest Name:</span>
                    <span className="text-[#FAF7F0]">{fullName} (+91 {phone})</span>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/918747049377?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 font-bold transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : step === 3 ? (
              /* STEP 3 — CHOOSE YOUR STAY PLAN */
              <div className="space-y-6">
                
                {/* Selected Room Header Snippet */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#10192B] border border-white/10">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-[#D4A64A] font-mono block truncate">
                      {room.area} • {room.sharingLabel}
                    </span>
                    <h4 className="text-sm font-bold font-sora text-[#FAF7F0] truncate">
                      {room.name}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Move-in Ready • 1Gbps Wi-Fi • Generator Backup
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sora text-[#FAF7F0] mb-1">
                    Choose Your Stay Plan
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/70">
                    Compare plans with transparent rates and included benefits
                  </p>
                </div>

                {/* 3 Comparison Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Option 1: Day Stay */}
                  <div
                    onClick={() => {
                      setSelectedPlan('day');
                      setDuration(1);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlan === 'day'
                        ? 'bg-[#10192B] border-[#D4A64A] ring-2 ring-[#D4A64A]/30 shadow-lg shadow-[#D4A64A]/10'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-white/80">Day Stay</span>
                        {selectedPlan === 'day' && (
                          <div className="w-5 h-5 rounded-full bg-[#D4A64A] text-[#0B1220] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="text-xl font-extrabold text-[#FAF7F0] font-sora">
                        ₹{dayRate}
                        <span className="text-xs font-normal text-white/50">/day</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        Hot Kerala Breakfast included
                      </p>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono pt-3 block border-t border-white/5 mt-3">
                      Zero Security Deposit
                    </span>
                  </div>

                  {/* Option 2: Weekly Stay */}
                  <div
                    onClick={() => {
                      setSelectedPlan('week');
                      setDuration(1);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlan === 'week'
                        ? 'bg-[#10192B] border-[#D4A64A] ring-2 ring-[#D4A64A]/30 shadow-lg shadow-[#D4A64A]/10'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-white/80">Weekly Stay</span>
                        {selectedPlan === 'week' && (
                          <div className="w-5 h-5 rounded-full bg-[#D4A64A] text-[#0B1220] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="text-xl font-extrabold text-[#FAF7F0] font-sora">
                        ₹{weekRate.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-white/50">/week</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        Breakfast & Dinner included
                      </p>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono pt-3 block border-t border-white/5 mt-3">
                      Better Value • Flexible
                    </span>
                  </div>

                  {/* Option 3: Monthly Stay */}
                  <div
                    onClick={() => {
                      setSelectedPlan('month');
                      setDuration(1);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedPlan === 'month'
                        ? 'bg-[#10192B] border-[#D4A64A] ring-2 ring-[#D4A64A]/30 shadow-lg shadow-[#D4A64A]/10'
                        : 'bg-white/5 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#D4A64A]">Monthly Stay</span>
                        {selectedPlan === 'month' && (
                          <div className="w-5 h-5 rounded-full bg-[#D4A64A] text-[#0B1220] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="text-xl font-extrabold text-[#D4A64A] font-sora">
                        ₹{monthRate.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-white/50">/mo</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        3x Kerala Homestyle Meals
                      </p>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono pt-3 block border-t border-white/5 mt-3">
                      Best Value • 1-Month Deposit
                    </span>
                  </div>

                </div>

                {/* Check-in Date & Duration Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#10192B] border border-white/10">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#D4A64A] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedPlan === 'month' ? 'Move-In Date' : 'Check-In Date'}</span>
                    </label>
                    <input
                      type="date"
                      value={checkInDate}
                      min={todayStr}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#D4A64A] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Stay Duration</span>
                    </label>

                    {selectedPlan === 'day' && (
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none cursor-pointer"
                      >
                        <option value={1}>1 Day (₹{dayRate})</option>
                        <option value={2}>2 Days (₹{dayRate * 2})</option>
                        <option value={3}>3 Days (₹{dayRate * 3})</option>
                        <option value={5}>5 Days (₹{dayRate * 5})</option>
                        <option value={7}>7 Days (₹{dayRate * 7})</option>
                        <option value={10}>10 Days (₹{dayRate * 10})</option>
                        <option value={14}>14 Days (₹{dayRate * 14})</option>
                      </select>
                    )}

                    {selectedPlan === 'week' && (
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none cursor-pointer"
                      >
                        <option value={1}>1 Week (₹{weekRate.toLocaleString('en-IN')})</option>
                        <option value={2}>2 Weeks (₹{(weekRate * 2).toLocaleString('en-IN')})</option>
                        <option value={3}>3 Weeks (₹{(weekRate * 3).toLocaleString('en-IN')})</option>
                        <option value={4}>4 Weeks (₹{(weekRate * 4).toLocaleString('en-IN')})</option>
                      </select>
                    )}

                    {selectedPlan === 'month' && (
                      <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-[#0B1220] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none cursor-pointer"
                      >
                        <option value={1}>1 Month (₹{monthRate.toLocaleString('en-IN')})</option>
                        <option value={2}>2 Months (₹{(monthRate * 2).toLocaleString('en-IN')})</option>
                        <option value={3}>3 Months (₹{(monthRate * 3).toLocaleString('en-IN')})</option>
                        <option value={6}>6 Months (₹{(monthRate * 6).toLocaleString('en-IN')})</option>
                        <option value={11}>11 Months (₹{(monthRate * 11).toLocaleString('en-IN')})</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Pricing Calculation Summary */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D4A64A]/10 via-transparent to-emerald-500/10 border border-[#D4A64A]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/60 uppercase">Estimated Total</span>
                    <div className="text-xl font-extrabold text-[#D4A64A] font-sora">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <span className="text-xs text-white/70 font-mono">
                    {duration} {durationUnits} × ₹{currentRate.toLocaleString('en-IN')}/{periodLabel}
                  </span>
                </div>

                {/* Continue CTA */}
                <button
                  type="button"
                  onClick={handleContinueToStep4}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#D4A64A]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer btn-shimmer"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* STEP 4 — CONFIRM BOOKING */
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-sora text-[#FAF7F0] mb-1">
                    Confirm Reservation
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/70">
                    Review your room selection and enter your contact details
                  </p>
                </div>

                {/* Booking Review Card */}
                <div className="rounded-2xl bg-[#10192B] border border-white/10 p-4 space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60 font-mono">Property & Room</span>
                    <strong className="text-[#FAF7F0] font-sora">{room.name} ({room.sharingLabel})</strong>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60 font-mono">Selected Plan</span>
                    <span className="text-[#D4A64A] font-mono font-bold uppercase">{selectedPlan} Stay</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/60 font-mono">Check-in & Duration</span>
                    <span className="text-[#FAF7F0] font-mono">{checkInDate} ({duration} {durationUnits})</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 font-mono">
                    <span className="text-white/60">Total Estimated Rate</span>
                    <span className="text-emerald-400 font-extrabold text-sm sm:text-base">
                      ₹{totalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Guest Form Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#D4A64A] flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Nair"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#10192B] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-[#D4A64A] flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>WhatsApp Mobile Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3 py-2.5 rounded-xl bg-[#10192B] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none"
                      />
                    </div>
                  </div>

                  {/* Food Preference */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#D4A64A] flex items-center gap-1">
                      <Utensils className="w-3 h-3" />
                      <span>Diet Preference</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Non-Veg', label: '🍗 Non-Veg' },
                        { id: 'Pure Veg', label: '🥗 Pure Veg' },
                        { id: 'Eggetarian', label: '🍳 Eggetarian' },
                      ].map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDiet(d.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center truncate ${
                            diet === d.id
                              ? 'bg-[#D4A64A]/20 border-[#D4A64A] text-[#D4A64A]'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Note */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#D4A64A]">
                      Special Requests / Office Shift Timings (Optional)
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Need workstation table near window, arriving at 7 PM"
                      className="w-full px-3 py-2 rounded-xl bg-[#10192B] border border-white/15 text-xs text-[#FAF7F0] focus:border-[#D4A64A] outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#D4A64A]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer btn-shimmer"
                  >
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
