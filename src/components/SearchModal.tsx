import React, { useState } from 'react';
import { X, Search, CreditCard, Gift, Users, Zap, Building2, Smartphone, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useApp();
  const [query, setQuery] = useState('');

  if (activeModal !== 'search') return null;

  const items = [
    { title: 'Claim ₦30,000.00 Welcome Bonus', modal: 'welcome_bonus', icon: Gift, category: 'Bonus' },
    { title: 'Withdraw to Nigerian Bank Account', modal: 'withdraw', icon: CreditCard, category: 'Banking' },
    { title: 'Add Funds & Virtual Account', modal: 'add_funds', icon: Building2, category: 'Banking' },
    { title: 'Daily NaijaCore Mining (₦3,000)', modal: 'platform', icon: Zap, category: 'Earning' },
    { title: 'Invite Friends (₦5,000/ref)', modal: 'invite', icon: Users, category: 'Referrals' },
    { title: 'Lucky Spin & Win', modal: 'spin', icon: Zap, category: 'Games' },
    { title: 'Airtime & Data Topup', modal: 'airtime', icon: Smartphone, category: 'Utilities' },
    { title: '24/7 Live Customer Support', modal: 'support', icon: Zap, category: 'Support' },
  ];

  const filtered = items.filter(
    (i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-4 shadow-2xl text-slate-100">
        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bonuses, withdrawal, banks, tasks..."
            className="w-full bg-[#031d13] border border-emerald-600/50 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-emerald-400/40 focus:outline-none focus:border-white font-medium"
          />
          <button
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  closeModal();
                  openModal(item.modal);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-[#073623] flex items-center justify-between group transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white text-emerald-950 flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-200">
                      {item.title}
                    </div>
                    <span className="text-[10px] text-emerald-300">{item.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
