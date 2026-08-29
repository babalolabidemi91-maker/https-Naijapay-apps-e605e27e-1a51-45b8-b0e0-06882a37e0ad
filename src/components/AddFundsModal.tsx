import React, { useState } from 'react';
import { X, Building2, Copy, Check, CreditCard, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';

export const AddFundsModal: React.FC = () => {
  const { activeModal, closeModal, openModal, depositFunds } = useApp();
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('20000');
  const [method, setMethod] = useState<'transfer' | 'card' | 'ussd'>('transfer');

  if (activeModal !== 'add_funds') return null;

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

  const handleInstantDeposit = (amountToDeposit: number) => {
    depositFunds(amountToDeposit, method === 'transfer' ? 'Bank Transfer' : method === 'card' ? 'Debit Card' : 'USSD');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
        <button
          id="close-addfunds-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-md">
            <Building2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Add Funds to Wallet
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-4">
          Transfer to your permanent dedicated virtual account for instant auto-credit.
        </p>

        {/* Method Switcher */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#031d13] rounded-xl border border-emerald-500/30 mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMethod('transfer')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              method === 'transfer'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Bank Transfer
          </button>
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              method === 'card'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            Debit Card
          </button>
          <button
            type="button"
            onClick={() => setMethod('ussd')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              method === 'ussd'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'text-emerald-300 hover:text-white'
            }`}
          >
            USSD
          </button>
        </div>

        {/* Virtual Account Box */}
        {method === 'transfer' && (
          <div className="bg-[#031d13] border border-emerald-500/40 rounded-2xl p-4 space-y-3 mb-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-emerald-200 uppercase font-semibold">Dedicated Virtual Bank</span>
              <span className="text-xs font-black text-emerald-950 bg-emerald-300 px-2 py-0.5 rounded-md border border-white/30">
                Auto-Credit Active
              </span>
            </div>

            <div>
              <div className="text-xs text-emerald-300">Bank Name</div>
              <div className="text-sm font-bold text-white">{virtualAccount.bank}</div>
            </div>

            <div className="bg-[#04281a] p-3 rounded-xl border border-emerald-500/50 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-emerald-300">Account Number</div>
                <div className="text-lg font-mono font-extrabold text-white tracking-wider">
                  {virtualAccount.accountNumber}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="bg-white hover:bg-emerald-100 text-emerald-950 text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all shadow-sm cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div>
              <div className="text-xs text-emerald-300">Account Name</div>
              <div className="text-xs font-bold text-white font-mono">{virtualAccount.accountName}</div>
            </div>

            <button
              id="btn-addfunds-submit-proof"
              type="button"
              onClick={() => {
                closeModal();
                openModal('upgrade_status');
              }}
              className="w-full bg-[#073623] hover:bg-[#0c4a31] border border-emerald-400/40 text-emerald-200 hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>I Have Sent Payment / View Upgrade Status</span>
            </button>
          </div>
        )}

        {method === 'card' && (
          <div className="bg-[#031d13] border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2 mb-5">
            <CreditCard className="w-8 h-8 text-white mx-auto stroke-[2]" />
            <div className="text-sm font-bold text-white">Pay with Mastercard / Visa / Verve</div>
            <p className="text-xs text-emerald-200/80">Secured 256-bit payment gateway tokenization.</p>
          </div>
        )}

        {method === 'ussd' && (
          <div className="bg-[#031d13] border border-emerald-500/40 rounded-2xl p-4 text-center space-y-2 mb-5 font-mono text-xs">
            <div className="text-sm font-bold text-white font-sans">Quick USSD Banking</div>
            <div className="p-2 bg-[#04281a] text-white rounded-lg font-bold border border-emerald-500/30">*737*50*AMOUNT*9920#</div>
            <p className="text-emerald-200/80 font-sans">Dial from your registered SIM card.</p>
          </div>
        )}

        {/* Quick Simulated Deposit for instant testing */}
        <div className="pt-2 border-t border-emerald-500/30">
          <label className="block text-xs font-bold text-emerald-200 mb-2">
            Simulate Direct Wallet Credit (₦)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="flex-1 bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-emerald-300"
            />
            <button
              type="button"
              onClick={() => handleInstantDeposit(parseFloat(customAmount) || 10000)}
              className="bg-white hover:bg-emerald-100 text-emerald-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>Credit</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
