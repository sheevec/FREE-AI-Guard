// Small presentational primitives shared across views.
import { motion } from 'framer-motion'

export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Badge({ children, color = '#475569', bg = '#f1f5f9' }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ color, background: bg }}
    >
      {children}
    </span>
  )
}

export function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-6">
      {kicker && (
        <div className="text-xs font-semibold tracking-wider uppercase text-indigo-600 mb-1">
          {kicker}
        </div>
      )}
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{subtitle}</p>}
    </div>
  )
}

// Animated SVG score ring (0–100).
export function ScoreRing({ value, size = 132, stroke = 11, label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const tone = value >= 75 ? '#16a34a' : value >= 55 ? '#d97706' : '#dc2626'
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f7" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 100) * c }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        {label && <span className="text-[11px] text-slate-400 -mt-0.5">{label}</span>}
      </div>
    </div>
  )
}

export function Stat({ label, value, tone = 'text-slate-900', hint }) {
  return (
    <Card className="p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${tone}`}>{value}</div>
      {hint && <div className="text-[11px] text-slate-400 mt-0.5">{hint}</div>}
    </Card>
  )
}
