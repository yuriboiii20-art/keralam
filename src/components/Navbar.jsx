import useScrollLock from '../hooks/useScrollLock';
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Calendar, Phone, Menu, X, ArrowRight, ChevronDown, MapPin, Sparkles, Home as HomeIcon, Utensils, ShieldCheck, Star, BookOpen, Building2, UserCheck, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KeralamLogo from './KeralamLogo';
import LocationBar from './LocationBar';
import { locations } from '../data/locationsData';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'living' | 'trust' | 'phone'
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'locations' | 'living' | 'trust' | 'phone'
  const location = useLocation();
  useScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileAccordion(null);
  }, [location.pathname]);

  const phoneNumbers = [
    { label: 'Hotline 1', number: '8747049377', tel: '+918747049377' },
    { label: 'Hotline 2', number: '9686193084', tel: '+919686193084' },
    { label: 'Hotline 3', number: '9745688880', tel: '+919745688880' },
    { label: 'Landline', number: '099000 82615', tel: 'tel:09900082615' },
  ];

  const livingItems = [
    { name: 'Rooms & Pricing', path: '/rooms', desc: '1BHK, 2BHK, Single & ₹499/day', icon: HomeIcon },
    { name: 'Weekly Food Menu', path: '/food-menu', desc: '3x Daily Kerala Homestyle Meals', icon: Utensils },
    { name: 'Zero-G Amenities', path: '/amenities', desc: '1GBPS Wi-Fi, Generator & AC', icon: Sparkles },
    { name: 'Campus Photo Gallery', path: '/gallery', desc: 'Real Bedroom & Lounge Photos', icon: MapPin },
  ];

  const trustItems = [
    { name: 'Move-In Guide', path: '/move-in', desc: '4-Step Process & Documents', icon: UserCheck },
    { name: 'House Guidelines', path: '/guidelines', desc: 'Timings, Rules & Visitor Policy', icon: ShieldCheck },
    { name: 'Resident Reviews', path: '/reviews', desc: '⭐ 4.9 Verified Google Reviews', icon: Star },
    { name: 'Life at Aafa Blog', path: '/blog', desc: 'Jigani Relocation Guides', icon: BookOpen },
    { name: 'Property Partnership', path: '/careers', desc: 'Franchise / Lease Your Property', icon: Building2 },
    { name: 'About Community', path: '/about', desc: 'Our Founding Story & Culture', icon: Sparkles },
  ];

  const toggleMobileAccordion = (key) => {
    setMobileAccordion(mobileAccordion === key ? null : key);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-0 sm:px-8 py-0 sm:py-3 transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto transition-all duration-300 ${
            scrolled
              ? 'glass-nav shadow-2xl py-2.5 px-4 sm:px-6 rounded-none sm:rounded-2xl border-b sm:border border-[#D4A64A]/30'
              : 'bg-[#0B1220]/95 sm:bg-[#0B1220]/85 backdrop-blur-md py-3 sm:py-2.5 px-4 sm:px-6 rounded-none sm:rounded-2xl border-b sm:border border-[#FAF7F0]/10'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            
            {/* Keralam Logo with Jigani Caption */}
            <Link to="/" className="flex items-center group shrink-0" data-cursor="expand">
              <KeralamLogo caption="Jigani • Pan-India" />
            </Link>

            {/* Desktop Navigation Bar */}
            <nav className="hidden lg:flex items-center gap-5">
              
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs font-bold transition-colors ${isActive ? 'text-[#D4A64A]' : 'text-[#FAF7F0]/80 hover:text-[#FAF7F0]'}`
                }
              >
                Home
              </NavLink>

              {/* ANIMATED LOCATION BAR TRIGGER (Interactive Pill with Pulse) */}
              <button
                onClick={() => setLocationModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#D4A64A]/40 text-xs text-[#FAF7F0] hover:border-[#D4A64A] hover:bg-[#D4A64A]/15 transition-all group shadow-md"
                data-cursor="expand"
                title="Search and change city campus"
              >
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-[#D4A64A]" />
                </div>
                <span className="font-bold font-sora">Bengaluru</span>
                <span className="text-[10px] font-mono text-[#FAF7F0]/60 group-hover:text-[#FAF7F0]">HCL Gate</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  Live
                </span>
                <ChevronDown className="w-3 h-3 text-[#D4A64A] group-hover:rotate-180 transition-transform" />
              </button>

              {/* 2. LIVING & MESS DROPDOWN */}
              <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onMouseEnter={() => setActiveDropdown('living')}
                  onClick={() => setActiveDropdown(activeDropdown === 'living' ? null : 'living')}
                  className={`flex items-center gap-1.5 text-xs font-bold py-1 transition-colors ${
                    ['/rooms', '/food-menu', '/amenities', '/gallery'].includes(location.pathname)
                      ? 'text-[#D4A64A]'
                      : 'text-[#FAF7F0]/80 hover:text-[#D4A64A]'
                  }`}
                  data-cursor="expand"
                >
                  <span>Living & Mess</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'living' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-72 rounded-2xl glass-nav p-3 border border-[#D4A64A]/30 shadow-2xl z-50 flex flex-col gap-1"
                    >
                      <p className="text-[10px] font-mono text-[#D4A64A] uppercase font-bold px-2.5 py-1 border-b border-white/10 mb-1">
                        Campus Living & Dining
                      </p>
                      {livingItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#D4A64A]/15 text-xs text-[#FAF7F0] transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#D4A64A]/20 text-[#D4A64A] flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold block group-hover:text-[#D4A64A]">{item.name}</span>
                              <span className="text-[10px] text-[#FAF7F0]/60">{item.desc}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. TRUST & GUIDES DROPDOWN */}
              <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onMouseEnter={() => setActiveDropdown('trust')}
                  onClick={() => setActiveDropdown(activeDropdown === 'trust' ? null : 'trust')}
                  className={`flex items-center gap-1.5 text-xs font-bold py-1 transition-colors ${
                    ['/move-in', '/guidelines', '/reviews', '/blog', '/careers', '/about'].includes(location.pathname)
                      ? 'text-[#D4A64A]'
                      : 'text-[#FAF7F0]/80 hover:text-[#D4A64A]'
                  }`}
                  data-cursor="expand"
                >
                  <span>Trust & Process</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'trust' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-72 rounded-2xl glass-nav p-3 border border-[#D4A64A]/30 shadow-2xl z-50 flex flex-col gap-1"
                    >
                      <p className="text-[10px] font-mono text-[#D4A64A] uppercase font-bold px-2.5 py-1 border-b border-white/10 mb-1">
                        Resident Information & Policies
                      </p>
                      {trustItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#D4A64A]/15 text-xs text-[#FAF7F0] transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-[#D4A64A]/20 text-[#D4A64A] flex items-center justify-center shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-bold block group-hover:text-[#D4A64A]">{item.name}</span>
                              <span className="text-[10px] text-[#FAF7F0]/60">{item.desc}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs font-bold transition-colors ${isActive ? 'text-[#D4A64A]' : 'text-[#FAF7F0]/80 hover:text-[#FAF7F0]'}`
                }
              >
                Contact
              </NavLink>

            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Phone Dropdown */}
              <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'phone' ? null : 'phone')}
                  className="flex items-center gap-2 text-xs font-bold text-[#FAF7F0] px-3.5 py-2 rounded-xl bg-[#FAF7F0]/5 border border-[#FAF7F0]/10 hover:border-[#D4A64A]/40 transition-all"
                  data-cursor="expand"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4A64A]" />
                  <span>8747049377</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#FAF7F0]/60" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'phone' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 rounded-2xl glass-nav p-3 border border-[#D4A64A]/30 shadow-2xl z-50 flex flex-col gap-1.5"
                    >
                      <p className="text-[10px] font-mono text-[#D4A64A] px-2 uppercase mb-1 font-bold">
                        Direct Campus Hotlines
                      </p>
                      {phoneNumbers.map((p, idx) => (
                        <a
                          key={idx}
                          href={`tel:${p.tel}`}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#D4A64A]/15 text-xs text-[#FAF7F0] hover:text-[#D4A64A] transition-colors"
                        >
                          <span className="font-mono font-bold">{p.number}</span>
                          <span className="text-[10px] text-[#FAF7F0]/60">{p.label}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Now Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/25 hover:shadow-[#D4A64A]/45 transition-all btn-shimmer"
                data-cursor="expand"
              >
                <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Book — ₹499/day</span>
              </motion.button>

            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#FAF7F0]/5 border border-[#FAF7F0]/15 text-[#FAF7F0] hover:border-[#D4A64A]/40 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4A64A]" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              className="lg:hidden mt-2 mx-3 sm:mx-auto max-w-7xl rounded-2xl sm:rounded-3xl glass-nav p-4 sm:p-5 border border-[#D4A64A]/30 shadow-2xl flex flex-col gap-3 max-h-[80vh] overflow-y-auto bg-[#0B1220]/95 backdrop-blur-2xl"
            >
              {/* Mobile Location Quick Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLocationModalOpen(true);
                }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#D4A64A]/20 via-[#D4A64A]/10 to-transparent border border-[#D4A64A]/40 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#D4A64A] text-[#0B1220] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#FAF7F0] font-sora">Campus: Bengaluru</span>
                      <span className="text-[9px] font-mono bg-emerald-500 text-black px-1.5 py-0.2 rounded font-bold">Live</span>
                    </div>
                    <span className="text-[10px] text-[#D4A64A]">Sannidhi Layout (HCL Gate) • Tap to Change</span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-[#D4A64A] -rotate-90" />
              </button>

              {/* Quick Hotline Strip */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F0]/5 border border-white/10">
                <a
                  href="tel:+918747049377"
                  className="flex items-center gap-2 text-xs font-bold text-[#D4A64A] font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4A64A]" />
                  <span>+91 87470 49377</span>
                </a>
                <span className="text-[10px] text-emerald-400 font-mono">Open 7 AM - 11 PM</span>
              </div>

              {/* Standalone Home Link */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold p-3 rounded-xl bg-white/5 text-[#FAF7F0] flex items-center justify-between hover:bg-[#D4A64A]/15"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-[#D4A64A]" />
              </Link>

              {/* 1. LOCATIONS ACCORDION */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion('locations')}
                  className="w-full p-3 flex items-center justify-between font-bold text-xs text-[#D4A64A] uppercase font-mono"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Pan-India Locations ({locations.length})</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'locations' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileAccordion === 'locations' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-3 pt-0 space-y-1.5 border-t border-white/5"
                    >
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLocationModalOpen(true);
                        }}
                        className="w-full p-2.5 rounded-lg bg-[#D4A64A] text-[#0B1220] font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Open Interactive City Search</span>
                      </button>

                      {locations.map((loc) => (
                        <Link
                          key={loc.slug}
                          to={`/locations/${loc.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg text-xs text-[#FAF7F0] hover:bg-white/5"
                        >
                          <div>
                            <span className="font-bold">{loc.city}</span>
                            <span className="text-[10px] text-[#FAF7F0]/60 block">{loc.area}</span>
                          </div>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${loc.status === 'live' ? 'bg-emerald-500/20 text-emerald-300' : 'text-[#D4A64A]'}`}>
                            {loc.status === 'live' ? 'Live' : 'Soon'}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. LIVING & MESS ACCORDION */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion('living')}
                  className="w-full p-3 flex items-center justify-between font-bold text-xs text-[#D4A64A] uppercase font-mono"
                >
                  <span className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    <span>Living & Dining</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'living' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileAccordion === 'living' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-3 pt-0 space-y-1 border-t border-white/5"
                    >
                      {livingItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg text-xs text-[#FAF7F0] hover:bg-white/5"
                        >
                          <span>{item.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4A64A]/60" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. TRUST & RULES ACCORDION */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleMobileAccordion('trust')}
                  className="w-full p-3 flex items-center justify-between font-bold text-xs text-[#D4A64A] uppercase font-mono"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Trust & Guidelines</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'trust' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileAccordion === 'trust' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="p-3 pt-0 space-y-1 border-t border-white/5"
                    >
                      {trustItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg text-xs text-[#FAF7F0] hover:bg-white/5"
                        >
                          <span>{item.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4A64A]/60" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('Daily Stay Special (₹499/day)');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-sm shadow-xl shadow-[#D4A64A]/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Book Stay — ₹499/day</span>
              </button>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Location Explorer Modal */}
      <LocationBar
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
    </>
  );
}
