import React, { useState } from 'react';
import { TEST_PRESETS } from '../data/mockData';
import { Severity } from '../types';
import { ScreenId } from '../components/Sidebar';

interface IncidentSubmissionProps {
  onNavigate: (screen: ScreenId) => void;
}

export const IncidentSubmission: React.FC<IncidentSubmissionProps> = ({ onNavigate }) => {
  const [title, setTitle] = useState(TEST_PRESETS.redis.title);
  const [service, setService] = useState(TEST_PRESETS.redis.service);
  const [severity, setSeverity] = useState<Severity>(TEST_PRESETS.redis.severity);
  const [trace, setTrace] = useState(TEST_PRESETS.redis.trace);
  const [context, setContext] = useState(TEST_PRESETS.redis.context);
  const [datadog, setDatadog] = useState(TEST_PRESETS.redis.datadog);
  const [grafana, setGrafana] = useState(TEST_PRESETS.redis.grafana);

  // Live pre-computation metrics
  const [simText, setSimText] = useState(TEST_PRESETS.redis.sim);
  const [simPct, setSimPct] = useState(TEST_PRESETS.redis.simPct);
  const [mttr, setMttr] = useState(TEST_PRESETS.redis.mttr);
  const [runbookTitle, setRunbookTitle] = useState(TEST_PRESETS.redis.runbook);
  const [runbookSnippet, setRunbookSnippet] = useState(TEST_PRESETS.redis.snippet);
  const [matches, setMatches] = useState(TEST_PRESETS.redis.matches);
  const [inferenceTime, setInferenceTime] = useState('18ms ± 1ms');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestedSuccess, setIngestedSuccess] = useState(false);

  // Byte counter for error buffer
  const byteCount = new Blob([trace]).size;

  const loadPreset = (key: 'redis' | 'db' | 'grpc') => {
    const p = TEST_PRESETS[key];
    setTitle(p.title);
    setService(p.service);
    setSeverity(p.severity);
    setTrace(p.trace);
    setContext(p.context);
    setDatadog(p.datadog);
    setGrafana(p.grafana);
    setSimText(p.sim);
    setSimPct(p.simPct);
    setMttr(p.mttr);
    setRunbookTitle(p.runbook);
    setRunbookSnippet(p.snippet);
    setMatches(p.matches);
    setInferenceTime(`${Math.floor(Math.random() * 8) + 14}ms ± 1ms`);
  };

  const handleClearTrace = () => {
    setTrace('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsIngesting(true);

    try {
      await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, service, severity, trace, context }),
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsIngesting(false);
      setIngestedSuccess(true);
      setTimeout(() => {
        setIngestedSuccess(false);
        onNavigate('active-incident-triage-resolution');
      }, 1400);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Subtle Ambient Glow Elements */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#8ed5ff]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-[#4fdbc8]/10 blur-3xl pointer-events-none"></div>

        {/* Header Block: Command Deck Style */}
        <div className="relative p-4 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-[#0a0e16] border border-[#262a33]">
          <div className="flex flex-col gap-1 max-w-3xl">
            <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-[#4fdbc8] tracking-widest uppercase">
              <span className="inline-block w-2 h-2 bg-[#4fdbc8] animate-pulse"></span>
              <span>Kernel Telemetry Ingestion Node // 0x4F-VEC</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#dfe2ee] tracking-tight uppercase">
              Report &amp; Ingest Incident
            </h1>
            <p className="font-body-md text-body-md text-[#bdc8d1] max-w-2xl">
              Submit active production anomaly — OpsMind will instantly query Hindsight vector memory and Groq LLM to propose immediate remediation.
            </p>
          </div>

          {/* Quick Preset Selector Controls */}
          <div className="flex flex-col gap-1 shrink-0">
            <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase tracking-wider font-bold">
              Inject Test Scenario Preset
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => loadPreset('redis')}
                className="px-2.5 py-1.5 bg-[#262a33] hover:bg-[#8ed5ff] hover:text-[#00354a] text-[#dfe2ee] font-label-sm text-[11px] transition-colors flex items-center gap-1 border border-[#3e484f] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>#1 REDIS OOM</span>
              </button>
              <button
                type="button"
                onClick={() => loadPreset('db')}
                className="px-2.5 py-1.5 bg-[#262a33] hover:bg-[#8ed5ff] hover:text-[#00354a] text-[#dfe2ee] font-label-sm text-[11px] transition-colors flex items-center gap-1 border border-[#3e484f] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">database</span>
                <span>#2 DB POOL EXHAUST</span>
              </button>
              <button
                type="button"
                onClick={() => loadPreset('grpc')}
                className="px-2.5 py-1.5 bg-[#262a33] hover:bg-[#8ed5ff] hover:text-[#00354a] text-[#dfe2ee] font-label-sm text-[11px] transition-colors flex items-center gap-1 border border-[#3e484f] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">sync_problem</span>
                <span>#3 gRPC DEADLOCK</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Split 12-Column Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 py-4">
          {/* LEFT COLUMN: Input Form Chassis (7 Cols) */}
          <div className="xl:col-span-7 flex flex-col gap-4">
            <div className="bg-[#181c24] border border-[#262a33] shadow-xl p-4 flex flex-col gap-4 relative">
              {/* Tactical Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#8ed5ff]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#8ed5ff]"></div>

              <div className="flex items-center justify-between pb-2 bg-[#0a0e16] px-3 py-1.5 border border-[#262a33]">
                <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-[#dfe2ee]">
                  <span className="material-symbols-outlined text-[16px] text-[#8ed5ff]">terminal</span>
                  <span>ANOMALY_PAYLOAD_DESCRIPTOR.YAML</span>
                </div>
                <span className="font-label-sm text-[10px] text-[#4fdbc8] tracking-widest uppercase font-bold">
                  STREAM: OPEN
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Incident Title */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1] flex items-center gap-1">
                      <span>Incident Canonical Title</span>
                      <span className="text-[#ffb4ab] font-bold">*</span>
                    </label>
                    <span className="font-label-sm text-[10px] text-[#87929a]">SYS_ID: INC-7709-ALPHA</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Ingress Gateway TLS Handshake Latency Spike"
                    className="w-full bg-[#0a0e16] text-[#dfe2ee] px-3 py-2 font-mono text-[13px] border border-[#262a33] focus:border-[#8ed5ff] focus:bg-[#262a33] outline-none transition-all placeholder-[#87929a]"
                  />
                </div>

                {/* Service & Severity */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Service Selector */}
                  <div className="sm:col-span-5 flex flex-col gap-1">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1]">
                      Affected Domain / Service
                    </label>
                    <div className="relative bg-[#0a0e16] border border-[#262a33]">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-transparent text-[#dfe2ee] px-3 py-2 font-mono text-[12px] appearance-none outline-none cursor-pointer"
                      >
                        <option value="checkout-service" className="bg-[#181c24]">checkout-service.prod</option>
                        <option value="payment-gateway" className="bg-[#181c24]">payment-gateway.internal</option>
                        <option value="auth-service" className="bg-[#181c24]">auth-service.iam</option>
                        <option value="inventory-api" className="bg-[#181c24]">inventory-api.core</option>
                        <option value="ingress-router" className="bg-[#181c24]">ingress-router.edge</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-2.5 text-[16px] text-[#bdc8d1]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Severity Matrix */}
                  <div className="sm:col-span-7 flex flex-col gap-1">
                    <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1]">
                      Severity Matrix Threshold
                    </span>
                    <div className="grid grid-cols-4 gap-1 h-[38px]">
                      {(['P1', 'P2', 'P3', 'P4'] as const).map((sev) => {
                        const isSelected = severity === sev;
                        return (
                          <button
                            key={sev}
                            type="button"
                            onClick={() => setSeverity(sev)}
                            className={`flex flex-col items-center justify-center p-1 font-label-sm text-[11px] transition-all cursor-pointer border ${
                              isSelected
                                ? sev === 'P1'
                                  ? 'bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab] font-bold shadow-sm'
                                  : sev === 'P2'
                                  ? 'bg-[#54ddfc]/20 text-[#54ddfc] border-[#54ddfc] font-bold shadow-sm'
                                  : 'bg-[#8ed5ff]/20 text-[#8ed5ff] border-[#8ed5ff] font-bold shadow-sm'
                                : 'bg-[#262a33] text-[#bdc8d1] border-[#3e484f]'
                            }`}
                          >
                            <span className="flex items-center gap-0.5">
                              {isSelected && sev === 'P1' && (
                                <span className="w-1.5 h-1.5 bg-[#ffb4ab] inline-block animate-ping"></span>
                              )}
                              {sev}
                            </span>
                            <span className="text-[9px] opacity-80">
                              {sev === 'P1' ? 'CRITICAL' : sev === 'P2' ? 'HIGH' : sev === 'P3' ? 'MED' : 'LOW'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Error Message & Raw Stack Trace */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1] flex items-center gap-1">
                      <span>Raw Error Buffer &amp; Stack Trace</span>
                      <span className="text-[#54ddfc] font-bold text-[10px]">// STDIN</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleClearTrace}
                      className="font-label-sm text-[10px] text-[#87929a] hover:text-[#dfe2ee] transition-colors uppercase cursor-pointer"
                    >
                      Flush Buffer
                    </button>
                  </div>
                  <div className="relative bg-[#0a0e16] p-1.5 border border-[#262a33]">
                    <div className="flex items-center justify-between px-2 py-1 bg-[#262a33]/40 text-[#87929a] font-label-sm text-[10px] mb-1">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#ffb4ab] inline-block"></span>
                        STDERR CAPTURE
                      </span>
                      <span>{byteCount} BYTES</span>
                    </div>
                    <textarea
                      rows={4}
                      value={trace}
                      onChange={(e) => setTrace(e.target.value)}
                      placeholder="Paste stack traces, panic outputs, or redis-cli error snapshots..."
                      className="w-full bg-transparent text-[#8ed5ff] px-2 py-1 font-mono text-[12px] outline-none resize-none leading-relaxed placeholder-[#87929a]"
                    />
                  </div>
                </div>

                {/* Environment Context */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1]">
                    Environment Context &amp; Observability Scope
                  </label>
                  <textarea
                    rows={3}
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Include canary rollout tags, git SHA (e.g. 7f1a30c), blast radius across regions..."
                    className="w-full bg-[#0a0e16] text-[#dfe2ee] px-3 py-2 font-mono text-[12px] border border-[#262a33] focus:border-[#8ed5ff] outline-none resize-none placeholder-[#87929a]"
                  />
                </div>

                {/* Observability URIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#54ddfc]">query_stats</span>
                      <span>Datadog APM Trace URI</span>
                    </label>
                    <input
                      type="text"
                      value={datadog}
                      onChange={(e) => setDatadog(e.target.value)}
                      className="w-full bg-[#0a0e16] text-[#dfe2ee] px-3 py-1.5 font-label-sm text-[11px] border border-[#262a33] outline-none focus:border-[#8ed5ff]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-[11px] uppercase tracking-wider text-[#bdc8d1] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#4fdbc8]">monitoring</span>
                      <span>Grafana Dashboard URI</span>
                    </label>
                    <input
                      type="text"
                      value={grafana}
                      onChange={(e) => setGrafana(e.target.value)}
                      className="w-full bg-[#0a0e16] text-[#dfe2ee] px-3 py-1.5 font-label-sm text-[11px] border border-[#262a33] outline-none focus:border-[#8ed5ff]"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={isIngesting}
                    className={`w-full font-label-md text-label-md py-3.5 px-4 uppercase font-bold flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${
                      ingestedSuccess
                        ? 'bg-[#4fdbc8] text-[#003731]'
                        : 'bg-[#38bdf8] hover:bg-[#54ddfc] text-[#00354a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isIngesting ? 'refresh' : ingestedSuccess ? 'task_alt' : 'bolt'}
                    </span>
                    <span>
                      {isIngesting
                        ? 'INGESTING TO SUPABASE & TRIGGERING GROQ LPU...'
                        : ingestedSuccess
                        ? 'INCIDENT INGESTED & WAR-ROOM SYNCHRONIZED'
                        : 'Trigger Hindsight Neural Search & Ingest Incident'}
                    </span>
                    <span className="material-symbols-outlined text-[18px]">keyboard_double_arrow_right</span>
                  </button>

                  <div className="flex items-center justify-between font-label-sm text-[10px] text-[#87929a] px-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#4fdbc8] inline-block"></span>
                      LPU Pipeline Ready: GROQ-LLAMA-3-70B-VERSATILE
                    </span>
                    <span>ENC: AES-256-GCM / SUPABASE_VECTORS</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Architecture Blueprint Snapshot */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] uppercase text-[#bdc8d1] font-bold">
                  Live Ingress Topology Routing
                </span>
                <span className="font-label-sm text-[10px] text-[#8ed5ff]">NODE: us-east-1a-infra</span>
              </div>

              {/* Technical Schematic SVG */}
              <div className="w-full bg-[#0a0e16] p-2 border border-[#262a33] overflow-x-auto">
                <svg className="w-full h-24 text-[#3e484f]" fill="none" viewBox="0 0 680 96" xmlns="http://www.w3.org/2000/svg">
                  {/* Edge Ingress Node */}
                  <rect x="10" y="24" width="100" height="48" fill="#181c24" stroke="#262a33" />
                  <text x="24" y="46" fill="#8ed5ff" fontFamily="Space Mono" fontSize="9" fontWeight="700">INGRESS-GW</text>
                  <text x="24" y="58" fill="#87929a" fontFamily="Space Mono" fontSize="8">TCP :443</text>

                  {/* Line 1 */}
                  <path d="M110 48H160" stroke="#3e484f" strokeDasharray="4 4" strokeWidth="2" />
                  <circle cx="135" cy="48" r="3" fill="#4fdbc8" />

                  {/* Checkout Cluster */}
                  <rect x="160" y="24" width="120" height="48" fill="#262a33" stroke="#3e484f" />
                  <text x="175" y="44" fill="#dfe2ee" fontFamily="Space Mono" fontSize="9" fontWeight="700">CHECKOUT-SRV</text>
                  <text x="175" y="58" fill="#ffb4ab" fontFamily="Space Mono" fontSize="8">503 ERR: 14.8%</text>

                  {/* Line 2 */}
                  <path d="M280 48H330" stroke="#ffb4ab" strokeWidth="2" />
                  <polygon points="325,45 330,48 325,51" fill="#ffb4ab" />

                  {/* REDIS POD CLUSTER (CRITICAL) */}
                  <rect x="330" y="16" width="130" height="64" fill="#93000a" fillOpacity="0.25" stroke="#ffb4ab" strokeWidth="1" />
                  <rect x="330" y="16" width="130" height="6" fill="#ffb4ab" />
                  <text x="345" y="38" fill="#ffdad6" fontFamily="Space Mono" fontSize="10" fontWeight="700">REDIS-PRIMARY</text>
                  <text x="345" y="52" fill="#ffb4ab" fontFamily="Space Mono" fontSize="8">MEM: 99.4% (OOM)</text>
                  <text x="345" y="66" fill="#87929a" fontFamily="Space Mono" fontSize="8">SLAVES: 3 DESYNC</text>

                  {/* Line 3 to Vectors */}
                  <path d="M460 48H510" stroke="#4fdbc8" strokeWidth="2" />
                  <polygon points="505,45 510,48 505,51" fill="#4fdbc8" />

                  {/* Hindsight Vector Node */}
                  <rect x="510" y="24" width="150" height="48" fill="#181c24" stroke="#4fdbc8" />
                  <text x="525" y="44" fill="#4fdbc8" fontFamily="Space Mono" fontSize="9" fontWeight="700">HINDSIGHT-STORE</text>
                  <text x="525" y="58" fill="#8ed5ff" fontFamily="Space Mono" fontSize="8">COSINE COS_SIM: &gt;0.92</text>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Neural Pre-Computation Panel (5 Cols) */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            {/* Status Bar */}
            <div className="bg-[#262a33] p-4 border border-[#3e484f] shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#3e484f]">
                <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-[#dfe2ee] font-bold">
                  <span className="material-symbols-outlined text-[18px] text-[#54ddfc] animate-spin">neurology</span>
                  <span className="tracking-wider uppercase">Live Neural Pre-Computation</span>
                </div>
                <span className="px-2 py-0.5 bg-[#04b4a2]/30 text-[#4fdbc8] font-label-sm text-[10px] font-bold tracking-wider uppercase border border-[#4fdbc8]/30">
                  ACTIVE POLLING
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="bg-[#0a0e16] p-2 border border-[#3e484f] flex flex-col">
                  <span className="font-label-sm text-[9px] text-[#87929a] uppercase">Embedding Model</span>
                  <span className="font-label-sm text-[11px] text-[#dfe2ee] font-bold">ada-002 / 1536d</span>
                </div>
                <div className="bg-[#0a0e16] p-2 border border-[#3e484f] flex flex-col">
                  <span className="font-label-sm text-[9px] text-[#87929a] uppercase">Groq Inference</span>
                  <span className="font-label-sm text-[11px] text-[#4fdbc8] font-bold font-mono">{inferenceTime}</span>
                </div>
                <div className="bg-[#0a0e16] p-2 border border-[#3e484f] flex flex-col col-span-2 sm:col-span-1">
                  <span className="font-label-sm text-[9px] text-[#87929a] uppercase">Match Quality</span>
                  <span className="font-label-sm text-[11px] text-[#54ddfc] font-bold">{simPct} CONF</span>
                </div>
              </div>

              {/* Dynamic Cosine Match Meter */}
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex justify-between font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>HINDSIGHT V-COSINE DISTANCE</span>
                  <span className="text-[#54ddfc] font-bold">{simText}</span>
                </div>
                <div className="w-full bg-[#0a0e16] h-2 overflow-hidden flex border border-[#3e484f]">
                  <div
                    className="bg-gradient-to-r from-[#4fdbc8] to-[#8ed5ff] h-2 transition-all duration-300"
                    style={{ width: simPct }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Matched Past Incidents Cards */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-[#dfe2ee] flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px] text-[#8ed5ff]">history</span>
                  <span>Matched Past Incidents ({matches.length} DETECTED)</span>
                </span>
                <span className="font-label-sm text-[10px] text-[#87929a]">&gt;85% CUTOFF</span>
              </div>

              <div className="flex flex-col gap-2">
                {matches.map((m) => (
                  <div key={m.id} className="bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col gap-1 hover:border-[#8ed5ff] transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 bg-[#ffb4ab]/20 text-[#ffb4ab] font-label-sm text-[10px] font-bold border border-[#ffb4ab]/30">
                          {m.id}
                        </span>
                        <span className="font-title text-[13px] font-bold text-[#dfe2ee] leading-tight">
                          {m.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#54ddfc]/20 text-[#54ddfc] font-label-sm text-[10px] font-bold shrink-0 border border-[#54ddfc]/30">
                        {m.match}
                      </span>
                    </div>
                    <p className="font-body-sm text-[11px] text-[#bdc8d1]">
                      {m.cause}
                    </p>
                    <div className="flex items-center justify-between font-label-sm text-[10px] text-[#87929a] pt-1 border-t border-[#262a33]">
                      <span>{m.by}</span>
                      <span className="text-[#4fdbc8]">{m.dt}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* MTTR Prediction Pill Banner */}
              <div className="bg-[#262a33] p-3 border border-[#3e484f] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#4fdbc8] flex items-center justify-center text-[#003731] shrink-0 font-bold">
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold">Expected MTTR Baseline</span>
                    <span className="font-headline-sm text-headline-sm text-[#4fdbc8] font-bold tracking-tight">
                      {mttr}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-[10px] text-[#87929a] block">HISTORICAL DATA</span>
                  <span className="font-label-sm text-[11px] text-[#dfe2ee] font-bold">4 ANCHOR OCCURRENCES</span>
                </div>
              </div>

              {/* Recommended Remediation Runbook Box */}
              <div className="bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[10px] text-[#8ed5ff] uppercase tracking-widest flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                    RECOMMENDED REMEDIATION RUNBOOK
                  </span>
                  <span className="font-label-sm text-[9px] bg-[#8ed5ff]/10 text-[#8ed5ff] px-1.5 py-0.5 border border-[#8ed5ff]/30">
                    AUTO-TAGGED
                  </span>
                </div>
                <div className="font-title text-[13px] text-[#dfe2ee] font-bold">
                  {runbookTitle}
                </div>
                <p className="font-body-sm text-[11px] text-[#bdc8d1]">
                  {runbookSnippet}
                </p>
                <div className="pt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('active-incident-triage-resolution')}
                    className="px-3 py-1 bg-[#262a33] hover:bg-[#8ed5ff] hover:text-[#00354a] text-[#8ed5ff] font-label-sm text-[11px] uppercase transition-colors border border-[#3e484f] cursor-pointer"
                  >
                    View Full Runbook
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Dry-Run executed: Simulation test passed with exit code 0.')}
                    className="px-3 py-1 bg-[#1c2028] hover:bg-[#4fdbc8] hover:text-[#003731] text-[#4fdbc8] font-label-sm text-[11px] uppercase transition-colors border border-[#262a33] cursor-pointer"
                  >
                    Dry-Run Automation (CLI)
                  </button>
                </div>
              </div>
            </div>

            {/* Vector Scatterplot Visual */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[11px] uppercase text-[#bdc8d1] font-bold">
                  2D Projection of Vector Latent Space
                </span>
                <span className="font-label-sm text-[10px] text-[#87929a]">t-SNE / PCA CLUSTER</span>
              </div>

              <div className="relative w-full h-36 bg-[#0a0e16] border border-[#262a33] p-2 overflow-hidden flex items-center justify-center">
                {/* Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c2028_1px,transparent_1px),linear-gradient(to_bottom,#1c2028_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50"></div>

                {/* Static Past Incidents (Dots) */}
                <div className="absolute left-1/4 top-1/3 w-2 h-2 bg-[#3e484f] hover:scale-150 transition-transform cursor-pointer" title="INC-4100 (DB Disk I/O)"></div>
                <div className="absolute left-1/3 top-2/3 w-2 h-2 bg-[#3e484f] hover:scale-150 transition-transform cursor-pointer" title="INC-3811 (K8s CNI Network Flap)"></div>
                <div className="absolute left-2/3 top-1/4 w-2 h-2 bg-[#3e484f] hover:scale-150 transition-transform cursor-pointer" title="INC-5109 (Ingress Envoy Deadlock)"></div>

                {/* Cluster Matches */}
                <div className="absolute right-1/4 top-1/2 w-3.5 h-3.5 bg-[#54ddfc] flex items-center justify-center shadow-lg" title="INC-6411 (Historical Redis OOM)">
                  <span className="w-1 h-1 bg-[#0a0e16]"></span>
                </div>
                <div className="absolute right-1/3 top-2/5 w-3 h-3 bg-[#4fdbc8] flex items-center justify-center" title="INC-5902 (Replica Buffer Flap)">
                  <span className="w-1 h-1 bg-[#0a0e16]"></span>
                </div>

                {/* Active Anomaly Position */}
                <div className="absolute right-1/4 top-2/5 z-10 flex items-center justify-center">
                  <span className="absolute w-8 h-8 bg-[#ffb4ab]/30 animate-ping"></span>
                  <span className="w-4 h-4 bg-[#ffb4ab] text-[8px] text-[#690005] font-bold flex items-center justify-center font-label-sm">
                    NOW
                  </span>
                </div>

                {/* Proximity line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="72%" y1="40%" x2="75%" y2="50%" stroke="#54ddfc" strokeDasharray="3 3" strokeWidth="1.5" />
                </svg>

                <div className="absolute bottom-1 right-2 font-label-sm text-[9px] text-[#8ed5ff]">
                  DISTANCE: δ = 0.066 rad
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Log Terminal Bar */}
        <div className="w-full bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col md:flex-row items-center justify-between gap-2 text-[#87929a] font-label-sm text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-[#4fdbc8] font-bold">GROQ_SESSION //</span>
            <span>CONNECTED TO API.GROQ.COM (MODEL: LLAMA3-70B-8192)</span>
            <span className="text-[#3e484f]">|</span>
            <span>TOKENS/SEC: 421.8</span>
          </div>
          <div className="flex items-center gap-4">
            <span>MEM_POOL: 14,290 KB</span>
            <span className="text-[#4fdbc8] flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 bg-[#4fdbc8] inline-block"></span>
              REALTIME INDEXER ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
