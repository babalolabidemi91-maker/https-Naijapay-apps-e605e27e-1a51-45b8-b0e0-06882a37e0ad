import React from 'react';
import { useApp } from '../context/AppContext';
import { History, Shield, User, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, openModal, setActiveTab } = useApp();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'NP';

  return (
    <header className="sticky top-0 z-40 bg-[#032115]/95 backdrop-blur-md border-b border-emerald-500/30 px-4 py-3 shadow-md">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-300 to-white p-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#021f14] rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white fill-emerald-500/30" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
                Naija<span className="text-emerald-300">Pay</span>
              </span>
            </div>
            <span className="text-[10px] text-emerald-300 font-bold tracking-wider -mt-1 uppercase">
              Instant Bank Payout
            </span>
          </div>
        </div>

        {/* Action icons on right */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            id="nav-search-btn"
            onClick={() => openModal('search')}
            aria-label="Search"
            className="w-9 h-9 rounded-full bg-[#073623] border border-emerald-500/40 flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* History Icon */}
          <button
            id="nav-history-btn"
            onClick={() => setActiveTab('history')}
            aria-label="Transaction History"
            className="w-9 h-9 rounded-full bg-[#073623] border border-emerald-500/40 flex items-center justify-center text-white hover:bg-white hover:text-emerald-950 transition-all cursor-pointer"
          >
            <History className="w-4 h-4" />
          </button>

          {/* User Profile Avatar / Initial Badge */}
          <button
            id="nav-profile-btn"
            onClick={() => {
              if (user) {
                setActiveTab('profile');
              } else {
                openModal('auth');
              }
            }}
            aria-label="User Profile"
            className="relative w-9 h-9 rounded-full bg-white text-emerald-950 border-2 border-emerald-400 flex items-center justify-center font-black text-xs hover:scale-105 transition-all shadow-[0_0_12px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            {user ? userInitials : <User className="w-4 h-4 text-emerald-950" />}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#032115]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
