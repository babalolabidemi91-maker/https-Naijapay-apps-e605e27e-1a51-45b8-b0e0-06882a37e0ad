import React, { useState } from 'react';
import { 
  Building2, 
  ArrowDownToLine, 
  PlusCircle, 
  ShieldCheck, 
  Check, 
  CreditCard,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NIGERIAN_BANKS, formatNaira } from '../data/mockData';

export const WalletView: React.FC = () => {
  const { 
    balance, 
    totalWithdrawn, 
    totalEarned, 
    savedBank, 
    saveBankAccount, 
    openModal,
    user 
  } = useApp();

  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankName, setBankName] = useState(savedBank?.bankName || 'OPay Digital Services');
  const [accountNumber, setAccountNumber] = useState(savedBank?.accountNumber || '8034567890');
  const [accountName, setAccountName] = useState(savedBank?.accountName || user?.name?.toUpperCase() || 'EMEKA NWOSU');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    saveBankAccount({ bankName, accountNumber, accountName });
    setIsEditingBank(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20 font-['Plus_Jakarta_Sans',sans-serif]">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Wallet & Accounts
        </h1>
        <p className="text-xs text-emerald-200/80 mt-0.5">
          Manage settlement banks, payout limits, and financial metrics.
        </p>
      </div>

      {/* Main Stats Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#063b27] via-[#04281a] to-[#02180f] border-2 border-emerald-500/40 p-5 shadow-xl space-y-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
            Total Available Balance
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
            {formatNaira(balance)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-500/30">
          <div>
            <span className="text-[10px] text-emerald-200">Total Earned</span>
            <div className="text-base font-extrabold text-white font-mono">
              +{formatNaira(totalEarned)}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200">Total Withdrawn</span>
            <div className="text-base font-extrabold text-emerald-300 font-mono">
              {formatNaira(totalWithdrawn)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={() => openModal('add_funds')}
            className="bg-white hover:bg-emerald-50 text-emerald-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>Add Funds</span>
          </button>
          <button
            onClick={() => openModal('withdraw')}
            className="bg-[#031f14] hover:bg-[#073824] border border-emerald-400/50 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowDownToLine className="w-4 h-4 text-emerald-300" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* Linked Nigerian Settlement Bank */}
      <div className="rounded-3xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-white" />
            <h3 className="text-sm font-bold text-white">Default Payout Bank</h3>
          </div>
          <button
            onClick={() => setIsEditingBank(!isEditingBank)}
            className="text-xs text-white font-bold hover:underline cursor-pointer"
          >
            {isEditingBank ? 'Cancel' : 'Change Bank'}
          </button>
        </div>

        {savedSuccess && (
          <div className="p-2.5 bg-emerald-900/80 border border-emerald-400/50 rounded-xl text-xs text-white flex items-center gap-1.5 font-bold">
            <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
            <span>Bank account updated successfully!</span>
          </div>
        )}

        {isEditingBank ? (
          <form onSubmit={handleSaveBank} className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] text-emerald-300 mb-1 font-semibold">Select Bank</label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs text-white"
              >
                {NIGERIAN_BANKS.map((b) => (
                  <option key={b.id} value={b.name} className="bg-[#032316] text-white">
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-emerald-300 mb-1 font-semibold">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.slice(0, 10))}
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-emerald-300 mb-1 font-semibold">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs text-white uppercase font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-2.5 rounded-xl text-xs cursor-pointer shadow-md"
            >
              Save Account Details
            </button>
          </form>
        ) : (
          <div className="bg-[#021b11] border border-emerald-500/20 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Bank:</span>
              <span className="font-bold text-white">{savedBank?.bankName || 'OPay Digital Services'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Account No:</span>
              <span className="font-mono font-bold text-white">{savedBank?.accountNumber || '8034567890'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-emerald-300 font-semibold">Account Name:</span>
              <span className="font-bold text-emerald-200 uppercase">{savedBank?.accountName || user?.name || 'EMEKA NWOSU'}</span>
            </div>
            <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-white" /> CBN NIBSS Verified
              </span>
              <span className="text-white font-bold bg-emerald-900 px-2 py-0.5 rounded-full">
                Active Rail
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Security & Limits */}
      <div className="rounded-3xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-white" />
          <h3 className="text-sm font-bold text-white">Daily Limits & Rails</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-2 border-b border-emerald-500/20">
            <span className="text-emerald-300">Daily Withdrawal Cap</span>
            <span className="font-mono font-bold text-white">₦500,000.00</span>
          </div>
          <div className="flex justify-between py-2 border-b border-emerald-500/20">
            <span className="text-emerald-300">Single Payout Max</span>
            <span className="font-mono font-bold text-white">₦250,000.00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-emerald-300">Settlement Speed</span>
            <span className="font-bold text-white bg-emerald-900 px-2 py-0.5 rounded">Instant NIP</span>
          </div>
        </div>
      </div>
    </div>
  );
};
