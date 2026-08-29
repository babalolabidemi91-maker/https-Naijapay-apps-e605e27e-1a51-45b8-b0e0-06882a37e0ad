import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Crown, 
  Share2, 
  Check, 
  Smartphone, 
  Mail, 
  ChevronRight, 
  Headphones, 
  MessageCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';

export const ProfileView: React.FC = () => {
  const { user, logout, updateUserPin, openModal } = useApp();
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      updateUserPin(newPin);
      setIsChangingPin(false);
      setPinSuccess(true);
      setNewPin('');
      setTimeout(() => setPinSuccess(false), 2500);
    }
  };

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'NP';

  return (
    <div className="space-y-4 pb-20 font-['Plus_Jakarta_Sans',sans-serif]">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          My Account
        </h1>
        <p className="text-xs text-emerald-200/80 mt-0.5">
          Account credentials, VIP tier status, and security settings.
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#063b27] via-[#04281a] to-[#02180f] border-2 border-emerald-500/40 p-5 shadow-xl flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-2xl bg-white text-emerald-950 p-0.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex-shrink-0 flex items-center justify-center font-black text-xl font-mono">
          {userInitials}
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#04281a] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white truncate">
              {user?.name || 'Emeka Nwosu'}
            </h2>
            <span className="text-[10px] font-bold text-emerald-950 bg-white px-2 py-0.5 rounded-full border border-white flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified
            </span>
          </div>

          <div className="text-xs text-emerald-200 mt-0.5 flex items-center gap-1.5 truncate font-medium">
            <Mail className="w-3 h-3 text-emerald-300" />
            <span>{user?.email || 'emeka.nwosu@gmail.com'}</span>
          </div>

          <div className="text-xs text-emerald-200 mt-0.5 flex items-center gap-1.5 font-mono">
            <Smartphone className="w-3 h-3 text-emerald-300" />
            <span>{user?.phone || '08034567890'}</span>
          </div>
        </div>
      </div>

      {/* VIP Tier Card */}
      <div className="rounded-3xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-white" />
            <div>
              <span className="text-xs font-bold text-white">
                {user?.vipTier || 'Tier 2 Bronze Member'}
              </span>
              <p className="text-[10px] text-emerald-200">Daily Payout Limit: ₦500,000.00</p>
            </div>
          </div>
          <button
            id="btn-profile-upgrade"
            onClick={() => {
              playClickSound();
              openModal('upgrade');
            }}
            className="text-[10px] font-black px-3 py-1 rounded-full bg-white text-emerald-950 shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
          >
            Upgrade Tier
          </button>
        </div>

        <div className="w-full bg-[#02180f] h-2 rounded-full overflow-hidden border border-emerald-500/20">
          <div className="w-3/5 h-full bg-gradient-to-r from-emerald-400 to-white rounded-full"></div>
        </div>
        <div className="flex justify-between items-center text-[10px] text-emerald-300">
          <span>Tier Progress (60%)</span>
          <button
            id="btn-view-upgrade-status"
            onClick={() => {
              playClickSound();
              openModal('upgrade_status');
            }}
            className="text-white hover:underline font-bold cursor-pointer"
          >
            View Upgrade Status →
          </button>
        </div>
      </div>

      {/* Security & PIN Settings */}
      <div className="rounded-3xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-white" />
            <h3 className="text-sm font-bold text-white">4-Digit Security PIN</h3>
          </div>
          <button
            onClick={() => setIsChangingPin(!isChangingPin)}
            className="text-xs text-white font-bold hover:underline cursor-pointer"
          >
            {isChangingPin ? 'Cancel' : 'Change PIN'}
          </button>
        </div>

        {pinSuccess && (
          <div className="p-2.5 bg-emerald-900/80 border border-emerald-400/50 rounded-xl text-xs text-white font-bold flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
            <span>PIN updated successfully!</span>
          </div>
        )}

        {isChangingPin ? (
          <form onSubmit={handleUpdatePin} className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] text-emerald-300 mb-1 font-semibold">
                Enter New 4-Digit PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="4 digits"
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs font-mono text-center tracking-widest text-white"
              />
            </div>
            <button
              type="submit"
              disabled={newPin.length !== 4}
              className="w-full bg-white hover:bg-emerald-50 disabled:opacity-50 text-emerald-950 font-black py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
            >
              Save New PIN
            </button>
          </form>
        ) : (
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Your 4-digit PIN secures all outgoing bank transfers. Default PIN is <span className="font-mono text-white font-black">1234</span>.
          </p>
        )}
      </div>

      {/* Other Quick Links */}
      <div className="space-y-2">
        <button
          onClick={() => openModal('invite')}
          className="w-full p-3.5 rounded-2xl bg-[#04281a]/95 hover:bg-[#073b26] border-2 border-emerald-500/30 flex items-center justify-between text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-sm">
              <Share2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Referral Program</div>
              <span className="text-[10px] text-emerald-300">Code: {user?.referralCode || 'NP-8821'}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-300" />
        </button>

        <a
          href="https://chat.whatsapp.com/HCSBFUakHeA8EznuojrF61?s=cl&p=a&ilr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full p-3.5 rounded-2xl bg-[#04281a]/95 hover:bg-[#073b26] border-2 border-emerald-500/40 flex items-center justify-between text-left transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-sm">
              <MessageCircle className="w-4 h-4 fill-emerald-900/20" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Official WhatsApp Community</span>
                <span className="text-[9px] bg-white text-emerald-950 px-1.5 py-0.2 rounded font-black">Join</span>
              </div>
              <span className="text-[10px] text-emerald-300">Connect with users & admins</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
        </a>

        <button
          onClick={() => openModal('support')}
          className="w-full p-3.5 rounded-2xl bg-[#04281a]/95 hover:bg-[#073b26] border-2 border-emerald-500/30 flex items-center justify-between text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-sm">
              <Headphones className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Help & Support Desk</div>
              <span className="text-[10px] text-emerald-300">24/7 Live Assistance</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

      {/* SIGN OUT BUTTON */}
      <div className="pt-3">
        <button
          id="btn-sign-out"
          type="button"
          onClick={() => {
            playClickSound();
            logout();
          }}
          className="w-full bg-[#1b0808] hover:bg-[#2e0e0e] border border-red-500/40 text-red-300 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98] shadow-md cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Naija Pay</span>
        </button>
      </div>
    </div>
  );
};
