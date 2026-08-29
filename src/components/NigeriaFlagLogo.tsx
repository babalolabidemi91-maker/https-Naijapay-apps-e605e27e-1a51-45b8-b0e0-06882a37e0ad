import React from 'react';

interface NigeriaFlagLogoProps {
  className?: string;
  size?: number;
}

export const NigeriaFlagLogo: React.FC<NigeriaFlagLogoProps> = ({ 
  className = "w-7 h-7",
  size
}) => {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Soft shadow filter under the wave */}
        <filter id="flagShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="-2" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
        </filter>

        {/* Left Green Gradient (illuminated wave) */}
        <linearGradient id="greenLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#008a4b" />
          <stop offset="40%" stopColor="#009c55" />
          <stop offset="85%" stopColor="#00723c" />
          <stop offset="100%" stopColor="#005a30" />
        </linearGradient>

        {/* Middle White Gradient (wave shadow & highlight) */}
        <linearGradient id="whiteMiddleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="35%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </linearGradient>

        {/* Right Green Gradient (wave trough to peak) */}
        <linearGradient id="greenRightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00582f" />
          <stop offset="40%" stopColor="#00723c" />
          <stop offset="80%" stopColor="#008c4c" />
          <stop offset="100%" stopColor="#006b3a" />
        </linearGradient>

        {/* Shading overlay for 3D silk ripple effect */}
        <linearGradient id="waveShading" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="90%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>

        {/* Flag contour clip path */}
        <clipPath id="wavingFlagClip">
          <path d="M 12 28 Q 38 14, 64 24 T 108 26 L 108 78 Q 84 88, 64 78 T 12 80 Z" />
        </clipPath>
      </defs>

      <g filter="url(#flagShadow)">
        {/* Outer White Contour Border */}
        <path
          d="M 12 28 Q 38 14, 64 24 T 108 26 L 108 78 Q 84 88, 64 78 T 12 80 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Clipped Flag Content */}
        <g clipPath="url(#wavingFlagClip)">
          {/* Left Stripe: Green (x: 10 to 44) */}
          <rect x="10" y="10" width="34" height="74" fill="url(#greenLeftGrad)" />

          {/* Middle Stripe: White (x: 44 to 76) */}
          <rect x="44" y="10" width="32" height="74" fill="url(#whiteMiddleGrad)" />

          {/* Right Stripe: Green (x: 76 to 110) */}
          <rect x="76" y="10" width="34" height="74" fill="url(#greenRightGrad)" />

          {/* 3D Wave Shading Overlay */}
          <rect x="10" y="10" width="100" height="74" fill="url(#waveShading)" />
        </g>
      </g>
    </svg>
  );
};
