# Phase 3 — Synthesis

Combines Phase 1 (desk research: facts, features, positioning) and Phase 2 (hands-on UX: live-observed flow stages) into a single comparison view, to directly inform Architect 2.0 design decisions.

**Data coverage note:** architect.new, Lovable, Replit, Emergent, Rocket.new, and v0 have both Phase 1 (docs) and Phase 2 (hands-on, Claude-observed) data. Cursor and Claude Code have Phase 1 data plus a Phase 2 pass still pending, to be filled in as **user-reported** (the user has hands-on daily experience with both) rather than Claude-observed. Codex has Phase 1 data only — Phase 2 is skipped for it since neither Claude nor the user has hands-on access; this gap is recorded rather than filled.

---

## 1. Target-audience framing (Phase 1)

| Tool | Official framing | Category |
|---|---|---|
| architect.new | "Product Managers, Founders, and Non-Engineering teams" | Non-technical only |
| Lovable | "enables anyone to build... no technical knowledge needed"; site nav segments by role (Founders, PMs, Designers, Marketers, Sales, Ops, People) | Non-technical-leaning, broadening |
| Replit | "BY ROLE" nav includes Founders, PMs, Designers **and** Engineers, IT; "no coding required" alongside developer features | Dual-audience |
| Emergent | "designed for everyone — from complete beginners to experienced developers"; founder says core market is ~400M small businesses, ~70% no-code users | Non-technical-leaning, broad claim |
| Rocket.new | Not explicitly stated on-site; founder framing (podcast title) is "AI software development belongs to non-coders" | Non-technical, inferred from founder statements |
| v0 (Vercel) | FAQ: "Anyone with an idea"; named roles include Founders/Marketers **and** Engineers/Sales Engineers | Dual-audience |
| Cursor | Zero non-technical language anywhere; all testimonials from engineering leaders | Developer-only |
| Codex | Exclusively professional-developer framing in docs | Developer-only |
| Claude Code | Exclusively professional-developer framing in docs/glossary | Developer-only |

**Pattern:** the 9 tools split roughly into three groups — non-technical-facing (architect.new, Lovable, Emergent, Rocket.new), dual-audience (Replit, v0), and developer-only (Cursor, Codex, Claude Code). architect.new is the narrowest of the non-technical group (no developer-facing claim at all), which is the specific gap Architect 2.0 is meant to close.

---

## 2. Landing page & signup (Phase 2, observed)

| Tool | Landing page | Signup friction |
|---|---|---|
| architect.new | Sign-in gated immediately; no content before auth | Google/Email only; no phone verification |
| Lovable | Marketing content + a **working prompt box** pre-login | Low — was already signed in during this pass |
| Replit | Root domain redirects **straight to login**, no marketing shown first | **Mandatory phone verification via WhatsApp** — highest friction of any tool tested |
| Emergent | Sign-in gated immediately (like architect.new) | Google/Email/Phone options; not independently tested |
| Rocket.new | Full marketing page, cookie banner, "Start free" CTA | Google/SSO/Email; low friction |
| v0 | Marketing content + working prompt box pre-login (like Lovable) | **Vercel-account only** — no separate v0 account system |

**Pattern:** three distinct onboarding philosophies — (a) gate everything behind auth immediately (architect.new, Emergent), (b) let users try the prompt box before ever signing in (Lovable, v0), (c) force account creation with extra verification (Replit's phone-verification requirement stood out as uniquely high-friction). For Architect 2.0, letting a first-time visitor type a prompt before hitting a login wall (pattern b) removes the biggest drop-off point in effect — the person invests in a prompt before being asked to commit to an account.

---

## 3. Chat window / prompt-to-build flow (Phase 2, observed)

| Tool | Clarifying questions? | Build transparency | Build time (this test) |
|---|---|---|---|
| architect.new | Yes — structured, multi-question, before any code | Full written plan/PRD shown, then a mockup, before building | ~5 min |
| Lovable | No — single design-direction picker only | Reasoning visible only inside an expandable "Details" panel | ~2 min |
| Replit | No — goes straight to reasoning/building | Plain-text scoping narration; a named internal "skill" system invoked | ~3 min |
| Emergent | Yes — structured, 2 required + 1 optional | Named sub-agent delegation visible ("Design Agent"); a persistent spec file created | ~5–6 min |
| Rocket.new | One question, framed as a **"prompt score"** (76%→94%) nudge, skippable | Discrete file-by-file streaming; states tech stack upfront | ~2–3 min |
| v0 | No | **Most transparent of all** — live chain-of-thought text, including explicit scope reasoning ("I need to remember not to include localStorage unless explicitly mentioned") | ~2 min typical, but **stalled 13–14 min** in this pass (reliability issue, not necessarily typical) |

**Pattern:** two real approaches to "getting the prompt right" — either ask structured clarifying questions before building (architect.new, Emergent), or build fast and let the transparency of the build log substitute for asking (Lovable, Replit, v0). Rocket.new's "prompt score" is a distinctive middle path — quantifying prompt quality and inviting improvement without blocking the user. Given Architect 2.0 must serve both non-technical and technical users, a lightweight version of Rocket's score (or architect.new's minimal-vs-full-scope question) is worth considering as a way to reduce over- or under-built first drafts without forcing every user through a full Q&A.

---

## 4. App preview & agent visibility (Phase 2 + Phase 1)

| Tool | Distinct "Agent" section? | Notable preview features |
|---|---|---|
| architect.new | Yes — a real Plan/Agents/App tabbed workspace; shows "no agent needed" reasoning explicitly | Self-correction visible in log (caught and fixed its own scope creep) |
| Lovable | No | Inline visual-editing toolbar overlaid on the preview; self-testing via a literal screenshot mid-build |
| Replit | No — inline in chat, with a Design/Build toggle | A teased (not explored) Canvas/Design mode |
| Emergent | No, but agent delegation visible inline | Percentage-complete progress bar (not seen elsewhere); real backend (`server.py`) generated even for a client-side-sufficient prompt |
| Rocket.new | No | Richest **default** build of all six — priority levels, due dates, overdue highlighting, progress ring, none of which were explicitly requested |
| v0 | No | Inline visual editing available; most legible reasoning trace |

**Pattern:** architect.new is the only tool with a genuinely separate, persistent "Agents" workspace — consistent with its Lyzr Studio/multi-agent-orchestration positioning from Phase 1. Every other tool keeps agent activity inline in the chat transcript. For a platform explicitly named "Architect," a visible agent/orchestration view is a meaningful differentiator worth keeping, but the assignment's own brief (Architect 2.0 serving technical users too) suggests this view should expose *more* control (editable agent config, not just a read-only log) than what architect.new currently shows.

---

## 5. GitHub integration (Phase 2, observed + Phase 1 docs)

| Tool | Connect flow | Push behavior | Free-tier gate |
|---|---|---|---|
| architect.new | One-click OAuth | Auto-push on connect, then keeps syncing | None — free and unrestricted |
| Lovable | One-click OAuth; **3 providers** offered (GitHub/GitLab/Bitbucket) | Auto-creates repo + auto-syncs, "In sync with GitHub" status | None |
| Replit | **Two-step**: sign in to provider, then explicitly create the remote repo, then explicitly **push** (3 distinct actions) | Manual push required; real local git history visible even pre-connection | None (but see deploy gate below) |
| Emergent | **Not found anywhere in the UI** during this pass, despite official FAQ claiming GitHub support | N/A — could not locate the feature | Unclear — possibly deeper in a paid tier, unconfirmed |
| Rocket.new | One-click OAuth for the *connection* | **Push itself requires a paid upgrade** — connection and push are two separate gates | Push is paid-only |
| v0 | Auto-connected via the linked Vercel account | Fully automatic — a commit on every message, zero manual step | None |

**Pattern:** GitHub integration quality varies enormously — from fully automatic (v0, architect.new, Lovable) to manual multi-step (Replit) to partially paywalled (Rocket.new) to seemingly absent (Emergent, contradicting its own docs). For Architect 2.0, the "auto-sync on every change" pattern (v0, Lovable, architect.new) is clearly the better UX for non-technical users; Replit's manual/explicit model suits developers who want git control. A dual mode — auto-sync by default, with an "advanced" manual git panel for technical users — would serve Architect 2.0's stated dual-audience goal directly.

---

## 6. Deploy flow (Phase 2, observed)

| Tool | Deploy gate on free tier | Deploy speed | Persistence | Watermark |
|---|---|---|---|---|
| architect.new | Free, unrestricted (marketplace listing optional/separate) | ~1 min | Permanent | "Built with Architect," dismissible per-session only |
| Lovable | Free, unrestricted | Near-instant, **non-blocking** ("continues in background") | Permanent | "Made with Lovable," dismissible per-session only |
| Replit | Free, unrestricted | Slowest observed (~4+ min), staged pipeline with real infra specs, optional deep security scan | **Time-limited — expires in 29 days** unless upgraded | Replit badge, tied to the expiring deployment |
| Emergent | **Free tier cannot deploy at all** — Publish redirects straight to a pricing page | N/A | N/A | N/A |
| Rocket.new | Free, unrestricted (Staging tier); Production/custom domain appeared gated | Slowest of the successful deploys (~40+ sec just for the confirmation step) | Not tested for expiry | "Built with Rocket.new," no dismiss option seen |
| v0 | Free, unrestricted — deployment is **continuous**, not a discrete action (already live by the time "Publish" is clicked) | Effectively instant (already done) | Permanent | **None** — only tool with no visible watermark |

**Pattern:** deploy maturity varies from "not available for free" (Emergent) to "always-on, no action needed" (v0). Replit's 29-day expiration is the most consequential free-tier limitation found in this whole research pass — worth deciding deliberately for Architect 2.0 rather than defaulting to it. A middle path — free, permanent, but rate-limited or storage-capped rather than time-bombed — would avoid surprising non-technical users who don't think to "renew" a deployment.

---

## 7. Cross-cutting synthesis for Architect 2.0

**What's worth adopting:**
- Pre-login prompt entry (Lovable, v0) to reduce drop-off before signup
- Auto-syncing GitHub integration by default (v0/Lovable/architect.new pattern), with an optional manual/advanced git panel for developers
- A visible, persistent agent/orchestration workspace (architect.new's Plan/Agents/App tabs) — but made *editable*, not just observational, to serve technical users
- Non-blocking, background publishing (Lovable) rather than a blocking "please wait" modal
- Transparent build reasoning shown to the user in some form (v0's chain-of-thought, or architect.new's written plan) — builds trust, especially for non-technical users who can't read the code themselves

**What to avoid or handle more carefully:**
- Time-limited free deployments (Replit) — a real trap for non-technical users
- Gating GitHub push specifically (Rocket.new) — confusing when the *connection* step implies push is already possible
- Mandatory phone verification at signup (Replit) — likely the single highest-friction onboarding step observed
- Silent/undiscoverable features that contradict documented claims (Emergent's missing GitHub UI) — whatever Architect 2.0 documents should be findable in the actual product

**Open question for Phase 4:** none of the 6 tools tested combine architect.new's clarifying-questions-plus-visible-plan approach with v0's fully automatic GitHub/deploy pipeline and Replit's developer-grade infrastructure transparency (real git history, real infra specs, security scanning). Architect 2.0's opportunity, per the assignment brief, is precisely this synthesis — non-technical-friendly guided planning up front, but full technical transparency and control available underneath for developers, rather than forcing a single UX for both audiences.

---

*This completes Phase 3. Ready for Phase 4 — translating this synthesis into Architect 2.0's own first-principles design.*
