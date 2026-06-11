import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, BarChart, Bar, Cell,
} from 'recharts'
import { AlertTriangle } from 'lucide-react'
import { Card, SectionTitle, Badge } from '../ui.jsx'
import { DRIFT_SERIES, BIAS_SLICES } from '../data.js'

export default function Monitoring() {
  return (
    <div>
      <SectionTitle
        kicker="FREE-AI · Protection & Assurance pillars"
        title="Drift & Fairness Monitoring"
        subtitle="Continuous monitoring is what turns a static model inventory into an auditable control. Thresholds here map to your board-approved risk appetite."
      />

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-7 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">Population Stability Index (12 months)</span>
            <Badge color="#dc2626" bg="#fee2e2">Threshold 0.25</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={DRIFT_SERIES} margin={{ top: 6, right: 10, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 0.4]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <ReferenceLine y={0.25} stroke="#dc2626" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="collections" name="Collections (MDL-002)" stroke="#dc2626" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="underwriting" name="Underwriting (MDL-001)" stroke="#4f46e5" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="fraud" name="Fraud (MDL-005)" stroke="#16a34a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-[11px] text-slate-500">
            <Legend c="#dc2626" t="Collections" /><Legend c="#4f46e5" t="Underwriting" /><Legend c="#16a34a" t="Fraud" />
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={15} className="text-red-500" />
            <span className="text-sm font-semibold text-slate-700">Fairness scan — MDL-002</span>
          </div>
          <p className="text-xs text-slate-500 mb-3">Approval rate by segment vs. 70% baseline. Gaps beyond 10pts trip the bias flag.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BIAS_SLICES} margin={{ top: 6, right: 10, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="group" tick={{ fontSize: 10, fill: '#94a3b8' }} interval={0} angle={-12} textAnchor="end" height={48} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[0, 80]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <ReferenceLine y={70} stroke="#64748b" strokeDasharray="4 4" />
              <Bar dataKey="approvalRate" radius={[4, 4, 0, 0]}>
                {BIAS_SLICES.map((s, i) => (
                  <Cell key={i} fill={70 - s.approvalRate > 10 ? '#dc2626' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="col-span-12 p-5 border-l-4 border-l-indigo-400">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm font-semibold text-slate-800">Suggested playbook</div>
            <Badge color="#4f46e5" bg="#eef2ff">Configurable · decision support</Badge>
          </div>
          <p className="text-sm text-slate-600">
            MDL-002 (Collections Propensity, 3rd-party) has drifted past your 0.25 PSI threshold and shows an 18-point
            approval gap for Tier-3/rural and over-55 segments — a possible fair-lending exposure under the FREE-AI
            <span className="font-medium text-slate-800"> Fairness &amp; Equity</span> sutra. Options your team may consider:
            route affected segments to human review, request a fresh validation pack from the vendor, and assess whether
            this meets your threshold for a board-reportable AI incident.
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            Suggestions only — FREE-AI Guard surfaces evidence and options; the decision and accountability stay with your team.
          </p>
        </Card>
      </div>
    </div>
  )
}

const Legend = ({ c, t }) => (
  <span className="inline-flex items-center gap-1">
    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />{t}
  </span>
)
