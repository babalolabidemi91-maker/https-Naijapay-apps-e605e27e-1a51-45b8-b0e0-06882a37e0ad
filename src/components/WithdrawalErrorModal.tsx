import React from 'react';
import { ArrowLeft, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';

export const WithdrawalErrorModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useApp();

  if (activeModal !== 'withdrawal_error') return null;

  const handleGoBack = () => {
    playClickSound();
    closeModal();
  };

  const handleUpgradeAccount = () => {
    playClickSound();
    openModal('upgrade');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#02180f] text-white font-['Plus_Jakarta_Sans',sans-serif] animate-in fade-in duration-200">
      {/* Top Navigation Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-emerald-500/30 bg-[#032115]">
        <button
          id="btn-withdrawal-error-back"
          onClick={handleGoBack}
          aria-label="Back"
          className="w-10 h-10 rounded-xl bg-[#073623] hover:bg-[#0c4a31] border border-emerald-500/40 text-white flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h1 className="text-lg font-black text-white tracking-tight">
          Withdrawal Error
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 max-w-md w-full mx-auto">
        {/* Main Status Card */}
        <div className="w-full rounded-3xl bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-400/50 p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col items-center text-center space-y-6">
          {/* Crown Circle Badge */}
          <div className="w-24 h-24 rounded-full bg-[#0a382b] border-2 border-emerald-400/60 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Crown className="w-11 h-11 text-emerald-300 stroke-[2.4]" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-tight">
              Sorry, Your Account Is Not Upgraded
            </h2>

            {/* Subtext */}
            <p className="text-sm text-emerald-200/90 leading-relaxed max-w-xs mx-auto">
              Upgrade your account to enjoy seamless transactions.
            </p>
          </div>

          {/* Two Action Buttons Side-by-Side */}
          <div className="grid grid-cols-2 gap-3 w-full pt-3">
            <button
              id="btn-withdrawal-error-go-back"
              onClick={handleGoBack}
              className="w-full bg-[#073623] hover:bg-[#0c4a31] active:bg-[#05281a] border border-emerald-500/40 text-white font-bold py-3.5 px-4 rounded-2xl text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Go Back
            </button>

            <button
              id="btn-withdrawal-error-upgrade"
              onClick={handleUpgradeAccount}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-lg shadow-black/30 active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              Upgrade Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
