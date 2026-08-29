import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Copy, 
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_BANKS, formatNaira } from '../data/mockData';
import { Transaction } from '../types';

export const WithdrawModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal,
    balance, 
    savedBank, 
    user 
  } = useApp();

  const [step, setStep] = useState<'form' | 'processing' | 'receipt'>('form');
  const [selectedBank, setSelectedBank] = useState<string>(savedBank?.bankName || 'OPay Digital Services');
  const [accountNumber, setAccountNumber] = useState<string>(savedBank?.accountNumber || '8034567890');
  const [accountName, setAccountName] = useState<string>(savedBank?.accountName || user?.name?.toUpperCase() || 'EMEKA NWOSU');
  const [isResolvingAccount, setIsResolvingAccount] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('50000');
  const [pin, setPin] = useState<string>('1234');
  const [error, setError] = useState<string>('');
  const [completedTx] = useState<Transaction | null>(null);

  useEffect(() => {
    if (activeModal === 'withdraw') {
      setStep('form');
      setError('');
      if (savedBank) {
        setSelectedBank(savedBank.bankName);
        setAccountNumber(savedBank.accountNumber);
        setAccountName(savedBank.accountName);
      }
    }
  }, [activeModal, savedBank]);

  if (activeModal !== 'withdraw') return null;

  // Handle Account Number change & simulate Nigerian NIBSS name resolution
  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(val);
    if (val.length === 10) {
      setIsResolvingAccount(true);
      setTimeout(() => {
        setIsResolvingAccount(false);
        setAccountName(user?.name ? user.name.toUpperCase() : 'VERIFIED RECIPIENT');
      }, 600);
    }
  };

  const handlePresetAmount = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleWithdrawAll = () => {
    setAmount(Math.floor(balance).toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (numericAmount > balance) {
      setError('Amount exceeds your available wallet balance.');
      return;
    }
    if (numericAmount < 1000) {
      setError('Minimum withdrawal is ₦1,000.00.');
      return;
    }
    if (accountNumber.length !== 10) {
      setError('Please enter a valid 10-digit Nigerian account number.');
      return;
    }
    if (!pin || pin.length !== 4) {
      setError('Please enter your 4-digit transaction PIN.');
      return;
    }

    // Move to processing animation
    setStep('processing');

    setTimeout(() => {
      // Direct user to Withdrawal Error (Account Not Upgraded) screen requested
      closeModal();
      openModal('withdrawal_error');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-slate-100 max-h-[92vh] overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
        {/* Close Button */}
        <button
          id="close-withdraw-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-md">
                <CreditCard className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Withdraw to Bank
              </h2>
            </div>
            <p className="text-xs text-emerald-200/80 mb-4">
              Instant payout to any commercial or microfinance bank in Nigeria.
            </p>

            {/* Current Balance Bar */}
            <div className="bg-[#031d13] p-3 rounded-2xl border border-emerald-500/40 flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] text-emerald-300 uppercase font-bold">Available for Payout</span>
                <div className="text-base font-extrabold text-white">
                  {formatNaira(balance)}
                </div>
              </div>
              <button
                type="button"
                onClick={handleWithdrawAll}
                className="text-xs font-black text-emerald-950 bg-white px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm cursor-pointer"
              >
                Withdraw All
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Select Bank */}
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1.5 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                  <span>Select Destination Bank</span>
                </label>
                <select
                  id="withdraw-bank-select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-300 transition-colors"
                >
                  {NIGERIAN_BANKS.map((b) => (
                    <option key={b.id} value={b.name} className="bg-[#032316] text-white">
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1.5 flex items-center justify-between">
                  <span>10-Digit Account Number</span>
                  {isResolvingAccount && (
                    <span className="text-[11px] text-white flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Verifying account...
                    </span>
                  )}
                </label>
                <input
                  id="withdraw-account-number"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 8034567890"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  maxLength={10}
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-300 transition-colors"
                />

                {/* Resolved Account Name Badge */}
                {accountName && accountNumber.length === 10 && (
                  <div className="mt-1.5 p-2 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-emerald-300">Account Name:</span>
                    <span className="font-bold text-white uppercase tracking-wide flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      {accountName}
                    </span>
                  </div>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                  Amount to Withdraw (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300 font-bold">
                    ₦
                  </span>
                  <input
                    id="withdraw-amount-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="50,000"
                    min="1000"
                    max={balance}
                    className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-300 transition-colors"
                  />
                </div>

                {/* Presets */}
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  {[10000, 25000, 50000, 100000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handlePresetAmount(val)}
                      className={`text-[11px] font-bold py-1 rounded-lg border transition-all cursor-pointer ${
                        amount === val.toString()
                          ? 'bg-white border-white text-emerald-950 shadow-sm'
                          : 'bg-[#031d13] border-emerald-700/50 text-emerald-200 hover:bg-[#063321]'
                      }`}
                    >
                      {formatNaira(val).replace('.00', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security PIN */}
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1.5 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-300" />
                  <span>4-Digit Security PIN (Default: 1234)</span>
                </label>
                <input
                  id="withdraw-pin-input"
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  placeholder="••••"
                  className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-widest text-center text-white placeholder-emerald-400/40 focus:outline-none focus:border-emerald-300 transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="btn-confirm-withdraw"
                type="submit"
                className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3.5 px-5 rounded-2xl shadow-lg shadow-black/40 flex items-center justify-center gap-2 text-sm transition-all active:scale-95 cursor-pointer mt-2"
              >
                <span>Process Instant Withdrawal</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: PROCESSING ANIMATION */}
        {step === 'processing' && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-900 border-t-white animate-spin"></div>
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-emerald-300 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-black text-white">
              Communicating with NIP Gateway...
            </h3>
            <p className="text-xs text-emerald-200/80 max-w-xs mx-auto">
              Routing payout via Nigerian Interbank Settlement System to {selectedBank}. Please wait...
            </p>
          </div>
        )}

        {/* STEP 3: TRANSACTION RECEIPT */}
        {step === 'receipt' && completedTx && (
          <div className="space-y-4">
            {/* Header Success */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-white text-emerald-800 mx-auto flex items-center justify-center shadow-md mb-2">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-white">
                Withdrawal Successful!
              </h3>
              <p className="text-xs text-emerald-300 font-bold">
                Funds have been dispatched to your bank account.
              </p>
            </div>

            {/* Official Slip */}
            <div className="bg-[#031d13] border border-emerald-500/40 rounded-2xl p-4 space-y-3 font-sans text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
                <span className="text-emerald-300">Transfer Amount</span>
                <span className="text-base font-extrabold text-white font-mono">
                  {formatNaira(completedTx.amount)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Recipient Bank</span>
                <span className="font-semibold text-white">{completedTx.bankName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Account Number</span>
                <span className="font-mono text-white">{completedTx.accountNumber}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Beneficiary</span>
                <span className="font-semibold text-white uppercase">{completedTx.accountName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Reference No.</span>
                <span className="font-mono text-emerald-200 text-[11px]">{completedTx.reference}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Date & Time</span>
                <span className="text-emerald-200">{completedTx.date}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-emerald-500/30">
                <span className="text-emerald-300">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-emerald-950 font-bold text-[10px] uppercase">
                  Successful
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `Naija Pay Withdrawal: ${formatNaira(completedTx.amount)} sent to ${completedTx.bankName} (${completedTx.accountNumber}) Ref: ${completedTx.reference}`
                  );
                }}
                className="bg-[#04281a] hover:bg-[#063b27] border border-emerald-500/40 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Receipt</span>
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="bg-white hover:bg-emerald-100 text-emerald-950 font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs transition-colors shadow-md cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
