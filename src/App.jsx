import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Boxes, Activity, ScrollText, ClipboardCheck, ShieldCheck } from 'lucide-react'
import { ORG } from './data.js'
import Dashboard from './views/Dashboard.jsx'
import Inventory from './views/Inventory.jsx'
import Monitoring from './views/Monitoring.jsx'
import Audit from './views/Audit.jsx'
import Checklist from './views/Checklist.jsx'

const NAV = [
  { key: 'Overview', icon: LayoutGrid, comp: Dashboard },
  { key: 'Inventory', icon: Boxes, comp: Inventory },
  { key: 'Monitoring', icon: Activity, comp: Monitoring },
  { key: 'Audit', icon: ScrollText, comp: Audit },
  { key: 'Checklist', icon: ClipboardCheck, comp: Checklist },
]

export default function App() {
  const [active, setActive] = useState('Overview')
  const Current = NAV.find((n) => n.key === active).comp

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-slate-900 text-slate-300 flex flex-col fixed h-screen">
        <div className="px-5 py-5 flex items-center gap-2.5 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-white leading-tight">FREE-AI Guard</div>
            <div className="text-[10px] text-slate-400 tracking-wide">AI GOVERNANCE FOR BFSI</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => {
            const on = active === n.key
            return (
              <button
                key={n.key}
                onClick={() => setActive(n.key)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  on ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-indigo-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <n.icon size={17} className="relative z-10" />
                <span className="relative z-10">{n.key}</span>
              </button>
            )
          })}
        </nav>

        <div className="px-5 py-4 border-t border-slate-800 text-[11px] text-slate-500">
          <div className="text-slate-300 font-medium">{ORG.name}</div>
          <div className="mt-0.5">{ORG.rbiCategory}</div>
          <div className="mt-2 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Monitoring live
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64">
        <header className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="text-sm text-slate-500">
            <span className="text-slate-400">RBI FREE-AI Compliance</span> <span className="mx-1.5 text-slate-300">/</span>{' '}
            <span className="font-medium text-slate-700">{active}</span>
          </div>
          <div className="text-xs text-slate-400">Last full review · {ORG.lastReview}</div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <Current go={setActive} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
