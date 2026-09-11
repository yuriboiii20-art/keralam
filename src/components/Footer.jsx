import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, Navigation, Clock, Sparkles, Lock, ShieldCheck, Star, Award, CheckCircle2, HeartHandshake } from 'lucide-react';
import KeralamLogo from './KeralamLogo';

export default function Footer({ onOpenBooking, onOpenAdminCMS }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const socialLinks = [
    {
      name: 'WhatsApp Direct',
      url: 'https://wa.me/918747049377?text=Hello%20Aafa%20Coliving%20Team!%20I%20am%20interested%20in%20room%20availability%20in%20Jigani.',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.137 4.153 4.14-1.086zm11.215-5.609c-.287-.144-1.7-.838-1.963-.934-.264-.096-.456-.144-.647.144-.192.288-.744.934-.912 1.126-.168.192-.336.216-.624.072-.287-.144-1.21-.446-2.306-1.423-.853-.761-1.428-1.701-1.596-1.989-.168-.288-.018-.444.126-.587.13-.13.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.234-.56-.472-.484-.648-.493l-.552-.01c-.192 0-.504.072-.768.36-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 2.032 3.102 4.921 4.35.688.297 1.224.474 1.642.607.69.22 1.318.189 1.815.115.554-.083 1.7-.695 1.94-1.366.24-.672.24-1.248.168-1.367-.072-.12-.264-.192-.552-.336z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
  ];

  const phoneNumbers = [
    { label: 'Hotline 1', number: '8747049377', tel: 'tel:+918747049377', wa: 'https://wa.me/918747049377' },
    { label: 'Hotline 2', number: '9686193084', tel: 'tel:+919686193084', wa: 'https://wa.me/919686193084' },
    { label: 'Support Desk', number: '9745688880', tel: 'tel:+919745688880', wa: 'https://wa.me/919745688880' },
    { label: 'Landline', number: '099000 82615', tel: 'tel:09900082615', wa: 'https://wa.me/918747049377' },
  ];

  return (
    <footer className="relative z-10 pt-16 pb-10 border-t border-[#D4A64A]/30 bg-[#0B1220]/95 backdrop-blur-2xl overflow-hidden">
      
      {/* Top Ambient Fluid Glow Strip */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-1 bg-gradient-to-r from-transparent via-[#D4A64A] to-transparent opacity-80" />

      {/* Top Action Callout Banner */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 mb-10 sm:mb-14">
        <div className="rounded-3xl glass-card border border-[#D4A64A]/35 p-4 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl bg-gradient-to-r from-[#D4A64A]/15 via-transparent to-[#D4A64A]/10">
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-sora text-[#FAF7F0]">
                Need Room Availability in Jigani Right Now?
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/75">
                Instant confirmation on your mobile phone via WhatsApp & SMS.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg shadow-[#D4A64A]/30 hover:shadow-[#D4A64A]/50 hover:scale-105 transition-all btn-shimmer flex items-center justify-center gap-2"
              data-cursor="expand"
            >
              <span>Book Stay — ₹499/day</span>
            </button>

            <a
              href="https://wa.me/918747049377?text=Hello%20Aafa%20Coliving!%20I%20am%20looking%20for%20room%20availability%20in%20Jigani."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl glass-card border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/15 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              data-cursor="expand"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main 4-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
        
        {/* Column 1: Brand & Trust Badges (5 cols) */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start">
          
          <Link to="/" className="flex items-center mb-4 group" data-cursor="expand">
            <KeralamLogo caption="Jigani • Near HCL Gate" />
          </Link>

          <p className="text-[#D4A64A] text-xs font-semibold leading-relaxed mb-3 italic">
            "Your Home Away From Home — Comfort, Community, and Kerala Cuisine."
          </p>

          <p className="text-[#FAF7F0]/75 text-xs leading-relaxed mb-6">
            Fully furnished 1BHK, 2BHK sharing, Single Rooms & ₹499/day daily stays with 3x daily fresh Kerala meals, 1GBPS dual fiber Wi-Fi, and 100% commercial generator power backup in Jigani, Bengaluru.
          </p>

          {/* Trust Proof Badges */}
          <div className="grid grid-cols-2 gap-2.5 w-full mb-6 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D4A64A] fill-[#D4A64A] shrink-0" />
              <div>
                <span className="font-bold text-[#FAF7F0] block">4.9 ★ Rating</span>
                <span className="text-[9px] text-[#FAF7F0]/60">140+ Google Reviews</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-[#FAF7F0] block">Biometric Entry</span>
                <span className="text-[9px] text-[#FAF7F0]/60">24/7 CCTV Campus</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Aafa Coliving ${s.name}`}
                className="w-9 h-9 rounded-xl glass-card border border-white/10 text-[#FAF7F0]/80 hover:text-[#D4A64A] hover:border-[#D4A64A]/50 hover:scale-110 transition-all flex items-center justify-center shadow-md"
                data-cursor="expand"
              >
                {s.svg}
              </a>
            ))}
          </div>

        </div>

        {/* Column 2: Living & Mess Navigation (2 cols) */}
        <div className="sm:col-span-1 lg:col-span-2">
          <h4 className="text-xs font-mono font-bold text-[#D4A64A] uppercase tracking-wider mb-4 font-sora">
            Living & Mess
          </h4>
          <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75 font-medium">
            <li><Link to="/rooms" className="hover:text-[#D4A64A] transition-colors">Rooms & Pricing</Link></li>
            <li><Link to="/food-menu" className="hover:text-[#D4A64A] transition-colors">Kerala Food Menu</Link></li>
            <li><Link to="/amenities" className="hover:text-[#D4A64A] transition-colors">Zero-G Amenities</Link></li>
            <li><Link to="/gallery" className="hover:text-[#D4A64A] transition-colors">Photo Gallery</Link></li>
            <li><Link to="/reviews" className="hover:text-[#D4A64A] transition-colors">Resident Reviews</Link></li>
            <li>
              <button onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')} className="text-[#D4A64A] hover:underline font-bold">
                ₹499 Daily Stay ⭐
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Trust & Process (2 cols) */}
        <div className="sm:col-span-1 lg:col-span-2">
          <h4 className="text-xs font-mono font-bold text-[#D4A64A] uppercase tracking-wider mb-4 font-sora">
            Trust & Policies
          </h4>
          <ul className="space-y-2.5 text-xs text-[#FAF7F0]/75 font-medium">
            <li><Link to="/move-in" className="hover:text-[#D4A64A] transition-colors">Move-In Checklist</Link></li>
            <li><Link to="/guidelines" className="hover:text-[#D4A64A] transition-colors">House Guidelines</Link></li>
            <li><Link to="/locations" className="hover:text-[#D4A64A] transition-colors">Pan-India Map</Link></li>
            <li><Link to="/blog" className="hover:text-[#D4A64A] transition-colors">Life at Aafa Blog</Link></li>
            <li><Link to="/careers" className="hover:text-[#D4A64A] transition-colors">Franchise Partnership</Link></li>
            <li><Link to="/about" className="hover:text-[#D4A64A] transition-colors">Founding Story</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4A64A] transition-colors">Contact Hotlines</Link></li>
          </ul>
        </div>

        {/* Column 4: Location & Direct Dial (4 cols) */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col justify-between">
          
          <div>
            <h4 className="text-xs font-mono font-bold text-[#D4A64A] uppercase tracking-wider mb-4 font-sora">
              Campus Hotlines & Address
            </h4>

            {/* Address snippet */}
            <div className="rounded-2xl glass-card border border-white/10 p-4 mb-4 text-xs space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A64A] shrink-0 mt-0.5" />
                <p className="text-[#FAF7F0]/85 leading-relaxed">
                  Sannidhi Layout, Bande Nalla Sandra Rd, in front of Meghana PG, 300m from HCL Gate, Jigani, Bengaluru — 560105
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-[#FAF7F0]/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4A64A]" />
                  <span>Open: 7 AM – 11 PM</span>
                </span>
                <span className="text-emerald-400 font-bold">🟢 Live Desk</span>
              </div>
            </div>

            {/* Click-to-Dial Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {phoneNumbers.map((p, idx) => (
                <a
                  key={idx}
                  href={p.tel}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-[#D4A64A]/20 border border-white/10 hover:border-[#D4A64A]/40 transition-all text-xs flex items-center justify-between group"
                  data-cursor="expand"
                >
                  <div>
                    <span className="text-[10px] text-[#FAF7F0]/50 font-mono block">{p.label}</span>
                    <span className="font-mono font-bold text-[#FAF7F0] group-hover:text-[#D4A64A]">{p.number}</span>
                  </div>
                  <Phone className="w-3.5 h-3.5 text-[#D4A64A] opacity-70 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Sannidhi+Layout+2+Bande+Nalla+Sandra+Rd+Jigani+Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#D4A64A]/15 text-[#D4A64A] hover:bg-[#D4A64A]/25 border border-[#D4A64A]/30 font-bold text-xs transition-all"
            data-cursor="expand"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open Directions on Google Maps</span>
          </a>

        </div>

      </div>

      {/* Bottom Legal, System Status & Back-to-Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/60 font-mono">
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <p>© {new Date().getFullYear()} AAFA Coliving Group. All Rights Reserved.</p>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>All Systems Operational</span>
          </span>
          {import.meta.env.DEV && <button
            onClick={onOpenAdminCMS}
            className="px-2.5 py-1 rounded-lg bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 hover:bg-[#D4A64A]/30 transition-all text-[10px] font-bold flex items-center gap-1"
            data-cursor="expand"
          >
            <Lock className="w-3 h-3" />
            <span>Admin CMS</span>
          </button>}
        </div>
        
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top of page"
          className="p-2.5 px-4 rounded-2xl glass-card text-[#D4A64A] hover:text-[#FAF7F0] border border-[#D4A64A]/30 hover:border-[#D4A64A] transition-all flex items-center gap-2 font-bold shrink-0"
          data-cursor="expand"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>

    </footer>
  );
}
