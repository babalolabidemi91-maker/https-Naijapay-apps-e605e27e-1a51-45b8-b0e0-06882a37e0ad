import React, { useState } from 'react';
import { X, Headphones, Send, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupportModal: React.FC = () => {
  const { activeModal, closeModal } = useApp();
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    {
      sender: 'agent',
      text: 'Hello! Welcome to Naija Pay 24/7 Priority Support. How can we help your earnings or withdrawal today?',
    },
  ]);
  const [input, setInput] = useState('');

  if (activeModal !== 'support') return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let reply = 'Thank you for reaching out! Our dedicated payment routing team is online. Payouts are dispatched within 60 seconds.';
      if (userText.toLowerCase().includes('withdraw')) {
        reply = 'Bank withdrawals are processed instantly via NIBSS. Check your History tab for payment references.';
      } else if (userText.toLowerCase().includes('bonus')) {
        reply = 'You can claim your ₦30,000.00 Welcome Bonus directly on your dashboard by tapping the bonus banner!';
      }
      setMessages((prev) => [...prev, { sender: 'agent', text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#063321] via-[#042417] to-[#02150d] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <button
          id="close-support-modal"
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0d3b28] text-emerald-200 hover:text-white flex items-center justify-center transition-colors border border-emerald-600/40 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between mb-3 pr-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white text-emerald-900 flex items-center justify-center shadow-md">
              <Headphones className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                24/7 Live Desk
              </h2>
              <p className="text-[11px] text-emerald-300 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Support Agents Online
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Group Quick Access Banner in Support */}
        <a
          href="https://chat.whatsapp.com/HCSBFUakHeA8EznuojrF61?s=cl&p=a&ilr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 p-2.5 bg-[#031d13] border border-emerald-500/40 rounded-2xl flex items-center justify-between hover:bg-[#073623] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-emerald-900 flex items-center justify-center text-xs font-black shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Join Official WhatsApp Group</div>
              <div className="text-[10px] text-emerald-300">Live Community & Admin Channel</div>
            </div>
          </div>
          <span className="text-[10px] font-black bg-white text-emerald-950 px-2.5 py-1 rounded-lg shadow-sm">Join</span>
        </a>

        {/* Chat Box */}
        <div className="flex-1 bg-[#031d13] border border-emerald-500/30 rounded-2xl p-3.5 space-y-2.5 overflow-y-auto min-h-[220px] max-h-[280px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-white text-emerald-950 font-semibold rounded-br-none shadow-sm'
                    : 'bg-[#04281a] text-slate-100 border border-emerald-500/30 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="mt-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-[#031d13] border border-emerald-600/50 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-400/40 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="bg-white hover:bg-emerald-50 text-emerald-950 px-3.5 py-2 rounded-xl text-xs font-black flex items-center justify-center shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>
    </div>
  );
};
