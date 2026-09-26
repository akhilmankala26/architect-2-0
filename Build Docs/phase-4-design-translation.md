# Phase 4 — Architect 2.0 Design Translation

Translates the Phase 3 synthesis into Architect 2.0's own flows, designed from first principles. Per the assignment brief, this does not copy any single tool's UI/UX — each decision below is made on its own merits and cites which Phase 2/3 findings informed it, but the resulting flow is not a clone of any one competitor.

**Design mandate (from the assignment):** today's Architect only serves non-technical users. Architect 2.0 must serve **both** non-technical and technical users, without forcing either into a workflow built for the other.

---

## 0. Core design philosophy

**One product, two depths — not two products.** The single biggest risk in "serving both audiences" is building two parallel UIs that drift apart. Architect 2.0 instead uses **progressive disclosure**: every screen has a simple default state for a first-time, non-technical user, and an "advanced" affordance that reveals the same underlying data in more technical form — never a different screen entirely.

Three principles run through every flow below:

1. **Reasoning is always visible, never hidden.** Phase 2 showed the tools that exposed *why* the AI made a decision (v0's chain-of-thought, architect.new's written plan) built more trust than the ones that didn't (Lovable, Replit). Architect 2.0 always shows its reasoning, by default collapsed to a one-line summary, expandable to full detail.
2. **Nothing free-tier is time-bombed or silently paywalled.** Replit's 29-day deploy expiry and Rocket's paid-only GitHub push were the two most user-hostile patterns found in Phase 2 — surprising a non-technical user after they've already invested time. Architect 2.0's free tier may be rate- or resource-limited, but never expires existing work or blocks a core promised action.
3. **The technical depth is additive, not a separate mode.** Rather than a mode switch (like Rocket's Solve/Build/Intelligence tabs or Emergent's Web/Mobile tabs upfront), advanced controls appear as expandable sections *within* the same screen a non-technical user already sees.

---

## 1. Landing page & authentication

**Flow:** Visitor lands → types a prompt directly, no login wall → hits "Build" → auth prompt appears only at that point → signs in → build begins immediately with the typed prompt preserved.

**Decisions and why:**
- **Prompt box live on the landing page, pre-login** (Lovable/v0 pattern, Phase 2 §2). This was the clearest onboarding win in the whole pass — the person invests in a prompt before being asked to commit to an account, which should reduce drop-off versus architect.new's and Emergent's immediate auth wall.
- **Auth options: Google, GitHub, Email — no phone verification required.** Replit's mandatory WhatsApp verification was the single highest-friction signup step observed anywhere in Phase 2. GitHub is offered as a first-class login option (not just a later integration) since a technical user signing in with GitHub gets their account pre-linked for later.
- **No forced role/persona selection at signup.** None of the six tools tested made the user declare "I'm technical" or "I'm not" upfront, and this is correct — the product should infer depth from behavior (see §3), not force a label.

---

## 2. Homepage / dashboard

**Flow:** Personalized greeting → single unified prompt box → recent projects/templates below, not above the fold.

**Decisions and why:**
- **One prompt box, not multiple mode tabs.** Rocket's Solve/Build/Intelligence tabs and Emergent's Web app/Mobile app toggle both ask a first-time user to make a categorization decision before they've typed anything. Architect 2.0 collapses this: a single box accepts any prompt, and the system infers the shape (web app vs. mobile, "build" vs. "research a decision") from the prompt itself, surfacing a confirmation only if genuinely ambiguous.
- **An "Advanced" disclosure row under the prompt box** (collapsed by default) lets a returning or technical user pre-select framework, starting template, or import an existing GitHub repo before the first message — addressing the "import existing project" requirement in the assignment brief without cluttering the first-time experience. None of the 6 tools tested support importing an existing codebase; this is a first-principles addition based on the brief's explicit ask.
- Retains what worked broadly: example prompt chips (used by 4 of 6 tools) to give non-technical users a running start.

---

## 3. Chat window / prompt-to-build flow

This is where Phase 2 found the widest divergence — Architect 2.0's approach is a deliberate synthesis, not a pick-one.

**Flow:** Prompt submitted → lightweight prompt-quality read-out (non-blocking) → plan streams in with visible reasoning → build proceeds → live status log.

**Decisions and why:**
- **A non-blocking prompt-quality indicator, not a mandatory Q&A.** architect.new and Emergent's structured clarifying questions (Phase 2 §3) produced better-scoped first drafts but cost real time (~5–6 min builds vs. ~2–3 min for tools that skipped questions). Rocket's "prompt score" (76%→94%) is the better-calibrated middle path: it shows the user where they stand and offers one optional improving question, but never blocks — "I don't want to improve my prompt further" always available. Architect 2.0 adopts this shape, generalized to more than one dimension (scope clarity, and — new — technical-constraint clarity, e.g., "should this use your existing database schema?" for technical users continuing a project).
- **Reasoning is streamed live, not hidden in an expandable panel.** v0's exposed chain-of-thought was the most trust-building thing observed in the entire Phase 2 pass, even though v0 also had the worst reliability in this session. Architect 2.0 keeps the transparency, collapsed to a one-line running summary by default (so it doesn't overwhelm a non-technical user) with a click to expand full reasoning — giving technical users the audit trail they'd want without forcing it on everyone.
- **An explicit "why no agent" or "why this architecture" statement**, modeled on architect.new's own written plan (the one tool that explicitly reasoned "no database needed, no agent needed" in view of the user). This becomes a standing feature, not an occasional aside — every build ends with a short, plain-language rationale for the technical choices made, addressing the non-technical user's need to trust the output without reading code.

---

## 4. App preview

**Flow:** Live preview always visible alongside chat → inline click-to-edit by default → a one-click toggle reveals the full code editor.

**Decisions and why:**
- **Inline visual editing as the default surface** (the pattern in Lovable and Emergent, absent from architect.new and Rocket) — for a non-technical user, "click the button you want to change" is a fundamentally more accessible interaction than reading a diff.
- **A single toggle to a real code editor with file tree and terminal/logs**, matching Rocket's and Replit's in-browser IDE-style code view — but framed as "View code," not a separate product surface. Phase 1 found this pairing (visual editor + full code access) doesn't currently exist in any one tool; architect.new and Lovable have visual editing but no first-class code view, while Rocket and Replit have strong code views but weaker (or absent) inline visual editing.
- **Self-testing is visible, not silent.** Lovable's and Emergent's mid-build self-test screenshots (Phase 2 §4) were a real trust signal; Architect 2.0 always shows a short "I tested add/complete/delete — here's what happened" note after any build that touches interactive behavior, rather than making this an occasional occurrence.

---

## 5. Agent section

**Flow:** A persistent "Agents" tab exists for every project (not just multi-agent ones) → shows either an active agent roster or an explicit "no agent needed" state with the reasoning why → technical users can edit agent config directly from this tab.

**Decisions and why:**
- architect.new is the only tool of the six tested with a dedicated, persistent Agents workspace (Phase 3 §4) — this is kept, since it's a natural differentiator for a platform literally named "Architect" and consistent with Lyzr's broader multi-agent-orchestration positioning (Phase 1).
- **But made editable, not read-only.** architect.new's own Agents tab in this pass was observational only ("Workflow will appear when agents are generated," with no visible way to reconfigure once generated). Since Architect 2.0 must serve technical users too, this tab gains direct controls: edit an agent's system prompt, swap its model, add/remove tools — the same level of control Claude Code's Agent SDK or Lyzr Studio itself offers, surfaced in-line rather than requiring a jump to a separate product (Lyzr Studio, in architect.new's current design).
- For simple, deterministic apps (the majority of first prompts, per this research's own to-do-list test), the tab shows the plain-language "no agent needed" reasoning by default — so the tab is never empty or confusing, it's informative either way.

**Agents in any framework — a gap in every tool tested, and an explicit assignment requirement.** None of the six hosted tools in Phase 2 let a user bring an agent built outside the platform's own orchestration; architect.new's own agents are Lyzr Studio agents, full stop. The assignment brief explicitly asks Architect 2.0 to support "agents in any framework," so this is a first-principles addition, not a synthesis of anything observed:
- The Agents tab supports **importing an agent definition** from common frameworks (LangChain, CrewAI, AutoGen, a raw OpenAI/Anthropic function-calling spec, or an MCP server) alongside natively-built agents, shown in the same roster with a framework tag next to each.
- A framework-native agent is wrapped, not rewritten — Architect 2.0 calls it via its own interface (HTTP endpoint, SDK, or CLI invocation) rather than porting its logic into Architect's own agent format, so a technical user's existing code keeps running as-is.
- For a non-technical user this entire capability stays invisible until relevant — the "Advanced" import option from §2's homepage disclosure is where a technical user would bring an existing agent in, and the Agents tab only shows framework tags when a non-native agent is actually present.

---

## 6. GitHub integration

**Flow:** Connect once (OAuth) → auto-creates a private repo and auto-syncs on every change → an "Advanced" git panel (collapsed by default) exposes branch selection, manual commit/push/pull, and commit history for anyone who wants direct control.

**Decisions and why:**
- **Auto-sync is the default, not opt-in.** v0's and Lovable's pattern (Phase 2 §5) — connect once, then every change auto-commits — is unambiguously the better default for a non-technical user, who will never think to click "push" and shouldn't have to. architect.new's auto-push-after-connect is nearly as good; Replit's fully manual three-step flow (sign in → create remote → push) is the wrong default for the majority of users, even though it's the most git-native experience for developers who want it.
- **No feature of GitHub sync is paywalled.** Rocket's split (free connection, paid push) is explicitly avoided — Phase 2 found this pattern genuinely confusing in the product itself (the connection step visually implies push is already possible). If GitHub sync is monetized at all in Architect 2.0, the gate should be on *usage volume* (e.g., private-repo count, sync frequency) never on the core "push my code" action.
- **The advanced git panel is real git, not a simplified wrapper** — branch switching, manual commit messages, pull/push — matching what Replit exposes, but reachable via one click from the same screen rather than a separate settings destination.
- Three providers (GitHub, GitLab, Bitbucket) were offered by both Lovable and Replit; Architect 2.0 launches with GitHub only (matching architect.new's current scope and the assignment's own explicit ask) but the connector architecture should not preclude adding GitLab/Bitbucket later.

---

## 7. Deploying the app

**Flow:** "Deploy" is always available, one click, free, and produces a **permanent** URL → an entirely separate, optional "Publish to Marketplace" toggle exists for public discoverability → an optional security scan is offered but never required.

**Decisions and why:**
- **No free-tier deploy paywall, no time-limited free deploy.** These were the two worst free-tier patterns found in Phase 2: Emergent blocks deployment entirely on Free (redirects straight to a pricing page), and Replit's deployments silently expire in 29 days. Both surprise a non-technical user well after they've committed effort. Architect 2.0's free tier always allows a real, permanent deploy — if limits are needed, they should be resource-based (bandwidth, uptime tier) and disclosed at deploy time, not sprung later as an expiry notice.
- **Deploy and "publish to marketplace" stay separate**, following architect.new's own good pattern (Phase 2 §1.7) rather than Lovable's or v0's model where "deployed" and "publicly visible" are the same action. A user should be able to get a working, shareable URL without also being listed in a public directory.
- **Non-blocking publish**, following Lovable's "you can close this dialog and keep chatting" pattern rather than architect.new's blocking modal — this is a small but real UX win with no real tradeoff.
- **An optional deep security scan**, modeled on Replit's Security Agent, offered as a pre-deploy checkbox rather than Replit's separate post-deploy dashboard action — surfacing it earlier makes it more likely a non-technical user actually notices and uses it.
- **Watermark**: shown by default on free-tier deploys (as all tools except v0 do), dismissible per-session, with removal tied to a paid plan — this is standard practice worth keeping, but the badge and its removal condition should be disclosed *before* deploy, not discovered after.

---

## 8. Summary flow map

```
Landing page (prompt box, no login wall)
        │
        ▼
   [Build clicked] → Auth (Google / GitHub / Email, no phone verification)
        │
        ▼
Homepage (single prompt box + Advanced disclosure: framework, import repo, template)
        │
        ▼
Chat window
  ├─ Prompt-quality indicator (non-blocking, optional 1-question improve)
  ├─ Streamed reasoning (collapsed summary → expandable detail)
  └─ Plain-language "why this architecture" note at build end
        │
        ▼
App preview  ←→  Agent section (editable; "no agent needed" shown explicitly when true;
                  supports importing agents built in other frameworks, tagged accordingly)
  ├─ Inline click-to-edit (default)
  ├─ One-click "View code" (full editor + logs)
  └─ Visible self-test note after interactive builds
        │
        ▼
GitHub (auto-sync by default; Advanced panel for manual git control)
        │
        ▼
Deploy (always free + permanent) ──┬── Publish to Marketplace (separate, optional)
                                    └── Security scan (optional, offered pre-deploy)
```

---

## 9. Retained from current Architect — feature checklist

The brief is explicit: "Architect 2.0 should have all the features of the current Architect." Cross-checking against Phase 1's full architect.new feature list (§1.3) to confirm nothing is silently dropped by this redesign:

| Current Architect feature (Phase 1) | Carried into Architect 2.0 | How |
|---|---|---|
| Prompt-to-app generation | ✅ | Core of §3 |
| Full-stack output (frontend + agentic backend) | ✅ | Unchanged; still the build target |
| Agent orchestration via Lyzr Studio | ✅, extended | §5 — now edited in-line, not just orchestrated behind the scenes |
| Self-correction / "QA Agent" loop | ✅ | Folded into the "visible self-test" behavior in §4 — the QA pass itself becomes part of what's shown, not just a silent internal step |
| Two build modes ("Get Inspired" consultant mode vs. one-shot) | ✅, reframed | The consultant/inspiration mode survives as an optional path from the homepage prompt box (§2) — "not sure what to build" leads into a guided version of the same single flow, rather than a separate mode users pick upfront |
| Multimodal agent support (voice, image, video) | ✅ | Not detailed above since Phase 2 didn't test it, but the Agents tab's "add a tool" control (§5) is the natural home for attaching a voice/image/video capability to an agent |
| Native tool integrations (Gmail, Slack, Notion, GitHub, Drive, Jira) | ✅ | Same connector model as GitHub in §6, generalized — one connector architecture, GitHub shipped first per the assignment's explicit ask, others addable without a redesign |
| Ops/governance layer (Agent Studio: guardrails, model swap, RAG pipelines) | ✅, surfaced earlier | This is exactly what makes the Agents tab in §5 *editable* rather than read-only — governance controls move from a separate Lyzr Studio destination into the same tab |
| Export / self-hosting (frontend export, VPC/on-prem backend) | ✅ | Lives under the "View code" toggle in §4 (full code, exportable) plus an enterprise-tier equivalent of architect.new's private-VPC backend option — not detailed at UI level above since Phase 2 didn't observe this flow directly, but the architecture doesn't preclude it |
| GitHub push | ✅, improved | §6 |
| Deployment to a shareable URL | ✅, improved | §7 |
| Marketplace publishing | ✅ | Kept as the separate, optional toggle in §7 |
| **Agentlets Marketplace** (community-published, forkable apps — found in a later live-product audit, not in the original Phase 1 docs review) | ✅ | Kept as a "Browse community apps" surface reachable from the homepage; "Clone" behaves like the "Duplicate App" action below, seeding a new project a user can then edit for either audience |
| **Prompt Library** (role-categorized starter prompts) | ✅ | Kept, but merged into the homepage's example-prompt-chips affordance (§2) rather than a separate sidebar destination — one fewer place to look for a non-technical user, same content |
| **Theme Manager / Design System** (58 presets, org-wide theming) | ✅ | Kept as an account-level settings destination, not project-level — a technical user styling multiple apps consistently, or a non-technical user picking a look-and-feel without design skill, are both served by the same preset picker |
| **Download Code / Duplicate App** (project-card actions) | ✅ | "Download Code" is the same action as the "View code" export in §4; "Duplicate App" is kept as-is, a one-click clone from the project list |
| **Organization / multi-member accounts, Referrals** | ✅ | Kept as account-level features, unchanged by this redesign — not part of the per-project flow this design focuses on |
| **Lyzr University** (separate learning resource) | ✅ | Kept as a help/resources link, unchanged |

**A live-product audit correction to this design's own starting assumption:** a later hands-on walkthrough of architect.new's own "AI Consultant" onboarding (Phase 1 §1.2 update) found it already offers "Developer/Engineering" and "Solutions Architect" as role options, producing genuinely technical recommendations (a Code Review Assistant, a Bug Triage Agent, etc.) — meaning the current product gestures toward technical users earlier than this document's Phase 3-based assumption gave it credit for. This doesn't change any decision above, but it does mean Architect 2.0's job is less "add a technical audience from zero" and more "follow through on technical framing the onboarding already promises, all the way to the build/GitHub/deploy stages" — which is exactly what §1–§7 do.

No current-Architect feature is dropped; several (agent editing, ops/governance, build-mode framing) are made more prominent specifically because Architect 2.0 must now also satisfy technical users who'd expect that level of control.

---

## 10. What this deliberately does *not* copy

- Not architect.new's mandatory multi-question clarifying flow (too slow as a universal default)
- Not Rocket's/Emergent's mode-tabs-before-first-prompt homepage
- Not Replit's fully manual GitHub push as the default (kept only as the "Advanced" option)
- Not Replit's time-limited free deploys or Emergent's free-tier deploy block
- Not Rocket's paid-only GitHub push
- Not any single tool's exact visual style — the synthesis is a reference set, not a template, per the assignment's own instruction

---

*This completes Phase 4. Remaining work: Cursor and Claude Code Phase 2 entries (user-reported) and Codex's open Phase 2 gap can still be folded in if they surface anything new; direct answers to the submission form's two "why would you switch" questions are drafted separately; and the actual Build and Ship stages (implementation, deployment, public GitHub repo) are the largest remaining work per the assignment's own "What to do" section.*
