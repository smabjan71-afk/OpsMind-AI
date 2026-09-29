export type Severity = 'P1' | 'P2' | 'P3' | 'P4';

export type ServiceName =
  | 'checkout-service'
  | 'payment-gateway'
  | 'auth-service'
  | 'inventory-api'
  | 'ingress-router';

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: Severity;
  state: 'LIVE' | 'TRIAGED' | 'RESOLVED' | 'AUTO-PATCHED' | 'STABILIZED';
  triggeredAt: string;
  trace: string;
  context: string;
  datadogUrl?: string;
  grafanaUrl?: string;
  rootCause?: string;
  provenFix?: string;
  similarity?: string;
  mttrMinutes?: number;
  downtime?: string;
  matchedIncidentId?: string;
}

export interface MemoryUnit {
  incident_id: string;
  title: string;
  vector_id: string;
  severity: Severity;
  similarity: number;
  mttr: string;
  cluster: string;
  service: string;
  table?: string;
  errorSignature: string;
  rootCause: string;
  provenFix: string;
  rating: number;
  subsequentHits: number;
  mttrReductionPct: number;
  postMortemNotes: string;
  payload: Record<string, any>;
}

export interface PostMortem {
  id: string;
  incidentId: string;
  title: string;
  service: string;
  downtime: string;
  commander: string;
  date: string;
  executiveSummary: string;
  fiveWhys: string[];
  immediateRemediation: string;
  permanentCountermeasures: string[];
  vectorDirective: string;
  vectorId: string;
  verifiedStatus: 'COMMITTED' | 'PENDING_REVIEW';
}

export interface RemediationStep {
  step: number;
  title: string;
  description: string;
  status: 'COMPLETED' | 'READY' | 'QUEUED' | 'DEPLOYED' | 'ENFORCED';
  output?: string;
}
