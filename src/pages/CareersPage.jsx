import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Handshake, CheckCircle2, Send, Sparkles, Phone, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import confetti from 'canvas-confetti';

export default function CareersPage() {
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ownerName || !phone) return;
    setPartnerSubmitted(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A64A', '#f59e0b', '#FAF7F0'],
      });
    } catch (err) {}
  };

  return (
    <PageTransition>
      <div className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-4 h-4 text-[#D4A64A]" />
            <span>Property Owners & Expansion Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-6 font-sora tracking-tight">
            Partner With <span className="text-gradient-gold">Aafa Coliving Group</span>
          </h1>
          <p className="text-[#FAF7F0]/80 text-base sm:text-lg">
            Own a residential building in Bangalore, Pune, Mumbai, Delhi, Chennai, or Kerala? Franchise or lease your property with guaranteed long-term rental yields.
          </p>
        </div>

        {/* Benefits for Property Owners */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-16">
          {[
            { title: 'Guaranteed 100% Fixed Rental Yield', desc: 'Zero vacancy risk. Long-term corporate master lease contracts backed by bank guarantees.' },
            { title: 'Full Property Maintenance', desc: 'Aafa team handles deep cleaning, plumbing, electrical, and structural upkeep at zero cost to you.' },
            { title: 'Verified Resident Screening', desc: 'Strict biometric facial access and corporate KYC verification for every single resident.' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-4.5 sm:p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center mb-3">
                  <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold font-sora text-[#FAF7F0] mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#FAF7F0]/75 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Property Partner Inquiry Form */}
        <div className="rounded-3xl glass-card border border-[#D4A64A]/40 p-8 sm:p-12 max-w-2xl mx-auto shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-sora text-[#FAF7F0] mb-2">
              List / Franchise Your Property
            </h3>
            <p className="text-xs text-[#FAF7F0]/70">
              Fill out your property details below and our business expansion team will connect with you within 24 hours.
            </p>
          </div>

          {!partnerSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1 text-[#FAF7F0]/80">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl glass-card text-xs focus:outline-none focus:border-[#D4A64A] text-[#FAF7F0]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1 text-[#FAF7F0]/80">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit Mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl glass-card text-xs focus:outline-none focus:border-[#D4A64A] text-[#FAF7F0]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase mb-1 text-[#FAF7F0]/80">
                    Property City *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune / Bangalore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl glass-card text-xs focus:outline-none focus:border-[#D4A64A] text-[#FAF7F0]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4A64A] to-yellow-600 text-[#0B1220] font-bold text-xs shadow-xl shadow-[#D4A64A]/30"
                data-cursor="expand"
              >
                Submit Property Partnership Request
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl glass-card border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 text-center">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you {ownerName}! Our expansion head will call you at {phone} regarding your property in {city}.</span>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
