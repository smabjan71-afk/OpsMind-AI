import React, { useState } from 'react';
import { MEMORY_BANK_DATA } from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface MemoryBankVectorsProps {
  onNavigate: (screen: ScreenId, param?: string) => void;
}

export const MemoryBankVectors: React.FC<MemoryBankVectorsProps> = ({ onNavigate }) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('INC-4102');
  const [searchQuery, setSearchQuery] = useState(
    'FATAL connection slots pg_stat_activity long-running webhook'
  );
  const [selectedService, setSelectedService] = useState<string>('ALL SERVICES');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.88);
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexSuccess, setReindexSuccess] = useState(false);
  const [exportDumpSuccess, setExportDumpSuccess] = useState(false);

  const selectedItem = MEMORY_BANK_DATA[selectedIncidentId] || MEMORY_BANK_DATA['INC-4102'];

  const services = [
    'ALL SERVICES',
    'payment-gateway',
    'auth-service',
    'inventory-api',
    'db-cluster',
  ];

  const handleReindex = () => {
    setIsReindexing(true);
    setReindexSuccess(false);
    setTimeout(() => {
      setIsReindexing(false);
      setReindexSuccess(true);
      setTimeout(() => setReindexSuccess(false), 2500);
    }, 1200);
  };

  const handleExportDump = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(MEMORY_BANK_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hindsight_memory_dump_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportDumpSuccess(true);
    setTimeout(() => setExportDumpSuccess(false), 2000);
  };

  // Filter items based on criteria
  const filteredIncidents = Object.values(MEMORY_BANK_DATA).filter((item) => {
    if (selectedService !== 'ALL SERVICES' && item.service !== selectedService) return false;
    if (selectedSeverity !== 'ALL' && item.severity !== selectedSeverity) return false;
    if (item.similarity < similarityThreshold) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Dynamic Atmospheric Underlay */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 right-12 w-96 h-96 bg-[#8ed5ff]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 left-1/3 w-80 h-80 bg-[#4fdbc8]/10 blur-3xl pointer-events-none"></div>

        {/* Section 1: Memory Bank Head & Telemetry Ribbons */}
        <div className="w-full flex flex-col gap-4 mb-2">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-3xl">
              <div className="flex items-center gap-2 text-[#4fdbc8] font-label-sm text-[11px]">
                <span className="w-2 h-2 bg-[#4fdbc8] inline-block animate-pulse"></span>
                <span>EPISODIC &amp; SEMANTIC ARCHIVE // 1536-D HYPERSPACE</span>
                <span className="text-[#3e484f]">/</span>
                <span className="text-[#54ddfc]">GROQ LPU ACCELERATED</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-[#dfe2ee] tracking-tight uppercase">
                Hindsight Memory Bank
              </h1>
              <p className="font-body-md text-body-md text-[#bdc8d1] max-w-2xl">
                Persistent episodic and semantic incident knowledge base storing root causes, mitigation paths, vector embeddings, and post-mortems for real-time autonomous remediation.
              </p>
            </div>

            {/* Telemetry Pill Indicators */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0a0e16] p-2 border border-[#262a33]">
              <div className="flex flex-col px-3 py-1 bg-[#181c24] border border-[#262a33]">
                <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold">Stored Vectors</span>
                <span className="font-label-md text-label-md text-[#8ed5ff] font-bold">1,428 EMB</span>
              </div>
              <div className="flex flex-col px-3 py-1 bg-[#181c24] border border-[#262a33]">
                <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold">Index Health</span>
                <span className="font-label-md text-label-md text-[#4fdbc8] font-bold">99.98%</span>
              </div>
              <div className="flex flex-col px-3 py-1 bg-[#181c24] border border-[#262a33]">
                <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold">Query Latency</span>
                <span className="font-label-md text-label-md text-[#54ddfc] font-bold">4.18 ms</span>
              </div>
              <div className="flex flex-col px-3 py-1 bg-[#181c24] border border-[#262a33]">
                <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold">Recall Precision</span>
                <span className="font-label-md text-label-md text-[#dfe2ee] font-bold">0.994 MAP</span>
              </div>
            </div>
          </div>

          {/* Search & Multi-Axis Filtering Panel */}
          <div className="w-full bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-3">
            {/* Search Bar */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8ed5ff]">
                <span className="material-symbols-outlined text-[20px]">manage_search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search past incidents, error patterns, runbooks, or root cause keywords..."
                className="w-full pl-10 pr-32 py-2.5 bg-[#0a0e16] text-[#dfe2ee] font-mono text-[13px] border border-[#262a33] focus:border-[#8ed5ff] outline-none transition-colors"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hidden sm:inline-block px-1.5 py-0.5 bg-[#262a33] text-[#bdc8d1] font-label-sm text-[10px] uppercase hover:text-white cursor-pointer"
                  >
                    ESC TO CLEAR
                  </button>
                )}
                <button
                  type="button"
                  className="px-3 py-1.5 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] hover:bg-[#54ddfc] transition-colors flex items-center gap-1 font-bold uppercase cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>VECTOR SCAN</span>
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 pt-1">
              {/* Service Filter Tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase mr-2 tracking-wider font-bold">
                  Service Scope:
                </span>
                {services.map((svc) => (
                  <button
                    key={svc}
                    onClick={() => setSelectedService(svc)}
                    className={`px-3 py-1 font-label-sm text-[11px] transition-colors border cursor-pointer ${
                      selectedService === svc
                        ? 'bg-[#8ed5ff] text-[#00354a] font-bold border-[#8ed5ff]'
                        : 'bg-[#262a33] text-[#bdc8d1] hover:text-[#dfe2ee] border-[#3e484f]'
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>

              {/* Severity & Threshold Sliders */}
              <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto justify-between xl:justify-end">
                {/* Severity Filter Tags */}
                <div className="flex items-center gap-1">
                  <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase mr-1 tracking-wider font-bold">
                    Severity:
                  </span>
                  {(['ALL', 'P1', 'P2', 'P3'] as const).map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setSelectedSeverity(sev)}
                      className={`px-2 py-0.5 font-label-sm text-[11px] font-bold border transition-colors cursor-pointer ${
                        selectedSeverity === sev
                          ? sev === 'P1'
                            ? 'bg-[#ffb4ab] text-[#690005] border-[#ffb4ab]'
                            : sev === 'P2'
                            ? 'bg-[#54ddfc] text-[#003640] border-[#54ddfc]'
                            : 'bg-[#8ed5ff] text-[#00354a] border-[#8ed5ff]'
                          : 'bg-[#262a33] text-[#bdc8d1] hover:text-[#dfe2ee] border-[#3e484f]'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>

                {/* Vector Similarity Slider */}
                <div className="flex items-center gap-2 bg-[#0a0e16] px-3 py-1 border border-[#262a33]">
                  <span className="material-symbols-outlined text-[16px] text-[#54ddfc]">tune</span>
                  <label htmlFor="sim-threshold" className="font-label-sm text-[11px] text-[#bdc8d1] uppercase font-bold">
                    Similarity ≥
                  </label>
                  <input
                    id="sim-threshold"
                    type="range"
                    min="0.75"
                    max="0.99"
                    step="0.01"
                    value={similarityThreshold}
                    onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                    className="w-24 accent-[#8ed5ff] bg-[#262a33] cursor-pointer"
                  />
                  <span className="font-label-sm text-[11px] text-[#4fdbc8] font-bold w-9 text-right font-mono">
                    {similarityThreshold.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Main Split Workspace */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left Column: Retrieved Memory Units (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#8ed5ff]">dynamic_feed</span>
                <span className="font-label-md text-label-md text-[#dfe2ee] tracking-wider uppercase font-bold">
                  Retrieved Memory Units ({filteredIncidents.length} Ranked)
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-[#4fdbc8]">
                Cosine Distance: Rank Ordered
              </span>
            </div>

            {/* Memory Cards */}
            {filteredIncidents.map((item) => {
              const isSelected = selectedIncidentId === item.incident_id;
              return (
                <div
                  key={item.incident_id}
                  onClick={() => setSelectedIncidentId(item.incident_id)}
                  className={`cursor-pointer bg-[#181c24] p-4 relative border transition-all ${
                    isSelected
                      ? 'border-[#4fdbc8] shadow-[0_0_15px_rgba(79,219,200,0.15)] bg-[#1c2028]'
                      : 'border-[#262a33] hover:border-[#8ed5ff]'
                  }`}
                >
                  {/* Left Active Glow Indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4fdbc8] shadow-[0_0_10px_#4fdbc8]"></div>
                  )}

                  <div className="flex flex-col gap-2">
                    {/* Header Meta Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[#262a33]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 font-label-sm text-[10px] font-bold ${
                            item.severity === 'P1'
                              ? 'bg-[#ffb4ab] text-[#690005]'
                              : item.severity === 'P2'
                              ? 'bg-[#54ddfc] text-[#003640]'
                              : 'bg-[#8ed5ff] text-[#00354a]'
                          }`}
                        >
                          {item.severity} {item.severity === 'P1' ? 'CRITICAL' : item.severity === 'P2' ? 'WARNING' : 'NOTICE'}
                        </span>
                        <span className="font-title text-title text-[#dfe2ee] font-bold">
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-label-sm text-[11px] text-[#4fdbc8]">
                        <span className="flex items-center gap-1 font-bold">
                          <span className="material-symbols-outlined text-[14px]">insights</span>
                          <span>{(item.similarity * 100).toFixed(1)}% SIMILARITY</span>
                        </span>
                        <span className="text-[#3e484f]">|</span>
                        <span className="text-[#54ddfc]">{item.mttr}</span>
                      </div>
                    </div>

                    {/* Vector Footprint Strip */}
                    <div className="flex flex-wrap items-center gap-1.5 font-label-sm text-[11px] text-[#bdc8d1]">
                      <span className="px-1.5 py-0.5 bg-[#0a0e16] text-[#8ed5ff] border border-[#262a33]">
                        ID: {item.vector_id}
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#0a0e16] border border-[#262a33]">
                        DIM: 1536 (Llama-Embed)
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#0a0e16] text-[#4fdbc8] border border-[#262a33]">
                        CLUSTER: {item.cluster}
                      </span>
                      {item.table && (
                        <span className="px-1.5 py-0.5 bg-[#0a0e16] border border-[#262a33]">
                          TABLE: {item.table}
                        </span>
                      )}
                    </div>

                    {/* Indexed Error Signature */}
                    <div className="bg-[#0a0e16] p-2.5 border border-[#262a33] flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] shrink-0 mt-0.5">
                        terminal
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-sm text-[10px] text-[#87929a] uppercase tracking-wider">
                          Indexed Error Signature
                        </span>
                        <code className="font-mono text-[12px] text-[#ffb4ab] truncate">
                          {item.errorSignature}
                        </code>
                      </div>
                    </div>

                    {/* Root Cause & Mitigation Split Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      <div className="bg-[#181c24] p-2.5 border border-[#262a33] flex flex-col gap-1">
                        <span className="font-label-sm text-[10px] text-[#bdc8d1] uppercase font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#ffb4ab]"></span> Verified Root Cause
                        </span>
                        <p className="font-body-sm text-[12px] text-[#dfe2ee]">
                          {item.rootCause}
                        </p>
                      </div>
                      <div className="bg-[#181c24] p-2.5 border border-[#262a33] flex flex-col gap-1">
                        <span className="font-label-sm text-[10px] text-[#4fdbc8] uppercase font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#4fdbc8]"></span> Proven Fix Applied
                        </span>
                        <p className="font-body-sm text-[12px] text-[#dfe2ee]">
                          {item.provenFix}
                        </p>
                      </div>
                    </div>

                    {/* Footer Stats & Post-Mortem Hook */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#262a33]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-[#8ed5ff]" title={`${item.rating}/5 Rating`}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-[16px]"
                              style={{ fontVariationSettings: i < item.rating ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="font-label-sm text-[11px] text-[#bdc8d1]">
                          Used in <strong className="text-[#dfe2ee]">{item.subsequentHits} subsequent incidents</strong> (Reduced MTTR by {item.mttrReductionPct}%)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-label-sm text-[11px]">
                        <span className="px-2 py-0.5 bg-[#262a33] text-[#54ddfc] border border-[#3e484f]">
                          {item.postMortemNotes}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('active-incident-triage-resolution');
                          }}
                          className="px-2.5 py-1 bg-[#262a33] hover:bg-[#8ed5ff] hover:text-[#00354a] text-[#dfe2ee] transition-colors flex items-center gap-1 font-bold border border-[#3e484f] cursor-pointer"
                        >
                          <span>RUN REPLAY</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Vector Space Graph & Payload Inspector (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            {/* Hyperspace 2D Cluster Visual Panel */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-2 relative">
              <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#54ddfc]">hub</span>
                  <span className="font-label-sm text-[11px] text-[#dfe2ee] uppercase font-bold">
                    Vector Space Graph
                  </span>
                </div>
                <span className="font-label-sm text-[10px] text-[#4fdbc8] px-1.5 py-0.5 bg-[#0a0e16] border border-[#262a33]">
                  t-SNE 2D PROJECTION
                </span>
              </div>

              {/* SVG Vector Cluster Canvas */}
              <div className="relative w-full h-56 bg-[#0a0e16] border border-[#262a33] overflow-hidden">
                {/* Background Grid Ticks */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#87929a" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>

                {/* Vector Nodes & Cluster Regions */}
                <svg className="relative z-10 w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="none">
                  {/* Cluster Halos */}
                  <ellipse cx="90" cy="85" rx="55" ry="40" fill="#8ed5ff" fillOpacity="0.1" />
                  <ellipse cx="230" cy="70" rx="45" ry="35" fill="#4fdbc8" fillOpacity="0.1" />
                  <ellipse cx="140" cy="165" rx="40" ry="30" fill="#54ddfc" fillOpacity="0.1" />
                  <ellipse cx="250" cy="160" rx="35" ry="25" fill="#dfe2ee" fillOpacity="0.08" />

                  {/* Connectors */}
                  <line x1="90" y1="85" x2="230" y2="70" stroke="#3e484f" strokeDasharray="2,3" strokeWidth="1" />
                  <line x1="90" y1="85" x2="140" y2="165" stroke="#3e484f" strokeDasharray="2,3" strokeWidth="1" />
                  <line x1="230" y1="70" x2="250" y2="160" stroke="#3e484f" strokeDasharray="2,3" strokeWidth="1" />

                  {/* Database Nodes */}
                  <circle cx="85" cy="80" r="4" fill="#8ed5ff" />
                  <circle cx="105" cy="92" r="3" fill="#8ed5ff" fillOpacity="0.7" />
                  <circle cx="70" cy="95" r="2.5" fill="#8ed5ff" fillOpacity="0.6" />
                  <circle cx="95" cy="65" r="2" fill="#8ed5ff" fillOpacity="0.5" />

                  {/* Active highlight ring on selected vector */}
                  <circle cx="85" cy="80" r="10" fill="none" stroke="#4fdbc8" strokeWidth="1" className="animate-ping" />
                  <circle cx="85" cy="80" r="7" fill="none" stroke="#4fdbc8" strokeWidth="1.5" />
                  <text x="85" y="60" textAnchor="middle" fill="#4fdbc8" fontFamily="Space Mono" fontSize="8" fontWeight="bold">
                    {selectedIncidentId} [ACTIVE]
                  </text>

                  {/* Cache Nodes */}
                  <circle cx="225" cy="65" r="3.5" fill="#4fdbc8" />
                  <circle cx="240" cy="80" r="2.5" fill="#4fdbc8" fillOpacity="0.7" />
                  <circle cx="215" cy="75" r="2" fill="#4fdbc8" fillOpacity="0.5" />
                  <text x="230" y="48" textAnchor="middle" fill="#4fdbc8" fontFamily="Space Mono" fontSize="8">
                    CACHE CLUSTER
                  </text>

                  {/* Auth Nodes */}
                  <circle cx="140" cy="165" r="3.5" fill="#54ddfc" />
                  <circle cx="155" cy="155" r="2" fill="#54ddfc" fillOpacity="0.7" />
                  <circle cx="125" cy="170" r="2" fill="#54ddfc" fillOpacity="0.5" />
                  <text x="140" y="195" textAnchor="middle" fill="#54ddfc" fontFamily="Space Mono" fontSize="8">
                    AUTH / IDP
                  </text>

                  {/* Broker Nodes */}
                  <circle cx="250" cy="160" r="3" fill="#dfe2ee" />
                  <circle cx="265" cy="150" r="2" fill="#dfe2ee" fillOpacity="0.7" />
                  <circle cx="238" cy="170" r="1.5" fill="#dfe2ee" fillOpacity="0.5" />
                  <text x="250" y="195" textAnchor="middle" fill="#bdc8d1" fontFamily="Space Mono" fontSize="8">
                    BROKER / QUEUE
                  </text>
                </svg>

                {/* HUD Coordinate readout */}
                <div className="absolute bottom-2 left-2 font-label-sm text-[9px] text-[#bdc8d1] flex gap-2">
                  <span>X: +0.4129</span>
                  <span>Y: -0.8921</span>
                  <span>Z: +0.0104</span>
                </div>
                <div className="absolute top-2 right-2 font-label-sm text-[9px] text-[#4fdbc8]">
                  1,428 DENSE NODES
                </div>
              </div>

              {/* Cluster Legend */}
              <div className="flex items-center justify-between text-[#bdc8d1] font-label-sm text-[10px] pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#8ed5ff]"></span> Database
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#4fdbc8]"></span> Cache
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#54ddfc]"></span> Auth
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#dfe2ee]"></span> Stream
                </span>
              </div>
            </div>

            {/* Supabase / Hindsight Dynamic JSON Inspector */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-2">
              <div className="flex items-center justify-between pb-1 border-b border-[#262a33]">
                <div className="flex items-center gap-1.5 font-label-sm text-[11px] text-[#dfe2ee] font-bold">
                  <span className="material-symbols-outlined text-[18px] text-[#8ed5ff]">data_object</span>
                  <span>Supabase / Hindsight Payload</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#262a33] text-[#8ed5ff] font-label-sm text-[10px] border border-[#3e484f]">
                  {selectedIncidentId}
                </span>
              </div>

              {/* Formatted Code Block */}
              <div className="relative bg-[#0a0e16] p-3 font-mono text-[11px] overflow-x-auto text-[#dfe2ee] max-h-72 border border-[#262a33] leading-relaxed">
                <pre>
                  <code className="text-[#54ddfc]">
                    {JSON.stringify(selectedItem.payload, null, 2)}
                  </code>
                </pre>
              </div>

              {/* Execution Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReindex}
                  disabled={isReindexing}
                  className="w-full sm:flex-1 py-2 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] font-bold hover:bg-[#54ddfc] transition-colors flex items-center justify-center gap-1 uppercase cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[16px] ${isReindexing ? 'animate-spin' : ''}`}>
                    {reindexSuccess ? 'check' : 'sync'}
                  </span>
                  <span>
                    {isReindexing
                      ? 'INDEXING 1428 VECS...'
                      : reindexSuccess
                      ? 'SYNC COMPLETE (12ms)'
                      : 'Re-index Vectors'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleExportDump}
                  className="w-full sm:flex-1 py-2 bg-[#262a33] text-[#dfe2ee] hover:text-[#8ed5ff] font-label-sm text-[11px] font-bold transition-colors flex items-center justify-center gap-1 uppercase border border-[#3e484f] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {exportDumpSuccess ? 'task_alt' : 'download'}
                  </span>
                  <span>{exportDumpSuccess ? 'Dump Downloaded' : 'Export Dump'}</span>
                </button>
              </div>
            </div>

            {/* Autonomous Knowledge Gain Insight Box */}
            <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[#4fdbc8] font-label-sm text-[11px] font-bold">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span className="uppercase">Autonomous Knowledge Gain</span>
              </div>
              <p className="font-body-sm text-[12px] text-[#bdc8d1]">
                OpsMind has synthesized <strong className="text-[#dfe2ee]">41 recurring patterns</strong> this month. Auto-generated runbook recommendations bypass manual escalation in 74% of known connection exhaustion anomalies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
