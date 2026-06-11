import { Link2 } from 'lucide-react'
import { Card, SectionTitle, Badge } from '../ui.jsx'
import { AUDIT_LOG } from '../data.js'

const sevMeta = {
  info: { color: '#475569', bg: '#f1f5f9', label: 'Info' },
  warn: { color: '#d97706', bg: '#fef3c7', label: 'Warning' },
  crit: { color: '#dc2626', bg: '#fee2e2', label: 'Critical' },
}

export default function Audit() {
  return (
    <div>
      <SectionTitle
        kicker="FREE-AI · Assurance pillar"
        title="Audit Trail"
        subtitle="Append-only, hash-chained record of every inference, model change, override and alert — the evidence pack an RBI inspection or board audit will ask for."
      />

      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          <Link2 size={14} className="text-indigo-500" />
          <span className="text-xs text-slate-500">Tamper-evident chain · {AUDIT_LOG.length} of 18,402 events shown</span>
        </div>
        <div className="divide-y divide-slate-50">
          {AUDIT_LOG.map((e, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-slate-50/60 transition">
              <div className="col-span-3 md:col-span-2 text-xs text-slate-400 font-mono">{e.ts}</div>
              <div className="col-span-4 md:col-span-3">
                <span className="text-sm font-mono text-slate-700">{e.actor}</span>
              </div>
              <div className="col-span-5 md:col-span-2">
                <Badge {...sevMeta[e.sev]}>{e.event}</Badge>
              </div>
              <div className="col-span-12 md:col-span-5 text-sm text-slate-600 mt-1 md:mt-0">{e.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs text-slate-400 mt-3">
        In production each row carries a SHA-256 hash of the previous entry, making retroactive edits detectable —
        the property RBI's <span className="font-medium text-slate-600">Accountability</span> sutra implicitly requires.
      </p>
    </div>
  )
}
