// ─────────────────────────────────────────────────────────────────────────────
// FREE-AI Guard — mock data layer
// Grounded in RBI's FREE-AI framework (Aug 2025): 7 Sutras, 6 Pillars, 26 Recs.
// This data simulates what a small NBFC's AI-governance posture looks like.
// ─────────────────────────────────────────────────────────────────────────────

export const ORG = {
  name: 'Meridian Capital (NBFC-ND)',
  rbiCategory: 'NBFC — Non-Deposit Taking, Middle Layer',
  complianceOfficer: 'You (Head of Risk & Compliance)',
  lastReview: '2026-05-28',
}

// The six pillars of FREE-AI. Three enablers, three risk-mitigators.
export const PILLARS = [
  { key: 'infrastructure', label: 'Infrastructure', type: 'Enabler', score: 72 },
  { key: 'policy', label: 'Policy', type: 'Enabler', score: 81 },
  { key: 'capacity', label: 'Capacity', type: 'Enabler', score: 64 },
  { key: 'governance', label: 'Governance', type: 'Risk Mitigator', score: 58 },
  { key: 'protection', label: 'Protection', type: 'Risk Mitigator', score: 69 },
  { key: 'assurance', label: 'Assurance', type: 'Risk Mitigator', score: 47 },
]

// The 7 Sutras — foundational principles. Used in the readiness checklist.
export const SUTRAS = [
  'Trust is the Foundation',
  'People First',
  'Innovation over Restraint',
  'Fairness & Equity',
  'Accountability',
  'Understandable by Design',
  'Safety, Resilience & Sustainability',
]

// AI / model inventory — the heart of the documentation requirement.
export const MODELS = [
  {
    id: 'MDL-001',
    name: 'Credit Underwriting Score v3',
    type: 'Gradient Boosted Trees',
    use: 'Loan approval decisioning',
    owner: 'Lending Analytics',
    risk: 'High',
    vendor: 'In-house',
    deployed: '2025-11-02',
    lastValidated: '2026-03-15',
    drift: 'Stable',
    biasFlag: false,
    boardApproved: true,
    humanOverride: true,
    docs: 92,
  },
  {
    id: 'MDL-002',
    name: 'Collections Propensity Model',
    type: 'Logistic Regression',
    use: 'Prioritising overdue accounts',
    owner: 'Collections',
    risk: 'High',
    vendor: 'Acme Collections AI (3rd-party)',
    deployed: '2026-01-20',
    lastValidated: '2026-01-20',
    drift: 'Drifting',
    biasFlag: true,
    boardApproved: false,
    humanOverride: true,
    docs: 41,
  },
  {
    id: 'MDL-003',
    name: 'KYC Document OCR',
    type: 'Vision Transformer',
    use: 'Onboarding document extraction',
    owner: 'Operations',
    risk: 'Medium',
    vendor: 'DocVerify Labs (3rd-party)',
    deployed: '2025-08-11',
    lastValidated: '2026-02-28',
    drift: 'Stable',
    biasFlag: false,
    boardApproved: true,
    humanOverride: false,
    docs: 78,
  },
  {
    id: 'MDL-004',
    name: 'Support Chat Assistant (LLM)',
    type: 'LLM — frontier model, RAG',
    use: 'Customer query handling',
    owner: 'Customer Experience',
    risk: 'Medium',
    vendor: 'External LLM API (3rd-party)',
    deployed: '2026-04-05',
    lastValidated: 'Never',
    drift: 'Unmonitored',
    biasFlag: false,
    boardApproved: false,
    humanOverride: true,
    docs: 23,
  },
  {
    id: 'MDL-005',
    name: 'Fraud Anomaly Detector',
    type: 'Isolation Forest',
    use: 'Transaction fraud screening',
    owner: 'Risk',
    risk: 'High',
    vendor: 'In-house',
    deployed: '2025-06-30',
    lastValidated: '2026-04-10',
    drift: 'Stable',
    biasFlag: false,
    boardApproved: true,
    humanOverride: true,
    docs: 88,
  },
  {
    id: 'MDL-006',
    name: 'Early-Warning Churn Signal',
    type: 'Random Forest',
    use: 'Retention targeting',
    owner: 'Growth',
    risk: 'Low',
    vendor: 'In-house',
    deployed: '2026-02-14',
    lastValidated: '2026-02-14',
    drift: 'Stable',
    biasFlag: false,
    boardApproved: true,
    humanOverride: false,
    docs: 64,
  },
]

// 12-month drift trace for the monitoring view (PSI — population stability index).
export const DRIFT_SERIES = [
  { month: 'Jul', underwriting: 0.04, collections: 0.05, fraud: 0.03 },
  { month: 'Aug', underwriting: 0.05, collections: 0.06, fraud: 0.03 },
  { month: 'Sep', underwriting: 0.04, collections: 0.08, fraud: 0.04 },
  { month: 'Oct', underwriting: 0.06, collections: 0.11, fraud: 0.03 },
  { month: 'Nov', underwriting: 0.05, collections: 0.14, fraud: 0.05 },
  { month: 'Dec', underwriting: 0.07, collections: 0.18, fraud: 0.04 },
  { month: 'Jan', underwriting: 0.06, collections: 0.21, fraud: 0.05 },
  { month: 'Feb', underwriting: 0.05, collections: 0.24, fraud: 0.04 },
  { month: 'Mar', underwriting: 0.06, collections: 0.27, fraud: 0.06 },
  { month: 'Apr', underwriting: 0.07, collections: 0.29, fraud: 0.05 },
  { month: 'May', underwriting: 0.06, collections: 0.31, fraud: 0.05 },
  { month: 'Jun', underwriting: 0.07, collections: 0.34, fraud: 0.06 },
]

// Fairness slice for the Collections model that tripped the bias flag.
export const BIAS_SLICES = [
  { group: 'Metro', approvalRate: 71, baseline: 70 },
  { group: 'Tier-2 city', approvalRate: 68, baseline: 70 },
  { group: 'Tier-3 / rural', approvalRate: 52, baseline: 70 },
  { group: 'Age < 30', approvalRate: 66, baseline: 70 },
  { group: 'Age > 55', approvalRate: 49, baseline: 70 },
]

// Immutable-style audit trail. In production these are append-only, hash-chained.
export const AUDIT_LOG = [
  { ts: '2026-06-11 14:32', actor: 'collections.model', event: 'Inference', detail: 'Scored 1,204 overdue accounts', sev: 'info' },
  { ts: '2026-06-11 09:15', actor: 'r.sharma@meridian', event: 'Override', detail: 'Manually reversed MDL-002 decision on acct #88213', sev: 'warn' },
  { ts: '2026-06-10 18:40', actor: 'system', event: 'Drift alert', detail: 'MDL-002 PSI crossed 0.30 threshold', sev: 'crit' },
  { ts: '2026-06-10 11:02', actor: 'underwriting.model', event: 'Inference', detail: 'Scored 540 loan applications', sev: 'info' },
  { ts: '2026-06-09 16:25', actor: 'a.iyer@meridian', event: 'Model change', detail: 'Deployed MDL-004 v1.2 — no board sign-off on file', sev: 'crit' },
  { ts: '2026-06-09 10:00', actor: 'system', event: 'Bias scan', detail: 'MDL-002 flagged: Tier-3 approval gap 18pts', sev: 'crit' },
  { ts: '2026-06-08 13:11', actor: 'fraud.model', event: 'Inference', detail: 'Screened 42,118 transactions, 31 flagged', sev: 'info' },
  { ts: '2026-06-08 08:45', actor: 'compliance@meridian', event: 'Doc update', detail: 'Uploaded validation report for MDL-001', sev: 'info' },
]

// 12 of the 26 FREE-AI recommendations, mapped to the readiness checklist.
// status: done | partial | missing
export const CHECKLIST = [
  { pillar: 'Governance', rec: 'Board-approved AI policy in place', status: 'done', critical: true },
  { pillar: 'Governance', rec: 'Designated AI/model risk owner at senior level', status: 'done', critical: true },
  { pillar: 'Governance', rec: 'Complete inventory of all AI/ML systems', status: 'partial', critical: true },
  { pillar: 'Governance', rec: 'Formal model approval & change-control process', status: 'partial', critical: true },
  { pillar: 'Assurance', rec: 'Independent validation before high-risk deployment', status: 'missing', critical: true },
  { pillar: 'Assurance', rec: 'Periodic post-deployment model audits', status: 'partial', critical: false },
  { pillar: 'Assurance', rec: 'Bias / fairness testing across customer segments', status: 'missing', critical: true },
  { pillar: 'Protection', rec: 'Drift & performance monitoring with alerting', status: 'partial', critical: true },
  { pillar: 'Protection', rec: 'AI incident reporting mechanism', status: 'missing', critical: false },
  { pillar: 'Policy', rec: 'Customer disclosure when AI is used in a decision', status: 'done', critical: true },
  { pillar: 'Policy', rec: 'Human override / right-to-appeal pathway', status: 'done', critical: true },
  { pillar: 'Capacity', rec: 'Audit-ready documentation per model', status: 'partial', critical: false },
]

export const STATUS_META = {
  done: { label: 'In place', color: '#16a34a', bg: '#dcfce7' },
  partial: { label: 'Partial', color: '#d97706', bg: '#fef3c7' },
  missing: { label: 'Gap', color: '#dc2626', bg: '#fee2e2' },
}

export const RISK_META = {
  High: { color: '#dc2626', bg: '#fee2e2' },
  Medium: { color: '#d97706', bg: '#fef3c7' },
  Low: { color: '#16a34a', bg: '#dcfce7' },
}
