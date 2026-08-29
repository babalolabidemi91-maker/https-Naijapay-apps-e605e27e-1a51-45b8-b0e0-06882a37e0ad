import React from 'react';
import { 
  PlaySquare, 
  PlusCircle, 
  UserPlus2, 
  Headphones, 
  Smartphone, 
  Gamepad2, 
  ChevronRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  modalName: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
}

export const QuickActionGrid: React.FC = () => {
  const { openModal } = useApp();

  const actions: ActionItem[] = [
    {
      id: 'how-it-works',
      title: 'How it works',
      subtitle: 'Watch quick guide',
      icon: <PlaySquare className="w-5 h-5" />,
      modalName: 'how_it_works',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-white',
    },
    {
      id: 'platform',
      title: 'Platform',
      subtitle: 'Explore services',
      icon: <PlusCircle className="w-5 h-5" />,
      modalName: 'task_center',
      iconBg: 'bg-white/20',
      iconColor: 'text-emerald-300',
      badge: 'Tasks',
    },
    {
      id: 'invite',
      title: 'Invite',
      subtitle: 'Invite friends',
      icon: <UserPlus2 className="w-5 h-5" />,
      modalName: 'invite',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-white',
      badge: '+₦5,000',
    },
    {
      id: 'support',
      title: 'Support',
      subtitle: '24/7 Live help',
      icon: <Headphones className="w-5 h-5" />,
      modalName: 'support',
      iconBg: 'bg-white/20',
      iconColor: 'text-emerald-300',
    },
    {
      id: 'airtime',
      title: 'Airtime & Data',
      subtitle: 'Instant recharge',
      icon: <Smartphone className="w-5 h-5" />,
      modalName: 'airtime',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-white',
    },
    {
      id: 'spin-win',
      title: 'Spin & Win',
      subtitle: 'Daily cash prizes',
      icon: <Gamepad2 className="w-5 h-5" />,
      modalName: 'spin',
      iconBg: 'bg-white/20',
      iconColor: 'text-emerald-300',
      badge: 'Win ₦1,000',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            id={`action-${action.id}`}
            onClick={() => openModal(action.modalName)}
            className="group relative rounded-2xl bg-[#04281a]/95 hover:bg-[#073b26] border-2 border-emerald-500/30 hover:border-white p-3 sm:p-4 flex flex-col justify-between min-h-[110px] text-left transition-all duration-200 shadow-md hover:shadow-xl active:scale-[0.97] cursor-pointer"
          >
            {/* Top Row: Icon + Chevron */}
            <div className="flex items-center justify-between w-full">
              <div className={`w-9 h-9 rounded-xl ${action.iconBg} ${action.iconColor} flex items-center justify-center`}>
                {action.icon}
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Badge if present */}
            {action.badge && (
              <span className="absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-white text-emerald-950 shadow-sm">
                {action.badge}
              </span>
            )}

            {/* Bottom Row: Title + Subtitle */}
            <div className="mt-2">
              <h3 className="text-white font-bold text-xs sm:text-sm tracking-tight leading-tight">
                {action.title}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-200/80 mt-0.5 leading-tight truncate">
                {action.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
