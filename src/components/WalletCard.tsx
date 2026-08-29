import React from 'react';
import { PlusCircle, ArrowDownToLine, Eye, EyeOff, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';

export const WalletCard: React.FC = () => {
  const { balance, showBalance, toggleShowBalance, openModal, hasClaimedWelcomeBonus } = useApp();

  return (
    <div 
      id="wallet-balance-card"
      className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06422a] via-[#042d1d] to-[#021d12] border-2 border-emerald-500/40 p-5 sm:p-6 shadow-[0_10px_35px_rgba(4,45,29,0.5)]"
    >
      {/* Background Watermark Crest */}
      <div className="absolute -right-6 -bottom-6 w-44 h-44 opacity-15 pointer-events-none text-white">
        <Shield className="w-full h-full stroke-[1.2]" />
        <span className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white font-mono">
          NP
        </span>
      </div>

      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1.5 bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-80 blur-[1px]"></div>

      {/* Card Header */}
      <div className="flex items-center justify-between relative z-10 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-emerald-200 uppercase tracking-widest">
            WALLET BALANCE
          </span>
          <button
            onClick={toggleShowBalance}
            aria-label={showBalance ? 'Hide balance' : 'Show balance'}
            className="text-emerald-300 hover:text-white transition-colors"
          >
            {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Welcome Bonus pill if not claimed */}
        {!hasClaimedWelcomeBonus && (
          <button
            id="quick-bonus-tag"
            onClick={() => openModal('welcome_bonus')}
            className="flex items-center gap-1 bg-white/15 border border-white/40 text-white text-[11px] font-bold px-2.5 py-1 rounded-full animate-pulse hover:bg-white hover:text-emerald-950 transition-all shadow-md"
          >
            <Sparkles className="w-3 h-3 text-emerald-300" />
            <span>+₦30k Bonus Waiting</span>
          </button>
        )}
      </div>

      {/* Big Balance Display */}
      <div className="relative z-10 my-2">
        <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1 font-['Plus_Jakarta_Sans'] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
          {showBalance ? (
            formatNaira(balance)
          ) : (
            <span className="tracking-widest text-emerald-200">₦ ••••••••</span>
          )}
        </div>
        <p className="text-xs text-emerald-200/90 mt-1 flex items-center gap-1.5 font-semibold">
          <span>Available Balance</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </p>
      </div>

      {/* Action Buttons: Add Funds & Withdraw */}
      <div className="grid grid-cols-2 gap-3 mt-5 relative z-10">
        <button
          id="btn-add-funds"
          onClick={() => openModal('add_funds')}
          className="w-full bg-white hover:bg-emerald-50 active:scale-[0.98] text-emerald-950 font-black py-3 px-4 rounded-2xl shadow-lg shadow-black/30 flex items-center justify-center gap-2 text-sm transition-all duration-150 group cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-700 group-hover:rotate-90 transition-transform duration-200" />
          <span>Add Funds</span>
        </button>

        <button
          id="btn-withdraw"
          onClick={() => openModal('withdraw')}
          className="w-full bg-[#032417]/90 hover:bg-[#073824] active:scale-[0.98] border-2 border-emerald-400/50 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all duration-150 group hover:border-white shadow-lg cursor-pointer"
        >
          <ArrowDownToLine className="w-4 h-4 text-emerald-300 group-hover:translate-y-0.5 transition-transform duration-200" />
          <span>Withdraw</span>
        </button>
      </div>
    </div>
  );
};
