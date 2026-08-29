import React, { useState } from 'react';
import { 
  ArrowDownToLine, 
  ArrowUpRight, 
  Gift, 
  Zap, 
  Users, 
  Gamepad2, 
  Smartphone,
  Search,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';
import { Transaction, TransactionType } from '../types';

export const HistoryView: React.FC = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'withdrawal' | 'earning' | 'deposit'>('all');
  const [search, setSearch] = useState('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const getTxIcon = (type: TransactionType) => {
    switch (type) {
      case 'withdrawal':
        return <ArrowDownToLine className="w-4 h-4 text-white" />;
      case 'welcome_bonus':
        return <Gift className="w-4 h-4 text-emerald-300" />;
      case 'daily_claim':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'referral_bonus':
        return <Users className="w-4 h-4 text-white" />;
      case 'spin_win':
        return <Gamepad2 className="w-4 h-4 text-emerald-300" />;
      case 'airtime':
        return <Smartphone className="w-4 h-4 text-white" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-emerald-300" />;
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'withdrawal' && tx.type !== 'withdrawal') return false;
    if (filter === 'deposit' && tx.type !== 'deposit') return false;
    if (filter === 'earning' && (tx.type === 'withdrawal' || tx.type === 'deposit')) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        tx.title.toLowerCase().includes(q) ||
        tx.reference.toLowerCase().includes(q) ||
        (tx.bankName && tx.bankName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-20 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* View Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Transaction History
        </h1>
        <p className="text-xs text-emerald-200/80 mt-0.5">
          Real-time record of all your earnings, welcome bonuses, and bank payouts.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by reference, type, bank..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#04281a] border border-emerald-500/30 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Activities' },
            { id: 'withdrawal', label: 'Withdrawals' },
            { id: 'earning', label: 'Earnings & Bonus' },
            { id: 'deposit', label: 'Deposits' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-white text-emerald-950 shadow-md'
                  : 'bg-[#04281a] text-emerald-300 border border-emerald-500/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center bg-[#04281a]/60 border border-emerald-500/30 rounded-2xl">
            <Clock className="w-8 h-8 text-emerald-500/50 mx-auto mb-2" />
            <div className="text-sm font-bold text-emerald-200">No transactions found</div>
            <p className="text-xs text-emerald-400/70 mt-0.5">
              Activities and withdrawals will show up here automatically.
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isWithdrawal = tx.type === 'withdrawal';
            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="p-3.5 rounded-2xl bg-[#04281a]/95 hover:bg-[#073b26] border-2 border-emerald-500/30 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#021d12] border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    {getTxIcon(tx.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                      <span>{tx.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-200/70 mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-300/60">{tx.reference.slice(0, 10)}...</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div
                    className={`text-xs font-extrabold font-mono ${
                      isWithdrawal ? 'text-white' : 'text-emerald-300'
                    }`}
                  >
                    {isWithdrawal ? '-' : '+'}
                    {formatNaira(tx.amount)}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-950 bg-white px-1.5 py-0.5 rounded shadow-sm">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-gradient-to-b from-[#063321] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 shadow-2xl text-slate-100 space-y-4">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-900 mx-auto flex items-center justify-center shadow-md mb-2">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-white">{selectedTx.title}</h3>
              <div className="text-2xl font-black font-mono text-white mt-1">
                {selectedTx.type === 'withdrawal' ? '-' : '+'}
                {formatNaira(selectedTx.amount)}
              </div>
            </div>

            <div className="bg-[#031d13] border border-emerald-500/30 rounded-2xl p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-300">Reference:</span>
                <span className="font-mono text-white">{selectedTx.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Date:</span>
                <span className="text-white">{selectedTx.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-300">Status:</span>
                <span className="text-white font-bold uppercase bg-emerald-900 px-2 py-0.5 rounded">
                  {selectedTx.status}
                </span>
              </div>
              {selectedTx.note && (
                <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-200">
                  {selectedTx.note}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-2.5 rounded-xl text-xs shadow-md cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
