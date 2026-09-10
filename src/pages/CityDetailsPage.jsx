import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, Clock, Calendar, CheckCircle2, ArrowLeft, Bell, Send, Sparkles,
  Building2, Utensils, Wifi, Zap, ShieldCheck, Car, Navigation, Star, MessageSquare,
  Share2, ChevronRight, Award, Compass, Laptop
} from 'lucide-react';
import { locations } from '../data/locationsData';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';

export default function CityDetailsPage({ onOpenBooking }) {
  const { citySlug } = useParams();
  const location = locations.find((l) => l.slug === citySlug) || locations[0];
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [priorityRef, setPriorityRef] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('2 BHK Sharing');

  const isLive = location.status === 'live';

  useEffect(() => {
    document.title = isLive
      ? `Aafa Coliving ${location.city} | Premium PG & Rooms in ${location.city}`
      : `Aafa Coliving ${location.city} (${location.launchTimeline}) | Premium PG & Co-Living`;
  }, [location, isLive]);

  const handlePrioritySubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const ref = `PASS-${location.city.toUpperCase().slice(0, 4)}-` + Math.floor(1000 + Math.random() * 9000);
    setPriorityRef(ref);
    setNotifySubmitted(true);

    // Trigger Browser Notification if allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`🎉 Priority Pass Confirmed — Aafa ${location.city}`, {
          body: `Pass Ref: ${ref} locked for ${name}. Dispatched to +91 ${phone}.`,
          icon: '/favicon.svg',
        });
      } catch (err) {}
    }

    try {
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4A64A', '#f59e0b', '#10B981', '#FAF7F0'],
      });
    } catch (err) {}

    // Auto open WhatsApp confirmation slip
    const msg = encodeURIComponent(
      `*🏛️ AAFA COLIVING — ${location.city.toUpperCase()} PRIORITY PRE-BOOKING*\n` +
      `----------------------------------------\n` +
      `🔖 *Pass Reference:* ${ref}\n` +
      `👤 *Resident:* ${name}\n` +
      `📱 *Mobile Phone:* +91 ${phone}\n` +
      `🛏️ *Preferred Plan:* ${selectedRoom}\n` +
      `📍 *Target Campus:* ${location.area}, ${location.city}\n` +
      `🚀 *Launch Timeline:* ${location.launchTimeline}\n` +
      `----------------------------------------\n` +
      `Please lock my early-bird discount slot and send me floor plans when live!`
    );
    setTimeout(() => {
      window.open(`https://wa.me/918747049377?text=${msg}`, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  return (
    <PageTransition>
      <div className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#FAF7F0]/60 font-mono mb-8">
          <Link to="/" className="hover:text-[#D4A64A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/locations" className="hover:text-[#D4A64A] transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-[#D4A64A] font-bold">{location.city}</span>
        </div>

        {/* HERO CITY BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-card border border-[#D4A64A]/35 p-6 sm:p-12 mb-14 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#D4A64A]/15 via-[#0B1220] to-[#0B1220]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase mb-4 font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isLive ? '🟢 Operational Campus' : `🚀 ${location.launchTimeline}`}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F0] font-sora tracking-tight mb-3">
                Aafa Coliving — <span className="text-gradient-gold">{location.city}</span>
              </h1>

              <p className="text-sm sm:text-base text-[#D4A64A] font-semibold mb-3">
                {location.tagline || `Zero-Gravity Coliving in ${location.area}`}
              </p>

              <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed mb-6 font-medium">
                Located in {location.area}. Engineered for software engineers, research scholars, and corporate professionals seeking fully furnished rooms, authentic Kerala dining, 1Gbps Wi-Fi, and 100% generator backup.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {isLive ? (
                  <>
                    <button
                      onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/30 hover:scale-105 transition-all btn-shimmer"
                      data-cursor="expand"
                    >
                      Book Bengaluru Room — ₹499/day
                    </button>
                    <a
                      href="tel:+918747049377"
                      className="px-5 py-3.5 rounded-xl glass-card text-[#FAF7F0] font-bold text-xs border border-white/10 hover:border-[#D4A64A]/40 flex items-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#D4A64A]" />
                      <span>Call Campus Desk</span>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="#priority-pass"
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/30 hover:scale-105 transition-all btn-shimmer flex items-center gap-2"
                      data-cursor="expand"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Get {location.city} Early-Bird Pass</span>
                    </a>
                    <a
                      href={`https://wa.me/918747049377?text=Hello%20Aafa%20Team!%20I%20want%20information%20on%20the%20upcoming%20${location.city}%20campus.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 rounded-xl glass-card text-emerald-300 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-500/15 flex items-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </>
                )}
              </div>

            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/15 shadow-xl relative group">
              <img
                src={location.heroImage}
                alt={`Aafa Coliving ${location.city}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                <span>{location.state}</span>
                <span className="text-[#D4A64A] bg-[#0B1220]/80 px-2 py-0.5 rounded border border-[#D4A64A]/30">
                  {location.pricingStarting}
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* SECTION 2: TECH PARKS & COMMUTE PROXIMITY */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] text-xs font-mono uppercase mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Strategic IT Park Proximity</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-[#FAF7F0]">
              Commute Radius in <span className="text-gradient-gold">{location.city}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/75 mt-1">
              Zero traffic exhaustion. Live minutes away from your office workstations and transport corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {(location.commuteTimes || [
              { place: location.techParks?.[0] || 'Main IT Park', time: '3 Min Walk', mode: 'Walking' },
              { place: location.techParks?.[1] || 'Metro Station', time: '6 Min Bike', mode: 'Two-Wheeler' },
              { place: location.techParks?.[2] || 'Commercial Hub', time: '12 Min Cab', mode: 'Cab' },
              { place: 'International Airport', time: '30 Min Drive', mode: 'Cab' },
            ]).map((comm, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between hover:border-[#D4A64A]/40 transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#D4A64A] px-2 py-0.5 rounded bg-[#D4A64A]/15 inline-block mb-2">
                    {comm.mode}
                  </span>
                  <h4 className="text-sm font-bold font-sora text-[#FAF7F0] mb-1">{comm.place}</h4>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-[#FAF7F0]/60 font-mono">Travel Time</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono">{comm.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Companies Tag Strip */}
          {location.popularCompanies && (
            <div className="rounded-2xl glass-card border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#FAF7F0]/80">
                <Building2 className="w-4 h-4 text-[#D4A64A] shrink-0" />
                <span className="font-bold">Key Employers in this Corridor:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {location.popularCompanies.map((comp, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-[#FAF7F0]/85 border border-white/10 font-mono text-[11px]"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 3: ROOM CONFIGURATIONS & PRICING */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] text-xs font-mono uppercase mb-2">
              <Laptop className="w-3.5 h-3.5" />
              <span>Living Sanctuaries</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-sora text-[#FAF7F0]">
              Room Plans for <span className="text-gradient-gold">{location.city}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F0]/75 mt-1">
              {isLive ? 'Ready for immediate move-in' : 'Planned configurations with early-bird pre-booking rates'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.roomTypes.map((room, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between group"
                data-cursor="expand"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-[#D4A64A] uppercase bg-[#D4A64A]/15 px-2.5 py-1 rounded-full border border-[#D4A64A]/30 font-bold">
                      {room.price}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      {isLive ? 'Available' : 'Pre-Booking'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-sora text-[#FAF7F0] mb-3 group-hover:text-[#D4A64A] transition-colors">
                    {room.type}
                  </h3>

                  <ul className="space-y-2 mb-6">
                    {room.features.map((f, i) => (
                      <li key={i} className="text-xs text-[#FAF7F0]/80 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A64A] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {isLive ? (
                  <button
                    onClick={() => onOpenBooking(room.type)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4A64A] to-amber-500 text-[#0B1220] font-extrabold text-xs shadow-md"
                  >
                    Book Room
                  </button>
                ) : (
                  <a
                    href="#priority-pass"
                    onClick={() => setSelectedRoom(room.type)}
                    className="w-full py-3 rounded-xl glass-card text-[#D4A64A] hover:bg-[#D4A64A]/20 border border-[#D4A64A]/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <span>Pre-Book {room.type}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: AUTHENTIC DINING EXPERIENCE */}
        <section className="mb-16">
          <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] text-xs font-mono uppercase">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>3x Daily Mess Schedule</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#FAF7F0]">
                  Authentic Kerala & Homestyle Dining in <span className="text-gradient-gold">{location.city}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed">
                  No oily commercial mess food. Prepared daily by experienced master chefs using pure coconut oil, unadulterated spices, and fresh vegetables.
                </p>

                <div className="space-y-2 pt-2">
                  {(location.foodHighlights || [
                    'Authentic Kerala Sadhya & Malabar Biryani on Sundays',
                    'Fresh Puttu, Idli, Dosa & Kadala Curry Breakfast',
                    'High-protein dal, chicken gravies & vegetable curries',
                    'Evening filter coffee and Kerala banana fritters',
                  ]).map((food, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#FAF7F0]/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{food}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                <div className="h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80"
                    alt="Kerala Breakfast"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80"
                    alt="Malabar Biryani"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80"
                    alt="Kerala Sadhya"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80"
                    alt="Crispy Dosa"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: EARLY-BIRD PASS & RESERVATION FORM (FOR ALL CITIES) */}
        <section id="priority-pass" className="mb-16">
          <div className="rounded-3xl glass-card border border-[#D4A64A]/40 p-6 sm:p-12 shadow-2xl max-w-3xl mx-auto bg-gradient-to-br from-[#D4A64A]/20 via-[#0B1220] to-[#0B1220]">
            
            {!notifySubmitted ? (
              <div>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#FAF7F0]">
                    Lock Your Early-Bird Pass for <span className="text-gradient-gold">{location.city}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF7F0]/75 mt-1 max-w-md mx-auto">
                    {isLive
                      ? 'Submit your details to reserve your room with instant WhatsApp dispatch.'
                      : `Get priority floor plan access, ₹1,000 launch credit & early move-in dates in ${location.city}. Zero deposit upfront.`}
                  </p>
                </div>

                <form onSubmit={handlePrioritySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Nair"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] text-[#FAF7F0]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit Mobile"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] text-[#FAF7F0]"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-[#FAF7F0]/80 font-mono">
                        Target Room Plan
                      </label>
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl glass-card text-xs sm:text-sm focus:outline-none focus:border-[#D4A64A] bg-[#0B1220] text-[#FAF7F0]"
                      >
                        <option value="2 BHK Sharing Deluxe">2 BHK Sharing Deluxe</option>
                        <option value="Single Executive Suite">Single Executive Room</option>
                        <option value="1 BHK Private Suite">1 BHK Private Suite</option>
                        <option value="Daily Stay Pass">Daily Stay Pass</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm sm:text-base shadow-xl shadow-[#D4A64A]/30 hover:scale-[1.02] transition-all btn-shimmer"
                      data-cursor="expand"
                    >
                      <Send className="w-5 h-5" />
                      <span>{isLive ? 'Confirm Reservation' : `Claim Free Priority Pass for ${location.city}`}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-[#FAF7F0]/50 font-mono">
                    🔒 Instant confirmation dispatched to WhatsApp • Zero advance fees
                  </p>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                    🟢 Priority Token Activated
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#FAF7F0] mt-2">
                    You're On the VIP Priority List!
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/80">
                    Your digital pass for <strong>{location.city}</strong> has been created for <strong>+91 {phone}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl glass-card border border-[#D4A64A]/40 text-left text-xs font-mono space-y-2 bg-[#0B1220]">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#FAF7F0]/60">Pass Reference</span>
                    <span className="text-[#D4A64A] font-extrabold text-sm">{priorityRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FAF7F0]/60">Resident Name</span>
                    <span className="text-[#FAF7F0] font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FAF7F0]/60">Target Campus</span>
                    <span className="text-[#FAF7F0]">{location.city} ({location.area})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FAF7F0]/60">Launch Window</span>
                    <span className="text-emerald-400">{location.launchTimeline}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918747049377?text=Pass%20${priorityRef}%20for%20Aafa%20${location.city}%20for%20${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs shadow-lg hover:bg-emerald-600 transition-all"
                  data-cursor="expand"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Pass on Mobile</span>
                </a>

                <button
                  onClick={() => setNotifySubmitted(false)}
                  className="w-full py-3 rounded-xl glass-card text-[#FAF7F0]/70 font-bold text-xs hover:bg-white/10 transition-all"
                >
                  Register Another Room Plan
                </button>
              </div>
            )}

          </div>
        </section>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#D4A64A] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Pan-India Campus Hubs</span>
          </Link>
        </div>

      </div>
    </PageTransition>
  );
}
