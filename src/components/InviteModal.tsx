import React, { useState } from 'react';
import { X, UserPlus2, Copy, Check, Users, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';

export const InviteModal: React.FC = () => {
  const { activeModal, closeModal, user } = useApp();
  const [copied, setCopied] = useState(false);

  if (activeModal !== 'invite') return null;

  const referralCode = user?.referralCode || 'NP-8821';
  const referralLink = `https://naijapay.ng/join?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! Join Naija Pay today and claim your ₦30,000.00 Welcome Bonus instantly! Withdraw directly to your bank account: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          id="close-invite-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-950 flex items-center justify-center shadow-md">
            <UserPlus2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Invite & Earn ₦5,000
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-4">
          Earn ₦5,000 cash for every friend that signs up and claims their welcome bonus.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 bg-[#031d13] border border-emerald-500/30 rounded-2xl">
            <div className="text-[10px] text-emerald-300 uppercase font-bold">Total Invited</div>
            <div className="text-xl font-black text-white mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-300" />
              <span>4 Friends</span>
            </div>
          </div>

          <div className="p-3 bg-[#031d13] border border-emerald-500/30 rounded-2xl">
            <div className="text-[10px] text-emerald-300 uppercase font-bold">Referral Earnings</div>
            <div className="text-xl font-black text-white mt-0.5 font-mono">
              {formatNaira(20000)}
            </div>
          </div>
        </div>

        {/* Referral Link Copy */}
        <div className="bg-[#031d13] p-4 rounded-2xl border border-emerald-500/30 space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-300 font-semibold">Your Referral Code:</span>
            <span className="font-mono font-black text-emerald-950 bg-white px-2 py-0.5 rounded-md shadow-sm">
              {referralCode}
            </span>
          </div>

          <div className="bg-[#04281a] p-2.5 rounded-xl border border-emerald-500/40 flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-white truncate">{referralLink}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0 transition-all cursor-pointer shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4 stroke-[2.5]" />
            <span>Share directly on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
