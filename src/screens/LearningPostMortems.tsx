import React, { useState } from 'react';
import { POST_MORTEMS_CATALOG } from '../data/mockData';
import { PostMortem } from '../types';
import { ScreenId } from '../components/Sidebar';

interface LearningPostMortemsProps {
  onNavigate: (screen: ScreenId, param?: string) => void;
  selectedId?: string;
}

export const LearningPostMortems: React.FC<LearningPostMortemsProps> = ({
  onNavigate,
  selectedId,
}) => {
  const [postMortems, setPostMortems] = useState<PostMortem[]>(POST_MORTEMS_CATALOG);
  const [activePmId, setActivePmId] = useState<string>(selectedId || 'PM-8921');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);

  // New Post-Mortem form states
  const [newTitle, setNewTitle] = useState('Cart Checkout Lock Escalation under Stripe Outage');
  const [newService, setNewService] = useState('checkout-api');
  const [newDowntime, setNewDowntime] = useState('7m 10s');

  const activePm = postMortems.find((pm) => pm.id === activePmId) || postMortems[0];

  const handleGenerateAiPostMortem = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/post-mortem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentId: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
          title: newTitle,
          service: newService,
          downtime: newDowntime,
        }),
      });
      const json = await res.json();
      const generated = json.data;

      const newPm: PostMortem = {
        id: `PM-${Math.floor(Math.random() * 9000) + 1000}`,
        incidentId: `INC-${Math.floor(Math.random() * 9000) + 1000}`,
        title: newTitle,
        service: newService,
        downtime: newDowntime,
        commander: 'Alex Chen (Lead SRE)',
        date: new Date().toISOString().split('T')[0],
        executiveSummary: generated.executiveSummary,
        fiveWhys: generated.fiveWhys || [
          'Why did error rate spike? API timeout on downstream payment processor.',
          'Why did timeouts cascade? Uncapped worker thread pool.',
          'Why was thread pool uncapped? Default configuration was active in canary release.',
          'Why canary release? Progressive rollout pipeline was testing v2.18.',
          'Why did pipeline fail to catch? Load test did not simulate 429 partner retries.',
        ],
        immediateRemediation: generated.immediateRemediation,
        permanentCountermeasures: generated.permanentCountermeasures,
        vectorDirective: generated.hindsightVectorDirective,
        vectorId: generated.vectorId,
        verifiedStatus: 'COMMITTED',
      };

      setPostMortems([newPm, ...postMortems]);
      setActivePmId(newPm.id);
      setShowGeneratorModal(false);
    } catch {
      // fallback
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Top Banner */}
      <div className="p-4 bg-[#0a0e16] border border-[#262a33] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-2 text-[#4fdbc8] font-label-sm text-[11px] uppercase tracking-wider font-bold">
            <span className="w-2 h-2 bg-[#4fdbc8] inline-block animate-pulse"></span>
            <span>Continuous Learning Loop // Automated Post-Mortems</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#dfe2ee] tracking-tight uppercase">
            Learning &amp; Post-Mortems
          </h1>
          <p className="font-body-md text-body-md text-[#bdc8d1]">
            Turn chaotic production fires into machine-actionable memory directives. Post-mortems auto-synthesized by Gemini &amp; committed directly into the Hindsight pgvector archive.
          </p>
        </div>

        <button
          onClick={() => setShowGeneratorModal(true)}
          className="px-4 py-2.5 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] font-bold uppercase tracking-wider hover:bg-[#54ddfc] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <span className="material-symbols-outlined text-[18px]">psychology</span>
          <span>Generate AI Post-Mortem</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="font-label-sm text-[11px] text-[#bdc8d1] uppercase tracking-wider font-bold px-1">
            Committed Post-Mortem Archive ({postMortems.length})
          </span>

          <div className="flex flex-col gap-2">
            {postMortems.map((pm) => {
              const isSelected = activePmId === pm.id;
              return (
                <div
                  key={pm.id}
                  onClick={() => setActivePmId(pm.id)}
                  className={`p-3 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c2028] border-[#4fdbc8] shadow-[0_0_12px_rgba(79,219,200,0.2)]'
                      : 'bg-[#181c24] border-[#262a33] hover:border-[#8ed5ff]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1">
                    <span className="px-1.5 py-0.5 bg-[#0a0e16] text-[#8ed5ff] font-label-sm text-[10px] font-bold border border-[#262a33]">
                      {pm.id}
                    </span>
                    <span className="font-label-sm text-[10px] text-[#4fdbc8] font-bold">
                      {pm.verifiedStatus}
                    </span>
                  </div>
                  <h4 className="font-title text-[13px] font-bold text-[#dfe2ee] leading-snug pt-1">
                    {pm.title}
                  </h4>
                  <div className="flex items-center justify-between text-[#87929a] font-label-sm text-[10px] pt-2 border-t border-[#262a33] mt-2">
                    <span>{pm.service}</span>
                    <span>{pm.date} • {pm.downtime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {activePm && (
            <div className="bg-[#181c24] p-4 border border-[#262a33] shadow-md flex flex-col gap-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#262a33]">
                <div className="flex items-center gap-2 font-label-sm text-[11px]">
                  <span className="px-2 py-0.5 bg-[#8ed5ff] text-[#00354a] font-bold">
                    {activePm.id}
                  </span>
                  <span className="text-[#87929a]">|</span>
                  <span className="text-[#54ddfc] font-bold font-mono">{activePm.incidentId}</span>
                  <span className="text-[#87929a]">|</span>
                  <span className="text-[#dfe2ee]">{activePm.service}</span>
                </div>
                <div className="flex items-center gap-3 font-label-sm text-[10px] text-[#bdc8d1]">
                  <span>COMMANDER: <b className="text-[#dfe2ee]">{activePm.commander}</b></span>
                  <span>DOWNTIME: <b className="text-[#4fdbc8]">{activePm.downtime}</b></span>
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="font-headline-sm text-headline-sm text-[#dfe2ee] font-bold">
                  {activePm.title}
                </h2>
                <p className="font-body-sm text-[13px] text-[#bdc8d1] leading-relaxed mt-2 bg-[#0a0e16] p-3 border border-[#262a33]">
                  {activePm.executiveSummary}
                </p>
              </div>

              {/* 5-Whys Root Cause Analysis */}
              <div className="flex flex-col gap-2">
                <span className="font-label-sm text-[11px] text-[#54ddfc] uppercase font-bold tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">account_tree</span>
                  <span>5-Whys Root Cause Chain</span>
                </span>
                <div className="flex flex-col gap-1.5">
                  {activePm.fiveWhys.map((why, idx) => (
                    <div key={idx} className="p-2 bg-[#0a0e16] border border-[#262a33] flex items-start gap-2.5">
                      <span className="w-5 h-5 bg-[#262a33] text-[#8ed5ff] flex items-center justify-center font-label-sm text-[10px] font-bold shrink-0">
                        W{idx + 1}
                      </span>
                      <span className="font-body-sm text-[12px] text-[#dfe2ee]">{why}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immediate Fix & Countermeasures */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col gap-1.5">
                  <span className="font-label-sm text-[11px] text-[#4fdbc8] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    Immediate Remediation
                  </span>
                  <p className="font-body-sm text-[12px] text-[#bdc8d1]">
                    {activePm.immediateRemediation}
                  </p>
                </div>

                <div className="bg-[#0a0e16] p-3 border border-[#262a33] flex flex-col gap-1.5">
                  <span className="font-label-sm text-[11px] text-[#8ed5ff] uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Permanent Countermeasures
                  </span>
                  <ul className="list-disc list-inside font-body-sm text-[11px] text-[#bdc8d1] space-y-1">
                    {activePm.permanentCountermeasures.map((cm, idx) => (
                      <li key={idx}>{cm}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vector Memory Directive Card */}
              <div className="bg-[#0a0e16] p-3 border-l-4 border-[#4fdbc8] border-t border-r border-b border-[#262a33] flex flex-col gap-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-[#4fdbc8] uppercase font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">neurology</span>
                    Committed Hindsight Vector Directive
                  </span>
                  <span className="px-2 py-0.5 bg-[#4fdbc8]/15 text-[#4fdbc8] font-label-sm text-[10px] font-bold border border-[#4fdbc8]/30">
                    ID: {activePm.vectorId}
                  </span>
                </div>
                <div className="font-mono text-[12px] text-[#dfe2ee] bg-[#181c24] p-2 border border-[#262a33]">
                  &gt; {activePm.vectorDirective}
                </div>
                <div className="flex items-center justify-between text-[#87929a] font-label-sm text-[10px] pt-1">
                  <span>Target Cluster: Database / Webhook Reliability</span>
                  <span className="text-[#4fdbc8]">Indexed across 1,428 hyperspace vectors</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 bg-[#0a0e16]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-[#262a33] max-w-xl w-full p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#262a33]">
              <span className="font-label-sm text-[12px] text-[#8ed5ff] font-bold uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                Auto-Generate Formal Post-Mortem via Gemini
              </span>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="text-[#87929a] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2 font-label-sm text-[11px]">
              <label className="text-[#bdc8d1]">Incident Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-[#0a0e16] text-[#dfe2ee] p-2 border border-[#262a33] outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[#bdc8d1]">Service</label>
                  <input
                    type="text"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-[#0a0e16] text-[#dfe2ee] p-2 border border-[#262a33] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[#bdc8d1]">Downtime</label>
                  <input
                    type="text"
                    value={newDowntime}
                    onChange={(e) => setNewDowntime(e.target.value)}
                    className="w-full bg-[#0a0e16] text-[#dfe2ee] p-2 border border-[#262a33] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#262a33]">
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="px-3 py-1.5 bg-[#181c24] text-[#bdc8d1] font-label-sm text-[11px] uppercase hover:bg-[#262a33]"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAiPostMortem}
                disabled={isGenerating}
                className="px-4 py-1.5 bg-[#8ed5ff] text-[#00354a] font-label-sm text-[11px] uppercase font-bold hover:bg-[#54ddfc] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                    <span>Synthesizing 5-Whys &amp; Vectors...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span>Synthesize &amp; Commit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
