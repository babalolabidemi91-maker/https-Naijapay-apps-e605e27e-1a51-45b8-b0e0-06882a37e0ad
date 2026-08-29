import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  UploadCloud, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';
import { playCashSound, playClickSound } from '../utils/audio';

const UPGRADE_TIERS = [
  {
    id: 'tier3',
    name: 'VIP Tier 3',
    price: 8500,
    dailyLimit: '₦50,500.00 / day',
    multiplier: 'Get ₦50,500.00 Daily Earnings',
    badge: 'Popular',
    color: 'from-[#063321] to-[#04281a] border-emerald-500/50',
    iconColor: 'text-emerald-300',
  },
  {
    id: 'tier4',
    name: 'VIP Tier 4 Gold',
    price: 15650,
    dailyLimit: '₦127,000.00 / day',
    multiplier: 'Get ₦127,000.00 Daily Earnings',
    badge: 'Best Value',
    color: 'from-[#08422b] to-[#052d1d] border-emerald-400/60',
    iconColor: 'text-white',
  },
  {
    id: 'diamond',
    name: 'VIP Diamond Pro',
    price: 30865,
    dailyLimit: '₦170,864.00 / day',
    multiplier: 'Get ₦170,864.00 Daily Earnings',
    badge: 'Exclusive',
    color: 'from-[#094f34] to-[#063825] border-white/40',
    iconColor: 'text-white',
  },
];

export const UpgradeModal: React.FC = () => {
  const { activeModal, closeModal, openModal, user } = useApp();
  const [selectedTier, setSelectedTier] = useState(UPGRADE_TIERS[0]);
  const [step, setStep] = useState<'select' | 'payment'>('select');
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState(user?.name || '');
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (activeModal !== 'upgrade') return null;

  const virtualAccount = {
    bank: 'Kuda Bank (Kuda Microfinance Bank)',
    accountNumber: '2071913801',
    accountName: 'Bidemi Thankgod Babalola',
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(virtualAccount.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playCashSound();

    setTimeout(() => {
      setIsSubmitting(false);
      // Immediately open the exact Upgrade Status screen from screenshot
      openModal('upgrade_status');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Close Button */}
        <button
          id="close-upgrade-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'select' ? (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white text-emerald-900 flex items-center justify-center shadow-md">
                <Crown className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Upgrade Account Tier
                </h2>
                <p className="text-xs text-emerald-200/80">
                  Unlock higher daily limits and priority bank settlements.
                </p>
              </div>
            </div>

            {/* Current Status Pill */}
            <div className="p-3 bg-[#031d13] border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-emerald-300">Current Tier:</span>
                <span className="font-extrabold text-white">{user?.vipTier || 'Tier 2 Bronze'}</span>
              </div>
              <span className="text-[11px] text-emerald-200/80">Limit: ₦500k/day</span>
            </div>

            {/* Tier Selection */}
            <div className="space-y-2.5">
              {UPGRADE_TIERS.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-3.5 rounded-2xl border-2 bg-gradient-to-r ${tier.color} cursor-pointer transition-all ${
                      isSelected
                        ? 'border-white ring-2 ring-white/50 scale-[1.01] shadow-lg'
                        : 'opacity-85 hover:opacity-100 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crown className={`w-4 h-4 ${tier.iconColor}`} />
                        <span className="text-sm font-bold text-white">{tier.name}</span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white text-emerald-950 shadow-sm">
                        {tier.badge}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between mt-2">
                      <div className="text-lg font-black font-mono text-white">
                        {formatNaira(tier.price)}
                      </div>
                      <div className="text-right text-[11px] text-emerald-300 font-bold">
                        {tier.dailyLimit}
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-100 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-300 flex-shrink-0" />
                      <span>{tier.multiplier}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue to Payment Button */}
            <button
              id="btn-proceed-to-payment"
              onClick={() => {
                playClickSound();
                setStep('payment');
              }}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/30 cursor-pointer"
            >
              <span>Proceed to Upgrade ({formatNaira(selectedTier.price)})</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitProof} className="space-y-4">
            {/* Header */}
            <div>
              <button
                type="button"
                onClick={() => setStep('select')}
                className="text-xs text-emerald-300 hover:text-white mb-1 flex items-center gap-1 font-bold cursor-pointer"
              >
                ← Back to Packages
              </button>
              <h2 className="text-xl font-black text-white tracking-tight">
                Submit Upgrade Payment
              </h2>
              <p className="text-xs text-emerald-200/80">
                Transfer exact amount to the official upgrade clearing account.
              </p>
            </div>

            {/* Selected Package Banner */}
            <div className="p-3 bg-[#031f14] border border-emerald-500/40 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-emerald-300 font-bold block">Selected Plan</span>
                <span className="text-xs font-bold text-white">{selectedTier.name}</span>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-white font-mono">
                  {formatNaira(selectedTier.price)}
                </span>
              </div>
            </div>

            {/* Bank Transfer Details */}
            <div className="bg-[#031d13] border border-emerald-500/40 rounded-2xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-200 uppercase font-semibold">Designated Payout Account</span>
                <span className="text-xs font-black text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded border border-white/30">
                  Instant Verification
                </span>
              </div>

              <div>
                <div className="text-[11px] text-emerald-300">Bank Name</div>
                <div className="text-xs font-bold text-white">{virtualAccount.bank}</div>
              </div>

              <div className="bg-[#04281a] p-3 rounded-xl border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-300">Account Number</div>
                  <div className="text-base font-mono font-extrabold text-white">
                    {virtualAccount.accountNumber}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="bg-white hover:bg-emerald-100 text-emerald-950 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <div className="text-[11px] text-emerald-300">Account Name</div>
                <div className="text-xs font-bold text-white font-mono">{virtualAccount.accountName}</div>
              </div>
            </div>

            {/* Sender Name / Receipt Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Sender Account Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value.toUpperCase())}
                  placeholder="e.g. EMEKA NWOSU"
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Upload Proof / Receipt button */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Payment Receipt / Transfer Proof
                </label>
                <div 
                  onClick={() => setReceiptUploaded(!receiptUploaded)}
                  className={`p-3 rounded-2xl border-2 border-dashed cursor-pointer text-center transition-all ${
                    receiptUploaded
                      ? 'border-white bg-emerald-900/40 text-white'
                      : 'border-emerald-700/60 hover:border-emerald-400 bg-[#031d13] text-emerald-300'
                  }`}
                >
                  {receiptUploaded ? (
                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-white">
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Receipt Screenshot Attached (transfer_receipt.jpg)</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <UploadCloud className="w-5 h-5 mx-auto text-emerald-300" />
                      <div className="text-xs font-medium">Click to Attach Receipt or Slip (Optional)</div>
                      <span className="text-[10px] text-emerald-400/70">JPG, PNG, PDF up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Proof Button -> Leads to exact Upgrade Status screenshot */}
            <button
              id="btn-submit-upgrade-payment"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/30 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>I Have Sent Payment — Submit Proof</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
