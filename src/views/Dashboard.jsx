import { motion } from 'framer-motion'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts'
import { AlertTriangle, ShieldCheck, FileWarning, Activity } from 'lucide-react'
import { Card, ScoreRing, Stat, SectionTitle, Badge } from '../ui.jsx'
import { PILLARS, MODELS, CHECKLIST } from '../data.js'

export default function Dashboard({ go }) {
  const overall = Math.round(PILLARS.reduce((a, p) => a + p.score, 0) / PILLARS.length)
  const highRisk = MODELS.filter((m) => m.risk === 'High').length
  const unvalidated = MODELS.filter((m) => m.lastValidated === 'Never').length
  const noBoard = MODELS.filter((m) => !m.boardApproved).length
  const gaps = CHECKLIST.filter((c) => c.status === 'missing')
  const radarData = PILLARS.map((p) => ({ pillar: p.label, score: p.score }))

  const alerts = [
    { icon: AlertTriangle, tone: 'text-red-600 bg-red-50', text: 'MDL-002 Collections model breached drift threshold (PSI 0.34)', cta: 'Monitoring', sev: 'Critical' },
    { icon: FileWarning, tone: 'text-red-600 bg-red-50', text: 'MDL-004 Support LLM deployed without board sign-off', cta: 'Inventory', sev: 'Critical' },
    { icon: Activity, tone: 'text-amber-600 bg-amber-50', text: 'MDL-002 fairness scan: 18pt approval gap for Tier-3 segment', cta: 'Monitoring', sev: 'High' },
  ]

  return (
    <div>
      <SectionTitle
        kicker="Compliance posture · RBI FREE-AI"
        title="Governance Overview"
        subtitle="A board-ready snapshot of where Meridian Capital stands against the FREE-AI framework's six pillars."
      />

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-4 p-6 flex flex-col items-center justify-center">
          <ScoreRing value={overall} label="readiness" />
          <div className="mt-4 text-center">
            <div className="font-semibold text-slate-900">Moderate readiness</div>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Enabler pillars are healthy; risk-mitigation (Assurance, Governance) is dragging the score. Close the {gaps.length} critical gaps before your next board review.
            </p>
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-8 p-5">
          <div className="text-sm font-semibold text-slate-700 mb-2">Six-pillar maturity</div>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData} outerRadius="72%">
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="pillar" tick={{ fontSize: 12, fill: '#475569' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.35} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="AI systems in inventory" value={MODELS.length} hint={`${highRisk} high-risk`} />
          <Stat label="Critical compliance gaps" value={gaps.length} tone="text-red-600" hint="Open items" />
          <Stat label="Models never validated" value={unvalidated} tone="text-amber-600" hint="Assurance pillar" />
          <Stat label="Awaiting board sign-off" value={noBoard} tone="text-amber-600" hint="Governance pillar" />
        </div>

        <Card className="col-span-12 lg:col-span-7 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-sm font-semibold text-slate-700">Open alerts requiring attention</span>
          </div>
          <div className="space-y-2">
            {alerts.map((a, i) => (
              <motion.button
                key={i}
                onClick={() => go(a.cta)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition"
              >
                <span className={`p-2 rounded-lg ${a.tone}`}><a.icon size={16} /></span>
                <span className="flex-1 text-sm text-slate-700">{a.text}</span>
                <Badge color="#475569" bg="#f1f5f9">{a.sev}</Badge>
              </motion.button>
            ))}
          </div>
        </Card>

        <Card className="col-span-12 lg:col-span-5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={16} className="text-indigo-500" />
            <span className="text-sm font-semibold text-slate-700">Pillar breakdown</span>
          </div>
          <div className="space-y-3">
            {PILLARS.map((p) => (
              <div key={p.key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{p.label} <span className="text-slate-400">· {p.type}</span></span>
                  <span className="font-semibold text-slate-700">{p.score}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: p.score >= 75 ? '#16a34a' : p.score >= 55 ? '#d97706' : '#dc2626' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.score}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
