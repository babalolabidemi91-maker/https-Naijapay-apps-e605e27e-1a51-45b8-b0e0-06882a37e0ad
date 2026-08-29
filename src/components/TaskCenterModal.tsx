import React from 'react';
import { X, PlusCircle, CheckCircle2, Zap, Send, Users, PlayCircle, Share2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNaira } from '../data/mockData';

export const TaskCenterModal: React.FC = () => {
  const { activeModal, closeModal, tasks, completeTask } = useApp();

  if (activeModal !== 'task_center') return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-emerald-300" />;
      case 'Send': return <Send className="w-4 h-4 text-white" />;
      case 'Users': return <Users className="w-4 h-4 text-emerald-300" />;
      case 'PlayCircle': return <PlayCircle className="w-4 h-4 text-white" />;
      default: return <Share2 className="w-4 h-4 text-emerald-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          id="close-task-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-white text-emerald-950 flex items-center justify-center shadow-md">
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Platform Task Center
          </h2>
        </div>
        <p className="text-xs text-emerald-200/80 mb-4">
          Complete daily tasks to earn extra cash rewards deposited straight to your wallet.
        </p>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-2xl bg-[#031d13] border border-emerald-500/30 flex items-center justify-between gap-3 hover:border-emerald-400/50 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#04281a] border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(task.icon)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-xs truncate">
                      {task.title}
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      {task.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-200/70 mt-0.5 line-clamp-1">
                    {task.description}
                  </p>
                  <span className="text-xs font-black text-white font-mono mt-1 block">
                    +{formatNaira(task.reward)}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                {task.completed ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-950 bg-white px-3 py-1.5 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Done</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => completeTask(task.id)}
                    className="bg-white hover:bg-emerald-50 text-emerald-950 font-black px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 stroke-[2.5]" />
                    <span>Claim</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
