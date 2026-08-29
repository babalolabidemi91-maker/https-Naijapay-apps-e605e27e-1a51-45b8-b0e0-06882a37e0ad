import React from 'react';
import { X, PlaySquare, Gift, Zap, ArrowDownToLine, Users, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorksModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useApp();

  if (activeModal !== 'how_it_works') return null;

  const steps = [
    {
      step: '1',
      title: 'Claim ₦30,000.00 Welcome Bonus',
      desc: 'Instant registration reward credited directly to your available balance upon first sign in.',
      icon: Gift,
      color: 'text-emerald-300',
      bg: 'bg-emerald-950 border border-emerald-500/30',
    },
    {
      step: '2',
      title: 'Activate Daily NaijaCore (₦3,000/day)',
      desc: 'Tap "Claim Now" every single day to accumulate daily mining yield directly into your wallet.',
      icon: Zap,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950 border border-emerald-500/30',
    },
    {
      step: '3',
      title: 'Invite Friends (+₦5,000 each)',
      desc: 'Share your exclusive invite link with family and friends on WhatsApp and Telegram.',
      icon: Users,
      color: 'text-white',
      bg: 'bg-emerald-950 border border-emerald-500/30',
    },
    {
      step: '4',
      title: 'Withdraw to Nigerian Bank Account',
      desc: 'Instant NIP payout to OPay, PalmPay, Kuda, GTBank, Zenith, Access, Moniepoint, etc.',
      icon: ArrowDownToLine,
      color: 'text-emerald-300',
      bg: 'bg-emerald-950 border border-emerald-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          id="close-howitworks-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-950 flex items-center justify-center shadow-md">
            <PlaySquare className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            How Naija Pay Works
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-4">
          Complete guide to earning daily rewards and withdrawing real cash.
        </p>

        {/* Video Preview Mock */}
        <div className="relative rounded-2xl overflow-hidden bg-emerald-950 border border-emerald-500/40 aspect-video flex items-center justify-center mb-5 group cursor-pointer shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="w-12 h-12 rounded-full bg-white text-emerald-950 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
            <PlaySquare className="w-6 h-6 fill-emerald-950" />
          </div>
          <span className="absolute bottom-2.5 left-3 text-xs font-bold text-white">
            Naija Pay 2-Min Quickstart Tutorial
          </span>
          <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-emerald-300 bg-black/60 px-1.5 py-0.5 rounded">
            2:14
          </span>
        </div>

        {/* Steps List */}
        <div className="space-y-3 mb-5">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#031d13] border border-emerald-500/30"
              >
                <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0 font-black text-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-emerald-200/70 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            closeModal();
            openModal('welcome_bonus');
          }}
          className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Got it! Claim Welcome Bonus</span>
        </button>
      </div>
    </div>
  );
};
