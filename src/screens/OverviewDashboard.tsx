import React, { useState } from 'react';
import { ScreenId } from '../components/Sidebar';
import { LIVE_INCIDENTS_STREAM } from '../data/mockData';

interface OverviewDashboardProps {
  onNavigate: (screen: ScreenId, param?: string) => void;
  onOpenRawQuery: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onOpenRawQuery,
}) => {
  const [activeWindow, setActiveWindow] = useState<'24H' | '7D' | '30D' | 'ALL'>('24H');
  const [selectedIncident, setSelectedIncident] = useState<string | null>('#INC-8491');

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Command Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <div className="flex items-center gap-2 font-label-sm text-[11px]">
          <span className="px-2 py-0.5 bg-[#262a33] text-[#8ed5ff] uppercase tracking-wider font-bold">
            KERNEL_SESSION: #4092-OPS
          </span>
          <span className="text-[#3e484f]">/</span>
          <span className="text-[#bdc8d1] flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#4fdbc8] inline-block animate-pulse"></span>
            GROQ LPU L40S CLUSTER [ACTIVE]
          </span>
          <span className="hidden md:inline text-[#3e484f]">/</span>
          <span className="hidden md:inline text-[#bdc8d1]">
            VECTOR_INDEX: pgvector_cosine_v2
          </span>
        </div>

        <div className="flex items-center gap-1 font-label-sm text-[11px]">
          <span className="text-[#bdc8d1] mr-1">WINDOW:</span>
          {(['24H', '7D', '30D', 'ALL'] as const).map((w) => (
            <button
              key={w}
              onClick={() => setActiveWindow(w)}
              className={`px-2.5 py-1 font-bold transition-colors cursor-pointer ${
                activeWindow === w
                  ? 'bg-[#8ed5ff] text-[#00354a]'
                  : 'bg-[#181c24] text-[#bdc8d1] hover:text-[#dfe2ee]'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Headline Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
        <div>
          <div className="font-label-sm text-[11px] text-[#8ed5ff] uppercase tracking-widest flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">memory</span>
            OpsMind Neural Telemetry Deck
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#dfe2ee] tracking-tight mt-0.5">
            Incident Analytics &amp; Memory Overview
          </h1>
          <p className="font-body-md text-body-md text-[#bdc8d1] max-w-3xl mt-1">
            Continuous auto-triage loop via <span className="text-[#4fdbc8] font-bold">Hindsight Memory V2.4</span> and ultra-fast{' '}
            <span className="text-[#8ed5ff] font-bold">Groq Llama-3-70B</span> execution. Vector-grounded recurrence suppression benchmarked against 45m industry MTTR.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenRawQuery}
            className="px-4 py-2.5 bg-[#262a33] text-[#8ed5ff] hover:bg-[#31353e] font-label-sm text-[11px] uppercase tracking-wider flex items-center gap-2 border border-[#3e484f] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>Run Raw Query</span>
          </button>
          <button
            onClick={() => onNavigate('hackathon-interactive-demo-flow')}
            className="px-4 py-2.5 bg-[#8ed5ff] text-[#00354a] hover:bg-[#54ddfc] font-label-sm text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_circle</span>
            <span>Simulate Incident Demo</span>
          </button>
        </div>
      </div>

      {/* Top 4 Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {/* Stat 1: Total Incidents */}
        <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <span className="font-label-sm text-[11px] text-[#bdc8d1] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#8ed5ff]">data_array</span>
              Total Incidents Managed
            </span>
            <span className="px-1.5 py-0.5 bg-[#8ed5ff]/10 text-[#8ed5ff] font-label-sm text-[10px] uppercase font-bold">
              +12% MoM
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-[#dfe2ee] font-bold tracking-tight">348</span>
            <span className="font-label-sm text-[11px] text-[#4fdbc8] font-bold">98.4% RESOLVED</span>
          </div>
          <div className="pt-2 flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1]">
            <span>Active cluster triage: 3 nodes</span>
            <span className="text-[#dfe2ee]">342 Auto-closed</span>
          </div>
          <div className="w-full bg-[#31353e] h-1.5 mt-2">
            <div className="bg-[#8ed5ff] h-1.5 w-[98.4%]"></div>
          </div>
        </div>

        {/* Stat 2: Critical P0/P1 */}
        <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <span className="font-label-sm text-[11px] text-[#bdc8d1] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#ffb4ab]">fmd_bad</span>
              Critical (P0 / P1)
            </span>
            <span className="px-1.5 py-0.5 bg-[#ffb4ab]/20 text-[#ffb4ab] font-label-sm text-[10px] uppercase font-bold flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-[#ffb4ab]"></span> 0 SLA BREACH
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-[#ffb4ab] font-bold tracking-tight">14</span>
            <span className="font-label-sm text-[11px] text-[#bdc8d1]">/ 30-day index</span>
          </div>
          <div className="pt-2 flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1]">
            <span className="text-[#4fdbc8] flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span> 100% STABILIZED
            </span>
            <span className="text-[#87929a] font-mono">0 ACTIVE BLOCKERS</span>
          </div>
          <div className="w-full bg-[#31353e] h-1.5 mt-2">
            <div className="bg-[#ffb4ab] h-1.5 w-[100%]"></div>
          </div>
        </div>

        {/* Stat 3: Avg MTTR */}
        <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <span className="font-label-sm text-[11px] text-[#bdc8d1] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#4fdbc8]">timer</span>
              Mean Time To Recover
            </span>
            <span className="px-1.5 py-0.5 bg-[#4fdbc8]/15 text-[#4fdbc8] font-label-sm text-[10px] uppercase font-bold">
              -68% DELTA
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-[#4fdbc8] font-bold tracking-tight">
              14.2<span className="font-title text-[18px] text-[#bdc8d1] font-normal ml-1">min</span>
            </span>
            <span className="font-label-sm text-[11px] text-[#87929a] line-through">45m BASELINE</span>
          </div>
          <div className="pt-2 flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1]">
            <span>Repeat vector triage: <b className="text-[#4fdbc8] font-mono">7.8m</b></span>
            <span className="text-[#54ddfc]">Recurrence -82%</span>
          </div>
          <div className="w-full bg-[#31353e] h-1.5 mt-2">
            <div className="bg-[#4fdbc8] h-1.5 w-[68%]"></div>
          </div>
        </div>

        {/* Stat 4: Memory Vectors */}
        <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <span className="font-label-sm text-[11px] text-[#bdc8d1] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-[#54ddfc]">neurology</span>
              Hindsight Vector Index
            </span>
            <span className="px-1.5 py-0.5 bg-[#54ddfc]/15 text-[#54ddfc] font-label-sm text-[10px] uppercase font-bold">
              GROQ SPEED
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline-lg text-headline-lg text-[#54ddfc] font-bold tracking-tight">1,428</span>
            <span className="font-label-sm text-[11px] text-[#dfe2ee]">VECTORS</span>
          </div>
          <div className="pt-2 flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1]">
            <span>Auto-root-cause match:</span>
            <span className="text-[#4fdbc8] font-bold font-mono">94.8% ACCURACY</span>
          </div>
          <div className="w-full bg-[#31353e] h-1.5 mt-2">
            <div className="bg-[#54ddfc] h-1.5 w-[94.8%]"></div>
          </div>
        </div>
      </div>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (8 cols): Timeline, Taxonomy, Live Stream */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Panel 1: MTTR Reduction Timeline Chart */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#4fdbc8] inline-block"></span>
                  <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase tracking-wider font-bold">Telemetry Convergence</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-[#dfe2ee] mt-0.5">
                  Incident Volume &amp; MTTR Reduction Timeline
                </h2>
                <p className="font-body-sm text-body-sm text-[#bdc8d1]">
                  Observed telemetry: Pre-Hindsight baseline (~52 mins) collapsed to 8 mins on repeat vector matches.
                </p>
              </div>
              <div className="flex items-center gap-4 font-label-sm text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#31353e] inline-block"></span>
                  <span className="text-[#bdc8d1]">Traditional MTTR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-[#4fdbc8] inline-block"></span>
                  <span className="text-[#4fdbc8] font-bold">OpsMind + Groq</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Telemetry Chart */}
            <div className="w-full bg-[#0a0e16] p-3 border border-[#262a33] relative">
              <div className="h-56 w-full relative">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 760 210">
                  <defs>
                    <linearGradient id="gradientSecondary" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4fdbc8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#4fdbc8" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="gradientBaseline" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#87929a" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#87929a" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="0" y1="20" x2="760" y2="20" stroke="#262a33" strokeDasharray="2,3" strokeWidth="1" />
                  <text x="5" y="16" fill="#87929a" fontFamily="Space Mono" fontSize="9">60m</text>
                  <line x1="0" y1="65" x2="760" y2="65" stroke="#262a33" strokeDasharray="2,3" strokeWidth="1" />
                  <text x="5" y="61" fill="#87929a" fontFamily="Space Mono" fontSize="9">45m (Baseline)</text>
                  <line x1="0" y1="110" x2="760" y2="110" stroke="#262a33" strokeDasharray="2,3" strokeWidth="1" />
                  <text x="5" y="106" fill="#87929a" fontFamily="Space Mono" fontSize="9">30m</text>
                  <line x1="0" y1="155" x2="760" y2="155" stroke="#262a33" strokeDasharray="2,3" strokeWidth="1" />
                  <text x="5" y="151" fill="#4fdbc8" fontFamily="Space Mono" fontSize="9">15m (Hindsight Active)</text>
                  <line x1="0" y1="190" x2="760" y2="190" stroke="#31353e" strokeWidth="1" />

                  {/* Traditional MTTR line */}
                  <polygon fill="url(#gradientBaseline)" points="40,55 100,52 160,58 220,54 280,50 340,52 400,56 460,53 520,55 580,52 640,51 720,54 720,190 40,190" />
                  <polyline fill="none" points="40,55 100,52 160,58 220,54 280,50 340,52 400,56 460,53 520,55 580,52 640,51 720,54" stroke="#87929a" strokeDasharray="4,4" strokeWidth="2" />

                  {/* OpsMind AI + Hindsight Curve */}
                  <polygon fill="url(#gradientSecondary)" points="40,58 100,54 160,49 220,44 280,32 340,85 400,120 460,145 520,160 580,168 640,174 720,176 720,190 40,190" />
                  <polyline fill="none" points="40,58 100,54 160,49 220,44 280,32 340,85 400,120 460,145 520,160 580,168 640,174 720,176" stroke="#4fdbc8" strokeWidth="2.5" />

                  {/* Milestone Marker */}
                  <line x1="340" y1="20" x2="340" y2="190" stroke="#38bdf8" strokeDasharray="2,2" strokeWidth="1" />
                  <circle cx="340" cy="85" r="4" fill="#38bdf8" />
                  <circle cx="520" cy="160" r="3" fill="#4fdbc8" />
                  <circle cx="640" cy="174" r="3" fill="#4fdbc8" />
                  <circle cx="720" cy="176" r="4" fill="#71f8e4" />
                </svg>

                <div className="absolute top-4 left-1/3 bg-[#262a33]/90 px-2 py-1 font-label-sm text-[10px] text-[#8ed5ff] border border-[#38bdf8]/40 shadow-sm pointer-events-none">
                  ▲ HINDSIGHT DEPLOYED (V1.0)
                </div>
                <div className="absolute bottom-6 right-6 bg-[#262a33]/90 px-2 py-1 font-label-sm text-[10px] text-[#4fdbc8] border border-[#4fdbc8]/40 shadow-sm pointer-events-none">
                  ⚡ RECURRENCE MTTR: 7.8 MINS
                </div>
              </div>

              <div className="flex items-center justify-between font-label-sm text-[10px] text-[#bdc8d1] pt-2 px-2 border-t border-[#262a33]/50">
                <span>WEEK 01 (MANUAL)</span>
                <span>WEEK 02</span>
                <span>WEEK 03 (VECTOR V1)</span>
                <span>WEEK 04</span>
                <span>WEEK 05 (GROQ ACCELERATED)</span>
                <span className="text-[#4fdbc8] font-bold">CURRENT (LIVE)</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Frequent Failure Signatures & Vector Recurrence */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
              <div>
                <span className="font-label-sm text-[10px] text-[#54ddfc] uppercase tracking-wider font-bold">Root-Cause Taxonomy Analysis</span>
                <h3 className="font-title text-title text-[#dfe2ee] font-bold">
                  Frequent Failure Signatures &amp; Vector Recurrence Suppression
                </h3>
              </div>
              <span className="font-label-sm text-[11px] text-[#bdc8d1]">1,428 Embeddings Indexed</span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {/* Category 1 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] hover:border-[#ffb4ab] transition-colors">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1.5">
                  <span className="text-[#dfe2ee] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#ffb4ab] inline-block"></span>
                    Postgres Connection Pool Exhaustion [PgBouncer MaxClients]
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ffb4ab] font-bold font-mono">42% FREQUENCY</span>
                    <span className="text-[#3e484f]">|</span>
                    <span className="text-[#4fdbc8] font-mono">604 vectors</span>
                  </div>
                </div>
                <div className="w-full bg-[#0a0e16] h-2 overflow-hidden">
                  <div className="bg-[#ffb4ab] h-2 w-[42%]"></div>
                </div>
                <div className="flex items-center justify-between pt-1.5 font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>Hindsight Match: <span className="text-[#8ed5ff] font-mono">vector_id::pg_pool_leak_904</span></span>
                  <span className="text-[#4fdbc8]">Resolved in 4.2m avg via idle session killer rule</span>
                </div>
              </div>

              {/* Category 2 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] hover:border-[#54ddfc] transition-colors">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1.5">
                  <span className="text-[#dfe2ee] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#54ddfc] inline-block"></span>
                    Redis OOM Buffer Overflow &amp; Replica Sync Desync
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#54ddfc] font-bold font-mono">26% FREQUENCY</span>
                    <span className="text-[#3e484f]">|</span>
                    <span className="text-[#4fdbc8] font-mono">371 vectors</span>
                  </div>
                </div>
                <div className="w-full bg-[#0a0e16] h-2 overflow-hidden">
                  <div className="bg-[#54ddfc] h-2 w-[26%]"></div>
                </div>
                <div className="flex items-center justify-between pt-1.5 font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>Hindsight Match: <span className="text-[#8ed5ff] font-mono">vector_id::redis_client_output_lim</span></span>
                  <span className="text-[#4fdbc8]">Auto-remediation playbook attached</span>
                </div>
              </div>

              {/* Category 3 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] hover:border-[#8ed5ff] transition-colors">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1.5">
                  <span className="text-[#dfe2ee] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#8ed5ff] inline-block"></span>
                    gRPC Token Expiry Cascades &amp; JWKS Cache Thrashing
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#8ed5ff] font-bold font-mono">18% FREQUENCY</span>
                    <span className="text-[#3e484f]">|</span>
                    <span className="text-[#4fdbc8] font-mono">257 vectors</span>
                  </div>
                </div>
                <div className="w-full bg-[#0a0e16] h-2 overflow-hidden">
                  <div className="bg-[#8ed5ff] h-2 w-[18%]"></div>
                </div>
                <div className="flex items-center justify-between pt-1.5 font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>Hindsight Match: <span className="text-[#8ed5ff] font-mono">vector_id::auth_jwks_burst_jitter</span></span>
                  <span className="text-[#4fdbc8]">Jitter backoff injected to edge mesh</span>
                </div>
              </div>

              {/* Category 4 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] hover:border-[#4fdbc8] transition-colors">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1.5">
                  <span className="text-[#dfe2ee] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#4fdbc8] inline-block"></span>
                    Kafka Consumer Lag Spillover &amp; Partition Rebalance Loop
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#4fdbc8] font-bold font-mono">14% FREQUENCY</span>
                    <span className="text-[#3e484f]">|</span>
                    <span className="text-[#4fdbc8] font-mono">196 vectors</span>
                  </div>
                </div>
                <div className="w-full bg-[#0a0e16] h-2 overflow-hidden">
                  <div className="bg-[#4fdbc8] h-2 w-[14%]"></div>
                </div>
                <div className="flex items-center justify-between pt-1.5 font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>Hindsight Match: <span className="text-[#8ed5ff] font-mono">vector_id::kafka_heartbeat_timeout_adj</span></span>
                  <span className="text-[#4fdbc8]">Static group membership enforced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Live Incident Stream & Automated Vector Associations */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#ffb4ab] inline-block animate-pulse"></span>
                  <span className="font-label-sm text-[10px] text-[#ffb4ab] uppercase tracking-wider font-bold">Realtime Ingestion</span>
                </div>
                <h3 className="font-title text-title text-[#dfe2ee] font-bold">
                  Live Incident Stream &amp; Automated Vector Associations
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[11px] text-[#bdc8d1]">AUTO-REFRESH: 2s</span>
                <span className="px-2 py-0.5 bg-[#1c2028] text-[#4fdbc8] font-label-sm text-[10px] border border-[#262a33]">SYNCED</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-[#262a33]">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-[#0a0e16] font-label-sm text-[11px] text-[#bdc8d1] uppercase border-b border-[#262a33]">
                  <tr>
                    <th className="py-2.5 px-3">Incident ID</th>
                    <th className="py-2.5 px-3">Failure Signature</th>
                    <th className="py-2.5 px-3">Target Service</th>
                    <th className="py-2.5 px-3">Sev</th>
                    <th className="py-2.5 px-3">Memory Match</th>
                    <th className="py-2.5 px-3 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262a33]/60">
                  {LIVE_INCIDENTS_STREAM.map((inc) => {
                    const isSelected = selectedIncident === inc.id;
                    return (
                      <tr
                        key={inc.id}
                        onClick={() => {
                          setSelectedIncident(inc.id);
                          onNavigate('active-incident-triage-resolution');
                        }}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#262a33]' : 'bg-[#181c24] hover:bg-[#1c2028]'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-label-sm text-[12px] text-[#8ed5ff] font-bold">
                          {inc.id}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-body-md text-[#dfe2ee] font-bold">{inc.title}</div>
                          <div className="font-label-sm text-[10px] text-[#bdc8d1]">{inc.context}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-1.5 py-0.5 bg-[#0a0e16] text-[#dfe2ee] font-label-sm text-[10px] border border-[#262a33]">
                            {inc.service}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-1.5 py-0.5 font-label-sm text-[10px] font-bold ${
                              inc.severity === 'P1'
                                ? 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                                : inc.severity === 'P2'
                                ? 'bg-[#54ddfc]/20 text-[#54ddfc]'
                                : 'bg-[#8ed5ff]/20 text-[#8ed5ff]'
                            }`}
                          >
                            {inc.severity} {inc.severity === 'P1' ? 'CRIT' : inc.severity === 'P2' ? 'WARN' : 'INFO'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5 text-[#4fdbc8] font-label-sm text-[10px]">
                            <span className="material-symbols-outlined text-[14px]">neurology</span>
                            <span>{inc.similarity}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase ${
                              inc.state === 'TRIAGED'
                                ? 'bg-[#4fdbc8]/15 text-[#4fdbc8]'
                                : inc.state === 'RESOLVED'
                                ? 'bg-[#4fdbc8]/15 text-[#4fdbc8]'
                                : inc.state === 'AUTO-PATCHED'
                                ? 'bg-[#8ed5ff]/15 text-[#8ed5ff]'
                                : 'bg-[#262a33] text-[#bdc8d1]'
                            }`}
                          >
                            {inc.state} {inc.state === 'TRIAGED' && `(${inc.mttrMinutes}m)`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Directives, LPU Benchmarks, Quick Actions */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Widget 1: Learned Post-Mortem Directives */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#4fdbc8] text-[18px]">history_edu</span>
                <span className="font-label-sm text-[11px] text-[#4fdbc8] uppercase font-bold tracking-wider">Hindsight Feed</span>
              </div>
              <span className="px-1.5 py-0.5 bg-[#4fdbc8]/15 text-[#4fdbc8] font-label-sm text-[9px] font-bold uppercase">
                COMMITTED
              </span>
            </div>

            <div>
              <h3 className="font-title text-title text-[#dfe2ee] font-bold">
                Learned Post-Mortem Directives
              </h3>
              <p className="font-body-sm text-body-sm text-[#bdc8d1] mt-1">
                Actionable engineering rules committed automatically to vector store upon post-mortem approval.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {/* Directive 1 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33]">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1">
                  <span className="text-[#54ddfc] font-bold">PAYMENT-GATEWAY</span>
                  <span className="text-[#87929a] font-mono">2h ago</span>
                </div>
                <div className="font-body-sm text-body-sm text-[#dfe2ee]">
                  Set <code className="text-[#8ed5ff] bg-[#0a0e16] px-1 py-0.5">idle_in_transaction_session_timeout</code> to{' '}
                  <code className="text-[#8ed5ff] bg-[#0a0e16] px-1 py-0.5">15s</code>.
                </div>
                <div className="pt-1.5 font-label-sm text-[10px] text-[#4fdbc8] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">shield</span>
                  <span>Averts zombie pgbouncer thread saturation</span>
                </div>
              </div>

              {/* Directive 2 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33]">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1">
                  <span className="text-[#54ddfc] font-bold">AUTH-SERVICE</span>
                  <span className="text-[#87929a] font-mono">6h ago</span>
                </div>
                <div className="font-body-sm text-body-sm text-[#dfe2ee]">
                  Enforce exponential backoff jitter on JWKS cache invalidation during token burst refresh events.
                </div>
                <div className="pt-1.5 font-label-sm text-[10px] text-[#4fdbc8] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">shield</span>
                  <span>Eliminated dogpiling cache thundering herd</span>
                </div>
              </div>

              {/* Directive 3 */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33]">
                <div className="flex items-center justify-between font-label-sm text-[11px] pb-1">
                  <span className="text-[#54ddfc] font-bold">CHECKOUT-API</span>
                  <span className="text-[#87929a] font-mono">1d ago</span>
                </div>
                <div className="font-body-sm text-body-sm text-[#dfe2ee]">
                  Throttle non-critical audit payloads via secondary async queue during Stripe rate-limit responses.
                </div>
                <div className="pt-1.5 font-label-sm text-[10px] text-[#4fdbc8] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">shield</span>
                  <span>Prevented 429 webhook retry amplification</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('learning-loop-post-mortems')}
              className="mt-1 block text-center py-2 bg-[#262a33] hover:bg-[#31353e] text-[#8ed5ff] font-label-sm text-[11px] font-bold uppercase tracking-wider transition-colors border border-[#3e484f] cursor-pointer"
            >
              Browse All 1,428 Post-Mortem Vectors →
            </button>
          </div>

          {/* Widget 2: Groq LPU & Vector Benchmarks */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <span className="font-label-sm text-[11px] text-[#8ed5ff] uppercase font-bold tracking-wider">
                Engine Performance
              </span>
              <span className="px-1.5 py-0.5 bg-[#8ed5ff]/20 text-[#8ed5ff] font-label-sm text-[9px] uppercase font-bold">
                LPUs ONLINE
              </span>
            </div>

            <h3 className="font-title text-title text-[#dfe2ee] font-bold">
              Groq LPU &amp; Vector Benchmarks
            </h3>

            {/* Dual Gauge Telemetry */}
            <div className="grid grid-cols-2 gap-3 my-1">
              {/* Circular Ring 1: Groq Speed */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#262a33"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8ed5ff"
                      strokeDasharray="92, 100"
                      strokeLinecap="butt"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-title text-[22px] text-[#dfe2ee] font-bold font-mono">440</span>
                    <span className="font-label-sm text-[9px] text-[#8ed5ff]">T/SEC</span>
                  </div>
                </div>
                <span className="font-label-sm text-[11px] text-[#dfe2ee] font-bold mt-2">Groq Llama-3-70B</span>
                <span className="font-label-sm text-[10px] text-[#bdc8d1]">Sub-50ms TTFT</span>
              </div>

              {/* Circular Ring 2: Cosine Vector Match */}
              <div className="bg-[#1c2028] p-3 border border-[#262a33] flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#262a33"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4fdbc8"
                      strokeDasharray="91, 100"
                      strokeLinecap="butt"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-title text-[22px] text-[#dfe2ee] font-bold font-mono">0.91</span>
                    <span className="font-label-sm text-[9px] text-[#4fdbc8]">COSINE</span>
                  </div>
                </div>
                <span className="font-label-sm text-[11px] text-[#dfe2ee] font-bold mt-2">Avg Vector Match</span>
                <span className="font-label-sm text-[10px] text-[#bdc8d1]">Top-3 Similarity</span>
              </div>
            </div>

            <div className="space-y-1.5 font-label-sm text-[11px]">
              <div className="flex items-center justify-between p-2 bg-[#1c2028] border border-[#262a33]">
                <span className="text-[#bdc8d1]">LPU Inference Latency:</span>
                <span className="text-[#4fdbc8] font-mono font-bold">12.4ms</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#1c2028] border border-[#262a33]">
                <span className="text-[#bdc8d1]">Memory Hit Rate (Cold/Warm):</span>
                <span className="text-[#8ed5ff] font-mono font-bold">96.3%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#1c2028] border border-[#262a33]">
                <span className="text-[#bdc8d1]">Vector Index Size:</span>
                <span className="text-[#dfe2ee] font-mono">14.8 MB (pgvector)</span>
              </div>
            </div>
          </div>

          {/* Quick Action CTA Card */}
          <div className="bg-[#262a33] p-4 border border-[#3e484f] shadow-lg flex flex-col gap-2">
            <div className="font-label-sm text-[11px] text-[#8ed5ff] uppercase font-bold tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Executive Operational Actions
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#dfe2ee] font-bold">
              Trigger Instant Incident Simulation
            </h3>
            <p className="font-body-sm text-body-sm text-[#bdc8d1] mb-2">
              Inject a synthetic PgBouncer saturation spike to watch Groq synthesize root-cause telemetry and query Hindsight memory in under 800ms.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('hackathon-interactive-demo-flow')}
                className="w-full text-center py-3 bg-[#4fdbc8] text-[#003731] hover:bg-[#71f8e4] font-label-md text-label-md font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                Launch Interactive Hackathon Demo
              </button>
              <button
                onClick={() => onNavigate('incident-submission')}
                className="w-full text-center py-2.5 bg-[#0a0e16] text-[#dfe2ee] hover:text-[#8ed5ff] font-label-sm text-label-sm font-bold uppercase tracking-wider transition-colors border border-[#262a33] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_alert</span>
                Report Manual Incident
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
