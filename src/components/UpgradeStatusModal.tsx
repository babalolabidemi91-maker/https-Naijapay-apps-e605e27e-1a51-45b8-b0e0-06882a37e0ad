import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';

export const UpgradeStatusModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== 'upgrade_status') return null;

  const handleBackOrDismiss = () => {
    playClickSound();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#02180f] text-white font-['Plus_Jakarta_Sans',sans-serif] animate-in fade-in duration-200">
      {/* Top Navigation Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-emerald-500/30 bg-[#032115]">
        <button
          id="btn-upgrade-status-back"
          onClick={handleBackOrDismiss}
          aria-label="Back"
          className="w-10 h-10 rounded-xl bg-[#073623] hover:bg-[#0c4a31] border border-emerald-500/40 text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-lg font-black text-white tracking-tight">
          Upgrade Status
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 max-w-md w-full mx-auto">
        {/* Main Status Card */}
        <div className="w-full rounded-3xl bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-400/50 p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col items-center text-center space-y-5">
          {/* Green Check Circle Badge */}
          <div className="w-20 h-20 rounded-full bg-[#0a382b] border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            <div className="w-14 h-14 rounded-full bg-emerald-500/30 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-300 stroke-[3.5]" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>Payment Submitted</span>
              <span className="text-xl">✅</span>
            </h2>

            {/* Subheading with yellow highlight */}
            <p className="text-sm text-emerald-100 leading-snug">
              Your payment is now{' '}
              <span className="text-amber-300 font-extrabold">
                pending admin approval
              </span>
              .
            </p>
          </div>

          {/* Detailed description */}
          <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-xs">
            An admin will review your receipt shortly. You&apos;ll be notified once your premium upgrade is activated.
          </p>

          {/* Got It Button */}
          <div className="w-full pt-2">
            <button
              id="btn-upgrade-status-got-it"
              onClick={handleBackOrDismiss}
              className="w-full bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-950 font-black py-3.5 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-black/30 active:scale-[0.98] cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
