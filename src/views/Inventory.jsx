import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronRight, Search } from 'lucide-react'
import { Card, Badge, SectionTitle } from '../ui.jsx'
import { MODELS, RISK_META } from '../data.js'

const driftTone = {
  Stable: { color: '#16a34a', bg: '#dcfce7' },
  Drifting: { color: '#dc2626', bg: '#fee2e2' },
  Unmonitored: { color: '#64748b', bg: '#f1f5f9' },
}

function Yes({ ok }) {
  return ok
    ? <Check size={15} className="text-green-600" />
    : <X size={15} className="text-red-500" />
}

export default function Inventory() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const rows = MODELS.filter((m) => (m.name + m.use + m.owner).toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <SectionTitle
        kicker="FREE-AI · Governance pillar"
        title="AI / Model Inventory"
        subtitle="The single source of truth RBI expects: every AI system, its risk tier, validation state, board approval, and the human-override pathway."
      />

      <div className="relative mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search models, owners, use-cases…"
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
          <div className="col-span-4">Model</div>
          <div className="col-span-2">Risk</div>
          <div className="col-span-2">Drift</div>
          <div className="col-span-1 text-center">Board</div>
          <div className="col-span-1 text-center">Override</div>
          <div className="col-span-2 text-right">Docs</div>
        </div>

        {rows.map((m) => {
          const isOpen = open === m.id
          return (
            <div key={m.id} className="border-b border-slate-50 last:border-0">
              <button
                onClick={() => setOpen(isOpen ? null : m.id)}
                className="w-full grid grid-cols-12 gap-2 px-4 py-3 items-center text-left hover:bg-slate-50/70 transition"
              >
                <div className="col-span-4 flex items-center gap-2">
                  <ChevronRight size={15} className={`text-slate-300 transition ${isOpen ? 'rotate-90' : ''}`} />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{m.name}</div>
                    <div className="text-[11px] text-slate-400">{m.id} · {m.type}</div>
                  </div>
                </div>
                <div className="col-span-2"><Badge {...RISK_META[m.risk]}>{m.risk}</Badge></div>
                <div className="col-span-2"><Badge {...driftTone[m.drift]}>{m.drift}</Badge></div>
                <div className="col-span-1 flex justify-center"><Yes ok={m.boardApproved} /></div>
                <div className="col-span-1 flex justify-center"><Yes ok={m.humanOverride} /></div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.docs}%`, background: m.docs >= 75 ? '#16a34a' : m.docs >= 50 ? '#d97706' : '#dc2626' }} />
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">{m.docs}%</span>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50/60"
                  >
                    <div className="px-12 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <Field label="Use-case" value={m.use} />
                      <Field label="Owner" value={m.owner} />
                      <Field label="Source" value={m.vendor} />
                      <Field label="Deployed" value={m.deployed} />
                      <Field label="Last validated" value={m.lastValidated} warn={m.lastValidated === 'Never'} />
                      <Field label="Bias flag" value={m.biasFlag ? 'Raised' : 'Clear'} warn={m.biasFlag} />
                      <Field label="Board approval" value={m.boardApproved ? 'On file' : 'Missing'} warn={!m.boardApproved} />
                      <Field label="Human override" value={m.humanOverride ? 'Enabled' : 'None'} warn={!m.humanOverride} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

function Field({ label, value, warn }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`mt-0.5 ${warn ? 'text-red-600 font-medium' : 'text-slate-700'}`}>{value}</div>
    </div>
  )
}
