export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  referralCode: string;
  referredBy?: string;
  vipTier: 'Tier 1 Starter' | 'Tier 2 Bronze' | 'Tier 3 Silver' | 'Tier 4 Gold' | 'VIP Diamond';
  kycVerified: boolean;
  pin: string;
  joinedAt: string;
}

export type TransactionType = 'welcome_bonus' | 'daily_claim' | 'withdrawal' | 'deposit' | 'referral_bonus' | 'spin_win' | 'airtime';
export type TransactionStatus = 'successful' | 'processing' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  timestamp: number;
  status: TransactionStatus;
  reference: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  note?: string;
}

export interface Bank {
  id: string;
  name: string;
  code: string;
  logoColor: string;
}

export interface PayoutEvent {
  id: string;
  name: string;
  location: string;
  amount: number;
  bank: string;
  timeAgo: string;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  category: 'Daily' | 'Social' | 'Referral' | 'Special';
  icon: string;
  completed: boolean;
  actionUrl?: string;
  description: string;
}
