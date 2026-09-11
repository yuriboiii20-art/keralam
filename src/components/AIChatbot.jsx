import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Phone, MessageSquare, RefreshCw, Calendar } from 'lucide-react';
import FindSpaceLogo from './FindSpaceLogo';

export default function AIChatbot({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! 🙏 Welcome to Aafa Coliving Jigani. I'm your front-desk AI concierge. How can we help you with room pricing, Kerala food menu, location near HCL Gate, or ₹499 daily stays today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const container = chatEndRef.current?.parentElement;
    if (isOpen && container) container.scrollTo({ top: container.scrollHeight, behavior: 'auto' });
  }, [messages, isLoading, isOpen]);

  // Local Smart Response Generator
  const getSmartResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('women') || q.includes('girl') || q.includes('lady') || q.includes('safe') || q.includes('security')) {
      return "Safety and peace of mind are top priorities at Aafa Coliving! Our campus features biometric facial recognition entry, 24/7 CCTV surveillance, and a gated community environment in Sannidhi Layout.\n\nWould you like me to schedule a visit for you to inspect the campus in person?";
    }

    if (q.includes('how to book') || q.includes('booking process') || q.includes('how do i book') || q.includes('process')) {
      return "Booking your room at Aafa is simple:\n1. Enquiry (Call/WhatsApp)\n2. Free Room Visit & Lunch Tasting\n3. Document Submission (Govt ID + Photo)\n4. 1-Month Deposit\n5. Move-In & Key Handover!\n\nWould you like to schedule a free visit to see the room today?";
    }

    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('rent')) {
      return "Here are our room options at Aafa Coliving Jigani:\n• Daily Stay ⭐: ₹499/day (Free Breakfast Included)\n• 2 BHK Sharing: ₹7,499/month (3x Kerala Meals Included)\n• Single Room: ₹11,499/month (3x Kerala Meals Included)\n• 1 BHK Suite: Monthly rate with full privacy & kitchenette.\n\nWould you like me to connect you with our team for a quick call or room visit?";
    }

    if (q.includes('food') || q.includes('menu') || q.includes('eat') || q.includes('meal') || q.includes('kerala')) {
      return "We serve 3x daily fresh homestyle Kerala meals prepared in-house!\n• Mon: Puttu & Kadala Curry\n• Wed: Meen (Fish) Curry & Rice | Veg Biryani\n• Sat: Dosa & Chutney | Majboos\n• Sun: Sunday Malabar Biryani & Evening Pazham Pori!\n\nWant to book a visit to sample our food and check out the rooms?";
    }

    if (q.includes('location') || q.includes('address') || q.includes('hcl') || q.includes('where') || q.includes('jigani')) {
      return "We are located right in Sannidhi Layout, Jigani, Bengaluru — just a 2-minute walk (300 meters) from HCL Gate! Address: In front of Meghana PG, Bande Nalla Sandra Rd, Jigani 560105.\n\nWould you like me to share directions or set up a visit?";
    }

    if (q.includes('daily') || q.includes('499') || q.includes('short')) {
      return "Our Daily Stay plan is ₹499/day with FREE breakfast included! It's ideal for short business trips, interview visits near HCL Gate, or testing out the stay before committing monthly.\n\nWould you like to book a Daily Stay for your upcoming dates?";
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call')) {
      return "You can call or WhatsApp our front-desk team directly at:\n📞 8747049377\n📞 9686193084\n📞 9745688880\nDesk Hours: Open 7 AM – 11 PM every day.\n\nWould you like us to give you a quick call back?";
    }

    return "Thank you for reaching out! We offer fully furnished rooms, 1GBPS Wi-Fi, 100% generator backup, and 3x daily Kerala meals in Jigani near HCL Gate (₹499/day Daily Stays & monthly plans).\n\nWould you like me to connect you with our team for a quick call?";
  };

  const handleSend = async (customQuery = null) => {
    const userMsg = customQuery || input.trim();
    if (!userMsg || isLoading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    if (!customQuery) setInput('');
    setIsLoading(true);

    // Use local answers until a server-side, rate-limited AI endpoint exists.

    setTimeout(() => {
      const fallbackReply = getSmartResponse(userMsg);
      setMessages((prev) => [...prev, { sender: 'bot', text: fallbackReply }]);
      setIsLoading(false);
    }, 450);
  };

  return (
    <>
      {/* Unified Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] flex items-center justify-center shadow-[0_0_35px_rgba(212,166,74,0.6)] border-2 border-[#FAF7F0]/40 transition-transform"
          aria-label="Open AI Concierge Chatbot & Front Desk"
          data-cursor="expand"
        >
          <span className="absolute -inset-1 rounded-full border border-[#D4A64A] animate-ping opacity-60" />
          {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Bot className="w-7 h-7 stroke-[2.5]" />}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B1220]" />
        </motion.button>
      </div>

      {/* Floating Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 md:w-[420px] h-[550px] max-h-[calc(100dvh-7rem)] rounded-3xl border border-[#D4A64A]/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(11, 18, 32, 0.35)',
            }}
          >
            {/* Header with Direct Hotline & WhatsApp Shortcuts */}
            <div className="p-3.5 bg-gradient-to-r from-[#D4A64A]/15 via-amber-500/5 to-transparent border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A64A] to-yellow-600 text-[#0B1220] flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-sora text-[#FAF7F0] flex items-center gap-1.5">
                    <span>Aafa Front-Desk Concierge</span>
                    <FindSpaceLogo className="w-3.5 h-3.5" />
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Online • 7 AM – 11 PM</span>
                  </p>
                </div>
              </div>

              {/* Quick Communication Actions in Header */}
              <div className="flex items-center gap-1.5">
                <a
                  href="https://wa.me/918747049377?text=Hi%20Aafa%20Coliving!%20I%20am%20inquiring%20about%20room%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
                  title="WhatsApp Direct"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <a
                  href="tel:+918747049377"
                  aria-label="Call Hotline"
                  className="p-2 rounded-xl bg-[#D4A64A]/20 text-[#D4A64A] hover:bg-[#D4A64A]/30 border border-[#D4A64A]/30 transition-colors"
                  title="Call Hotline"
                >
                  <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Concierge"
                  className="p-2 rounded-xl bg-white/10 text-[#FAF7F0] hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Reply Badges */}
            <div className="p-2 bg-white/[0.03] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              {[
                { label: '🍛 Kerala Menu', query: 'What is the weekly Kerala food menu?' },
                { label: '💰 Room Rates', query: 'What are the room rates?' },
                { label: '📍 HCL Gate Location', query: 'Where is Aafa Coliving located?' },
                { label: '⭐ ₹499 Daily Stay', query: 'Tell me about ₹499 daily stay' },
                { label: '🛡️ Women Safety', query: 'Is Aafa safe for female residents?' },
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(pill.query)}
                  className="px-2.5 py-1 rounded-full bg-[#D4A64A]/15 text-[#D4A64A] border border-[#D4A64A]/30 whitespace-nowrap hover:bg-[#D4A64A]/30 transition-all font-mono font-bold"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#D4A64A] to-yellow-600 text-[#0B1220] font-medium shadow-md'
                        : 'bg-white/[0.07] backdrop-blur-md border border-white/10 text-[#FAF7F0] whitespace-pre-line shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.07] backdrop-blur-md border border-white/10 px-3.5 py-2 rounded-2xl text-xs text-[#D4A64A] font-mono flex items-center gap-2 shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4A64A]" />
                    <span>Aafa concierge typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Book Stay Direct Banner */}
            <div className="px-3 py-1.5 bg-white/[0.03] border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-[#FAF7F0]/70 font-mono">Need instant room reservation?</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking('Daily Stay Special (₹499/day)');
                }}
                className="text-[10px] font-bold text-[#D4A64A] hover:underline flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Stay (₹499/day) →</span>
              </button>
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-[#0B1220]/40 backdrop-blur-md border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about rooms, food, prices, or address..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-xs text-[#FAF7F0] placeholder-[#FAF7F0]/50 focus:outline-none focus:border-[#D4A64A] transition-colors"
              />
              <button
                onClick={() => handleSend()}
                aria-label="Send Message"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4A64A] to-yellow-600 text-[#0B1220] font-bold shadow-md hover:scale-105 transition-transform"
                data-cursor="expand"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
