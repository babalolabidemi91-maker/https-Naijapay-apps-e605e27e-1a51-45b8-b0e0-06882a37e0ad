import React from 'react';
import { Zap, ChevronRight, Check, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NaijaCoreCard: React.FC = () => {
  const { canClaimDaily, claimDailyReward, dailyCountdown } = useApp();

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="core-earnings-card"
      className="w-full rounded-3xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-4 sm:p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      {/* Ambient background glow */}
      <div className="absolute -left-10 -top-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-3.5">
        {/* Lightning Icon badge */}
        <div className="w-13 h-13 rounded-2xl bg-[#073b26] border border-emerald-400/50 flex items-center justify-center flex-shrink-0 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
          <Zap className="w-7 h-7 fill-emerald-300/30 text-emerald-300 animate-pulse" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-base tracking-tight">
              NaijaCore
            </span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-950 bg-emerald-300 border border-white/50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-950 animate-ping"></span>
              Active
            </span>
          </div>

          <div className="text-2xl font-black text-white tracking-tight mt-0.5 font-['Plus_Jakarta_Sans']">
            ₦3,000.00
          </div>

          <p className="text-[11px] text-emerald-200/90 font-medium">
            Tap to claim ₦3,000 NaijaCore daily earnings
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0 sm:ml-auto">
        {canClaimDaily ? (
          <button
            id="btn-claim-daily"
            onClick={claimDailyReward}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 active:scale-95 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5 text-sm transition-all duration-150 group cursor-pointer"
          >
            <span>Claim Now</span>
            <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform stroke-[3]" />
          </button>
        ) : (
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-[#021d12] border border-emerald-700/60 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
              <span>Next in {formatCountdown(dailyCountdown)}</span>
            </div>
            <span className="text-[10px] text-white bg-emerald-600 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
              <Check className="w-3 h-3 stroke-[3]" /> Claimed
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
