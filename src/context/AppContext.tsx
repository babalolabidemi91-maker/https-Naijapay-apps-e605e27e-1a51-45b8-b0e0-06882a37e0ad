import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User, Transaction, Task } from '../types';
import { INITIAL_TASKS } from '../data/mockData';
import { playCashSound, playClickSound, playSuccessSound } from '../utils/audio';

interface SavedBankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface AppContextType {
  user: User | null;
  balance: number;
  hasClaimedWelcomeBonus: boolean;
  canClaimDaily: boolean;
  dailyCountdown: number; // in seconds
  transactions: Transaction[];
  tasks: Task[];
  savedBank: SavedBankAccount | null;
  activeTab: 'home' | 'history' | 'wallet' | 'profile';
  activeModal: string | null;
  modalData: any;
  showBalance: boolean;
  totalWithdrawn: number;
  totalEarned: number;
  notificationCount: number;
  
  // Actions
  setActiveTab: (tab: 'home' | 'history' | 'wallet' | 'profile') => void;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
  toggleShowBalance: () => void;
  claimWelcomeBonus: () => boolean;
  claimDailyReward: () => boolean;
  requestWithdrawal: (data: { amount: number; bankName: string; accountNumber: string; accountName: string; pin: string }) => { success: boolean; message: string; transaction?: Transaction };
  depositFunds: (amount: number, method: string) => void;
  spinWinReward: (amount: number) => void;
  completeTask: (taskId: string) => void;
  saveBankAccount: (bank: SavedBankAccount) => void;
  updateUserPin: (newPin: string) => boolean;
  login: (email: string, pass: string) => boolean;
  signup: (formData: { name: string; email: string; phone: string; password: string; referralCode?: string }) => boolean;
  logout: () => void;
  quickDemoLogin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr-naija-001',
  name: 'Emeka Nwosu',
  email: 'emeka.nwosu@gmail.com',
  phone: '08034567890',
  referralCode: 'NAIJA-8821',
  vipTier: 'Tier 2 Bronze',
  kycVerified: true,
  pin: '1234',
  joinedAt: 'August 2026',
};

const STORAGE_KEYS = {
  USER: 'naija_pay_user',
  BALANCE: 'naija_pay_balance',
  CLAIMED_WELCOME: 'naija_pay_claimed_welcome',
  LAST_DAILY_CLAIM: 'naija_pay_last_daily_claim',
  TRANSACTIONS: 'naija_pay_transactions',
  SAVED_BANK: 'naija_pay_saved_bank',
  TASKS: 'naija_pay_tasks',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. User state (defaults to null so login requirement screen is shown on first visit)
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // 2. Balance state
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BALANCE);
    return saved ? parseFloat(saved) : 100000; // Screenshot shows ₦100,000.00 wallet balance!
  });

  // 3. Welcome bonus state
  const [hasClaimedWelcomeBonus, setHasClaimedWelcomeBonus] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLAIMED_WELCOME);
    return saved === 'true';
  });

  // 4. Daily claim timestamp
  const [lastDailyClaim, setLastDailyClaim] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_DAILY_CLAIM);
    return saved ? parseInt(saved, 10) : 0;
  });

  // 5. Daily claim cooldown calculation (e.g. 24 hour period or 60 second test cooldown)
  const [dailyCountdown, setDailyCountdown] = useState<number>(0);
  const [canClaimDaily, setCanClaimDaily] = useState<boolean>(true);

  // 6. Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'tx-init-1',
        type: 'deposit',
        title: 'Initial Wallet Deposit',
        amount: 100000,
        date: 'Today, 08:30 AM',
        timestamp: Date.now() - 3600000,
        status: 'successful',
        reference: 'NP-DEP-' + Math.floor(100000 + Math.random() * 900000),
        note: 'Direct Bank Transfer to Virtual Account',
      },
    ];
  });

  // 7. Saved Bank
  const [savedBank, setSavedBank] = useState<SavedBankAccount | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_BANK);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      bankName: 'OPay Digital Services',
      accountNumber: '8034567890',
      accountName: 'EMEKA NWOSU',
    };
  });

  // 8. Tasks state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TASKS;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'wallet' | 'profile'>('home');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const [notificationCount] = useState<number>(3);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BALANCE, balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLAIMED_WELCOME, hasClaimedWelcomeBonus ? 'true' : 'false');
  }, [hasClaimedWelcomeBonus]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_DAILY_CLAIM, lastDailyClaim.toString());
  }, [lastDailyClaim]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (savedBank) {
      localStorage.setItem(STORAGE_KEYS.SAVED_BANK, JSON.stringify(savedBank));
    }
  }, [savedBank]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  // Daily claim countdown timer tick
  useEffect(() => {
    const checkDaily = () => {
      const now = Date.now();
      const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour for testing or instant re-claim capability
      const timeSince = now - lastDailyClaim;
      if (lastDailyClaim === 0 || timeSince >= COOLDOWN_MS) {
        setCanClaimDaily(true);
        setDailyCountdown(0);
      } else {
        setCanClaimDaily(false);
        setDailyCountdown(Math.ceil((COOLDOWN_MS - timeSince) / 1000));
      }
    };

    checkDaily();
    const interval = setInterval(checkDaily, 1000);
    return () => clearInterval(interval);
  }, [lastDailyClaim]);

  const openModal = (modalName: string, data: any = null) => {
    playClickSound();
    setActiveModal(modalName);
    setModalData(data);
  };

  const closeModal = () => {
    playClickSound();
    setActiveModal(null);
    setModalData(null);
  };

  const toggleShowBalance = () => {
    playClickSound();
    setShowBalance((prev) => !prev);
  };

  // Claim ₦30,000.00 Welcome Bonus
  const claimWelcomeBonus = (): boolean => {
    if (hasClaimedWelcomeBonus) return false;

    const BONUS_AMOUNT = 30000;
    setBalance((prev) => prev + BONUS_AMOUNT);
    setHasClaimedWelcomeBonus(true);

    const newTx: Transaction = {
      id: 'tx-wb-' + Date.now(),
      type: 'welcome_bonus',
      title: '₦30,000.00 Welcome Bonus',
      amount: BONUS_AMOUNT,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-WB-' + Math.floor(100000 + Math.random() * 900000),
      note: 'Official Naija Pay Sign-up Registration Reward',
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Celebrations
    playSuccessSound();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00e676', '#10b981', '#059669', '#34d399', '#ffffff'],
    });

    return true;
  };

  // Claim Daily ₦3,000 NaijaCore Earnings
  const claimDailyReward = (): boolean => {
    if (!canClaimDaily) return false;

    const DAILY_AMOUNT = 3000;
    setBalance((prev) => prev + DAILY_AMOUNT);
    setLastDailyClaim(Date.now());
    setCanClaimDaily(false);
    setDailyCountdown(3600);

    const newTx: Transaction = {
      id: 'tx-dc-' + Date.now(),
      type: 'daily_claim',
      title: 'Daily FluxCore Reward',
      amount: DAILY_AMOUNT,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-CORE-' + Math.floor(100000 + Math.random() * 900000),
      note: '24-Hour Active Core Mining Yield',
    };

    setTransactions((prev) => [newTx, ...prev]);

    playCashSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#00e676', '#f59e0b', '#38bdf8'],
    });

    return true;
  };

  // Request Bank Withdrawal
  const requestWithdrawal = ({
    amount,
    bankName,
    accountNumber,
    accountName,
    pin,
  }: {
    amount: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
    pin: string;
  }) => {
    if (amount <= 0) {
      return { success: false, message: 'Please enter a valid amount to withdraw.' };
    }
    if (amount > balance) {
      return { success: false, message: 'Insufficient wallet balance.' };
    }
    if (amount < 1000) {
      return { success: false, message: 'Minimum withdrawal amount is ₦1,000.00.' };
    }
    if (user?.pin && pin !== user.pin) {
      return { success: false, message: 'Invalid 4-digit Security PIN.' };
    }

    // Deduct balance
    setBalance((prev) => prev - amount);

    // Save bank for future convenience
    setSavedBank({
      bankName,
      accountNumber,
      accountName,
    });

    const tx: Transaction = {
      id: 'tx-wth-' + Date.now(),
      type: 'withdrawal',
      title: `Bank Payout (${bankName.split(' ')[0]})`,
      amount: amount,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-WTH-' + Math.floor(100000 + Math.random() * 900000),
      bankName,
      accountNumber,
      accountName,
      note: `Instant credit to ${accountNumber} (${accountName})`,
    };

    setTransactions((prev) => [tx, ...prev]);
    playSuccessSound();

    return {
      success: true,
      message: 'Withdrawal processed successfully to your bank account!',
      transaction: tx,
    };
  };

  // Deposit Funds
  const depositFunds = (amount: number, method: string) => {
    if (amount <= 0) return;
    setBalance((prev) => prev + amount);

    const tx: Transaction = {
      id: 'tx-dep-' + Date.now(),
      type: 'deposit',
      title: `Wallet Top-up (${method})`,
      amount,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-DEP-' + Math.floor(100000 + Math.random() * 900000),
      note: `Processed via ${method}`,
    };

    setTransactions((prev) => [tx, ...prev]);
    playCashSound();
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  // Lucky Spin Reward
  const spinWinReward = (amount: number) => {
    setBalance((prev) => prev + amount);

    const tx: Transaction = {
      id: 'tx-spin-' + Date.now(),
      type: 'spin_win',
      title: 'Lucky Wheel Cash Prize',
      amount,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-SPIN-' + Math.floor(100000 + Math.random() * 900000),
      note: 'Won from daily lucky spin wheel',
    };

    setTransactions((prev) => [tx, ...prev]);
    playCashSound();
  };

  // Complete Task
  const completeTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.completed) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );

    setBalance((prev) => prev + task.reward);

    const tx: Transaction = {
      id: 'tx-task-' + Date.now(),
      type: 'referral_bonus',
      title: task.title,
      amount: task.reward,
      date: 'Just now',
      timestamp: Date.now(),
      status: 'successful',
      reference: 'NP-TSK-' + Math.floor(100000 + Math.random() * 900000),
      note: 'Task completion incentive',
    };

    setTransactions((prev) => [tx, ...prev]);
    playSuccessSound();
  };

  const saveBankAccount = (bank: SavedBankAccount) => {
    setSavedBank(bank);
    playClickSound();
  };

  const updateUserPin = (newPin: string): boolean => {
    if (!user || newPin.length !== 4) return false;
    setUser({ ...user, pin: newPin });
    playSuccessSound();
    return true;
  };

  const login = (email: string, pass: string): boolean => {
    if (!email || !pass) return false;
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Naija User';
    const loggedUser: User = {
      id: 'usr-' + Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      phone: '080' + Math.floor(10000000 + Math.random() * 90000000),
      referralCode: 'NP-' + Math.floor(1000 + Math.random() * 9000),
      vipTier: 'Tier 1 Starter',
      kycVerified: true,
      pin: '1234',
      joinedAt: 'Today',
    };
    setUser(loggedUser);
    playSuccessSound();
    return true;
  };

  const signup = (formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    referralCode?: string;
  }): boolean => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: formData.name || 'Naija Pay User',
      email: formData.email,
      phone: formData.phone || '08012345678',
      referralCode: 'NP-' + Math.floor(1000 + Math.random() * 9000),
      referredBy: formData.referralCode,
      vipTier: 'Tier 1 Starter',
      kycVerified: true,
      pin: '1234',
      joinedAt: 'Today',
    };
    setUser(newUser);
    // Give them the prompt to claim ₦130,000.00 right after signup!
    setHasClaimedWelcomeBonus(false);
    playSuccessSound();
    return true;
  };

  const logout = () => {
    playClickSound();
    setUser(null);
    setActiveTab('home');
  };

  const quickDemoLogin = () => {
    setUser(DEMO_USER);
    playSuccessSound();
  };

  // Calculations
  const totalWithdrawn = transactions
    .filter((t) => t.type === 'withdrawal' && t.status === 'successful')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalEarned = transactions
    .filter((t) => t.type !== 'withdrawal' && t.status === 'successful')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <AppContext.Provider
      value={{
        user,
        balance,
        hasClaimedWelcomeBonus,
        canClaimDaily,
        dailyCountdown,
        transactions,
        tasks,
        savedBank,
        activeTab,
        activeModal,
        modalData,
        showBalance,
        totalWithdrawn,
        totalEarned,
        notificationCount,
        setActiveTab,
        openModal,
        closeModal,
        toggleShowBalance,
        claimWelcomeBonus,
        claimDailyReward,
        requestWithdrawal,
        depositFunds,
        spinWinReward,
        completeTask,
        saveBankAccount,
        updateUserPin,
        login,
        signup,
        logout,
        quickDemoLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
