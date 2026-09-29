import React, { useState, useEffect } from 'react';
import { ScreenId } from '../components/Sidebar';

interface ActiveIncidentTriageProps {
  onNavigate: (screen: ScreenId, param?: string) => void;
  onCommitResolution?: (directive: string) => void;
}

export const ActiveIncidentTriage: React.FC<ActiveIncidentTriageProps> = ({
  onNavigate,
  onCommitResolution,
}) => {
  const [timerSeconds, setTimerSeconds] = useState(494); // 8m 14s
  const [step2State, setStep2State] = useState<'READY' | 'DEPLOYING' | 'DEPLOYED'>('READY');
  const [step3State, setStep3State] = useState<'QUEUED' | 'APPLYING' | 'ENFORCED'>('QUEUED');
  const [isMitigated, setIsMitigated] = useState(false);
  const [showReasoning, setShowReasoning] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliOutputMessage, setCliOutputMessage] = useState<string | null>(null);
  const [selectedPostMortemModal, setSelectedPostMortemModal] = useState<string | null>(null);

  // Active chat stream messages
  const [messages, setMessages] = useState([
    {
      time: '14:32',
      sender: '[PagerDuty]',
      color: 'text-[#8ed5ff]',
      text: 'P1 Alert: payment-gateway checkout 504 threshold exceeded (4.2%).',
    },
    {
      time: '14:34',
      sender: '[OpsMind]',
      color: 'text-[#4fdbc8]',
      text: 'Auto-detected connection leak. Recalled INC-4102 post-mortem. Groq recommendation generated in 0.4s.',
    },
    {
      time: '14:36',
      sender: '[Alex Chen]',
      color: 'text-[#54ddfc]',
      text: 'Step 1 terminated hung sessions. Releasing Step 2 pool config scale now.',
    },
  ]);

  // Live timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleDeployStep2 = () => {
    setStep2State('DEPLOYING');
    setTimeout(() => {
      setStep2State('DEPLOYED');
      setMessages((prev) => [
        ...prev,
        {
          time: '14:38',
          sender: '[GitOps Bot]',
          color: 'text-[#4fdbc8]',
          text: 'Helm patch applied: PgBouncer max_connections scaled to 250 in us-east-prod.',
        },
      ]);
    }, 800);
  };

  const handleApplyStep3 = () => {
    setStep3State('APPLYING');
    setTimeout(() => {
      setStep3State('ENFORCED');
      setMessages((prev) => [
        ...prev,
        {
          time: '14:39',
          sender: '[Cloudflare WAF]',
          color: 'text-[#54ddfc]',
          text: 'Rate rule active: /webhook/stripe clamped at 350 req/s. Retry backpressure normalized.',
        },
      ]);
    }, 700);
  };

  const handleApplyAllMitigations = () => {
    handleDeployStep2();
    setTimeout(() => {
      handleApplyStep3();
      setIsMitigated(true);
    }, 400);
  };

  const handleResolveIncident = () => {
    setShowToast(true);
    if (onCommitResolution) {
      onCommitResolution('Set idle_in_transaction_session_timeout to 15s in payment-gateway configuration.');
    }
  };

  const handleExecuteCli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    const command = cliInput;
    setCliInput('');
    setCliOutputMessage(`Executing '${command}' in pod... OK [Exit 0]`);
    setMessages((prev) => [
      ...prev,
      {
        time: '14:40',
        sender: '[Terminal]',
        color: 'text-[#4fdbc8]',
        text: `> ${command} => Command executed successfully. Status code: 0`,
      },
    ]);
    setTimeout(() => setCliOutputMessage(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* P1 Operational Alert Strip & Header */}
      <section className="w-full bg-[#0a0e16] p-4 border border-[#262a33] shadow-xl flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ffb4ab]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-24 w-96 h-96 bg-[#8ed5ff]/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 min-w-0">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-label-sm text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ffb4ab]/20 text-[#ffb4ab] font-bold uppercase tracking-wider border border-[#ffb4ab]/40">
                <span className="w-2 h-2 bg-[#ffb4ab] animate-ping"></span>
                CRITICAL (P1)
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#262a33] text-[#54ddfc] border border-[#3e484f]">
                <span className="material-symbols-outlined text-[14px]">stream</span>
                INC-8921
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#181c24] text-[#bdc8d1] border border-[#262a33]">
                <span className="material-symbols-outlined text-[14px] text-[#4fdbc8]">lan</span>
                payment-gateway :: us-east-prod-cluster-04
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#93000a]/40 text-[#ffb4ab] font-bold animate-pulse border border-[#ffb4ab]/30">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                TRIAGING &amp; MITIGATING
              </span>
            </div>

            <h1 className="font-headline-md text-headline-md text-[#dfe2ee] tracking-tight truncate pt-1">
              Payment Gateway 504 Gateway Timeout Cascade on Stripe Webhook Consumer
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-label-sm text-[11px] text-[#bdc8d1]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>TRIGGERED: <strong className="text-[#dfe2ee]">8m ago (14:32:10 UTC)</strong></span>
              </div>
              <span>/</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#8ed5ff]">person_check</span>
                <span>COMMANDER: <strong className="text-[#8ed5ff] font-bold">Alex Chen (Lead SRE)</strong></span>
              </div>
              <span>/</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#ffb4ab]">trending_down</span>
                <span>IMPACT: <strong className="text-[#ffb4ab] font-bold">Checkout Failure Rate +4.2%</strong> (142 req/s impacted)</span>
              </div>
              <span>/</span>
              <div className="flex items-center gap-1 text-[#4fdbc8]">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>
                  TIMER: <strong className="font-mono font-bold">{formatTimer(timerSeconds)}</strong>{' '}
                  <span className="text-[#bdc8d1] font-normal">(&lt; 15m MTTR Target)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Deck */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-center">
            <button
              onClick={handleApplyAllMitigations}
              className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                isMitigated
                  ? 'bg-[#4fdbc8] text-[#003731]'
                  : 'bg-[#8ed5ff] text-[#00354a] hover:bg-[#54ddfc]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMitigated ? 'task_alt' : 'bolt'}
              </span>
              <span>{isMitigated ? 'Mitigation Applied' : 'Apply AI Mitigation'}</span>
            </button>
            <button
              onClick={() => onNavigate('learning-loop-post-mortems')}
              className="px-3 py-2 bg-[#262a33] text-[#dfe2ee] font-label-md text-label-md uppercase tracking-wider hover:bg-[#31353e] border border-[#3e484f] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Export Runbook</span>
            </button>
            <button
              onClick={() => alert('Incident escalated to Sev-0 Commander on pager rotation.')}
              className="px-3 py-2 bg-[#93000a]/40 text-[#ffb4ab] font-label-md text-label-md uppercase tracking-wider hover:bg-[#93000a] hover:text-white border border-[#ffb4ab]/30 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
              <span>Escalate Sev-0</span>
            </button>
            <button
              onClick={handleResolveIncident}
              className="px-3 py-2 bg-[#4fdbc8] text-[#003731] font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-[#71f8e4] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">done_all</span>
              <span>Resolve &amp; Commit Memory</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3-Column War Room Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* COLUMN 1: Telemetry & Error Diagnostics (4 Cols) */}
        <section className="xl:col-span-4 flex flex-col gap-4">
          {/* Primary Diagnostics Box */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#54ddfc] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px]">bug_report</span>
                <span>Error Diagnostics &amp; Stack</span>
              </div>
              <span className="font-label-sm text-[10px] text-[#ffb4ab] px-1.5 py-0.5 bg-[#ffb4ab]/15 font-bold uppercase border border-[#ffb4ab]/30">
                504 Gateway Timeout
              </span>
            </div>

            {/* Raw Stack Trace Viewer */}
            <div className="bg-[#181c24] p-3 font-mono text-[11px] text-[#ffb4ab]/90 overflow-x-auto leading-relaxed border border-[#262a33] select-all">
              <div className="text-[#87929a] font-label-sm text-[10px] pb-1 uppercase tracking-widest">
                pg_pool_exhaustion_err :: trace_id=8921-99af3
              </div>
              <span className="text-[#ffb4ab] font-bold">[FATAL] pg_pool_exhaustion_err:</span> remaining connection slots are reserved for non-replication superuser connections (504 timeout on db_checkout_replica)<br />
              <span className="text-[#3e484f]">&gt;&gt;</span> at Pool.acquire (<span className="text-[#54ddfc]">/srv/node_modules/pg-pool/index.js:312:11</span>)<br />
              <span className="text-[#3e484f]">&gt;&gt;</span> at StripeConsumer.handleWebhook (<span className="text-[#8ed5ff]">/app/src/workers/stripe_events.ts:184:22</span>)<br />
              <span className="text-[#3e484f]">&gt;&gt;</span> at TransactionManager.begin (<span className="text-[#dfe2ee]">/app/src/db/tx_manager.ts:44:9</span>)<br />
              <span className="text-[#3e484f]">&gt;&gt;</span> [State: IDLE_IN_TRANSACTION lock held on table <span className="text-[#4fdbc8]">payment_intents</span> &gt; 42.8s]
            </div>

            <div className="flex items-center justify-between text-[#bdc8d1] font-label-sm text-[11px] pt-1">
              <span>Target Instance: <span className="text-[#dfe2ee] font-mono">db-primary-replica-02</span></span>
              <span className="text-[#ffb4ab] font-bold">100% Saturation</span>
            </div>
          </div>

          {/* Real-time Saturation Vectors & Sparklines */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#dfe2ee] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#8ed5ff]">ssid_chart</span>
                <span>Real-Time Saturation Vectors</span>
              </div>
              <span className="font-label-sm text-[10px] text-[#4fdbc8] animate-pulse">POLLING: 1000ms</span>
            </div>

            {/* Metric 1: Connection Pool Limit */}
            <div className="flex flex-col gap-1.5 bg-[#181c24] p-3 border border-[#262a33]">
              <div className="flex items-center justify-between font-label-sm text-[11px]">
                <span className="text-[#dfe2ee]">PgBouncer Active Connections</span>
                <span className="text-[#ffb4ab] font-bold">
                  {step2State === 'DEPLOYED' ? '32 / 250 (Ceiling Raised)' : '100 / 100 (Max Capacity)'}
                </span>
              </div>
              <div className="w-full bg-[#31353e] h-2 overflow-hidden">
                <div
                  className={`h-2 transition-all duration-500 ${
                    step2State === 'DEPLOYED' ? 'w-[13%] bg-[#4fdbc8]' : 'w-[100%] bg-[#ffb4ab]'
                  }`}
                ></div>
              </div>
              {/* Sparkline */}
              <div className="h-10 w-full pt-1">
                <svg className="w-full h-full text-[#ffb4ab]" fill="none" preserveAspectRatio="none" viewBox="0 0 200 40">
                  <path d="M0,35 L30,34 L60,33 L90,32 L110,33 L130,22 L145,10 L160,3 L180,2 L200,2" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  <path d="M0,35 L30,34 L60,33 L90,32 L110,33 L130,22 L145,10 L160,3 L180,2 L200,2 L200,40 L0,40 Z" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>
              <div className="flex justify-between font-label-sm text-[10px] text-[#bdc8d1]">
                <span>T-10m: 34 active</span>
                <span className="text-[#ffb4ab] font-bold">Spike: +194%</span>
                <span>Pool Ceiling: {step2State === 'DEPLOYED' ? '250' : '100'}</span>
              </div>
            </div>

            {/* Metric 2: P99 Latency Leap */}
            <div className="flex flex-col gap-1.5 bg-[#181c24] p-3 border border-[#262a33]">
              <div className="flex items-center justify-between font-label-sm text-[11px]">
                <span className="text-[#dfe2ee]">P99 Latency (payment-gateway)</span>
                <span className="text-[#ffb4ab] font-bold">
                  {step3State === 'ENFORCED' ? '48ms (Normalized)' : '2,410ms (Norm: 45ms)'}
                </span>
              </div>
              <div className="w-full bg-[#31353e] h-2 overflow-hidden">
                <div
                  className={`h-2 transition-all duration-500 ${
                    step3State === 'ENFORCED' ? 'w-[18%] bg-[#4fdbc8]' : 'w-[92%] bg-[#ffb4ab]'
                  }`}
                ></div>
              </div>
              {/* Sparkline */}
              <div className="h-10 w-full pt-1">
                <svg className="w-full h-full text-[#54ddfc]" fill="none" preserveAspectRatio="none" viewBox="0 0 200 40">
                  <path d="M0,37 L40,36 L80,37 L110,36 L130,30 L150,15 L170,6 L185,4 L200,3" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  <path d="M0,37 L40,36 L80,37 L110,36 L130,30 L150,15 L170,6 L185,4 L200,3 L200,40 L0,40 Z" fill="currentColor" fillOpacity="0.12" />
                </svg>
              </div>
              <div className="flex justify-between font-label-sm text-[10px] text-[#bdc8d1]">
                <span>Base: 45ms</span>
                <span className="text-[#54ddfc] font-bold">Δ +5355%</span>
                <span>SLO Ceiling: 250ms</span>
              </div>
            </div>
          </div>

          {/* Downstream Dependency Impact */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#dfe2ee] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#4fdbc8]">hub</span>
                <span>Downstream Dependency Impact</span>
              </div>
              <span className="font-label-sm text-[10px] text-[#ffb4ab] font-bold uppercase">2 Services Degraded</span>
            </div>

            <div className="flex flex-col gap-1.5 font-label-sm text-[11px]">
              {/* cart-service */}
              <div className="flex items-center justify-between p-2.5 bg-[#181c24] border border-[#262a33]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#ffb4ab] inline-block"></span>
                  <div className="flex flex-col">
                    <span className="text-[#dfe2ee] font-bold">cart-service</span>
                    <span className="text-[#87929a] text-[10px]">checkout-session locks failing</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#ffb4ab] font-bold">78 req/s err</div>
                  <div className="text-[#87929a] text-[10px]">Queue: +420%</div>
                </div>
              </div>

              {/* notification-engine */}
              <div className="flex items-center justify-between p-2.5 bg-[#181c24] border border-[#262a33]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#ffb4ab] inline-block"></span>
                  <div className="flex flex-col">
                    <span className="text-[#dfe2ee] font-bold">notification-engine</span>
                    <span className="text-[#87929a] text-[10px]">receipt mailer worker lag</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#ffb4ab] font-bold">Delayed</div>
                  <div className="text-[#87929a] text-[10px]">Backlog: 1,840 msgs</div>
                </div>
              </div>

              {/* orders-analytics */}
              <div className="flex items-center justify-between p-2.5 bg-[#181c24] border border-[#262a33] opacity-60">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#4fdbc8] inline-block"></span>
                  <div className="flex flex-col">
                    <span className="text-[#dfe2ee]">order-analytics-pipeline</span>
                    <span className="text-[#87929a] text-[10px]">decoupled via Kafka queue</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#4fdbc8] font-bold">HEALTHY</div>
                  <div className="text-[#87929a] text-[10px]">Lag: 12ms</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLUMN 2: Hindsight Memory Recall (4 Cols) */}
        <section className="xl:col-span-4 flex flex-col gap-4">
          {/* Header Card */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#4fdbc8] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[18px]">neurology</span>
                <span>Hindsight Memory Recall</span>
              </div>
              <span className="px-2 py-0.5 bg-[#4fdbc8]/15 text-[#4fdbc8] font-label-sm text-[10px] font-bold uppercase tracking-wider border border-[#4fdbc8]/30">
                cosine_similarity &gt; 0.85
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-[#bdc8d1]">
              Neural memory indexed against <span className="text-[#8ed5ff] font-bold">1,428 vectors</span> in Supabase pgvector. 3 past incidents have direct semantic alignment with current trace signature.
            </p>

            <div className="p-3 bg-[#181c24] border border-[#262a33] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#4fdbc8] text-[20px] shrink-0 mt-0.5">lightbulb</span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label-sm text-[10px] text-[#4fdbc8] font-bold uppercase">Memory Bank Collective Intelligence</span>
                <p className="font-body-sm text-body-sm text-[#dfe2ee] leading-tight">
                  Hindsight has detected that <strong className="text-[#54ddfc]">94% of similar incidents</strong> in <code className="text-[#8ed5ff] font-mono">payment-gateway</code> were resolved by tuning PgBouncer pooling mode from <span className="text-[#ffb4ab] font-mono">session</span> to <span className="text-[#4fdbc8] font-mono">transaction</span> and terminating hung transactions.
                </p>
              </div>
            </div>
          </div>

          {/* Match 1: INC-4102 */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2 hover:border-[#4fdbc8] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-title text-title text-[#dfe2ee] font-bold">INC-4102</span>
                <span className="px-2 py-0.5 bg-[#4fdbc8] text-[#003731] font-label-sm text-[10px] font-bold uppercase">
                  96% Semantic Match
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-[#87929a]">OCT 14, 2024</span>
            </div>

            <div className="font-headline-sm text-headline-sm text-[#8ed5ff] font-semibold leading-snug">
              DB Connection Pool Saturated under Flash Sale Spikes
            </div>

            <div className="grid grid-cols-2 gap-2 font-label-sm text-[11px] pt-1">
              <div className="p-2 bg-[#181c24] border border-[#262a33]">
                <span className="text-[#87929a] block text-[10px] uppercase">MTTR Resolved</span>
                <span className="text-[#4fdbc8] font-bold">6 Minutes</span>
              </div>
              <div className="p-2 bg-[#181c24] border border-[#262a33]">
                <span className="text-[#87929a] block text-[10px] uppercase">Author / On-Call</span>
                <span className="text-[#dfe2ee]">Elena Rostova</span>
              </div>
            </div>

            <div className="text-body-sm font-body-sm text-[#bdc8d1] flex flex-col gap-1 pt-1">
              <div>
                <strong className="text-[#dfe2ee] uppercase font-label-sm text-[10px]">Root Cause:</strong> PgBouncer idle connections held by unindexed webhook handler waiting on external lock.
              </div>
              <div>
                <strong className="text-[#4fdbc8] uppercase font-label-sm text-[10px]">Fix Applied:</strong> Increased max_connections pool buffer to 250 + killed idle transactions older than 30s.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#262a33]">
              <button
                onClick={() => onNavigate('learning-loop-post-mortems', 'PM-4102')}
                className="font-label-sm text-[11px] text-[#54ddfc] flex items-center gap-1 hover:text-[#8ed5ff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                <span>VIEW POST-MORTEM PM-4102</span>
              </button>
              <span className="font-label-sm text-[10px] text-[#87929a] font-mono">VEC: [0.812, 0.449, 0.128...]</span>
            </div>
          </div>

          {/* Match 2: INC-2980 */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2 hover:border-[#8ed5ff] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-title text-title text-[#dfe2ee] font-bold">INC-2980</span>
                <span className="px-2 py-0.5 bg-[#8ed5ff]/20 text-[#8ed5ff] font-label-sm text-[10px] font-bold uppercase border border-[#8ed5ff]/30">
                  88% Semantic Match
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-[#87929a]">AUG 02, 2024</span>
            </div>

            <div className="font-headline-sm text-headline-sm text-[#dfe2ee] font-semibold leading-snug">
              Redis Webhook Queue Backpressure &amp; Replica Exhaustion
            </div>

            <div className="grid grid-cols-2 gap-2 font-label-sm text-[11px] pt-1">
              <div className="p-2 bg-[#181c24] border border-[#262a33]">
                <span className="text-[#87929a] block text-[10px] uppercase">MTTR Resolved</span>
                <span className="text-[#4fdbc8] font-bold">12 Minutes</span>
              </div>
              <div className="p-2 bg-[#181c24] border border-[#262a33]">
                <span className="text-[#87929a] block text-[10px] uppercase">Automated Playbook</span>
                <span className="text-[#54ddfc]">Runbook-DB-Drain-v3</span>
              </div>
            </div>

            <div className="text-body-sm font-body-sm text-[#bdc8d1] flex flex-col gap-1 pt-1">
              <div>
                <strong className="text-[#dfe2ee] uppercase font-label-sm text-[10px]">Root Cause:</strong> Webhook retry storm overwhelmed replica connection limits during partner API outage.
              </div>
              <div>
                <strong className="text-[#4fdbc8] uppercase font-label-sm text-[10px]">Mitigation:</strong> Enabled Cloudflare WAF throttle on /webhook/stripe endpoint (500 req/s cap).
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#262a33]">
              <span className="font-label-sm text-[11px] text-[#54ddfc] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">link</span>
                DIFF REPRODUCTION STEPS
              </span>
              <span className="font-label-sm text-[10px] text-[#87929a] font-mono">VEC: [0.741, 0.392, 0.201...]</span>
            </div>
          </div>

          {/* Match 3: INC-1844 */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-1 opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-title text-title text-[#dfe2ee]">INC-1844</span>
                <span className="px-1.5 py-0.5 bg-[#262a33] text-[#bdc8d1] font-label-sm text-[10px] uppercase">
                  79% Match
                </span>
              </div>
              <span className="font-label-sm text-[10px] text-[#87929a]">FEB 19, 2024</span>
            </div>
            <p className="font-body-sm text-body-sm text-[#87929a] truncate">
              Stripe API rate spike during Black Friday checkout wave - Worker pool isolation strategy
            </p>
          </div>
        </section>

        {/* COLUMN 3: Groq AI Resolution Assistant (4 Cols) */}
        <section className="xl:col-span-4 flex flex-col gap-4">
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-3 relative">
            {/* Groq LPU Hardware Speed Benchmark */}
            <div className="flex flex-wrap items-center justify-between gap-1 pb-1 bg-[#181c24] p-2.5 border border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#8ed5ff] font-bold">
                <span className="w-2 h-2 bg-[#4fdbc8] inline-block animate-pulse"></span>
                <span>LLAMA-3-70B VIA GROQ LPU</span>
              </div>
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#bdc8d1]">
                <span className="text-[#4fdbc8] font-bold">425 tps</span>
                <span>•</span>
                <span className="text-[#54ddfc] font-bold">0.4s INFERENCE</span>
              </div>
            </div>

            {/* AI Synthesized Root Cause Diagnosis */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 font-label-sm text-[11px] text-[#dfe2ee] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#4fdbc8]">psychology</span>
                <span>Synthesized Root Cause Diagnosis</span>
              </div>
              <div className="bg-[#181c24] p-3 border border-[#262a33] font-body-sm text-body-sm text-[#dfe2ee] leading-relaxed">
                <span className="text-[#ffb4ab] font-bold">Connection Starvation:</span> Stripe webhook consumer is encountering burst retries (~420 rps) following upstream timeout. The <code className="text-[#8ed5ff] font-mono">handleWebhook()</code> handler initiates a PostgreSQL transaction but fails to configure an explicit statement timeout (<code className="text-[#54ddfc] font-mono">statement_timeout = 3000ms</code>).
                <div className="mt-2 text-[#bdc8d1]">
                  Transactions are hanging indefinitely in <code className="text-[#4fdbc8] font-mono">idle_in_transaction</code> state waiting for stripe client reply, saturating the PgBouncer 100-connection ceiling and cascading 504 errors to downstream cart checkouts.
                </div>
              </div>
            </div>

            {/* Autonomous Remediation Plan Checklist */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] text-[#dfe2ee] uppercase tracking-wider font-bold">
                  Autonomous Remediation Plan
                </span>
                <span className="font-label-sm text-[10px] text-[#54ddfc]">3 STEPS GENERATED</span>
              </div>

              {/* Step 1 */}
              <div className="bg-[#181c24] p-3 border border-[#262a33] flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#4fdbc8] text-[#003731] flex items-center justify-center font-label-sm text-[10px] font-bold mt-0.5 shrink-0">
                      1
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title text-[13px] text-[#dfe2ee] font-semibold">Terminate Hung Transactions (&gt;30s)</span>
                      <span className="font-body-sm text-body-sm text-[#bdc8d1]">Runs <code className="text-[#54ddfc] font-mono">pg_terminate_backend()</code> on all idle_in_transaction pids.</span>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#4fdbc8]/20 text-[#4fdbc8] font-label-sm text-[9px] uppercase font-bold shrink-0 border border-[#4fdbc8]/30">
                    COMPLETED
                  </span>
                </div>
                <div className="font-label-sm text-[10px] text-[#87929a] font-mono pl-6">
                  [OUTPUT] 68 transactions terminated in 14ms. Active connections dropped to 32/100.
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#181c24] p-3 border border-[#262a33] flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#8ed5ff] text-[#00354a] flex items-center justify-center font-label-sm text-[10px] font-bold mt-0.5 shrink-0">
                      2
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title text-[13px] text-[#dfe2ee] font-semibold">Scale PgBouncer Pool Ceiling to 250</span>
                      <span className="font-body-sm text-body-sm text-[#bdc8d1]">Live config patch to <code className="text-[#8ed5ff] font-mono">pgbouncer.ini</code> in payment-gateway Helm chart.</span>
                    </div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 font-label-sm text-[9px] uppercase font-bold shrink-0 border ${
                      step2State === 'DEPLOYED'
                        ? 'bg-[#4fdbc8]/20 text-[#4fdbc8] border-[#4fdbc8]/30'
                        : 'bg-[#262a33] text-[#bdc8d1] border-[#3e484f]'
                    }`}
                  >
                    {step2State}
                  </span>
                </div>

                <div className="pl-6">
                  {step2State === 'DEPLOYED' ? (
                    <div className="font-label-sm text-[10px] text-[#4fdbc8] font-mono">
                      [SUCCESS] PgBouncer max_connections scaled to 250 in us-east-prod.
                    </div>
                  ) : (
                    <button
                      onClick={handleDeployStep2}
                      disabled={step2State === 'DEPLOYING'}
                      className="px-3 py-1.5 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] uppercase font-bold hover:bg-[#54ddfc] transition-all flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      {step2State === 'DEPLOYING' ? (
                        <>
                          <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                          <span>Patching Helm Chart...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[14px]">play_circle</span>
                          <span>Deploy Patch via GitOps</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#181c24] p-3 border border-[#262a33] flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 bg-[#3e484f] text-[#dfe2ee] flex items-center justify-center font-label-sm text-[10px] font-bold mt-0.5 shrink-0">
                      3
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title text-[13px] text-[#dfe2ee] font-semibold">Trigger Cloudflare Ingress Webhook Rate-Limit</span>
                      <span className="font-body-sm text-body-sm text-[#bdc8d1]">Clamp incoming Stripe requests to 350 req/s to absorb retry spike.</span>
                    </div>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 font-label-sm text-[9px] uppercase font-bold shrink-0 border ${
                      step3State === 'ENFORCED'
                        ? 'bg-[#4fdbc8]/20 text-[#4fdbc8] border-[#4fdbc8]/30'
                        : 'bg-[#262a33] text-[#bdc8d1] border-[#3e484f]'
                    }`}
                  >
                    {step3State}
                  </span>
                </div>

                <div className="pl-6">
                  {step3State === 'ENFORCED' ? (
                    <div className="font-label-sm text-[10px] text-[#4fdbc8] font-mono">
                      [SUCCESS] Cloudflare rate rule set to 350 req/s on /webhook/stripe.
                    </div>
                  ) : (
                    <button
                      onClick={handleApplyStep3}
                      disabled={step3State === 'APPLYING'}
                      className="px-3 py-1.5 bg-[#262a33] text-[#dfe2ee] font-label-sm text-[11px] uppercase font-bold hover:bg-[#8ed5ff] hover:text-[#00354a] transition-all flex items-center gap-1.5 border border-[#3e484f] cursor-pointer"
                    >
                      {step3State === 'APPLYING' ? (
                        <>
                          <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                          <span>Configuring WAF...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[14px]">shield</span>
                          <span>Apply Cloudflare Limit (350 rps)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Groq Reasoning Accordion */}
            <div className="p-3 bg-[#181c24] border border-[#262a33] flex flex-col gap-1">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setShowReasoning(!showReasoning)}
              >
                <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-[#54ddfc] uppercase font-bold">
                  <span className="material-symbols-outlined text-[16px]">fact_check</span>
                  <span>Groq Reasoning Trace &amp; Proof Log</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#87929a]">
                  {showReasoning ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              {showReasoning && (
                <div className="p-2.5 bg-[#1c2028] border border-[#262a33] font-mono text-[11px] leading-relaxed text-[#bdc8d1] mt-1 space-y-1">
                  <div>
                    <span className="text-[#4fdbc8] font-bold">1. Corroboration:</span> Stack trace keyword <code className="text-[#54ddfc]">remaining connection slots</code> matches INC-4102 with 0.96 cosine score.
                  </div>
                  <div>
                    <span className="text-[#4fdbc8] font-bold">2. Verification:</span> PgBouncer metric confirms 100/100 pool saturation at 14:32:10 UTC immediately after Stripe webhook retries.
                  </div>
                  <div>
                    <span className="text-[#4fdbc8] font-bold">3. Safety Check:</span> Killing connections idle &gt; 30s frees worker threads without aborting active HTTP payload writes. Safe for automated execution.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* War Room Slack Comms + Live CLI Terminal */}
          <div className="bg-[#0a0e16] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
              <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#dfe2ee] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#8ed5ff]">chat</span>
                <span>War Room Comms (#inc-8921-stripe)</span>
              </div>
              <span className="font-label-sm text-[10px] text-[#4fdbc8] font-mono">SLACK BRIDGE ACTIVE</span>
            </div>

            <div className="flex flex-col gap-1.5 font-body-sm text-[11px] max-h-48 overflow-y-auto">
              {messages.map((m, idx) => (
                <div key={idx} className="p-2 bg-[#181c24] border border-[#262a33] flex items-start gap-2">
                  <span className={`${m.color} font-bold font-label-sm text-[10px] shrink-0`}>
                    {m.time} {m.sender}
                  </span>
                  <span className="text-[#dfe2ee]">{m.text}</span>
                </div>
              ))}
            </div>

            {/* Quick Terminal Command Runner */}
            <form onSubmit={handleExecuteCli} className="pt-1 flex items-center gap-1.5">
              <div className="flex-1 bg-[#181c24] px-2.5 py-1.5 flex items-center gap-2 border border-[#262a33]">
                <span className="text-[#4fdbc8] font-mono text-[12px] font-bold">&gt;_</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder={cliOutputMessage || 'Execute command in payment-gateway pod...'}
                  className="w-full bg-transparent text-[#dfe2ee] font-mono text-[12px] focus:outline-none placeholder:text-[#87929a]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#262a33] text-[#dfe2ee] hover:bg-[#8ed5ff] hover:text-[#00354a] font-label-sm text-[11px] uppercase font-bold transition-colors border border-[#3e484f] cursor-pointer"
              >
                RUN
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Resolution Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#4fdbc8] text-[#003731] p-4 shadow-2xl flex items-center gap-4 max-w-md border-2 border-white animate-bounce">
          <span className="material-symbols-outlined text-[32px] shrink-0">verified</span>
          <div className="flex flex-col">
            <span className="font-title text-title font-bold uppercase">Incident Resolved</span>
            <span className="font-body-sm text-body-sm">
              Post-mortem generated and committed to Hindsight Memory vector store (ID: PM-8921).
            </span>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="ml-auto text-[#003731] hover:opacity-75 font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
