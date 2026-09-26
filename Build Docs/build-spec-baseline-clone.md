# Build Spec — Architect Clone Baseline

Purpose: a single reference to build against. Covers every screen/feature of the **current** architect.new, per our Phase 1 + live-audit research, as the baseline to clone. Architect 2.0's own additions (Phase 4) are layered on top in a separate section at the end, so the baseline stays clean and checkable against the assignment's own requirement: "Architect 2.0 should have all the features of the current Architect."

**Grading reality check (from the assignment):** design/UI/UX is the top-weighted criterion; working functionality is explicitly a "plus," not required. This spec marks each screen **Real** (needs actual working logic) or **Dummy** (needs to look and feel right, wired to fake/static data) accordingly, so build time goes where it's graded.

---

## 1. Screen inventory (baseline clone)

| # | Screen | Real or Dummy | Notes |
|---|---|---|---|
| 1 | **Landing page** | Real (it's just static) | Hero, tagline, sign-in box, "Connect with" integration icon row |
| 2 | **Auth** | Dummy (fake OAuth) | Google button + Email option; on click, fake a short loading state then drop into Homepage as a logged-in session (no real OAuth provider needed) |
| 3 | **Homepage / dashboard** | Real shell, dummy backend | Prompt box, credit balance display, sidebar nav, "Your projects" carousel at bottom |
| 4 | **AI Consultant onboarding** | Dummy | 5-step flow (profile → role → time sinks → tools → notes) → "Recommended Agents" cards with a "Build This" action that pre-fills the homepage prompt box |
| 5 | **Chat / build flow (Planning mode)** | Dummy, scripted | Clarifying questions with checkbox/radio options → a written plan panel (Plan/Agents/App tabs) → static mockup image/render |
| 6 | **Build Mode** | Dummy, scripted | Streamed fake agent log (Architect → ui_generator delegation), progress messages, a tips carousel, ends in a working (real, since it's just the generated app) preview |
| 7 | **App preview** | **Real** (this is the actual generated to-do-list-style output) | Whatever the demo app is — add/complete/delete, or whatever sample prompt we ship with |
| 8 | **Agents tab** | Dummy | Either "no agent needed" state or a small static roster with edit affordances that don't need to persist |
| 9 | **GitHub integration modal** | Dummy | "Connect GitHub" UI, fake OAuth redirect simulation, ends in a "Connected" state with a fake repo link |
| 10 | **Deploy modal** | Dummy | Marketplace toggle, custom domain field (disabled/fake), "Deploying..." animation, ends in a fake but real-looking `.architect-clone.app`-style URL |
| 11 | **Agentlets Marketplace** | Dummy | Grid of ~12–20 fake/seeded cards (category filters can be real client-side filtering over static data), a detail modal with View/Clone buttons |
| 12 | **Prompt Library** | Dummy | Role-tabbed static prompt cards; clicking one fills the homepage box (this part can be real, it's just a copy action) |
| 13 | **My Projects / Published Projects / Shared Projects** | Dummy | Static seeded list(s); Published Projects ("My Apps") has All/Deployed/Shared-with-me filter tabs |
| 14 | **Usage** | Dummy | A simple credits-over-time chart, static data |
| 15 | **Theme Manager / Design Systems** | **Real** (this is genuinely fun to make real) | Preset grid, live preview panel that actually re-skins a sample card/dashboard/marketing layout when you click a preset — no persistence needed |
| 16 | **My Account** (Profile / Organization / Plans & Credits / Billing / Referrals) | Dummy | Static form fields, a plan card, a fake "Open Billing Portal" button, a referral code display |
| 17 | **How it works / Resources / Docs / Lyzr University / Discord** | Dummy | Can be simple static pages or even just non-functional nav items with a "coming soon" state — low grading value, low effort |
| 18 | **Help & Support** | Dummy | Icon/link only, no real content needed |

---

## 2. Data model (all client-side/mocked — no real backend required)

```
User { id, name, email, org, roleSelected, credits, plan }
Project { id, name, slug, createdAt, status, thumbnail, isPublished, isShared }
AgentletListing { id, name, category[], useCases[], description, author, views, clones, rating, screenshot }
PromptTemplate { id, title, roleCategory, promptText }
Theme { id, name, tags[], colors, previewComponent }
ChatMessage { id, projectId, role: 'user'|'architect'|'agent', content, timestamp, type: 'text'|'question'|'plan'|'mockup'|'log' }
```

All of this can live in a single in-memory store (or `localStorage`/`window.storage` if built as a self-contained artifact) — no real database needed given the "dummy flows fine" grading note.

---

## 3. What's genuinely worth making real (highest design-quality ROI)

Per the grading weighting (design > features > working functionality), these are the highest-value places to spend real engineering effort, because they're the parts a reviewer will actually click and feel:

1. **The build/planning animation sequence** (screens 5–6) — this is the emotional centerpiece of every vibe-coding tool we researched; it should feel alive (streaming text, progress states, a believable pace), even though it's fully scripted.
2. **The Theme Manager** (screen 15) — genuinely real, since it's a self-contained, satisfying interaction (click preset → see it applied) that doesn't require any backend.
3. **The generated app preview itself** (screen 7) — this should actually work (add/complete/delete or whatever the demo prompt produces), since Phase 2 found this is where every tool we tested either earned or lost trust.
4. **The AI Consultant → technical role → recommendation flow** (screen 4) — this is the one flow that directly demonstrates the assignment's core ask (serving both audiences), so it's worth polishing even though it's scripted.

Everything else can be visually complete but functionally static.

---

## 4. Tech stack recommendation

- **Single-page React app** (or plain HTML/CSS/JS if simplicity is preferred) — matches what every competitor tool actually ships as
- **Tailwind** for styling — fast to theme, matches the "Theme Manager" requirement naturally (swap CSS variables per preset)
- **No real backend** — all state in-memory/localStorage, consistent with §2
- **Deploy target**: whatever the assignment expects (a public URL) — a static React build deployed to Vercel/Netlify, or published as a Claude artifact if that route is preferred

---

## 5. Build order (given the 27th/28th deadline)

1. Landing → Auth (fake) → Homepage shell — the skeleton everything else hangs off of
2. Chat/build flow with the scripted planning + build animation (screens 5–6) — the centerpiece
3. App preview with real add/complete/delete (screen 7)
4. GitHub + Deploy modals (screens 9–10) — required by the assignment's own grading checklist
5. Agents tab (screen 8)
6. Theme Manager (screen 15) — real, satisfying, self-contained
7. Marketplace, Prompt Library, My Projects/Published/Shared, Usage, My Account, AI Consultant onboarding — round out the clone
8. Everything else (Docs/Resources/Lyzr University/Help) — minimal effort, just needs to exist

Architect 2.0's own additions (prompt-quality indicator, streamed reasoning, editable agents, auto-sync GitHub, any-framework agent import, permanent free deploys — full detail in `phase-4-design-translation.md`) get layered onto this same codebase once the baseline clone is functionally and visually complete, rather than built as a separate app.

---

*Next step: confirm this spec, then start scaffolding the actual codebase.*
