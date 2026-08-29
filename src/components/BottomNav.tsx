import React from 'react';
import { Home, History, Wallet, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  const handleTabChange = (id: 'home' | 'history' | 'wallet' | 'profile') => {
    playClickSound();
    setActiveTab(id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#032115]/95 backdrop-blur-lg border-t-2 border-emerald-500/40 px-4 py-2 shadow-2xl">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`tab-${item.id}`}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-white font-black scale-105'
                  : 'text-emerald-300/70 hover:text-white'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/50' : ''}`}>
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.8]' : 'stroke-[1.8]'}`} />
                </div>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
