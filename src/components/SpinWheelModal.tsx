import React, { useState } from 'react';
import { X, Gamepad2, Sparkles, Trophy, Frown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';
import { playSpinTick } from '../utils/audio';

const SLICES = [
  { label: '₦300', value: 300, color: '#047857', textColor: '#ffffff' },
  { label: '₦500', value: 500, color: '#065f46', textColor: '#ffffff' },
  { label: '₦1000', value: 1000, color: '#059669', textColor: '#ffffff' },
  { label: '₦100', value: 100, color: '#0f766e', textColor: '#ffffff' },
  { label: '₦00', value: 0, color: '#16382b', textColor: '#6ee7b7' },
  { label: '₦200', value: 200, color: '#10b981', textColor: '#ffffff' },
  { label: '₦400', value: 400, color: '#046c4e', textColor: '#ffffff' },
];

export const SpinWheelModal: React.FC = () => {
  const { activeModal, closeModal, spinWinReward } = useApp();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<{ label: string; value: number } | null>(null);

  if (activeModal !== 'spin') return null;

  const numSlices = SLICES.length;
  const sliceAngle = 360 / numSlices;

  const getCoordinatesForAngle = (angleInDegrees: number, radius = 98) => {
    const rad = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad),
    };
  };

  const createSlicePath = (startAngle: number, endAngle: number) => {
    const p1 = getCoordinatesForAngle(startAngle);
    const p2 = getCoordinatesForAngle(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return `M 100 100 L ${p1.x} ${p1.y} A 98 98 0 ${largeArcFlag} 1 ${p2.x} ${p2.y} Z`;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Play ticking sound
    const soundInterval = setInterval(playSpinTick, 140);

    const chosenIdx = Math.floor(Math.random() * SLICES.length);
    const chosenSlice = SLICES[chosenIdx];

    // Mid angle of chosen slice relative to 12 o'clock (0 deg)
    const midAngle = (chosenIdx + 0.5) * sliceAngle;

    // Calculate rotation to place chosen slice exactly at 12 o'clock (top pointer)
    const currentMod = rotation % 360;
    const targetMod = (360 - midAngle) % 360;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;

    // Add 5 full rotations (1800 deg)
    const totalSpinDelta = 360 * 5 + delta;
    const newRotation = rotation + totalSpinDelta;

    setRotation(newRotation);

    setTimeout(() => {
      clearInterval(soundInterval);
      setIsSpinning(false);
      setWonPrize(chosenSlice);
      if (chosenSlice.value > 0) {
        spinWinReward(chosenSlice.value);
      }
    }, 3600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 text-center shadow-2xl text-slate-100">
        <button
          id="close-spin-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-md">
            <Gamepad2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Lucky Cash Spin
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-3">
          Spin the wheel to win instant cash credits to your wallet!
        </p>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto my-2 flex items-center justify-center">
          {/* Top Pointer Indicator */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[20px] border-t-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]"></div>
          </div>

          {/* Rotating SVG Wheel */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3.6s cubic-bezier(0.12, 0.85, 0.25, 1)' : 'none',
            }}
            className="w-full h-full rounded-full border-4 border-white/90 shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="wheelCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                </radialGradient>
              </defs>

              {/* Slices */}
              {SLICES.map((slice, index) => {
                const startAngle = index * sliceAngle;
                const endAngle = (index + 1) * sliceAngle;
                const midAngle = (startAngle + endAngle) / 2;

                return (
                  <g key={index}>
                    {/* Wedge Path */}
                    <path
                      d={createSlicePath(startAngle, endAngle)}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    />

                    {/* Radial Text */}
                    <text
                      x="100"
                      y="36"
                      transform={`rotate(${midAngle} 100 100)`}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={slice.textColor}
                      fontSize="11.5"
                      fontWeight="900"
                      fontFamily="JetBrains Mono, monospace"
                      style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))' }}
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}

              {/* Wheel Inner Overlay for 3D Depth */}
              <circle cx="100" cy="100" r="98" fill="url(#wheelCenterGlow)" />
            </svg>
          </div>

          {/* Center Hub / Cap */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white text-emerald-950 border-3 border-emerald-400 flex flex-col items-center justify-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none">
            <Sparkles className="w-5 h-5 text-emerald-900" />
            <span className="text-[8px] font-black tracking-wider uppercase text-emerald-950 -mt-0.5">SPIN</span>
          </div>
        </div>

        {/* Win/Loss Alert Box */}
        {wonPrize !== null && (
          <div
            className={`my-3 p-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all animate-bounce ${
              wonPrize.value > 0
                ? 'bg-white text-emerald-950 shadow-emerald-500/20'
                : 'bg-[#16382b] text-emerald-200 border border-emerald-500/40'
            }`}
          >
            {wonPrize.value > 0 ? (
              <>
                <Trophy className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>You won {wonPrize.label}! Credited to wallet!</span>
              </>
            ) : (
              <>
                <Frown className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>You got ₦00. Better luck on your next spin!</span>
              </>
            )}
          </div>
        )}

        <button
          id="btn-spin-wheel"
          disabled={isSpinning}
          onClick={handleSpin}
          className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm tracking-wide shadow-lg transition-all ${
            isSpinning
              ? 'bg-emerald-900/60 text-emerald-300 cursor-not-allowed'
              : 'bg-white hover:bg-emerald-50 text-emerald-950 shadow-black/40 active:scale-95 cursor-pointer mt-1'
          }`}
        >
          {isSpinning ? 'Spinning...' : 'SPIN WHEEL NOW'}
        </button>
      </div>
    </div>
  );
};

