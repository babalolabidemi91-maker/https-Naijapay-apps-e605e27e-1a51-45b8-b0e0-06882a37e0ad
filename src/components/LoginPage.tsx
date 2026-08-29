import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, Gift } from 'lucide-react';
import { NigeriaFlagLogo } from './NigeriaFlagLogo';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { login, signup, quickDemoLogin } = useApp();
  
  const [view, setView] = useState<'login' | 'signup' | 'forgot_password'>('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupReferral, setSignupReferral] = useState('NP-8821');

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [error, setError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!loginEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your password.');
      return;
    }

    login(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signupName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!signupEmail.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone || '08034567890',
      password: signupPassword,
      referralCode: signupReferral,
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setError('Please enter your email address to receive reset link.');
      return;
    }
    setError('');
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen bg-[#051322] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0c2a47] via-[#06182a] to-[#040f1a] text-slate-100 flex flex-col justify-center items-center px-4 py-8 sm:px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Brand Logo Header */}
      <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-2xl bg-[#0c2d47] border border-[#164d77] flex items-center justify-center shadow-lg shadow-[#00d293]/10 p-1">
          <NigeriaFlagLogo className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Naija Pay
        </h1>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-[#071d2f]/90 border border-[#143f63] rounded-[30px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.65)] backdrop-blur-xl animate-in zoom-in-95 duration-200">
        {/* Error Alert Box */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. LOGIN VIEW (Matches screenshot layout with Naija Pay branding) */}
        {view === 'login' && (
          <div>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-white text-center tracking-tight mb-1.5">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm text-center mb-6">
              Sign in to your Naija Pay account
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  EMAIL
                </label>
                <input
                  id="login-email-input"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl pl-4 pr-11 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setView('forgot_password');
                  }}
                  className="text-xs font-bold text-[#00d293] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="w-full bg-[#00d293] hover:bg-[#00bf85] text-[#031d16] font-extrabold py-3.5 px-4 rounded-xl text-base shadow-[0_4px_22px_rgba(0,210,147,0.35)] transition-all active:scale-[0.98] cursor-pointer mt-2"
              >
                Login
              </button>
            </form>

            <div className="text-center text-sm text-slate-400 mt-6">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setView('signup');
                }}
                className="font-bold text-[#00d293] hover:underline cursor-pointer ml-1"
              >
                Create Account
              </button>
            </div>

            {/* Instant Demo Login Button */}
            <div className="mt-6 pt-5 border-t border-[#133b5c]/70 text-center">
              <button
                type="button"
                onClick={quickDemoLogin}
                className="text-xs text-slate-400 hover:text-white font-bold inline-flex items-center gap-2 transition-colors cursor-pointer bg-[#0c2d47] px-3.5 py-2 rounded-xl border border-[#194c73]"
              >
                <NigeriaFlagLogo className="w-4 h-4" />
                <span>Instant 1-Click Demo Login (Bidemi)</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. SIGN UP VIEW */}
        {view === 'signup' && (
          <div>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-white text-center tracking-tight mb-1.5">
              Create Account
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm text-center mb-4">
              Join Naija Pay to claim your ₦30,000 welcome bonus
            </p>

            <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-[#0d3b2c] to-[#082a20] border border-[#00d293]/40 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#00d293] text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                <Gift className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-white block">₦30,000.00 Registration Gift</span>
                <span className="text-[#00d293] text-[11px] font-medium">Credited to wallet upon sign up</span>
              </div>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  FULL LEGAL NAME
                </label>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Bidemi Babalola"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  PHONE NUMBER (WHATSAPP)
                </label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="08034567890"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  SECURITY PASSWORD
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  REFERRAL CODE (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={signupReferral}
                  onChange={(e) => setSignupReferral(e.target.value)}
                  placeholder="NP-8821"
                  className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-slate-500 outline-none transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00d293] hover:bg-[#00bf85] text-[#031d16] font-extrabold py-3.5 px-4 rounded-xl text-base shadow-[0_4px_22px_rgba(0,210,147,0.35)] transition-all active:scale-[0.98] cursor-pointer mt-3"
              >
                Create Account & Claim ₦30,000
              </button>
            </form>

            <div className="text-center text-sm text-slate-400 mt-5">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setView('login');
                }}
                className="font-bold text-[#00d293] hover:underline cursor-pointer ml-1"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* 3. FORGOT PASSWORD VIEW */}
        {view === 'forgot_password' && (
          <div>
            <button
              type="button"
              onClick={() => {
                setError('');
                setView('login');
              }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </button>

            <h2 className="text-2xl font-extrabold text-white text-center tracking-tight mb-1.5">
              Reset Password
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm text-center mb-6">
              Enter your email to receive a password reset recovery link
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-[#0d3b2c] border border-[#00d293]/50 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#00d293] mx-auto" />
                <h4 className="text-white font-extrabold text-sm">Reset Link Sent</h4>
                <p className="text-xs text-slate-300">
                  We have sent instructions to <strong className="text-white">{forgotEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false);
                    setView('login');
                  }}
                  className="w-full bg-[#00d293] text-slate-950 font-bold py-2.5 rounded-xl text-xs mt-2 cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    YOUR REGISTERED EMAIL
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#0b243b] border border-[#1b486c] focus:border-[#00d293] focus:ring-1 focus:ring-[#00d293] rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00d293] hover:bg-[#00bf85] text-[#031d16] font-extrabold py-3.5 px-4 rounded-xl text-base shadow-[0_4px_22px_rgba(0,210,147,0.35)] transition-all active:scale-[0.98] cursor-pointer mt-2"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Trust & Security Footer */}
      <div className="mt-8 text-center text-xs text-slate-500 max-w-sm">
        Protected with 256-bit SSL encryption. All transactions are securely processed.
      </div>
    </div>
  );
};
