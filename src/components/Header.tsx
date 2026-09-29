import React, { useState } from 'react';

interface HeaderProps {
  onOpenSearch: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, unreadCount = 3 }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0a0e16]/95 backdrop-blur-md border-b border-[#262a33]">
      <div className="w-full h-full px-4 flex items-center justify-between gap-3">
        {/* Left branding & system status */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => window.location.hash = 'overview-dashboard'}>
            {/* OpsMind Cybernetic Logo Icon */}
            <div className="w-8 h-8 rounded-none bg-[#111827] border border-[#38bdf8]/40 flex items-center justify-center p-1 relative overflow-hidden shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <circle cx="50" cy="50" r="40" stroke="#38bdf8" strokeWidth="6" strokeDasharray="10 8" />
                <circle cx="50" cy="28" r="8" fill="#54ddfc" />
                <line x1="50" y1="28" x2="50" y2="44" stroke="#54ddfc" strokeWidth="5" />
                <circle cx="30" cy="62" r="8" fill="#818cf8" />
                <circle cx="70" cy="62" r="8" fill="#4fdbc8" />
                <polyline points="34,50 48,64 74,38" stroke="#38bdf8" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            </div>
            <span className="font-title text-title text-[#dfe2ee] tracking-tight uppercase font-bold text-lg select-none">
              OpsMind AI
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-[#181c24] text-[#4fdbc8] font-label-sm text-[10px] tracking-wider border border-[#262a33]">
            <span className="w-1.5 h-1.5 bg-[#4fdbc8] inline-block animate-pulse"></span>
            <span>HINDSIGHT MEMORY V2.4 + GROQ LLAMA-3-70B</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#181c24] text-[#bdc8d1] font-label-sm text-[10px] tracking-wider border border-[#262a33]">
            <span className="w-1.5 h-1.5 bg-[#4fdbc8] inline-block"></span>
            <span>US-EAST-1: HEALTHY</span>
          </div>
        </div>

        {/* Right metrics & user deck */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5 px-2.5 py-1 bg-[#181c24] border border-[#262a33]">
            <div className="flex items-center gap-1 font-label-sm text-[11px] text-[#bdc8d1]">
              <span className="material-symbols-outlined text-[14px] text-[#54ddfc]">dataset</span>
              <span className="text-[#54ddfc] font-bold">1,428</span>
              <span>VECTORS</span>
            </div>
            <span className="text-[#3e484f]">|</span>
            <div className="flex items-center gap-1 font-label-sm text-[11px] text-[#bdc8d1]">
              <span className="material-symbols-outlined text-[14px] text-[#4fdbc8]">bolt</span>
              <span className="text-[#4fdbc8] font-bold">12ms</span>
              <span>LATENCY</span>
            </div>
          </div>

          {/* Quick CMD+K trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#1c2028] hover:bg-[#262a33] text-[#bdc8d1] hover:text-[#dfe2ee] font-label-sm text-[11px] border border-[#262a33] transition-colors cursor-pointer"
            title="Press Cmd+K to Search"
          >
            <span className="material-symbols-outlined text-[14px]">terminal</span>
            <span>CMD+K</span>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 text-[#bdc8d1] hover:text-[#dfe2ee] bg-[#181c24] border border-[#262a33] hover:border-[#38bdf8] transition-colors flex items-center justify-center cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#8ed5ff] animate-ping"></span>
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#38bdf8]"></span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#111827] border border-[#262a33] shadow-2xl z-50 p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-[#262a33] pb-2 font-label-sm text-[11px]">
                  <span className="text-[#8ed5ff] uppercase font-bold">System Alerts (3)</span>
                  <button onClick={() => setShowNotifications(false)} className="text-[#87929a] hover:text-white">✕</button>
                </div>
                <div className="flex flex-col gap-2 font-body-sm text-[11px]">
                  <div className="p-2 bg-[#181c24] border-l-2 border-[#ffb4ab]">
                    <div className="text-[#ffb4ab] font-bold">P1 Incident INC-8921 Active</div>
                    <div className="text-[#87929a] text-[10px]">Payment Gateway 504 threshold exceeded (4.2%)</div>
                  </div>
                  <div className="p-2 bg-[#181c24] border-l-2 border-[#4fdbc8]">
                    <div className="text-[#4fdbc8] font-bold">Vector Ingestion Synced</div>
                    <div className="text-[#87929a] text-[10px]">4 new post-mortems committed to hyperspace</div>
                  </div>
                  <div className="p-2 bg-[#181c24] border-l-2 border-[#54ddfc]">
                    <div className="text-[#54ddfc] font-bold">Groq LPU Benchmark 420 tps</div>
                    <div className="text-[#87929a] text-[10px]">L40S cluster operational with 12ms avg latency</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SRE User Badge */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#262a33]">
            <div className="hidden text-right sm:block">
              <div className="font-label-sm text-[10px] text-[#dfe2ee] font-bold leading-tight">LEAD SRE</div>
              <div className="font-label-sm text-[9px] text-[#4fdbc8] flex items-center justify-end gap-1">
                <span className="w-1.5 h-1.5 bg-[#4fdbc8]"></span>
                ACTIVE
              </div>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-[#8ed5ff] text-[#00354a] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#4fdbc8] ring-2 ring-[#0a0e16]"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
