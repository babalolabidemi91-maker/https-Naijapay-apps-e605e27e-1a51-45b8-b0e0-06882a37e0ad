import { Bank, PayoutEvent, Task } from '../types';

export const NIGERIAN_BANKS: Bank[] = [
  { id: 'opay', name: 'OPay Digital Services', code: '999992', logoColor: '#00C766' },
  { id: 'palmpay', name: 'PalmPay Limited', code: '999991', logoColor: '#6B11FF' },
  { id: 'kuda', name: 'Kuda Microfinance Bank', code: '50211', logoColor: '#40196D' },
  { id: 'moniepoint', name: 'Moniepoint MFB', code: '50515', logoColor: '#003399' },
  { id: 'gtb', name: 'Guaranty Trust Bank (GTBank)', code: '058', logoColor: '#DD4F05' },
  { id: 'zenith', name: 'Zenith Bank PLC', code: '057', logoColor: '#E60000' },
  { id: 'access', name: 'Access Bank', code: '044', logoColor: '#004A99' },
  { id: 'firstbank', name: 'First Bank of Nigeria', code: '011', logoColor: '#1A3365' },
  { id: 'uba', name: 'United Bank for Africa (UBA)', code: '033', logoColor: '#D32F2F' },
  { id: 'fidelity', name: 'Fidelity Bank', code: '070', logoColor: '#102A83' },
  { id: 'stanbic', name: 'Stanbic IBTC Bank', code: '221', logoColor: '#0033AA' },
  { id: 'sterling', name: 'Sterling Bank', code: '232', logoColor: '#7A1C74' },
  { id: 'wema', name: 'Wema Bank / ALAT', code: '035', logoColor: '#9C1D6E' },
  { id: 'union', name: 'Union Bank of Nigeria', code: '032', logoColor: '#0099FF' },
  { id: 'fcmb', name: 'First City Monument Bank (FCMB)', code: '214', logoColor: '#5C1D82' },
];

export const INITIAL_PAYOUT_EVENTS: PayoutEvent[] = [
  { id: 'p1', name: 'Emeka Nwosu', location: 'Lagos', amount: 50000, bank: 'OPay', timeAgo: 'Just now' },
  { id: 'p2', name: 'Amina Bello', location: 'Abuja', amount: 130000, bank: 'Kuda Bank', timeAgo: '1m ago' },
  { id: 'p3', name: 'Chukwudi Okafor', location: 'Port Harcourt', amount: 75000, bank: 'Moniepoint', timeAgo: '2m ago' },
  { id: 'p4', name: 'Babatunde Adeleke', location: 'Ibadan', amount: 35000, bank: 'GTBank', timeAgo: '3m ago' },
  { id: 'p5', name: 'Fatima Mohammed', location: 'Kano', amount: 100000, bank: 'Zenith Bank', timeAgo: '4m ago' },
  { id: 'p6', name: 'Blessing Udoh', location: 'Uyo', amount: 48000, bank: 'PalmPay', timeAgo: '5m ago' },
  { id: 'p7', name: 'Kehinde Balogun', location: 'Lagos', amount: 90000, bank: 'Access Bank', timeAgo: '6m ago' },
  { id: 'p8', name: 'Ibrahim Danjuma', location: 'Kaduna', amount: 62000, bank: 'First Bank', timeAgo: '7m ago' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Daily Check-in Bonus',
    reward: 3000,
    category: 'Daily',
    icon: 'Zap',
    completed: false,
    description: 'Claim your guaranteed daily active mining reward.',
  },
  {
    id: 'task-2',
    title: 'Join Official Telegram Community',
    reward: 5000,
    category: 'Social',
    icon: 'Send',
    completed: false,
    description: 'Connect with over 45,000 active Nigerian earners.',
  },
  {
    id: 'task-3',
    title: 'Invite 3 Friends to Naija Pay',
    reward: 15000,
    category: 'Referral',
    icon: 'Users',
    completed: false,
    description: 'Share your unique invite link and get ₦5,000 per verified friend.',
  },
  {
    id: 'task-4',
    title: 'Watch How-It-Works Video',
    reward: 2000,
    category: 'Daily',
    icon: 'PlayCircle',
    completed: false,
    description: 'Learn how to claim bonuses and withdraw straight to your bank.',
  },
  {
    id: 'task-5',
    title: 'Follow Naija Pay on X / Twitter',
    reward: 2500,
    category: 'Social',
    icon: 'Share2',
    completed: false,
    description: 'Stay updated with daily bonus codes and payment proofs.',
  },
];

export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
