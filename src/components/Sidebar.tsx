import React from 'react';

export type ScreenId =
  | 'overview-dashboard'
  | 'active-incident-triage-resolution'
  | 'incident-submission'
  | 'hindsight-memory-bank-vectors'
  | 'learning-loop-post-mortems'
  | 'hackathon-interactive-demo-flow';

interface SidebarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  liveIncidentActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  liveIncidentActive = true,
}) => {
  const navItems: { id: ScreenId; label: string; icon: string; live?: boolean }[] = [
    {
      id: 'overview-dashboard',
      label: 'Overview & Dashboard',
      icon: 'grid_view',
    },
    {
      id: 'active-incident-triage-resolution',
      label: 'Incident Triage & Resolution',
      icon: 'emergency_home',
      live: liveIncidentActive,
    },
    {
      id: 'incident-submission',
      label: 'Incident Submission',
      icon: 'add_alert',
    },
    {
      id: 'hindsight-memory-bank-vectors',
      label: 'Memory Bank & Vectors',
      icon: 'neurology',
    },
    {
      id: 'learning-loop-post-mortems',
      label: 'Learning & Post-Mortems',
      icon: 'history_edu',
    },
    {
      id: 'hackathon-interactive-demo-flow',
      label: 'Hackathon Demo Flow',
      icon: 'play_arrow',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-72 bg-[#0a0e16] border-r border-[#262a33] z-40 flex flex-col justify-between overflow-y-auto">
      <div className="py-4 flex flex-col gap-2">
        <div className="px-4 font-label-sm text-[10px] text-[#bdc8d1] tracking-wider uppercase font-bold">
          Command Vector
        </div>

        <nav className="flex flex-col gap-0.5 px-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`flex items-center justify-between px-3 py-2.5 font-label-md text-[12px] transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#8ed5ff] text-[#00354a] font-bold shadow-[0_0_12px_rgba(142,213,255,0.3)]'
                    : 'text-[#bdc8d1] hover:bg-[#262a33] hover:text-[#dfe2ee]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#00354a]' : 'text-[#8ed5ff]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.live && (
                  <span
                    className={`px-1.5 py-0.5 font-label-sm text-[9px] tracking-wider uppercase font-bold flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#00354a] text-[#8ed5ff]'
                        : 'bg-[#ffb4ab]/20 text-[#ffb4ab] animate-pulse border border-[#ffb4ab]/40'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-current"></span>
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Health & LPU Telemetry Box */}
      <div className="p-4 flex flex-col gap-3 bg-[#181c24] border-t border-[#262a33]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-label-sm text-[11px] text-[#bdc8d1]">
            <span className="uppercase font-bold tracking-wider">Hindsight Health</span>
            <span className="text-[#4fdbc8] font-bold">94.2%</span>
          </div>
          <div className="w-full bg-[#31353e] h-1.5">
            <div className="bg-[#4fdbc8] h-1.5 w-[94.2%] transition-all duration-500"></div>
          </div>
          <div className="flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1] pt-1">
            <span>MTTR Reduction</span>
            <span className="text-[#54ddfc] font-bold">-68%</span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1]">
            <span>Groq Inference</span>
            <span className="text-[#8ed5ff] font-bold font-mono">420 tps</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#262a33] flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-label-sm text-[10px]">
            <span className="text-[#bdc8d1]">Supabase DB</span>
            <span className="text-[#4fdbc8] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#4fdbc8]"></span>
              CONNECTED
            </span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-[10px]">
            <span className="text-[#bdc8d1]">Hindsight Store</span>
            <span className="text-[#4fdbc8] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#4fdbc8]"></span>
              SYNCED
            </span>
          </div>
          <div className="flex items-center justify-between font-label-sm text-[10px]">
            <span className="text-[#bdc8d1]">Groq LPU Array</span>
            <span className="text-[#4fdbc8] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#4fdbc8] animate-pulse"></span>
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
