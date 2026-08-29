import React, { useState } from 'react';
import { X, Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';

const NETWORKS = [
  { id: 'mtn', name: 'MTN Nigeria', color: 'bg-yellow-400 text-black' },
  { id: 'airtel', name: 'Airtel Nigeria', color: 'bg-red-600 text-white' },
  { id: 'glo', name: 'Glo Mobile', color: 'bg-green-600 text-white' },
  { id: '9mobile', name: '9mobile', color: 'bg-emerald-800 text-white' },
];

export const AirtimeModal: React.FC = () => {
  const { activeModal, closeModal, balance } = useApp();
  const [network, setNetwork] = useState('mtn');
  const [phone, setPhone] = useState('08034567890');
  const [amount, setAmount] = useState('1000');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (activeModal !== 'airtime') return null;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const val = parseFloat(amount);
    if (isNaN(val) || val < 100) {
      setError('Minimum airtime recharge is ₦100.00');
      return;
    }
    if (val > balance) {
      setError('Insufficient wallet balance.');
      return;
    }
    if (phone.length < 11) {
      setError('Enter a valid 11-digit phone number.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      closeModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          id="close-airtime-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-950 flex items-center justify-center shadow-md">
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Airtime & Data VTU
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-4">
          Recharge any Nigerian network line instantly with wallet balance.
        </p>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white text-emerald-950 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-black text-white">Recharge Successful!</h3>
            <p className="text-xs text-emerald-200">
              {formatNaira(parseFloat(amount))} airtime sent to {phone}.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePurchase} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Network Selector */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                Select Network Provider
              </label>
              <div className="grid grid-cols-4 gap-2">
                {NETWORKS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setNetwork(n.id)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all cursor-pointer ${
                      network === n.id
                        ? 'border-white ring-2 ring-white/50 ' + n.color
                        : 'bg-[#031d13] border-emerald-600/40 text-emerald-200 hover:border-emerald-400'
                    }`}
                  >
                    {n.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                Recipient Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08034567890"
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono placeholder-emerald-400/40 focus:outline-none focus:border-white"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1.5">
                Amount (₦)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['500', '1000', '2000', '5000'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-1.5 text-xs font-bold rounded-xl border cursor-pointer ${
                      amount === val
                        ? 'bg-white text-emerald-950 border-white shadow-sm'
                        : 'bg-[#031d13] text-emerald-200 border-emerald-600/40 hover:bg-[#063321]'
                    }`}
                  >
                    ₦{val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#031d13] border border-emerald-600/50 rounded-xl px-3.5 py-2 text-sm text-white font-bold focus:outline-none focus:border-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3 px-4 rounded-xl text-sm shadow-lg cursor-pointer"
            >
              Recharge Now ({formatNaira(parseFloat(amount) || 0)})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
