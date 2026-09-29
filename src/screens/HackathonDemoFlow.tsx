import React, { useState, useEffect } from 'react';
import { ScreenId } from '../components/Sidebar';

interface HackathonDemoFlowProps {
  onNavigate: (screen: ScreenId) => void;
}

export const HackathonDemoFlow: React.FC<HackathonDemoFlowProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[SYSTEM] OpsMind telemetry engine initialized. 1,428 vectors loaded from Supabase.',
    '[LPU READY] Groq Llama-3-70B session online. Latency target: <15ms.',
  ]);

  const steps = [
    {
      step: 1,
      title: 'ANOMALY INGESTION',
      icon: 'warning',
      badge: 'PROD ANOMALY DETECTED',
      badgeColor: 'bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/40',
      description: 'Incoming Stripe webhook retry spike floods payment-gateway with 420 req/s. PgBouncer connection pool reaches 100/100 ceiling within 18 seconds.',
      metricLabel: 'Connection Saturation',
      metricValue: '100% (Ceiling Hit)',
      actionText: 'Inject Synthetic Traffic Surge',
    },
    {
      step: 2,
      title: 'HINDSIGHT VECTOR SEARCH',
      icon: 'neurology',
      badge: '12ms QUERY LATENCY',
      badgeColor: 'bg-[#4fdbc8]/20 text-[#4fdbc8] border-[#4fdbc8]/40',
      description: 'Raw error trace buffer is embedded via 1536-D model and queried against 1,428 vectors in Supabase pgvector. 96.4% cosine match identified with INC-4102.',
      metricLabel: 'Vector Match Score',
      metricValue: '0.964 COSINE SIMILARITY',
      actionText: 'Query Hyperspace Memory',
    },
    {
      step: 3,
      title: 'WAR ROOM AUTO-TRIAGE',
      icon: 'psychology',
      badge: '0.4s INFERENCE',
      badgeColor: 'bg-[#8ed5ff]/20 text-[#8ed5ff] border-[#8ed5ff]/40',
      description: 'Groq LPU Llama-3-70B synthesizes root cause (idle_in_transaction lock leak) and constructs a safe, 3-step autonomous remediation execution plan.',
      metricLabel: 'AI Reasoning Confidence',
      metricValue: '98.2% DETERMINISTIC',
      actionText: 'Synthesize Remediation Plan',
    },
    {
      step: 4,
      title: 'AUTONOMOUS REMEDIATION',
      icon: 'bolt',
      badge: 'ZERO MANUAL TOIL',
      badgeColor: 'bg-[#4fdbc8]/20 text-[#4fdbc8] border-[#4fdbc8]/40',
      description: 'Step 1 terminates 68 hung transactions. Step 2 applies GitOps patch scaling PgBouncer pool ceiling to 250. Step 3 clamps WAF rate limit. P99 drops from 2,410ms to 48ms.',
      metricLabel: 'Execution Downtime',
      metricValue: '7m 48s (vs 52m baseline)',
      actionText: 'Deploy Autonomous Hotfixes',
    },
    {
      step: 5,
      title: 'VECTOR COMMITMENT LOOP',
      icon: 'history_edu',
      badge: 'KNOWLEDGE COMMITTED',
      badgeColor: 'bg-[#54ddfc]/20 text-[#54ddfc] border-[#54ddfc]/40',
      description: 'Engineering post-mortem PM-8921 is generated with 5-Whys analysis and committed to vector storage. The system will never suffer this root cause again without instant 3m recovery.',
      metricLabel: 'Permanent Recurrence Suppression',
      metricValue: '-82% REPEAT INCIDENTS',
      actionText: 'Commit Vector to Memory',
    },
  ];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const s = steps[currentStep - 1];
    setConsoleLogs((prev) => [
      ...prev,
      `[STEP ${currentStep}: ${s.title}] ${s.description.slice(0, 70)}... [OK]`,
    ]);
  }, [currentStep]);

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Top Banner */}
      <div className="p-4 bg-[#0a0e16] border border-[#262a33] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2 text-[#71f8e4] font-label-sm text-[11px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#71f8e4] inline-block animate-pulse"></span>
            <span>Interactive Demonstration Deck // End-to-End Autonomous SRE</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#dfe2ee] tracking-tight uppercase">
            Hackathon Live Demo Flow
          </h1>
          <p className="font-body-md text-body-md text-[#bdc8d1]">
            Experience the full autonomous loop: from raw telemetry spike to sub-15ms vector memory recall, Groq LPU triage, automated GitOps patching, and post-mortem memory commitment.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2.5 font-label-sm text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md ${
              isPlaying
                ? 'bg-[#ffb4ab] text-[#690005]'
                : 'bg-[#4fdbc8] text-[#003731] hover:bg-[#71f8e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Demo'}</span>
          </button>
          <button
            onClick={() => {
              setCurrentStep(1);
              setIsPlaying(false);
            }}
            className="px-3 py-2.5 bg-[#262a33] text-[#dfe2ee] hover:bg-[#31353e] font-label-sm text-[11px] uppercase tracking-wider border border-[#3e484f] transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Step Tracker Horizontal Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {steps.map((st) => {
          const isActive = currentStep === st.step;
          const isDone = currentStep > st.step;
          return (
            <button
              key={st.step}
              onClick={() => setCurrentStep(st.step)}
              className={`p-3 text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                isActive
                  ? 'bg-[#1c2028] border-[#8ed5ff] shadow-[0_0_12px_rgba(142,213,255,0.25)]'
                  : isDone
                  ? 'bg-[#181c24] border-[#4fdbc8] text-[#bdc8d1]'
                  : 'bg-[#0a0e16] border-[#262a33] text-[#87929a] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between font-label-sm text-[10px]">
                <span className="font-bold">STEP 0{st.step}</span>
                {isDone ? (
                  <span className="text-[#4fdbc8] font-bold">✓ DONE</span>
                ) : isActive ? (
                  <span className="text-[#8ed5ff] font-bold animate-pulse">ACTIVE</span>
                ) : (
                  <span>PENDING</span>
                )}
              </div>
              <div className="font-title text-[12px] font-bold text-[#dfe2ee] truncate">
                {st.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Chassis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Stage (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {(() => {
            const active = steps[currentStep - 1];
            return (
              <div className="bg-[#181c24] p-5 border border-[#262a33] shadow-xl flex flex-col gap-4 relative">
                <div className="flex items-center justify-between pb-2 border-b border-[#262a33]">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#8ed5ff] text-[#00354a] flex items-center justify-center font-bold text-sm">
                      0{active.step}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-[#dfe2ee] font-bold">
                      {active.title}
                    </h3>
                  </div>
                  <span className={`px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase border ${active.badgeColor}`}>
                    {active.badge}
                  </span>
                </div>

                <p className="font-body-md text-[14px] text-[#dfe2ee] leading-relaxed bg-[#0a0e16] p-4 border border-[#262a33]">
                  {active.description}
                </p>

                {/* Live Simulation Metric Highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#1c2028] p-3 border border-[#262a33]">
                    <span className="font-label-sm text-[10px] text-[#87929a] uppercase block">
                      {active.metricLabel}
                    </span>
                    <span className="font-headline-sm text-[18px] text-[#4fdbc8] font-bold font-mono">
                      {active.metricValue}
                    </span>
                  </div>

                  <div className="bg-[#1c2028] p-3 border border-[#262a33]">
                    <span className="font-label-sm text-[10px] text-[#87929a] uppercase block">
                      Autonomous Pipeline Latency
                    </span>
                    <span className="font-headline-sm text-[18px] text-[#8ed5ff] font-bold font-mono">
                      {currentStep === 1
                        ? '18ms (Ingest)'
                        : currentStep === 2
                        ? '12.4ms (Vector Cosine)'
                        : currentStep === 3
                        ? '0.4s (Groq LPU 420 tps)'
                        : currentStep === 4
                        ? '14ms (Dry-Run Applied)'
                        : '8ms (Supabase Synced)'}
                    </span>
                  </div>
                </div>

                {/* Step Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-[#262a33]">
                  <button
                    disabled={currentStep === 1}
                    onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-2 bg-[#262a33] text-[#dfe2ee] disabled:opacity-40 font-label-sm text-[11px] uppercase border border-[#3e484f] cursor-pointer"
                  >
                    ← Previous Step
                  </button>

                  <div className="flex gap-2">
                    {currentStep === 3 && (
                      <button
                        onClick={() => onNavigate('active-incident-triage-resolution')}
                        className="px-4 py-2 bg-[#262a33] text-[#8ed5ff] hover:bg-[#31353e] font-label-sm text-[11px] font-bold uppercase tracking-wider border border-[#3e484f] cursor-pointer"
                      >
                        Inspect War Room (#INC-8921)
                      </button>
                    )}
                    {currentStep === 2 && (
                      <button
                        onClick={() => onNavigate('hindsight-memory-bank-vectors')}
                        className="px-4 py-2 bg-[#262a33] text-[#4fdbc8] hover:bg-[#31353e] font-label-sm text-[11px] font-bold uppercase tracking-wider border border-[#3e484f] cursor-pointer"
                      >
                        Inspect Memory Bank
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (currentStep < 5) setCurrentStep((prev) => prev + 1);
                        else onNavigate('active-incident-triage-resolution');
                      }}
                      className="px-5 py-2 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] font-bold uppercase tracking-wider hover:bg-[#54ddfc] transition-colors flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <span>{currentStep === 5 ? 'Launch Live War Room' : 'Next Step →'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Real-Time Telemetry Terminal Output */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <span className="font-label-sm text-[10px] text-[#4fdbc8] uppercase font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                Live Orchestration Console Log
              </span>
              <span className="font-label-sm text-[9px] text-[#87929a]">STREAM ACTIVE</span>
            </div>
            <div className="font-mono text-[11px] text-[#8ed5ff] space-y-1 max-h-36 overflow-y-auto">
              {consoleLogs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-[#87929a] select-none">&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Benchmark Rail (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* MTTR Side-by-Side Comparison */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <span className="font-label-sm text-[11px] text-[#8ed5ff] uppercase font-bold tracking-wider">
                MTTR Benchmark Comparison
              </span>
              <span className="px-1.5 py-0.5 bg-[#4fdbc8]/20 text-[#4fdbc8] font-label-sm text-[10px] font-bold">
                -85% SPEEDUP
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Industry Manual */}
              <div className="bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col gap-1">
                <div className="flex justify-between font-label-sm text-[11px] text-[#87929a]">
                  <span>Traditional SRE Manual Triage</span>
                  <span className="font-bold text-[#ffb4ab]">52 MINUTES</span>
                </div>
                <div className="w-full bg-[#31353e] h-2">
                  <div className="bg-[#ffb4ab] h-2 w-[100%]"></div>
                </div>
                <span className="text-[10px] text-[#87929a] font-mono">
                  Manual log grep + war room coordination + slow root-cause guessing
                </span>
              </div>

              {/* OpsMind AI */}
              <div className="bg-[#0a0e16] p-3 border border-[#4fdbc8] flex flex-col gap-1 shadow-[0_0_12px_rgba(79,219,200,0.1)]">
                <div className="flex justify-between font-label-sm text-[11px] text-[#4fdbc8]">
                  <span className="font-bold">OpsMind + Groq + Hindsight</span>
                  <span className="font-bold text-[#4fdbc8]">7.8 MINUTES</span>
                </div>
                <div className="w-full bg-[#31353e] h-2">
                  <div className="bg-[#4fdbc8] h-2 w-[15%]"></div>
                </div>
                <span className="text-[10px] text-[#4fdbc8] font-mono">
                  12ms vector lookup + 0.4s Groq LPU plan + automated GitOps patch
                </span>
              </div>
            </div>
          </div>

          {/* System Spec Matrix */}
          <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
            <span className="font-label-sm text-[11px] text-[#dfe2ee] uppercase font-bold tracking-wider pb-1 border-b border-[#262a33]">
              Hardware &amp; Model Architecture
            </span>

            <div className="space-y-1.5 font-label-sm text-[11px]">
              <div className="flex justify-between p-2 bg-[#0a0e16] border border-[#262a33]">
                <span className="text-[#87929a]">LPU Accelerator:</span>
                <span className="text-[#4fdbc8] font-bold">Groq L40S Array (420 tps)</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0a0e16] border border-[#262a33]">
                <span className="text-[#87929a]">Reasoning Engine:</span>
                <span className="text-[#8ed5ff] font-bold">Gemini 3.8 Flash / Llama-3-70B</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0a0e16] border border-[#262a33]">
                <span className="text-[#87929a]">Vector Hyperspace:</span>
                <span className="text-[#54ddfc] font-bold">Supabase pgvector (1536-D)</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0a0e16] border border-[#262a33]">
                <span className="text-[#87929a]">Hindsight Recall:</span>
                <span className="text-[#dfe2ee] font-bold font-mono">0.994 MAP Precision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
