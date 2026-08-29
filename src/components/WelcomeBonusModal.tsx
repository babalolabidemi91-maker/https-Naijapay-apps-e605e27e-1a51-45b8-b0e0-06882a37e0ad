import React from 'react';
import { Gift, X, Sparkles, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WelcomeBonusModal: React.FC = () => {
  const { activeModal, closeModal, claimWelcomeBonus, hasClaimedWelcomeBonus } = useApp();

  if (activeModal !== 'welcome_bonus') return null;

  const handleClaim = () => {
    claimWelcomeBonus();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Glow backdrop */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          id="close-bonus-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gift Icon Badge */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-white p-0.5 shadow-[0_0_25px_rgba(16,185,129,0.6)] mb-4">
          <div className="w-full h-full bg-[#032316] rounded-[22px] flex items-center justify-center">
            <Gift className="w-10 h-10 text-emerald-300 animate-bounce" />
          </div>
        </div>

        {/* Title & Tag */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1 rounded-full text-emerald-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>OFFICIAL REGISTRATION BONUS</span>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          Claim Your Welcome Bonus
        </h2>

        {/* Bonus Amount Callout */}
        <div className="my-5 p-4 rounded-2xl bg-[#04281a] border border-emerald-500/40 shadow-inner">
          <span className="text-xs text-emerald-200/90 font-semibold">Instant Wallet Credit</span>
          <div className="text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans'] my-1 drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]">
            ₦30,000.00
          </div>
          <span className="text-[11px] text-emerald-300 flex items-center justify-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-white" /> 100% Guaranteed & Withdrawable
          </span>
        </div>

        {/* Benefits list */}
        <div className="space-y-2 text-left text-xs text-emerald-100 mb-6 bg-[#031d13] p-3.5 rounded-xl border border-emerald-900/60">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Credited directly into your main available balance</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Eligible for instant Nigerian bank withdrawals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Unlocks daily ₦3,000 NaijaCore continuous yield</span>
          </div>
        </div>

        {/* CTA Button */}
        {!hasClaimedWelcomeBonus ? (
          <button
            id="btn-confirm-welcome-bonus"
            onClick={handleClaim}
            className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 text-base transition-all active:scale-95 cursor-pointer"
          >
            <span>Claim ₦30,000.00 Now</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        ) : (
          <div className="p-3 bg-emerald-900/80 border border-emerald-400/50 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>You have already claimed this bonus!</span>
          </div>
        )}
      </div>
    </div>
  );
};
