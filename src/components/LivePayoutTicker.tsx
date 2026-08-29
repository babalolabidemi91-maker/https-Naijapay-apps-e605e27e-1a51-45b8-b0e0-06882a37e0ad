import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { INITIAL_PAYOUT_EVENTS, formatNaira } from '../data/mockData';
import { PayoutEvent } from '../types';

export const LivePayoutTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events] = useState<PayoutEvent[]>(INITIAL_PAYOUT_EVENTS);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
        setIsFading(false);
      }, 300);
    }, 4500);

    return () => clearInterval(interval);
  }, [events.length]);

  const currentEvent = events[currentIndex] || events[0];

  return (
    <div className="w-full">
      <div 
        id="live-payout-banner"
        className="w-full bg-[#04281a]/95 border-2 border-emerald-500/40 rounded-2xl p-3 shadow-md flex items-center justify-between transition-all duration-300"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Checkmark icon with emerald & white glow */}
          <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>

          {/* Text details */}
          <div className={`flex flex-col min-w-0 transition-opacity duration-300 ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-sm tracking-wide">
                Withdrawal Successful
              </span>
            </div>
            <p className="text-xs text-emerald-100 truncate">
              <span className="text-white font-bold">{currentEvent.name}</span>{' '}
              <span className="text-emerald-200">withdrew</span>{' '}
              <span className="text-white font-black">{formatNaira(currentEvent.amount).replace('.00', '')}</span>
              <span className="text-emerald-300 text-[10px] ml-1.5 hidden sm:inline">via {currentEvent.bank}</span>
            </p>
          </div>
        </div>

        {/* Live indicator dot */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pl-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
      </div>
    </div>
  );
};
