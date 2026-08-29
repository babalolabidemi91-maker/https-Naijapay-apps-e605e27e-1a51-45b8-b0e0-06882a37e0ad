import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User as UserIcon, 
  Smartphone, 
  Gift, 
  AlertCircle
} from 'lucide-react';
import { NigeriaFlagLogo } from './NigeriaFlagLogo';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, login, signup, quickDemoLogin } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');

  const [name, setName] = useState('Bidemi Babalola');
  const [email, setEmail] = useState('babalolabidemi91@gmail.com');
  const [phone, setPhone] = useState('08034567890');
  const [password, setPassword] = useState('password123');
  const [referralCode, setReferralCode] = useState('NP-8821');
  const [error, setError] = useState('');

  if (activeModal !== 'auth') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      signup({ name, email, phone, password, referralCode });
    } else {
      login(email, password);
    }
    closeModal();
  };

  const handleDemo = () => {
    quickDemoLogin();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Header Logo */}
        <div className="text-center mb-5">
          <div className="w-13 h-13 rounded-2xl bg-[#0c2d47] border border-[#164d77] p-1 mx-auto shadow-md mb-2 flex items-center justify-center">
            <NigeriaFlagLogo className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Naija<span className="text-[#00d293]"> Pay</span>
          </h2>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            {mode === 'signup' ? 'Create an account & claim ₦30,000.00 bonus' : 'Sign in to access your wallet & earnings'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#031d13] rounded-2xl border border-emerald-500/30 mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Welcome Bonus Notice for Sign Up */}
        {mode === 'signup' && (
          <div className="mb-4 p-3 rounded-2xl bg-white text-emerald-950 flex items-center gap-3 shadow-md">
            <Gift className="w-6 h-6 text-emerald-800 flex-shrink-0 animate-bounce stroke-[2.5]" />
            <div className="text-xs">
              <span className="font-black text-emerald-950 block">₦30,000.00 Welcome Gift</span>
              <span className="text-emerald-800 text-[11px] font-medium">Auto-activated upon account creation!</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                Full Legal Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Emeka Nwosu"
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-emerald-200 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                Phone Number (WhatsApp)
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08034567890"
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-emerald-200 mb-1">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] font-bold text-emerald-200 mb-1">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="NP-8821"
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2.5 text-xs text-white font-mono placeholder-emerald-400/40 focus:outline-none focus:border-white"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3 px-4 rounded-xl text-xs shadow-lg transition-all active:scale-95 cursor-pointer mt-2"
          >
            {mode === 'signup' ? 'Create Account & Claim ₦30,000' : 'Sign In to Wallet'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-emerald-500/30 text-center">
          <button
            type="button"
            onClick={handleDemo}
            className="text-xs text-emerald-200 hover:text-white font-bold underline cursor-pointer"
          >
            Quick 1-Click Demo Sign In (Emeka Nwosu)
          </button>
        </div>
      </div>
    </div>
  );
};
