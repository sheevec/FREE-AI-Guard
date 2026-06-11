# FREE-AI Guard — AI Governance for BFSI

A working prototype of an **"AI governance in a box"** platform for Indian NBFCs and banks,
built around the RBI **FREE-AI** framework (Framework for Responsible and Ethical Enablement
of Artificial Intelligence, released Aug 13 2025: 7 Sutras, 6 Pillars, 26 Recommendations).

It's the software half of the cold-start playbook: the **Readiness Checklist** is the free,
open lead magnet; the dashboard is what a design-partner NBFC sees in the first demo.

## What it does

| View | FREE-AI pillar | Purpose |
|------|----------------|---------|
| **Overview** | All six | Board-ready readiness score, six-pillar radar, open alerts |
| **Inventory** | Governance | Single source of truth for every AI/ML system — risk tier, validation state, board sign-off, human-override pathway |
| **Monitoring** | Protection / Assurance | PSI drift traces vs. threshold + fairness/bias scan by customer segment |
| **Audit** | Assurance | Append-only, hash-chained event trail (inferences, overrides, model changes) |
| **Checklist** | All six | The open-source lead magnet — interactive, exports a board summary |

All data is mocked in `src/data.js` to simulate a small NBFC's posture. No backend.

## Run

```bash
npm install
npm run dev
```

## Stack

React 19 · Vite · Tailwind v4 · Framer Motion · Recharts · lucide-react

## Status

Prototype / demo. The monitoring math (PSI, fairness gaps) and audit hash-chaining are
illustrative, not production implementations.
