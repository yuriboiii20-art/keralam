import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, ShieldCheck, CreditCard, Sparkles, ArrowRight, UserCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function MoveInPage({ onOpenBooking }) {
  const steps = [
    { num: '01', title: 'Submit Online Enquiry / Call', desc: 'Pick your preferred room plan (1BHK, 2BHK, Single, or ₹499 Daily Stay).' },
    { num: '02', title: 'Campus Visit & Walkthrough', desc: 'Visit our Sannidhi Layout campus near HCL Gate to inspect bedrooms & mess.' },
    { num: '03', title: 'Submit KYC Documents', desc: 'Upload Aadhaar/Passport copy + employment offer letter or college ID.' },
    { num: '04', title: 'Confirm Deposit & Lock Key', desc: 'Pay 1 month refundable deposit to finalize booking and get biometric access.' },
  ];

  const docs = [
    'Government Photo ID (Aadhaar Card / Passport / Driving License)',
    'Company Offer Letter / Corporate ID card or Student College ID',
    '2 Passport-size recent photographs',
    'Emergency Contact details of family/guardian',
  ];

  return (
    <PageTransition>
      <div className="relative pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[#D4A64A] text-xs font-semibold uppercase tracking-wider mb-4">
            <UserCheck className="w-4 h-4 text-[#D4A64A]" />
            <span>Seamless Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF7F0] mb-6 font-sora tracking-tight">
            Move-In Process <span className="text-gradient-gold">& Required Documents</span>
          </h1>
          <p className="text-[#FAF7F0]/80 text-base sm:text-lg">
            Zero hassle, transparent paperwork. Move into your ready sanctuary in 4 simple steps.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold text-[#D4A64A] font-mono block mb-2">
                  {s.num}
                </span>
                <h3 className="text-sm sm:text-base font-bold font-sora text-[#FAF7F0] mb-1.5 leading-snug">{s.title}</h3>
                <p className="text-[11px] sm:text-xs text-[#FAF7F0]/75 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Required Documents Box */}
        <div className="rounded-3xl glass-card border border-[#D4A64A]/30 p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-sora text-[#FAF7F0]">Checklist of Required Documents</h3>
                <p className="text-xs text-[#FAF7F0]/70 font-mono">Bring physical or digital copies on move-in day</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {docs.map((d, idx) => (
                <div key={idx} className="p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs text-[#FAF7F0]/85 font-medium">{d}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => onOpenBooking('Daily Stay Special (₹499/day)')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4A64A] to-yellow-600 text-[#0B1220] font-bold text-xs shadow-xl shadow-[#D4A64A]/30"
                data-cursor="expand"
              >
                Start Your Booking Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
