import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LivePayoutTicker } from './components/LivePayoutTicker';
import { WalletCard } from './components/WalletCard';
import { NaijaCoreCard } from './components/NaijaCoreCard';
import { QuickActionGrid } from './components/QuickActionGrid';
import { BottomNav } from './components/BottomNav';
import { WelcomeBonusModal } from './components/WelcomeBonusModal';
import { WithdrawModal } from './components/WithdrawModal';
import { AddFundsModal } from './components/AddFundsModal';
import { SpinWheelModal } from './components/SpinWheelModal';
import { InviteModal } from './components/InviteModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { TaskCenterModal } from './components/TaskCenterModal';
import { AirtimeModal } from './components/AirtimeModal';
import { SupportModal } from './components/SupportModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { UpgradeModal } from './components/UpgradeModal';
import { UpgradeStatusModal } from './components/UpgradeStatusModal';
import { WithdrawalErrorModal } from './components/WithdrawalErrorModal';
import { HistoryView } from './components/HistoryView';
import { WalletView } from './components/WalletView';
import { ProfileView } from './components/ProfileView';
import { 
  Gift, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Shield, 
  LogIn, 
  Zap, 
  ArrowDownToLine,
  Crown,
  MessageCircle 
} from 'lucide-react';
import { formatNaira } from './data/mockData';

const MainLayout: React.FC = () => {
  const { 
    user, 
    activeTab, 
    openModal, 
    hasClaimedWelcomeBonus, 
    transactions, 
    setActiveTab, 
    quickDemoLogin 
  } = useApp();

  // If user is not logged in, render the Auth Gateway
  if (!user) {
    return (
      <div className="min-h-screen bg-[#02180f] text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="max-w-md w-full mx-auto my-auto space-y-6 text-center">
          {/* Logo */}
          <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-300 to-white p-0.5 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)]">
            <div className="w-full h-full bg-[#032316] rounded-[22px] flex items-center justify-center">
              <Shield className="w-9 h-9 text-emerald-300 fill-emerald-500/20" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Naija<span className="text-emerald-300">Pay</span>
            </h1>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xs mx-auto">
              Daily earnings reward platform with instant settlement to all Nigerian bank accounts.
            </p>
          </div>

          {/* Welcome Bonus Callout */}
          <div className="p-5 rounded-3xl bg-[#04281a] border-2 border-emerald-500/40 text-center shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-1 bg-white/20 text-white border border-white/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-emerald-300" /> OFFICIAL REGISTRATION GIFT
            </div>
            <div className="text-xs text-emerald-200/90 font-medium">New Sign-Up Bonus</div>
            <div className="text-3xl font-black text-white font-mono my-1 drop-shadow-md">
              ₦30,000.00
            </div>
            <div className="text-[11px] text-emerald-300 flex items-center justify-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-white" /> Instant Bank Payout Eligible
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              id="auth-signup-btn"
              onClick={() => openModal('auth')}
              className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 text-sm transition-all active:scale-95 cursor-pointer"
            >
              <span>Get Started / Create Account</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              id="auth-demo-btn"
              onClick={quickDemoLogin}
              className="w-full bg-white hover:bg-emerald-50 text-emerald-950 font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>One-Click Instant Demo Login</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-emerald-400/60 max-w-xs mx-auto">
          Secured by Central Bank of Nigeria (CBN) approved NIP clearing rails. 256-bit encryption.
        </div>

        {/* Modals */}
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02180f] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* Top Fixed Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 py-3 space-y-3.5 pb-24">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <>
            {/* Prominent Welcome Bonus Claim Banner (If not yet claimed) */}
            {!hasClaimedWelcomeBonus && (
              <div 
                id="claim-welcome-bonus-banner"
                onClick={() => openModal('welcome_bonus')}
                className="w-full rounded-2xl bg-gradient-to-r from-[#04281a] via-[#063b27] to-[#04281a] border-2 border-emerald-400/50 p-3.5 flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer hover:border-white transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Gift className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" /> Registration Reward Available
                    </span>
                    <h3 className="text-white font-extrabold text-sm tracking-tight truncate">
                      Claim Your <span className="text-emerald-300 font-mono font-black">₦30,000.00</span> Bonus
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white text-emerald-950 font-black text-xs px-3 py-2 rounded-xl flex items-center gap-1 flex-shrink-0 shadow-md group-hover:bg-emerald-100 transition-colors"
                >
                  <span>Claim</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            )}

            {/* Live Withdrawal Ticker Pill */}
            <LivePayoutTicker />

            {/* Wallet Balance Card */}
            <WalletCard />

            {/* Daily Earning Core Card (NaijaCore) */}
            <NaijaCoreCard />

            {/* WhatsApp Official Community Group Banner */}
            <a
              id="whatsapp-community-banner"
              href="https://chat.whatsapp.com/HCSBFUakHeA8EznuojrF61?s=cl&p=a&ilr=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl bg-gradient-to-r from-[#04281a] via-[#063825] to-[#04281a] border-2 border-emerald-500/40 p-3.5 flex items-center justify-between gap-3 shadow-lg hover:border-white transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-white text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 fill-emerald-800/20" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>Official WhatsApp Group</span>
                    <span className="text-[9px] bg-emerald-400 text-slate-950 px-1.5 py-0.5 rounded-full font-black animate-pulse">
                      Active Community
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 truncate">
                    Join members for live updates, payment proofs & priority support.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-white hover:bg-emerald-100 text-emerald-950 font-black text-xs px-3 py-1.5 rounded-xl flex-shrink-0 shadow-md transition-all group-hover:scale-105">
                <span>Join Group</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </a>

            {/* VIP Upgrade / Higher Limits Banner */}
            <div 
              id="home-upgrade-banner"
              onClick={() => openModal('upgrade')}
              className="w-full rounded-2xl bg-[#04281a]/95 border-2 border-emerald-500/30 p-3 flex items-center justify-between gap-3 cursor-pointer hover:border-white transition-all group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                  <Crown className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>Upgrade to Unlock More</span>
                    <span className="text-[9px] bg-white text-emerald-950 px-1.5 py-0.5 rounded font-black">VIP</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80 truncate">
                    Access higher limits, Pro models, and 0% withdrawal fees.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white font-black text-xs flex-shrink-0">
                <span>Upgrade</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
              </div>
            </div>

            {/* Quick Action Bento Grid */}
            <QuickActionGrid />

            {/* Recent Activity Mini-Feed */}
            <div className="rounded-3xl bg-[#04281a]/90 border-2 border-emerald-500/30 p-4 space-y-2.5 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Recent Activity
                </h3>
                <button
                  id="view-all-history"
                  onClick={() => setActiveTab('history')}
                  className="text-xs font-black text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

              <div className="space-y-2">
                {transactions.slice(0, 3).map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => setActiveTab('history')}
                    className="p-2.5 rounded-xl bg-[#021a10] border border-emerald-500/20 flex items-center justify-between text-xs cursor-pointer hover:border-emerald-400 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-white flex-shrink-0">
                        {tx.type === 'withdrawal' ? (
                          <ArrowDownToLine className="w-3.5 h-3.5 text-white" />
                        ) : tx.type === 'welcome_bonus' ? (
                          <Gift className="w-3.5 h-3.5 text-emerald-300" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{tx.title}</div>
                        <span className="text-[10px] text-emerald-300/70">{tx.date}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono font-bold flex-shrink-0">
                      <span className={tx.type === 'withdrawal' ? 'text-white' : 'text-emerald-300'}>
                        {tx.type === 'withdrawal' ? '-' : '+'}
                        {formatNaira(tx.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === 'history' && <HistoryView />}

        {/* TAB 3: WALLET */}
        {activeTab === 'wallet' && <WalletView />}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Interactive App Modals */}
      <WelcomeBonusModal />
      <WithdrawModal />
      <AddFundsModal />
      <SpinWheelModal />
      <InviteModal />
      <HowItWorksModal />
      <TaskCenterModal />
      <AirtimeModal />
      <SupportModal />
      <SearchModal />
      <AuthModal />
      <UpgradeModal />
      <UpgradeStatusModal />
      <WithdrawalErrorModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
