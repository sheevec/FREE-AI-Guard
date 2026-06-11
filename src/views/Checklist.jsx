import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Sheet } from 'lucide-react'
import { Card, SectionTitle, Badge, ScoreRing } from '../ui.jsx'
import { CHECKLIST, STATUS_META, SUTRAS } from '../data.js'

const CYCLE = { missing: 'partial', partial: 'done', done: 'missing' }
const WEIGHT = { done: 1, partial: 0.5, missing: 0 }

export default function Checklist() {
  const [items, setItems] = useState(CHECKLIST)

  const score = useMemo(() => {
    const total = items.reduce((a, c) => a + (c.critical ? 2 : 1), 0)
    const got = items.reduce((a, c) => a + WEIGHT[c.status] * (c.critical ? 2 : 1), 0)
    return Math.round((got / total) * 100)
  }, [items])

  const openCritical = items.filter((c) => c.critical && c.status !== 'done').length

  const toggle = (i) =>
    setItems((prev) => prev.map((c, j) => (j === i ? { ...c, status: CYCLE[c.status] } : c)))

  const exportReport = () => {
    const lines = [
      'FREE-AI READINESS — BOARD SUMMARY',
      'Meridian Capital (NBFC-ND) · Generated ' + new Date().toISOString().slice(0, 10),
      '',
      `Overall readiness: ${score}/100`,
      `Open critical items: ${openCritical}`,
      '',
      'CHECKLIST',
      ...items.map((c) => `[${c.status === 'done' ? 'x' : c.status === 'partial' ? '~' : ' '}] (${c.pillar}) ${c.rec}${c.critical ? '  *critical*' : ''}`),
      '',
      'Mapped to RBI FREE-AI 7 Sutras: ' + SUTRAS.join(', '),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'freeai-readiness-board-summary.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <SectionTitle
        kicker="The open-source lead magnet"
        title="FREE-AI Readiness Checklist"
        subtitle="Click any status to update it. This is the free GitHub artifact compliance officers download — the wedge that earns the first conversation."
      />

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-4 p-6 flex flex-col items-center text-center">
          <ScoreRing value={score} label="ready" />
          <div className="mt-4">
            <div className="font-semibold text-slate-900">
              {score >= 75 ? 'Audit-ready' : score >= 50 ? 'Work to do' : 'Significant gaps'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {openCritical} critical item{openCritical !== 1 && 's'} still open. Critical items carry double weight.
            </p>
          </div>
          <button
            onClick={exportReport}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            <Download size={15} /> Export board summary
          </button>
          <a
            href="/FREE-AI-Model-Inventory-Template.xlsx"
            download
            className="mt-2.5 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-200 text-indigo-700 text-sm font-medium hover:bg-indigo-50 transition"
          >
            <Sheet size={15} /> Download .xlsx inventory template
          </a>
          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <FileText size={12} /> The spreadsheet is what travels through compliance teams
          </div>
        </Card>

        <Card className="col-span-12 md:col-span-8 p-2">
          {items.map((c, i) => {
            const m = STATUS_META[c.status]
            return (
              <motion.button
                key={c.rec}
                onClick={() => toggle(i)}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 transition text-left"
              >
                <span
                  className="w-4 h-4 rounded-md border-2 flex-shrink-0"
                  style={{ borderColor: m.color, background: c.status === 'done' ? m.color : c.status === 'partial' ? m.bg : 'transparent' }}
                />
                <span className="flex-1">
                  <span className="text-sm text-slate-800">{c.rec}</span>
                  <span className="ml-2 text-[11px] text-slate-400">{c.pillar}</span>
                  {c.critical && <span className="ml-1.5 text-[10px] font-semibold text-red-500 uppercase">critical</span>}
                </span>
                <Badge color={m.color} bg={m.bg}>{m.label}</Badge>
              </motion.button>
            )
          })}
        </Card>
      </div>
    </div>
  )
}
