# Architect 2.0

A design-first vibe-coding platform for both non-technical and technical users
— built for the Lyzr "Build your own vibe-coding platform" assignment.

**Live app:** [architect20.vercel.app](https://architect20.vercel.app)
**Architecture:** see [`ARCHITECTURE.md`](./ARCHITECTURE.md) and
[`architecture-diagram.png`](./architecture-diagram.png) for how this would
actually be built in production (sandboxes, agent harness, model-agnostic
routing, GitHub sync, deploy, and scaling).

## What this is

A clone of [architect.new](https://architect.new)'s baseline feature set
(landing → auth → homepage → prompt-to-build → GitHub → deploy → marketplace →
theme manager, etc.), with a first-principles Architect 2.0 layer on top that
serves technical users too: a non-blocking prompt-quality check instead of a
mandatory Q&A, streamed/collapsible reasoning, an editable Agents tab with
any-framework import, a "Best LLM match" recommendation with a cost-benefit
comparison, a real code view, and a non-blocking deploy flow. Every genuinely
new (non-baseline) feature is tagged **2.0** in the UI itself.

All flows are scripted/dummy per the assignment's own grading note (design and
UX are weighted above working functionality) — a few things are genuinely
real: the generated to-do app (add/complete/delete), the Theme Manager
(instant, global re-skin), and the LLM recommendation logic.

Design notes and phase-by-phase research live in [`Build Docs/`](./Build%20Docs).

## Stack

Vite + React + React Router + Tailwind v4 (CSS-variable design tokens) +
lucide-react. No backend — all state is in-memory/mocked, per the assignment's
own "dummy flows are fine" note.

## Running locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
