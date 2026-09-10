import useScrollLock from '../hooks/useScrollLock';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit, RefreshCw, CheckCircle2, Sparkles, Utensils, DollarSign, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminCMSModal({ isOpen, onClose }) {
  useScrollLock(isOpen);
  const [activeTab, setActiveTab] = useState('prices'); // 'prices' | 'food'
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Price States
  const [prices, setPrices] = useState({
    sharing2bhk: '7499',
    singleRoom: '11499',
    dailyStay: '499',
    suite1bhk: '18999',
  });

  // Food Menu States (7 days)
  const [menu, setMenu] = useState({
    MONDAY: { breakfast: 'Puttu & Kadala Curry', lunch: 'Rice, Moru Curry, Uppari', dinner: 'Chappathi & Dal Masala' },
    TUESDAY: { breakfast: 'Idly & Sambar, Chutney', lunch: 'Rice, Fish Curry / Veg Gravy', dinner: 'Chappathi & Chicken Gravy' },
    WEDNESDAY: { breakfast: 'Dosa & Coconut Chutney', lunch: 'Kerala Rice, Sambar, Aviyal', dinner: 'Veg / Chicken Biryani' },
    THURSDAY: { breakfast: 'Poori Baji', lunch: 'Rice, Pulissery, Thoran', dinner: 'Ghee Rice & Liver Curry / Veg' },
    FRIDAY: { breakfast: 'Appam & Veg Stew', lunch: 'Rice, Fish Fry, Rasam', dinner: 'Chappathi & Dal Curry' },
    SATURDAY: { breakfast: 'Idiyappam & Egg Curry', lunch: 'Egg Fried Rice & Raitha', dinner: 'Malabar Parotta & Chicken' },
    SUNDAY: { breakfast: 'Uppumavu & Banana', lunch: 'Special Sunday Chicken Biryani', dinner: 'Kanji, Cherupayar & Pappad' },
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aafa_cms_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.prices) setPrices(parsed.prices);
        if (parsed.menu) setMenu(parsed.menu);
      }
    } catch (e) {}
  }, [isOpen]);

  const handleSave = () => {
    try {
      const cmsPayload = { prices, menu };
      localStorage.setItem('aafa_cms_data', JSON.stringify(cmsPayload));
      
      // Dispatch global re-render event
      window.dispatchEvent(new Event('aafa_cms_updated'));

      setSavedSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4A64A', '#f59e0b', '#FAF7F0'],
        });
      } catch (e) {}

      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    } catch (e) {
      alert('Failed to save CMS settings');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1220]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl glass-card border border-[#D4A64A]/40 p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden bg-[#0B1220]/95"
        >
          <button
            onClick={onClose}
            aria-label="Close Admin CMS Drawer"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F0] transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#D4A64A]/20 border border-[#D4A64A]/40 text-[#D4A64A] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-sora text-[#FAF7F0] flex items-center gap-2">
                <span>Client Admin Live CMS</span>
                <span className="text-[10px] font-mono uppercase bg-[#D4A64A]/20 text-[#D4A64A] px-2 py-0.5 rounded border border-[#D4A64A]/30">
                  No Code Needed
                </span>
              </h3>
              <p className="text-xs text-[#FAF7F0]/70">
                Instantly update room pricing and weekly Kerala food menu live across the site.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl mb-6 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('prices')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'prices'
                  ? 'bg-[#D4A64A] text-[#0B1220] shadow-md'
                  : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
              }`}
            >
              💰 Room Rates
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                activeTab === 'food'
                  ? 'bg-[#D4A64A] text-[#0B1220] shadow-md'
                  : 'text-[#FAF7F0]/70 hover:text-[#FAF7F0]'
              }`}
            >
              🍲 Weekly Food Menu
            </button>
          </div>

          {/* CMS Form Content */}
          <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-1">
            {activeTab === 'prices' ? (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[#FAF7F0]/80 mb-1 font-bold">
                    2 BHK Sharing Room Rate (₹/month)
                  </label>
                  <input
                    type="number"
                    value={prices.sharing2bhk}
                    onChange={(e) => setPrices({ ...prices, sharing2bhk: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-[#FAF7F0] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>

                <div>
                  <label className="block text-[#FAF7F0]/80 mb-1 font-bold">
                    Single Executive Room Rate (₹/month)
                  </label>
                  <input
                    type="number"
                    value={prices.singleRoom}
                    onChange={(e) => setPrices({ ...prices, singleRoom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-[#FAF7F0] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>

                <div>
                  <label className="block text-[#FAF7F0]/80 mb-1 font-bold">
                    Daily Stay Plan Special (₹/day)
                  </label>
                  <input
                    type="number"
                    value={prices.dailyStay}
                    onChange={(e) => setPrices({ ...prices, dailyStay: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-[#FAF7F0] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>

                <div>
                  <label className="block text-[#FAF7F0]/80 mb-1 font-bold">
                    1 BHK Private Suite (₹/month)
                  </label>
                  <input
                    type="number"
                    value={prices.suite1bhk}
                    onChange={(e) => setPrices({ ...prices, suite1bhk: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-card text-[#FAF7F0] focus:outline-none focus:border-[#D4A64A]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                {Object.keys(menu).map((dayKey) => (
                  <div key={dayKey} className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-2">
                    <p className="text-sm font-bold text-[#D4A64A] font-sora">{dayKey}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] text-[#FAF7F0]/60 block mb-1">Breakfast</span>
                        <input
                          type="text"
                          value={menu[dayKey].breakfast}
                          onChange={(e) =>
                            setMenu({
                              ...menu,
                              [dayKey]: { ...menu[dayKey], breakfast: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#FAF7F0]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#FAF7F0]/60 block mb-1">Lunch</span>
                        <input
                          type="text"
                          value={menu[dayKey].lunch}
                          onChange={(e) =>
                            setMenu({
                              ...menu,
                              [dayKey]: { ...menu[dayKey], lunch: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#FAF7F0]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#FAF7F0]/60 block mb-1">Dinner</span>
                        <input
                          type="text"
                          value={menu[dayKey].dinner}
                          onChange={(e) =>
                            setMenu({
                              ...menu,
                              [dayKey]: { ...menu[dayKey], dinner: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[#FAF7F0]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
            {savedSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>CMS Updates Saved Live!</span>
              </div>
            ) : (
              <p className="text-[10px] text-[#FAF7F0]/60 font-mono">
                Changes apply instantly across all pages.
              </p>
            )}

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A64A] via-amber-500 to-yellow-600 text-[#0B1220] font-extrabold text-xs shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Live</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
