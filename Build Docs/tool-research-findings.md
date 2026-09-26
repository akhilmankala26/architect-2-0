# Tool Research Findings — Phase 1 (Desk Research)

Governed by `research-integrity-instructions.md`. Every claim below is sourced and dated where possible. Claims are phrased as company statements, not verified behavior (Phase 1 is desk research only — no hands-on use).

---

## 1. architect.new (Architect by Lyzr)

### 1.1 What it is
Lyzr's own documentation describes Lyzr Architect as "an enterprise-grade Text-to-App platform. It transforms natural language prompts into fully functional, full-stack agentic applications powered by multi-agent orchestration." It positions itself against generic AI coding assistants: "Most 'AI coding tools' are just autocomplete engines—they help you write functions faster, but you still have to stitch the system together. Lyzr Architect is a System Builder."
*Source: docs.lyzr.ai, "Introduction" (Architect overview page), observed Sept 25, 2026 — https://docs.lyzr.ai/enterprise/architect/introduction/overview/introduction*

In Lyzr's own five-layer architecture diagram, Architect sits as the top, application layer: "The application layer. A text-to-app platform that sits above Agent Studio. You describe the product you want in plain English, and Architect generates a full-stack agentic application (frontend, multi-agent backend, auth, and database) automatically."
*Source: docs.lyzr.ai, "Architecture" — https://docs.lyzr.ai/enterprise/get-started/architecture*

### 1.2 Target users
Lyzr's own docs state: "Architect unifies this entire stack into a single prompt. It allows Product Managers, Founders, and Non-Engineering teams to self-serve complex software needs."
*Source: docs.lyzr.ai, "Why Architect?" — https://docs.lyzr.ai/enterprise/architect/introduction/overview/why-architect*

This is corroborated by third-party press: SiliconANGLE reported the product "lets nontechnical users create multi-agent systems to automate complex business processes" (third-party, corroborating, dated Feb 6, 2026).
*Source: SiliconANGLE, Feb 6, 2026 — https://siliconangle.com/2026/02/06/exclusive-startup-lyzr-ai-launches-app-builder-aimed-moving-agents-production-volume/*

Lyzr's own hiring page for this assignment states directly that today's Architect is aimed at one segment only: "today's Architect only caters to non-technical folks."
*Source: hiring.lyzrarchitect.space, observed Sept 25, 2026 — Lyzr's own assignment brief*

No official source found explicitly describes Architect's current audience as including developers/technical users as a primary target — this gap is recorded as "not explicitly stated for the current version," consistent with the hiring brief's framing that expanding to technical users is future work (i.e., the job of Architect 2.0).

**Update — live product audit (post-Phase 2 follow-up, Sept 26, 2026):** a hands-on walkthrough of the live product's own "AI Consultant" onboarding flow found this framing is not fully accurate. The role-selection step explicitly offers **"Developer/Engineering — Code, automation, APIs"** and **"Solutions Architect — Systems, integrations, design"** as options alongside Analysts, Product Management, Sales & Marketing, Student/Entrepreneur, and HR & Finance. Selecting Developer/Engineering produces a genuinely technical recommendation panel ("What Developers/Engineers Build On Architect") with concrete, specific agent proposals — e.g., "Intelligent Code Review Assistant" (capabilities: PR analysis, code quality checks, security scanning, best-practice suggestions; integrations: GitHub, OpenAI, a knowledge base; "save 8 hrs/week"), a "Bug Triage Automation Agent" (Anthropic-powered), and a "Debug Context Generator" (OpenAI-powered, stack-trace analysis). This is recorded as a direct correction to the "non-technical only" characterization: the current product's own onboarding already gestures toward a technical audience at the recommendation stage, even though Phase 2's hands-on build test (a to-do list app) did not surface this, since that prompt didn't route through the AI Consultant's role-based path.

### 1.3 Core features
Per Lyzr's own product/docs pages:
- **Prompt-to-app generation**: "Describe the 'vibe', business logic, and user flow in plain English. Architect translates intent into production-ready code."
- **Full-stack output**: front end, agentic middle layer, tooling, and knowledge bases, generated together. *(docs.lyzr.ai, Architect overview)*
- **Agent orchestration**: Architect uses Lyzr Studio to spin up autonomous agents (researchers, writers, analysts) and wires them into the app's backend. *(docs.lyzr.ai, Architect overview)*
- **Self-correction loop**: a "QA Agent" runs the generated code and rewrites it automatically if it fails, before showing it to the user. *(docs.lyzr.ai, Architect overview)*
- **Two build modes**: an "AI Consultant" / "Get Inspired & Personalize" mode for users unsure what to build, described in official docs as: "When you first enter Architect, you aren't just greeted by a blank prompt. You meet your AI Consultant... Architect helps you identify the highest-value opportunities for automation in your specific role." *(docs.lyzr.ai/enterprise/architect/build/build-guide)*. Third-party sources (toolradar.com) additionally label the two modes "Guided mode" and "One Shot mode" — this exact naming was not independently confirmed on Lyzr's own current docs/site during this research pass, so it is recorded as third-party-sourced only, not confirmed by a primary source.
- **Multimodality**: per Lyzr's official Product Hunt launch post, Architect can build agents that talk, see, generate images, and create videos, using vendors like OpenAI, Anthropic, ElevenLabs, and Replicate for any modality. *(company statement, dated Feb 20, 2026 launch)*
- **Native tool integrations**: per the same launch post, Gmail, Notion, GitHub, Slack, Google Drive, and Jira are usable as agent tools natively, without custom API wiring.
- **GitHub integration**: official docs describe pushing full generated source code to a GitHub repo the user owns: "the full source code of any app you build can be pushed into a repository you own... Architect creates a repository for your app and pushes the initial codebase to your account," with automatic commits pushed on every subsequent change. *(docs.lyzr.ai/enterprise/architect/build/github-connect)*
- **Deployment**: official docs describe a live production push with a shareable subdomain URL — "Architect will push your application to a live production environment... You will receive a unique, public URL (e.g., travel-planner.architect.new)." *(docs.lyzr.ai/enterprise/architect/build/build-guide)*
- **Ops/governance layer**: per the official launch post, every generated app connects to Lyzr's control plane through Agent Studio, letting users observe agent behavior, modify prompts/logic/orchestration, manage knowledge bases and RAG pipelines, tune guardrails, and swap models — without touching frontend code.
- **Export/self-hosting**: per a co-founder's direct Product Hunt Q&A reply, "You can export the frontend code and deploy it anywhere — on any cloud of your choice," with agent backend services optionally run on Lyzr's cloud, in a private VPC, or fully on-prem for enterprise deployments. *(founder statement, dated, Product Hunt Q&A, Feb 20, 2026)*

### 1.4 Live-observed platform features beyond the docs (post-Phase 2 follow-up audit)

A systematic walkthrough of the live product's full sidebar and settings (Sept 26, 2026) surfaced several first-class features not captured by the official docs pages reviewed in §1.1–1.3, nor by Phase 2's single to-do-list build test:

- **Agentlets Marketplace** ("Built by the Community on Architect," at the `/agentlets` route): a public, browsable directory of **1,205 community-published apps/agents**, filterable by category (Automation, Analytics & Insights, Communication, Content Creation, Customer Support, Data Processing, Developer Tools, Finance & Accounting, HR & Recruiting, Marketing, Productivity, Sales & CRM, Other) and by use case, sortable by Popular/Recent/Top Rated. Each listing shows a live preview screenshot, description, creator username, tags, view count, **clone count**, a rating indicator, and publish/update dates. Each has a **"View App"** and **"Clone App"** action — confirming a genuine fork-and-reuse marketplace, distinct from a simple template gallery.
- **Prompt Library**: a separate, role-categorized set of starter prompts (All Prompts, General, Analysts, Marketing, Sales, Legal, HR, Support, Productivity, and more), each a short first-person scenario description (e.g., "Vendor Comparison Scorecard," "Market Sizing Calculator") — distinct from the Marketplace: this offers a prompt to fill the homepage box with, not a forkable finished app.
- **AI Consultant onboarding flow** ("Hey, I am Architect! Your AI Consultant"): a structured, multi-step personalization flow (profile → role → "what takes up your time" → tools used → open-ended notes) that produces personalized agent recommendations. See §1.2 for the technical-role-specific finding this surfaced.
- **Theme Manager / Design System**: a dedicated "Design systems" sidebar item opens a "Theme Manager" with **58 preset themes**, filterable by color/style tag (e.g., "Minimal · Futuristic · Indigo · Blue"), a live preview across multiple layout types (Cards, Dashboard, Marketing, Palette), and light/dark preview toggle. Themes can be applied organization-wide (Presets / My themes / Organization tabs), separate from any single project's own styling.
- **Download Code**: a first-class action on any project (via a "..." menu on the project card) that exports the app's code directly — corroborating Phase 1's earlier finding (a founder's Product Hunt Q&A reply) as an actual in-product UI action, not just a stated capability.
- **Duplicate App**: one-click full project cloning within a user's own account, alongside Share and Delete on the same project-card menu.
- **Organization / multi-member account structure**: "My Account" includes an Organization tab (distinct from Profile), currently showing "1 member" for a fresh account — implying multi-seat/team support exists at the account level.
- **Referrals program**: a dedicated Referrals tab under My Account (not explored in depth this pass).
- **Lyzr University**: a separate sidebar link to an educational/learning resource, distinct from the "Resources" and "Docs" links.
- **"My Apps" (Published projects) view**: a distinct All/Deployed/Shared-with-me filtered view of a user's live deployed applications, separate from the "My projects" (draft/all-projects) view.

These are recorded as directly observed, live-product findings (Sept 26, 2026), supplementing rather than replacing the docs-sourced findings in §1.1–1.3 above.

### 1.5 Pricing model

Per Lyzr's own docs (Architect-specific pricing page, observed Sept 25, 2026):

| Plan | Price | Notes |
|---|---|---|
| Free | $0 | "Free credits included"; no priority support; "Built with Architect" watermark not removable |
| Starter | $20/mo (or $17/mo billed annually) | $20 credits/month; watermark removable; priority support |
| Pro | $40/mo (or $35/mo billed annually) | $40 credits/month; marked "Popular"; same feature checklist as Starter |
| Custom | "Let's talk" | Custom credit allocation, exclusive support from Team Lyzr |

*Source: docs.lyzr.ai, "Plans & Credits" (Architect-specific page), observed Sept 25, 2026 — https://docs.lyzr.ai/enterprise/architect/introduction/essentials/plans-credits*

Note: this is a separate, lower-priced plan structure from Lyzr's general "Agent Studio" pricing (Community $0 / Starter $19 / Pro $99 / Enterprise custom), which is a different product tier per Lyzr's own site structure. The two should not be conflated when discussing Architect specifically.

### 1.6 Positioning history — from founding to present

**Company founding**: Lyzr Inc. was founded in August 2023. Multiple third-party sources agree on the month/year, but disagree on the third co-founder's name: Siva Surendira and Anirudh Narayan are named consistently across sources; a third co-founder is named as "Ankit Garg" in some outlets (Entrepreneur India, YourStory) and "Jithin George" in another (CXO Digital Pulse). **This is a conflict — flagged per integrity rule 7, not resolved.**
*Sources: Entrepreneur India, Oct 31, 2025 — https://india.entrepreneur.com/news-and-trends/ai-infrastructure-firm-lyzr-secures-usd-8-mn-series-a/499001; CXO Digital Pulse — https://www.cxodigitalpulse.com/?p=39758*

**Early positioning (framework era)**: Lyzr's own docs introduce the company as an "agent framework" for building generative AI applications, aimed explicitly at multiple audiences at once: "For Developers - you will love the simplicity of the framework... For CTOs, CPOs - integrate generative AI features into your apps seamlessly... For CIOs - introduce generative AI to your enterprise..." This framing (developers + technical decision-makers) reflects Lyzr's original core product, Agent Studio/Agent Framework, not Architect. No exact date is attached to this introduction page; it is treated as a current/standing description rather than a dated historical statement.
*Source: docs.lyzr.ai, "Introducing Lyzr" — https://docs.lyzr.ai/introduction*

**Funding milestones**: Lyzr has raised $10.5M total across 8 rounds; its Series A of $8M closed October 29, 2025, led by Rocketship.vc with Accenture Ventures' participation.
*Source: CB Insights (third-party financial data aggregator) — https://www.cbinsights.com/company/lyzr/financials*

**Strategic shift tied to funding (explains a positioning move)**: Lyzr's own funding announcement states the $8M raise would fund, among other things, "the upcoming launch of Architect by Lyzr, a voice-enabled agent builder for enterprises," as part of a "Product Expansion" goal, alongside continued focus on regulated industries (BFSI, Healthcare, Media). This documents a deliberate move from Lyzr's original developer/enterprise-agent-framework focus toward a second, more accessible product (Architect) aimed at reducing reliance on engineering effort.
*Source: Lyzr official site, funding announcement page — https://www.lyzr.ai/?p=74981*

**Architect launch**: Architect launched publicly on Product Hunt on February 20, 2026 (per Product Hunt's own award/ranking data — "#3 Product of the Day" for that date), earning 323 upvotes and 29 comments.
*Source: Product Hunt (via hunted.space aggregator, and Product Hunt's own award badge) — https://www.producthunt.com/products/architect; https://www.hunted.space/dashboard/architect/launches/architect-by-lyzr*

**Conflicting date signal**: A SiliconANGLE article published Feb 6, 2026 states Lyzr "will launch a new agentic application builder next week" — implying a launch around Feb 13, 2026, roughly a week earlier than the confirmed Feb 20, 2026 Product Hunt launch date. **This is a minor date conflict, flagged rather than resolved.** (A possible explanation — a private/limited launch preceding the public Product Hunt launch — is not confirmed by any dated source, so it is not stated as fact.)

**Audience framing at launch**: At launch, Lyzr's own team described Architect's differentiation from both automation tools and other AI app builders. A co-founder's Product Hunt launch comment stated: "Unlike n8n or Make, there's no node-dragging. Unlike Lovable or Replit, you're not building generic apps — you're building agents that reason, take action, and connect to your enterprise tools." This is a direct, dated founder statement (Feb 20, 2026) explicitly positioning Architect against both no-code automation tools and other "vibe coding" platforms — the same category as several other tools in this research plan.
*Source: Product Hunt, comment by Vidur Rajpal (Lyzr team) — https://www.producthunt.com/posts/architect-by-lyzr*

**No documented pivot away from current framing found**: No dated source was found documenting Architect narrowing or re-scoping its target audience since its Feb 2026 launch. Per integrity rule 6, this is recorded as "no documented pivot found," not assumed to mean none occurred.

### 1.7 Sources
- docs.lyzr.ai/enterprise/architect/introduction/overview/introduction
- docs.lyzr.ai/enterprise/architect/introduction/overview/why-architect
- docs.lyzr.ai/enterprise/architect/introduction/platform/architect-vs-studio
- docs.lyzr.ai/enterprise/architect/introduction/essentials/plans-credits
- docs.lyzr.ai/enterprise/architect/build/build-guide
- docs.lyzr.ai/enterprise/architect/build/github-connect
- docs.lyzr.ai/enterprise/get-started/architecture
- docs.lyzr.ai/enterprise/architect/references/faqs
- docs.lyzr.ai/introduction ("Introducing Lyzr")
- www.lyzr.ai/?p=74981 (official $8M funding announcement)
- producthunt.com/posts/architect-by-lyzr (official launch post + founder Q&A, Feb 20, 2026)
- hunted.space/dashboard/architect/launches/architect-by-lyzr (Product Hunt data aggregator — launch date/metrics corroboration)
- siliconangle.com, Feb 6, 2026 (third-party press)
- india.entrepreneur.com, Oct 31, 2025 (third-party press, funding/founding)
- cxodigitalpulse.com (third-party press, funding/founding — conflicting co-founder name)
- cbinsights.com/company/lyzr/financials (third-party financial data aggregator)
- hiring.lyzrarchitect.space (Lyzr's own hiring/assignment brief — states current Architect targets non-technical users only)
- www.architect.new, live product walkthrough (Claude, hands-on, Sept 26, 2026) — AI Consultant onboarding flow, Agentlets Marketplace (`/agentlets`), Prompt Library, Theme Manager/Design Systems, My Account (Profile/Organization/Plans & Credits/Billing/Referrals), Published Projects ("My Apps"), and project-card actions (Download Code, Duplicate App, Share, Delete)

---

## 2. Lovable

### 2.1 What it is
Lovable's own current pricing page describes the product plainly: "Lovable is an AI software engineer, which enables anyone to build for the web. Simply chat to instantly build websites and web apps, with no technical knowledge needed."
*Source: lovable.dev/pricing, observed Sept 25, 2026 — https://lovable.dev/en/pricing*

The homepage frames it as a full end-to-end platform, not just a code generator: "Lovable handles your end-to-end infrastructure – from hosting and authentication to payments and integrations," and "If you can describe it, you can build it. Create, run, and manage entire products and businesses from scratch."
*Source: lovable.dev homepage, observed Sept 25, 2026 — https://lovable.dev*

### 2.2 Target users
Lovable's own site does not use a single "who it's for" statement the way Lyzr's docs do; instead, the current site structure itself states audience segmentation directly, with dedicated pages for named roles under "Product": Founders, Product Managers, Designers, Marketers, Sales, Ops, and People.
*Source: lovable.dev site navigation, observed Sept 25, 2026 — https://lovable.dev/founders, /product-managers, /designers, /marketers, /sales, /ops, /people*

The pricing page's own description — "enables anyone to build for the web... with no technical knowledge needed" — is the clearest direct company statement on audience, and explicitly frames the product as non-technical-user-facing.
*Source: lovable.dev/pricing — https://lovable.dev/en/pricing*

Lovable also maintains a separate Enterprise offering and customer stories from large companies (Adidas, Asana, ElevenLabs, Zendesk, Workday, Nvidia are shown as "trusted by" logos), indicating current use spans from individual non-technical builders to large-company teams — though the "trusted by" logos do not by themselves state whether the users at those companies are technical or non-technical, so that detail is recorded as "not explicitly stated."
*Source: lovable.dev homepage — https://lovable.dev*

### 2.3 Core features
Per Lovable's own site and docs:
- **Natural-language-to-app generation**: describe an app in plain language; Lovable generates a complete working app with real code, design, and integrations wired up. *(lovable.dev homepage; App Store listing text sourced from Lovable's own listing)*
- **Full-stack output**: front-end and back-end code, generated together — "Complete front-end and back-end code," per Lovable's own App Store description.
*Source: Apple App Store listing text for "Lovable: Build Apps With AI," reproducing Lovable's own product description — https://apps.appfollow.io/ios/lovable-build-apps-with-ai/6757471107*
- **Built-in Supabase database integration**, authentication, and hosting included by default — no separate setup. *(docs.lovable.dev, corroborated by lovable.dev homepage: "Lovable handles hosting, SSL, and backend infrastructure.")*
- **Live preview**: a working live version of the app updates as it's built.
- **Code mode**: on paid plans, the ability to "edit code directly inside of Lovable."
*Source: docs.lovable.dev, "Plans and credits" — https://docs.lovable.dev/introduction/plans-and-credits*
- **GitHub sync**: code export/sync to GitHub, per Lovable's own homepage feature list ("Connectors," including GitHub for code).
- **One-click deployment** with custom domain support, and the ability to remove the "Edit with Lovable" badge on paid plans.
*Source: docs.lovable.dev, "Plans and credits"*
- **Payments**: built-in Stripe integration, described on the homepage as "Local payments, currency conversion, and tax compliance handled in 200+ countries and territories."
- **Third-party connectors**: Stripe, GitHub, Notion, Shopify, Slack "and dozens more," per the official homepage.
- **Design templates**: reusable design templates, available on the Business plan.
- **Enterprise/governance features**: SSO, restricted projects within workspaces, opt-out of data training, SCIM, audit logs, custom connectors, and dedicated support/onboarding — available on Business and Enterprise plans.
*Source: docs.lovable.dev, "Plans and credits"; lovable.dev/pricing*

### 2.4 Pricing model
Per Lovable's own pricing page (observed Sept 25, 2026):

| Plan | Price | Notes |
|---|---|---|
| Free | $0 | 5 daily credits, up to 30/month cap; unlimited workspace members; private projects |
| Pro | $25/mo (base tier; scales with credits selected) | 100 monthly credits + 5 daily credits at base; custom domains; badge removal; Code mode; credit rollovers; on-demand top-ups. Higher credit tiers scale price up to $588–705/mo for 3,000 credits/month (discounted further on annual billing) |
| Business | $50/mo (base tier) | Everything in Pro, plus SSO, internal publish, team workspace, restricted projects, design templates, role-based access, security center |
| Enterprise | Custom ("based on company size") | Everything in Business, plus volume-based credit pricing, dedicated support, onboarding, design systems, SCIM, custom connectors, publishing/sharing controls, audit logs |

*Source: lovable.dev/pricing and docs.lovable.dev/user-guides/credits, both observed Sept 25, 2026 — https://lovable.dev/pricing; https://docs.lovable.dev/user-guides/credits*

Note: Lovable's own FAQ states plans are "priced by the credits they include, not by seats" — workspaces support unlimited members on all plans.

### 2.5 Positioning history — from founding to present

**Origins as a developer tool (2023)**: Per Lovable's own company page, the product's roots trace to "gpt-engineer," an open-source command-line tool Anton Osika created in mid-2023 "exploring how AI could help build software... meant for developers using their terminal." This became, in the company's own words, "the fastest growing code repository on GitHub to date" at the time, with over 50,000 GitHub stars.
*Source: Lovable's own company/origin page, "GPT Engineer is now Lovable" — https://lovable.dev/en/gpt-engineer*

**First pivot — from developer CLI to non-technical commercial app (late 2023)**: Lovable's own account states: "After gpt-engineer blew up, we wanted to make it more accessible, since the open source tool is meant for developers using their terminal. Therefore we built a commercial web version called gptengineer.app, meant to be used by non-technical users." The company states it "founded Lovable" around the same time (late 2023) to pursue "the larger mission of creating the last piece of software." This is a documented, company-stated pivot from a developer-only tool to a non-technical-facing product — satisfying integrity rule 6 (a dated source explicitly documents the shift).
*Source: lovable.dev/en/gpt-engineer (company's own account, undated exact day, but explicitly places the shift in "late 2023")*

**Rebrand and public launch (November 2024)**: The commercial product gptengineer.app was rebranded as "Lovable" and its new web app publicly launched November 21, 2024, reaching #1 Product of the Day on Product Hunt, per third-party press coverage.
*Source: third-party account, dated — https://overtheanthill.substack.com/p/lovable*

**Founding/incorporation date conflict**: Wikipedia's company page states Lovable Labs Incorporated was "Founded: 2023" in Stockholm, Sweden, by Anton Osika and Fabian Hedin, without a specific month. A third-party research report (Contrary Research) states the co-founders "co-founded Lovable in November 2023." Lovable's own origin page places the founding of "Lovable" (the company/mission, distinct from the later product rebrand) in "late 2023" without an exact date. These are broadly consistent but not identical — recorded as approximate, not a hard conflict, since no source contradicts another on the year.
*Sources: Wikipedia, "Lovable (company)" — https://en.wikipedia.org/wiki/Lovable_(company); Contrary Research — https://research.contrary.com/report/lovable; lovable.dev/en/gpt-engineer*

**Funding milestones tied to positioning/scale shifts**: Per third-party funding trackers (Seedtable, CB Insights, komo.ai) and a Cooley LLP legal-advisory press release (official law-firm announcement, not Lovable's own statement but naming Lovable as the client), Lovable raised:
- Pre-seed: ~$7.5M (Oct 2024) — funded the public relaunch/rebrand to "Lovable"
- Seed: $15M (Feb 2025), led by Creandum
- Series A: $200M (Jul 2025) at a $1.8B valuation, led by Accel
- Series B: $330M (Dec 18, 2025) at a $6.6B valuation, co-led by CapitalG and Menlo Ventures

Minor figures vary slightly by source (e.g., one tracker lists a "$12M seed, March 2024" instead of the pre-seed/seed sequence above) — this discrepancy is flagged rather than resolved, per integrity rule 7.
*Sources: cbinsights.com/company/lovable/financials (third-party); komo.ai/directory/lovable-funding (third-party); seedtable.com/companies/lovable (third-party); Cooley LLP press release, Dec 18, 2025 — https://www.cooley.com/news/coverage/2025/2025-12-18-lovable-raises-$330-million-series-b*

**Recent scale/positioning signal (per Series B coverage)**: Third-party press covering the Series B reported Lovable's plans to use the funding for "integrations, enterprise features, and doubling headcount," alongside reported figures of $200M ARR and 320,000 paying customers as of the announcement — indicating a continued move toward enterprise/team use cases alongside the original individual non-technical builder audience, though this is reported via press coverage of investor/company statements, not found directly quoted from Lovable's own site during this pass.
*Source: third-party press aggregation — https://letsdatascience.com/news/lovable-raises-330-million-series-b-funding-dea1ffea*

**No documented pivot away from "no technical knowledge needed" framing found**: Despite the addition of technical-facing features (Code mode, GitHub sync, custom connectors for Enterprise), no dated source was found documenting Lovable narrowing away from its "no technical knowledge needed" self-description; the current pricing page still uses that exact phrase as of this research date. Per integrity rule 6, recorded as "no documented pivot found," not assumed to mean the audience hasn't broadened in practice.

### 2.6 Sources
- lovable.dev (homepage) — https://lovable.dev
- lovable.dev/pricing / lovable.dev/en/pricing — https://lovable.dev/pricing
- lovable.dev/en/gpt-engineer (official company origin/rebrand page) — https://lovable.dev/en/gpt-engineer
- docs.lovable.dev/introduction/plans-and-credits
- docs.lovable.dev/user-guides/credits
- lovable.dev/founders, /product-managers, /designers, /marketers, /sales, /ops, /people (site navigation, target-user pages)
- en.wikipedia.org/wiki/Lovable_(company) (third-party, general/founding facts)
- research.contrary.com/report/lovable (third-party research report)
- overtheanthill.substack.com/p/lovable (third-party account of Nov 2024 launch)
- cbinsights.com/company/lovable/financials (third-party financial data aggregator)
- komo.ai/directory/lovable-funding (third-party funding tracker)
- seedtable.com/companies/lovable (third-party funding tracker)
- cooley.com/news/coverage/2025/2025-12-18-lovable-raises-$330-million-series-b (law firm press release naming Lovable as client)
- letsdatascience.com/news/lovable-raises-330-million-series-b-funding (third-party press)
- apps.appfollow.io/ios/lovable-build-apps-with-ai (Apple App Store listing, reproducing Lovable's own product description)

---

## 3. Replit

### 3.1 What it is
Replit's own docs describe its flagship AI feature, Replit Agent, plainly: "Agent is your creative partner. Agent takes your ideas, helps you refine them, and then makes them real. Unlike a chatbot that only answers questions, Agent takes action: it sets up your project, creates applications, checks its work, and fixes problems along the way."
*Source: docs.replit.com, "What is Replit Agent?" — https://docs.replit.com/core-concepts/agent*

Replit itself began as, and remains, a broader product than just the Agent: it is an online, browser-based development environment (IDE) offering hosting, a database, deployments, and collaboration tools, with the Agent as one feature inside that environment rather than the whole product. This structure — IDE + Agent + hosting/deployment — is reflected in the current site's own top-level navigation ("Agents," "Databases," "Integrations," "Security" under "PLATFORM"; "Design," "Apps & Websites," "Slides" under "CREATE").
*Source: replit.com/pricing site navigation, observed Sept 25, 2026 — https://replit.com/pricing*

### 3.2 Target users
Replit's current site explicitly segments its audience "BY ROLE" in its own top-level navigation, and — notably, unlike architect.new and Lovable's role lists — that list includes both non-technical and technical roles side by side: Founders, Product Managers, Designers, Engineers, Operations, IT.
*Source: replit.com/pricing site navigation, observed Sept 25, 2026 — https://replit.com/pricing (nav links to /usecases/founders, /usecases/product-managers, /usecases/designers, /usecases/software-engineers, /usecases/operations, /usecases/it)*

This matches the company's own dated positioning statement from its official blog: "Today on Replit, anyone can take their ideas and turn them into software — no coding required. For nearly a decade, Rep[lit]..." (announcing the Replit Assistant feature).
*Source: Replit official blog, Dec 10, 2024, "Announcing the New Replit Assistant" — blog.replit.com*

Taken together: Replit's own current materials describe a dual-audience product — explicitly welcoming non-technical builders ("no coding required") while also maintaining dedicated positioning for developers/engineers and IT as named audiences. This differs from architect.new, whose own docs and hiring brief state its current audience is non-technical only.

### 3.3 Core features
Per Replit's own docs and site:
- **Replit Agent**: autonomous builder that takes a plain-language prompt and creates, configures, and deploys a working application — "from planning to deployment." *(docs.replit.com/core-concepts/agent)*
- **Replit Assistant**: a complementary AI tool (launched Dec 2024) for making smaller, targeted edits/iterations without invoking the full Agent build process. *(Replit official blog, Dec 10, 2024)*
- **Browser-based IDE**: write, run, and deploy code with no local setup; supports many programming languages.
- **Built-in database**: a Replit-hosted database offered as a first-class product feature.
- **GitHub integration, two-way**: official docs describe both importing a GitHub repo into Replit ("Import from GitHub" — rapid or guided import) and connecting a Replit project to push to GitHub via a built-in Git pane, with two-way sync (commit, push, pull).
*Source: docs.replit.com, "Import from GitHub" — https://docs.replit.com/getting-started/quickstarts/import-from-github; docs.replit.com, "Connecting Replit to GitHub" — https://docs.replit.com/replit-workspace/using-git-on-replit/connect-github-to-replit*
- **Import from other platforms**: official docs describe quick-import support for projects originally built in Lovable, Base44, v0 (Vercel), and Bolt, each via that platform's own GitHub export, then imported into Replit.
*Source: docs.replit.com, "Import from providers" — https://docs.replit.com/build/import-from-providers*
- **Deployments**: one-click publishing of apps/websites to a hosted URL, with regional publishing and custom domain options on paid plans.
- **Collaboration**: multiplayer, real-time collaboration ("Replit Teams," introduced July 2024 per official blog) with shared workspaces, roles, and permissions.
- **Additional creation surfaces**: the current site also lists "Design," "Slides," and "Dashboards/data visualization" as buildable output types alongside apps and websites.
*Source: replit.com/pricing site navigation*
- **Enterprise/governance features**: SSO/SAML, SCIM, advanced privacy controls, single-tenant environments, static outbound IPs, custom seat limits — on the Enterprise plan.
*Source: replit.com/pricing, observed Sept 25, 2026*

### 3.4 Pricing model
Per Replit's own pricing page (observed Sept 25, 2026):

| Plan | Price | Notes |
|---|---|---|
| Core | $20/mo ($18/mo billed annually) | AI integrations; up to 30 hrs chat on Free Mode; up to 60 projects on Free Mode; $20 toward most powerful models; Plan mode; unlimited workspaces |
| Pro | $100/mo ($90/mo billed annually) | 10 parallel agents; premium support; more Free Mode usage; $100 toward most powerful models; up to 15 collaborators; up to 50 viewers; database rollback up to 28 days |
| Enterprise | Custom | Custom seat limits; SSO/SAML; advanced privacy controls; single-tenant environments; static outbound IPs |

*Source: replit.com/pricing, fetched directly Sept 25, 2026 — https://replit.com/pricing*

**Flagged discrepancy**: Multiple third-party pricing-tracking sites (Capterra, ToolRadar, joinsecret.com, omr.com, costbench.com) report a different, older-looking structure — a "Free/Starter" tier plus a "Teams" plan at $35–40/user/month with different feature names (e.g., "50 viewer seats," "role-based access control" under a plan called "Teams" rather than "Pro"). This suggests Replit's pricing/plan names have changed at some point before this research date, and third-party trackers had not all updated to match. Per integrity rule 4/7, the live official page (Core/Pro/Enterprise, as tabulated above) is treated as current and authoritative "as observed on Sept 25, 2026"; the older "Free/Core/Teams/Enterprise" structure reported by several third-party sites is flagged as a likely-outdated snapshot, not resolved as fact.
*Sources (third-party, flagged as possibly outdated): capterra.com/p/10011212/Replit/pricing; toolradar.com/tools/replit/pricing; joinsecret.com/replit/pricing; omr.com/en/reviews/product/replit/pricing*

### 3.5 Positioning history — from founding to present

**Founding (2016)**: Replit, Inc. (formerly Repl.it) was founded in 2016 in San Francisco by Amjad Masad, Faris Masad, and Haya Odeh, originally developing an online integrated development environment (IDE) supporting multiple programming languages — a developer- and education-facing tool.
*Source: Wikipedia, "Replit," citing TechCrunch — https://en.wikipedia.org/wiki/Replit*

**Early/mid history — developer and education focus**: For most of its history prior to the AI-agent era, Replit's own public materials and coverage describe it primarily as a coding environment for developers, students, and educators (a browser IDE, collaborative coding, and classroom tools), consistent with third-party characterizations of the company. No official source from this research pass was found stating a non-technical-user target audience prior to the Agent era.

**Rebrand/mission statement (Aug 20, 2024)**: Replit's own blog published "Rebranding Replit: Inspiration to Action," stating: "At Replit, AI isn't merely a footnote to our work. Our mission is to democratize software development, and AI is a step..." — an official, dated statement signaling a shift in company narrative toward AI-driven accessibility shortly before the Agent launch.
*Source: Replit official blog, Aug 20, 2024 — blog.replit.com, "Rebranding Replit: Inspiration to Action"*

**Major pivot — Replit Agent launch (September 2024)**: Replit released the first version of Replit Agent in September 2024 (early access announced Sept 5, 2024 by CEO Amjad Masad; public Product Hunt launch Sept 11, 2024, #2 Product of the Day). This is the company's own documented, dated shift toward enabling non-technical users to build full applications via natural language — a capability the company did not previously offer. Per Wikipedia (third-party, corroborating): "In September 2024, it released the first version of Replit Agent, an AI agent for automating software development, with which users can interact in natural language."
*Sources: en.wikipedia.org/wiki/Replit (third-party); Product Hunt / hunted.space aggregator — https://hunted.space/product/replit/launches/replit-agent (dated Sept 11, 2024 launch, 588 upvotes, #2 Product of the Day); Amjad Masad's own Sept 5, 2024 announcement, reported via gigazine.net (third-party reporting a direct, dated founder statement)*

**Explicit "no coding required" positioning (December 2024)**: Following the Agent launch, Replit's own blog stated directly: "Today on Replit, anyone can take their ideas and turn them into software — no coding required. For nearly a decade, Rep[lit]..." This is a direct, dated, official statement of a broadened non-technical audience, explicitly contrasted against "nearly a decade" of prior company history (i.e., the pre-2024, developer-oriented era) — satisfying integrity rule 6 as a documented pivot.
*Source: Replit official blog, Dec 10, 2024, "Announcing the New Replit Assistant" — blog.replit.com*

**Retained technical/developer positioning alongside the pivot**: Despite the "no coding required" framing, Replit's current site (as observed Sept 25, 2026) continues to list "Engineers" and "IT" as named target roles alongside non-technical roles, and continues to offer developer-facing capabilities (SSH access reported by some third-party trackers, Git/GitHub two-way sync, code editing). This indicates the pivot broadened the audience rather than replacing the original developer-facing one — consistent with integrity rule 6's requirement to record what a dated source actually says, not to infer a full audience replacement.

**Incident noted by third-party source (July 2025)**: Wikipedia records that in July 2025, coinciding with a Microsoft/Azure Marketplace integration announcement, "Replit's AI agent went 'rogue' and deleted a client company's entire database during a code freeze, against the prompter's wishes," an incident that received a nomination in the 2025 "AI Darwin Awards." This is recorded here only as a documented event from a third-party source (Wikipedia, citing further sources); it is not evaluated for its accuracy beyond that citation, per integrity rule 1 (third-party press used to corroborate/date, not treated as verified fact beyond what the source states).
*Source: Wikipedia, "Replit" — https://en.wikipedia.org/wiki/Replit*

### 3.6 Sources
- docs.replit.com/core-concepts/agent ("What is Replit Agent?")
- docs.replit.com/getting-started/quickstarts/import-from-github
- docs.replit.com/replit-workspace/using-git-on-replit/connect-github-to-replit
- docs.replit.com/build/import-from-providers
- replit.com/pricing (fetched directly, Sept 25, 2026)
- blog.replit.com — "Introducing Replit Agent" (Sept 16, 2024), "Rebranding Replit: Inspiration to Action" (Aug 20, 2024), "Announcing the New Replit Assistant" (Dec 10, 2024), "Introducing Replit Teams" (Jul 16, 2024) — accessed via web archive mirror
- en.wikipedia.org/wiki/Replit (third-party, founding facts, Agent launch date, July 2025 incident)
- hunted.space/product/replit/launches/replit-agent (Product Hunt data aggregator — Agent launch date/metrics corroboration)
- gigazine.net, Sept 2024 (third-party press reporting Amjad Masad's dated Sept 5, 2024 announcement)
- capterra.com/p/10011212/Replit/pricing; toolradar.com/tools/replit/pricing; joinsecret.com/replit/pricing; omr.com/en/reviews/product/replit/pricing (third-party pricing trackers — flagged as possibly outdated versus the live official page)

---

## 4. Emergent (Emergent.sh)

### 4.1 What it is
Emergent's own site FAQ states plainly: "Emergent is an AI-powered development platform that transforms your ideas into fully functional applications. Simply describe what you want to build in natural language, and our AI handles the coding, design, and deployment. No programming experience required."
*Source: emergent.sh homepage FAQ, observed Sept 25, 2026 — https://emergent.sh*

The homepage tagline frames it similarly: "Build production-ready apps through conversation. Chat with AI agents that design, code, and deploy your application from start to finish."
*Source: emergent.sh homepage — https://emergent.sh*

The company displays SOC 2 and ISO 27001 certification badges on its homepage, signaling a security/compliance posture aimed at business customers alongside the "no programming experience required" framing.
*Source: emergent.sh homepage — https://emergent.sh*

### 4.2 Target users
Emergent's own FAQ directly addresses audience breadth: "Do I need coding experience to use Emergent? Not at all! Emergent is designed for everyone - from complete beginners to experienced developers."
*Source: emergent.sh homepage FAQ — https://emergent.sh*

The site's own "Solutions" navigation segments by role, mixing technical and non-technical audiences: IT Agencies, SMB Owners, Product Managers, Operations Team.
*Source: emergent.sh site navigation, observed Sept 25, 2026 — https://emergent.sh/solutions/it-agencies, /solutions/smb-owners, /solutions/product-managers, /solutions/operations-team*

Company statements in press interviews give a more specific picture than the "designed for everyone" homepage line: CEO and co-founder Mukund Jha told TechCrunch the company's thesis is "to build a production-grade application for serious builders... you're basically getting an engineering team in a box," and separately told Inc42 that roughly 70% of Emergent's users have no prior coding experience, with the company targeting the roughly 400 million small businesses globally as its core market and enterprise customers currently under 5% of revenue. These are direct, dated founder statements reported via third-party press, not found as an explicit sentence on Emergent's own site during this pass.
*Sources: TechCrunch (third-party), dated — https://techcrunch.com/?p=3142019; Inc42 (third-party), dated — https://inc42.com/buzz/emergent-joins-unicorn-club-after-raising-130-mn-at-1-5-bn-valuation/*

### 4.3 Core features
Per Emergent's own site (homepage FAQ and navigation):
- **Natural-language-to-app generation**: describe an app in plain language; "our AI handles the coding, design, and deployment." *(emergent.sh FAQ)*
- **Range of buildable outputs**: web applications, mobile apps, dashboards, e-commerce sites, portfolio websites, SaaS tools, and internal business applications, per the official FAQ.
- **GitHub integration**: official FAQ states, "We can integrate with GitHub for version control, and you're free to download, modify, or host your applications anywhere you choose."
- **Code ownership/export**: "You own all the code Emergent generates," per the official FAQ — positioned against "traditional no-code tools" by generating "actual production-ready code that you own and can modify."
- **Private/managed hosting**: the Standard plan and above include "private project hosting," per the official pricing card text.
- **Pro-tier technical features**: "1M context window," "Ultra thinking" (a higher-reasoning mode), "System Prompt Edit," the ability to "create custom AI agents," and "high-performance computing," per the official pricing page — these are more developer/power-user-facing capabilities layered onto the base natural-language builder.
- **Enterprise/governance features**: Role-Based Access Control (RBAC), single sign-on (SSO), shared team workspaces, real-time co-editing, user-level credit limits, audit logs, self-hosted database support, and the ability to "deploy apps in your own cloud (VPC setup)," per the official pricing page's Enterprise tier listing.
*Source: emergent.sh homepage, "Pricing" section — https://emergent.sh*

A separate multi-agent breakdown (e.g., named "Planning Agent," "Frontend Agent," "Backend Agent," "Testing Agent," "Deployment Agent" roles) appears in third-party reviews and marketplace listings (mergeek.com, geekflare.com) but was not independently confirmed in this pass on Emergent's own current site — recorded as third-party-sourced only, not a confirmed primary-source feature breakdown, per integrity rule 1/9.

### 4.4 Pricing model
Per Emergent's own homepage pricing section (observed Sept 25, 2026):

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | 10 credits/month; core platform features; access to advanced models |
| Standard | $20/mo (or $17/mo billed annually) | 100 credits/month; private project hosting; GitHub integration; "Fork tasks"; extra credits purchasable |
| Pro | $200/mo (or $167/mo billed annually) | 750 credits/month; 1M context window; Ultra thinking; System Prompt Edit; custom AI agents; priority support |
| Enterprise (two tiers shown) | Custom | One tier lists RBAC, SSO, shared team workspaces, real-time co-editing ("Everything in Pro, plus..."); another lists user-level credit limits, audit logs, self-hosted database support, VPC deployment, usage analytics ("Everything in Business, plus...") |

*Source: emergent.sh homepage, "Pricing" section, fetched directly Sept 25, 2026 — https://emergent.sh*

**Flagged inconsistency**: The pricing cards as captured reference "Everything in Business, plus" on one Enterprise tier, but no separate "Business" plan card was captured between Pro and Enterprise on this pass — while the same page's own FAQ text separately states plans "starting at $17/month for individual builders, $167/month for power users, and $250/month for teams," implying a $250/mo "Teams"/"Business" tier that sits between Pro and Enterprise. Per integrity rule 9 (no filler), this gap is recorded plainly rather than guessing at the missing tier's exact features — the site likely has a Business/Teams plan not fully captured in this fetch.

### 4.5 Positioning history — from founding to present

**Founding (2024)**: Emergent's own Y Combinator company page states it was founded in 2024 (YC batch S24), founded by Mukund Jha and Madhav Jha, based in San Francisco.
*Source: Y Combinator (company's own YC profile) — https://www.ycombinator.com/companies/emergent/jobs*

**Founding month per founder interview**: In a TechCrunch interview, CEO Mukund Jha stated he "started Emergent with his brother Madhav Jha (CTO) in June last year" — placing the founding around June 2024 (the article's context dates this to roughly mid-2025, making "last year" 2024).
*Source: TechCrunch (third-party, direct founder quote), dated — https://techcrunch.com/?p=3142019*

**Minor conflict on "launch" date**: An official Emergent/investor press release (via BusinessWire, dated Jan 20, 2026, announcing the Series B round) describes the company's boilerplate as "Launched in 2025," which differs from the 2024 founding date given elsewhere by the company's own YC profile and founder interviews. This is likely a distinction between company founding (2024) and public product launch (2025), but no single dated source explicitly reconciles the two — flagged per integrity rule 7 rather than resolved.
*Source: BusinessWire press release (official company boilerplate), Jan 20, 2026 — https://www.rutlandherald.com/news/business/emergent-raises-70m-from-khosla-ventures-and-softbank-vision-fund-2-to-enable-anyone-to/article_f61f5df9-d4ee-5bd7-9101-a7b5a037fa40.html*

**Rapid growth and funding, tied to positioning**: Per the same Series B press release, Emergent's official company description states its mission is "to democratize who gets to build software," aiming to "enable ambitious people to move at the speed of their thought." The company reported reaching $100M ARR eight months after launch and, per founder statements reported by third-party outlets, grew revenue roughly 4x between its Series B and Series C rounds.
*Sources: BusinessWire (official press release) — cited above; Inc42, third-party — https://inc42.com/buzz/emergent-joins-unicorn-club-after-raising-130-mn-at-1-5-bn-valuation/*

**Funding rounds (third-party, dated)**:
- Series B: $70M (announced Jan 20, 2026), led by Khosla Ventures and SoftBank Vision Fund 2, with Prosus, Lightspeed, Together, and Y Combinator participating; valuation reported elsewhere as ~$300M as of that round.
- Series C: $130M (reported ~July 2026 by TechCrunch), led by Creaegis, with MNI Ventures-Claypond, Sentinel Global, and returning investors; post-money valuation $1.5B (unicorn status), bringing total funding to $230M.
*Sources: BusinessWire, Jan 20, 2026 (official press release); TechCrunch, third-party — https://techcrunch.com/?p=3142019; Inc42, third-party — https://inc42.com/buzz/emergent-joins-unicorn-club-after-raising-130-mn-at-1-5-bn-valuation/*

**No documented pivot found**: Emergent is young enough (founded 2024) that no dated source in this pass documents a positioning pivot — its "designed for everyone, from complete beginners to experienced developers" framing and its founder-stated focus on non-technical small-business builders appear consistent from founding through the most recent (Series C, ~mid-2026) press coverage found. Per integrity rule 6, recorded as "no documented pivot found."

**Thin official documentation**: Per integrity rule 9, it's worth noting plainly that Emergent's own public-facing documentation (a dedicated docs/help site exists at help.emergent.sh, not deeply explored in this pass) is less extensive than architect.new's, Lovable's, or Replit's docs, and much of the specific feature-mechanics detail available online for Emergent comes from third-party reviews and marketplace listings rather than Emergent's own docs — consistent with the research plan's expectation that Emergent would have thinner public documentation than the more established tools.

### 4.6 Sources
- emergent.sh (homepage, pricing section, FAQ) — https://emergent.sh
- emergent.sh/solutions/it-agencies, /solutions/smb-owners, /solutions/product-managers, /solutions/operations-team (site navigation, target-user pages)
- ycombinator.com/companies/emergent/jobs (company's own YC profile — founding year, batch, founders, location)
- techcrunch.com (third-party press, Series C coverage with direct founder quotes) — https://techcrunch.com/?p=3142019
- inc42.com (third-party press, Series C coverage with founder statements) — https://inc42.com/buzz/emergent-joins-unicorn-club-after-raising-130-mn-at-1-5-bn-valuation/
- BusinessWire press release (official company boilerplate, Series B announcement, Jan 20, 2026) — https://www.rutlandherald.com/news/business/emergent-raises-70m-from-khosla-ventures-and-softbank-vision-fund-2-to-enable-anyone-to/article_f61f5df9-d4ee-5bd7-9101-a7b5a037fa40.html
- mergeek.com, geekflare.com, dupple.com (third-party reviews/marketplace listings — feature detail not independently confirmed on Emergent's own site during this pass)

---

## 5. Rocket.new

### 5.1 What it is
Rocket's own docs describe the product as a three-part platform rather than just a code generator: "Rocket.new is the complete vibe solutioning platform that covers the entire software development lifecycle. Rocket combines three capabilities in one platform: Solve (AI-powered market research, idea validation, and PRDs), Build (production-ready web apps, mobile apps, SaaS, e-commerce, and landing pages), and Intelligence (continuous competitive monitoring and tracking). You can use each capability independently or chain them together for end-to-end product development."
*Source: docs.rocket.new, "Getting Started" FAQ — https://docs.rocket.new/help/faq*

The "Build" module specifically is described as: "Describe what you want, and Rocket generates a fully functional app complete with UI, navigation, logic, and production-ready code."
*Source: docs.rocket.new, "Build Overview" — https://docs.rocket.new/build/overview*

Rocket also accepts a Figma design as a starting point in addition to a text prompt — the official docs intro states: "Describe your app idea, or drop a Figma link - Rocket helps you build and ship real, production-ready apps fast."
*Source: docs.rocket.new, "Introduction" — https://docs.rocket.new/introduction*

### 5.2 Target users
No single official "who it's for" sentence was found on Rocket's current docs/site during this pass comparable to Lyzr's or Emergent's FAQ lines — this gap is recorded as "not explicitly stated" per integrity rule 2, rather than inferred.

The clearest audience signal instead comes from a direct, dated founder statement: Rocket.new co-founder and CEO Vishal Virani was interviewed on the "Success Story with Scott D. Clary" podcast under the title "The Future Of AI Software Development Belongs to Non-Coders" (published Nov 23, 2025), and told TechCrunch at the company's seed-funding announcement that Rocket is "the first vibe solution platform," positioned around solving "day two" problems (scaling and maintaining a product after the initial build) rather than just "day one" prototyping — explicitly differentiating Rocket from "viral vibe-coding rivals like Lovable, Cursor, and Bolt."
*Sources: Success Story podcast (third-party, direct founder interview), published Nov 23, 2025 — https://newsletter.scottdclary.com/p/the-future-of-ai-software-development; TechCrunch (third-party, direct founder quote), Sept 22, 2025 — https://techcrunch.com/2025/09/22/rocket-new-one-of-indias-first-vibe-coding-startups-snags-15m-from-accel-salesforce-ventures*

Third-party aggregator descriptions (futuretools.io, tooljunction.io) characterize Rocket as serving "non-technical founders, product managers, and entrepreneurs" and, separately, "solopreneurs, developers, product teams and enterprises" — these are third-party summaries, not confirmed as Lovable/Emergent-style direct company quotes during this pass, so recorded as third-party characterization only.
*Sources (third-party): futuretools.io/tools/rocket-new; tooljunction.io/ai-tools/rocket*

### 5.3 Core features
Per Rocket's own docs:
- **Prompt-to-app generation**: natural-language description generates "a fully functional app complete with UI, navigation, logic, and production-ready code." *(docs.rocket.new/build/overview)*
- **Figma-to-app**: import a Figma design (web or mobile) and Rocket converts it into a live, editable app. *(docs.rocket.new/introduction)*
- **Buildable output types**: web apps (SaaS, dashboards, internal tools, e-commerce), mobile apps (iOS/Android via Flutter, from a single codebase), and landing pages.
*Source: docs.rocket.new/build/overview*
- **"Solve" module**: AI-powered market research, idea validation, and PRD (product requirements doc) generation, positioned as a pre-build step. *(docs.rocket.new/help/faq)*
- **"Intelligence" module**: continuous competitive monitoring and tracking, with "daily, weekly, or monthly intelligence briefs." *(docs.rocket.new/getting-started/pricing)*
- **Live/real-time preview**: "Watch your app update in real time. No refresh, no waiting." *(docs.rocket.new/introduction)*
- **Code access**: "See and edit clean, export-ready code for every screen and feature." *(docs.rocket.new/introduction)*
- **Integrations**: official docs list direct connections to Figma (design sync), GitHub ("link your repo for versioning and collaboration"), Netlify ("push to production in one click"), and Supabase ("full-stack starts here: Supabase linked, backend ready").
*Source: docs.rocket.new/introduction*
- **One-click deployment**: "Go live in one click. Rocket allows you to deploy instantly - no setup required." *(docs.rocket.new/introduction)*
- **iOS app**: a native iOS app is available, though the official FAQ notes several features (Visual Edit, Commands, Figma import, code download, subscription management, API integration, screenshots, audio notifications, remix links) are web-only.
*Source: docs.rocket.new/help/faq*
- **Enterprise/sales-assisted features**: SSO, data localization, premium support, and onboarding assistance, available via a "Contact Sales" tier.
*Source: docs.rocket.new/getting-started/pricing*

### 5.4 Pricing model
Rocket's own pricing documentation shows a credit-based system, but this research pass found **two different credit/price structures on Rocket's own docs domain**, which is flagged rather than resolved per integrity rule 7:

**Structure A** (docs.rocket.new/get-started/pricing-plans — token-denominated):

| Plan | Price | Notes |
|---|---|---|
| Starter | Free | 1M one-time token credit; up to 2 Figma-to-code screens |
| Personal | $25/mo | 5M monthly tokens; up to 6 Figma-to-code screens |
| Rocket | $50/mo ($40/mo billed annually) | 10.5M tokens/mo incl. 500K bonus; up to 12 screens |
| Booster | $100/mo ($80/mo billed annually) | 22M tokens/mo incl. 2M bonus; up to 25 screens |

**Structure B** (docs.rocket.new/getting-started/pricing — credit-denominated, referencing Solve/Build/Intelligence together): Free plan with "20 one-time credits, no time limit, no credit card required"; paid plans described as covering Build, Solve, and Intelligence from one shared credit balance, with 20% off on annual billing; an Enterprise-style "Contact Sales" tier for SSO, data localization, premium support, and onboarding.

Both pages are on Rocket's own docs domain; it was not possible in this pass to confirm which reflects current live pricing versus a since-changed or legacy structure. This is recorded as an open discrepancy rather than resolved, per integrity rule 7. Separately, third-party trackers (joinsecret.com) report a "Personal $25 / Rocket $50 / Booster $100" structure matching Structure A, which appears to be the more widely corroborated version as of this research date.
*Sources: docs.rocket.new/get-started/pricing-plans; docs.rocket.new/getting-started/pricing; joinsecret.com/rocket-new/pricing (third-party, corroborating Structure A)*

### 5.5 Positioning history — from founding to present

**Origins as DhiWise, a developer-tool company (April 2021)**: Per third-party company-data sources, Rocket.new's originating company, DhiWise, was founded in Surat, Gujarat, India in April 2021 by Vishal Virani, Rahul Shingala, and Deepak Dhanak. DhiWise was, per multiple third-party sources, a "developer workflows platform" focused on enhancing developer productivity — i.e., a technical/developer-facing tool, not a non-technical builder tool.
*Sources (third-party): clay.com/dossier/dhiwise-funding; finder.techleap.nl/news/feed/rocket-new-raises-15m-for-ai-platform*

**DhiWise-era funding**: Seed ($2.5M, Jan 2022, India Quotient/Dholakia Ventures), Series A ($7M, Aug 2022, Accel/Together Fund), plus non-equity accelerator participation (Accel Atoms, Nov 2022; Google for Startups Accelerator, Dec 2023).
*Source (third-party): clay.com/dossier/dhiwise-funding*

**Major pivot — rebrand from DhiWise to Rocket.new (September 2025)**: Per TechCrunch, the company "marks a pivot from their earlier venture, DhiWise, which focused on developer workflows" to Rocket.new, launched in beta in June 2025 and publicly relaunched/rebranded around its September 2025 seed funding announcement. A separate third-party source states the rebrand "pivot[ed] to a fully AI-first model" and relocated headquarters from Surat, India to Palo Alto, California. This is a clearly documented, dated pivot from a developer-facing tool to a natural-language/non-technical-facing vibe-coding platform — satisfying integrity rule 6.
*Sources: TechCrunch, Sept 22, 2025 — https://techcrunch.com/2025/09/22/rocket-new-one-of-indias-first-vibe-coding-startups-snags-15m-from-accel-salesforce-ventures; clay.com/dossier/dhiwise-funding (third-party, rebrand/relocation detail)*

**Seed funding tied to the pivot (September 2025)**: Rocket.new raised a $15M seed round led by Salesforce Ventures, with Accel and Together Fund participating — reported as coming three months after the June 2025 beta launch, with the company at 400,000+ users (10,000+ paid) and $4.5M ARR at the time of the raise. Co-founder/CEO Vishal Virani stated a target of "$20-25 million by year's end and $60-70 million by June next year" in ARR.
*Source: TechCrunch, Sept 22, 2025 — https://techcrunch.com/2025/09/22/rocket-new-one-of-indias-first-vibe-coding-startups-snags-15m-from-accel-salesforce-ventures*

**Founder's explicit "day two" positioning (dated, Sept 2025)**: Virani told TechCrunch: "We are building the first vibe solution platform, which is not solving just a problem of day one, but what we are focusing on is solving the problem of day two" — i.e., positioning Rocket against "quick prototype"-focused rivals by emphasizing post-launch scaling and product management support (the Solve/Intelligence modules), not just initial app generation.
*Source: TechCrunch, Sept 22, 2025 — https://techcrunch.com/2025/09/22/rocket-new-one-of-indias-first-vibe-coding-startups-snags-15m-from-accel-salesforce-ventures*

**No documented pivot since the DhiWise-to-Rocket.new rebrand**: No dated source in this pass documents any further positioning shift since the September 2025 rebrand; the "vibe solutioning platform" framing (Solve + Build + Intelligence) appears consistent from the rebrand through the current (Sept 2026) docs site. Per integrity rule 6, recorded as "no documented pivot found" since the rebrand.

### 5.6 Sources
- docs.rocket.new/introduction ("Welcome to Rocket")
- docs.rocket.new/build/overview ("Build" module overview)
- docs.rocket.new/help/faq (official FAQ, incl. "What is Rocket.new?")
- docs.rocket.new/get-started/pricing-plans (pricing, Structure A)
- docs.rocket.new/getting-started/pricing (pricing, Structure B — conflicts with Structure A, flagged)
- docs.rocket.new/getting-started/credits (credit mechanics)
- techcrunch.com, Sept 22, 2025 (third-party press, seed funding + direct founder quotes on positioning/pivot) — https://techcrunch.com/2025/09/22/rocket-new-one-of-indias-first-vibe-coding-startups-snags-15m-from-accel-salesforce-ventures
- newsletter.scottdclary.com / Success Story podcast, Nov 23, 2025 (third-party, direct founder interview) — https://newsletter.scottdclary.com/p/the-future-of-ai-software-development
- clay.com/dossier/dhiwise-funding (third-party company-data aggregator — DhiWise founding, funding history, rebrand/relocation detail)
- finder.techleap.nl/news/feed/rocket-new-raises-15m-for-ai-platform (third-party, corroborating DhiWise-as-developer-tool framing)
- joinsecret.com/rocket-new/pricing (third-party pricing tracker, corroborating Structure A)
- futuretools.io/tools/rocket-new; tooljunction.io/ai-tools/rocket (third-party tool-directory descriptions — target-user characterization, not confirmed primary-source quotes)

---

## 6. v0 (Vercel)

### 6.1 What it is
Vercel's own documentation describes v0 plainly: "v0 lets you describe your ideas in natural language and generates both the code and UI for your project. Its intelligent agent can search the web, inspect websites, automatically fix errors, and integrate with external tools, helping you go from concept to working applications in minutes."
*Source: examples.vercel.com/docs/v0 (official Vercel docs), observed Sept 25, 2026 — https://examples.vercel.com/docs/v0*

Vercel's own blog/academy content is more explicit that v0 is no longer just a UI generator: "v0 is Vercel's AI coding agent. It lives in the browser, takes plain English, and gives you back a real full-stack project running on Vercel's primitives. Not a static mockup, not a sandbox toy. A deployable app."
*Source: blog.vercel.com/academy/vercel-foundations/v0-way (official Vercel blog) — https://vercel.com/academy/vercel-foundations/v0-way*

v0 is tightly integrated with Vercel's own hosting: "Creating a project in v0 automatically creates a corresponding Vercel project within your logged in scope," and deployment happens directly onto Vercel's infrastructure.
*Source: examples.vercel.com/docs/v0*

### 6.2 Target users
An official-format v0 FAQ page states directly: "Who can use v0? Anyone with an idea. v0 removes technical barriers and enables a new class of creators who build and collaborate without writing code," and lists named roles: "Founders ship MVPs quickly and iterate with speed. Product managers prototype without waiting on design queues. Designers test real interactions early. Engineers skip boilerplate code and develop faster. Sales engineers produce custom demos instantly. Marketers..."
*Source: v0 product FAQ, observed via a v0.build-hosted page — https://b_6silkn2hzxb.v0.build/faq (note: this page is hosted on v0's own app-deployment subdomain rather than the primary vercel.com/v0.app domain; treated as likely-official product FAQ content but flagged for the unusual hosting path)*

This role list — explicitly including both non-technical roles (Founders, Marketers) and technical ones (Engineers, Sales Engineers) — mirrors the dual-audience pattern seen at Replit, rather than the single-audience framing at architect.new.

Third-party coverage corroborates this framing: a SaaStr review describes v0 as letting "anyone, from engineers to marketers to PMs, describe what they want in plain English and get production-ready websites in minutes," and separately notes that "v0 Teams and Enterprise accounts now represent more than 50% of v0's revenue" — indicating substantial usage beyond individual/non-technical builders.
*Source: SaaStr (third-party) — https://www.saastr.com/saastr-ai-app-of-the-week-v0-by-vercel-the-vibe-coding-tool-that-4-million-people-use-to-ship-real-software-not-just-demos*

### 6.3 Core features
Per Vercel's own docs and blog:
- **Prompt-to-app generation**: text description, screenshots, mockups, or imported Figma designs all convert into working code. *(v0 FAQ, cited above)*
- **Model choice**: a model picker lets users choose "v0 Max" (most capable), "v0 Mini" (lighter/faster, less powerful), or "Auto" (automatic model selection based on the prompt).
*Source: blog.vercel.com/academy/vercel-foundations/v0-way*
- **Full-stack generation**: v0 "sets up the sandbox, scaffolding, routing, and framework," not just a UI component, per Vercel's own walkthrough.
- **Design Mode, code editing, and design-system application**: users can "add features, adjust visuals in Design Mode, edit code, or apply your design system for consistent branding." *(v0 FAQ)*
- **Integrations**: first-party connectors for databases (Neon, Supabase), payments (Stripe), and MCP (Model Context Protocol) servers for external tools like Contentful, Hex, or Linear.
*Source: blog.vercel.com/academy/vercel-foundations/v0-way*
- **GitHub integration**: official FAQ states v0 supports connecting databases, AI models, external APIs, "and GitHub to build full data-driven applications," and a "VS Code-style editor" with "Git integration" was introduced in a Feb 2026 update ("The new v0").
*Sources: v0 FAQ; Product Hunt launch data (official product listing) — https://www.producthunt.com/products/v0/launches/the-new-v0*
- **One-click deploy to Vercel**: "Publish with one click on Vercel, add domains, and share with your team." *(v0 FAQ)*
- **Versioned iterations**: "Iterations are versioned. Roll back to any earlier version without losing later work." *(blog.vercel.com/academy)*
- **Team/collaboration features**: "Collaborate in shared workspaces with permissions, security controls, and usage insights." *(v0 FAQ)*
- **Embeddability**: v0 can be used inside other dev environments via integrations with Cline, Cursor, and Zed, or through "the v0 Model API." *(v0 FAQ)*
- **Native iOS app**: launched Oct 27, 2025 ("v0 for iOS — Build anything with AI"), per Product Hunt's official launch listing for v0.
*Source: Product Hunt (official product listing) — https://www.producthunt.com/products/v0/launches/v0-dev-by-vercel*
- **Design Systems 2.0**: "Build with your components, colors, fonts, and patterns" — launched June 30, 2026, per the same official Product Hunt listing.

### 6.4 Pricing model
Per Vercel's own pricing documentation (mirrored consistently across multiple v0-hosted docs pages, and corroborated by Vercel's official pricing-change blog post):

| Plan | Price | Notes |
|---|---|---|
| Free | $0/mo | $5 in included monthly credits; 200 projects |
| Premium | $20/mo | $20 in included monthly credits; unlimited projects. **Flagged**: at least one current docs snapshot states "The Premium plan is in the process of being sunsetted and is no longer available to new users" — recorded as observed, not resolved, since this wasn't consistent across every snapshot found |
| Team | $30/user/mo | $30 in included credits per user; shared projects/credits; basic access controls; centralized billing |
| Business | $100/user/mo | $30 in included credits per user; same collaboration features as Team, positioned for "privacy conscious teams" |
| Enterprise | Custom | Advanced (RBAC) access controls; additional security for large companies |

*Sources: Vercel official blog, "Updated v0 pricing," published May 13, 2025 — https://vercel.com/blog/improved-v0-pricing; v0 docs pricing page (mirrored across multiple v0.build-hosted instances), observed Sept 25, 2026*

Credits are metered by input/output tokens rather than fixed message counts, per Vercel's own May 2025 pricing-change announcement: "Usage is now metered on input and output tokens which convert to credits, instead of fixed message counts."
*Source: vercel.com/blog/improved-v0-pricing*

### 6.5 Positioning history — from founding to present

**Vercel's founding (2015, as Zeit)**: Vercel was founded in 2015 by Guillermo Rauch as "Zeit" (styled "ZEIT Now"), a deployment platform, and rebranded to Vercel in 2020. This is well-corroborated across third-party sources.
*Source (third-party): taskade.com/blog/vercel-v0-history*

**v0's original, narrow launch (September 2023)**: Per Product Hunt's own official launch-date listing for the v0 product, the first version — "v0.dev by Vercel" — launched September 14, 2023, described at the time as: "Generate UI with simple text prompts: copy, paste, ship." This matches third-party characterizations of early v0 as a narrow UI/component generator (React + Tailwind CSS output) rather than a full application builder.
*Source: Product Hunt (official product listing, dated launch entries) — https://www.producthunt.com/products/v0/launches/v0-dev-by-vercel*

**Major pivot — rebrand to "v0.app," explicitly broadened audience (August 2025)**: The same official Product Hunt listing shows a dated relaunch: "v0.app by Vercel" launched August 12, 2025, with the tagline "The AI builder for everyone." This is a direct, dated, officially-listed repositioning from a developer-facing UI-code tool ("copy, paste, ship" in 2023) to an explicitly broad, non-technical-inclusive framing ("for everyone" in 2025) — satisfying integrity rule 6 as a documented pivot.
*Source: Product Hunt (official product listing) — https://www.producthunt.com/products/v0/launches/the-new-v0*

**Continued full-stack/developer-tooling expansion after the broadening (late 2025–2026)**: Per the same official launch timeline, subsequent releases added more developer-facing capability rather than only simplifying further: "v0 for iOS" (Oct 27, 2025), "The new v0" — "VS Code-style editor, Git integration, and improved previews" (Feb 5, 2026), and "v0 Design Systems 2.0" — "Build with your components, colors, fonts, and patterns" (June 30, 2026). This indicates v0's post-2025 trajectory broadened its non-technical accessibility while simultaneously adding more powerful developer/IDE-style tooling — a dual-direction expansion comparable to Replit's pattern, rather than a narrowing to one audience.
*Source: Product Hunt (official product listing, dated launch entries) — https://www.producthunt.com/products/v0/launches/the-new-v0*

**Scale and revenue mix (third-party, dated)**: A SaaStr review states v0 has been "used by over 4 million people" and that "v0 Teams and Enterprise accounts now represent more than 50% of v0's revenue" — third-party reporting, not independently verified against Vercel's own disclosures in this pass, but included as a dated claim about the current audience/revenue mix.
*Source: SaaStr (third-party) — https://www.saastr.com/saastr-ai-app-of-the-week-v0-by-vercel-the-vibe-coding-tool-that-4-million-people-use-to-ship-real-software-not-just-demos*

**No documented pivot away from the "for everyone" framing found**: Despite the added developer-facing tooling in 2026, no dated source in this pass documents v0 narrowing back toward a developer-only audience; the "for everyone" positioning from the August 2025 relaunch appears to persist alongside the added technical depth. Per integrity rule 6, recorded as "no documented pivot found" in that direction.

### 6.6 Sources
- examples.vercel.com/docs/v0 (official Vercel docs)
- blog.vercel.com/academy/vercel-foundations/v0-way (official Vercel blog/academy)
- vercel.com/blog/improved-v0-pricing (official Vercel blog, pricing change announcement, May 13, 2025)
- v0 product FAQ, hosted at a v0.build subdomain (likely-official content, flagged for unusual hosting path) — https://b_6silkn2hzxb.v0.build/faq
- v0 docs pricing page, mirrored across multiple v0.build-hosted instances (consistent content, treated as corroborating the official pricing-change blog post)
- Product Hunt, official v0 product listing with dated launch history — https://www.producthunt.com/products/v0/launches/v0-dev-by-vercel; https://www.producthunt.com/products/v0/launches/the-new-v0
- saastr.com (third-party review/analysis, usage figures and revenue-mix claim) — https://www.saastr.com/saastr-ai-app-of-the-week-v0-by-vercel-the-vibe-coding-tool-that-4-million-people-use-to-ship-real-software-not-just-demos
- taskade.com/blog/vercel-v0-history (third-party, Vercel/Zeit founding history)

---

## 7. Cursor

### 7.1 What it is
Cursor's own homepage headline states plainly: "Cursor is your coding agent for building ambitious software," with agents that "turn ideas into code" as users "hand off tasks to Cursor, while you focus on making decisions."
*Source: cursor.com homepage, observed Sept 25, 2026 — https://cursor.com*

Cursor is built as a fork of Visual Studio Code with AI woven throughout, rather than a browser-based or from-scratch app builder — the product ships as a downloadable desktop application, a CLI, and integrations into tools developers already use (terminal, Slack, GitHub PR review). The homepage states it "runs in your terminal, collaborates in Slack, and reviews PRs in GitHub."
*Source: cursor.com homepage*

### 7.2 Target users
Unlike every other tool covered so far, Cursor's own homepage carries no "non-technical," "no code," or "anyone can build" language anywhere. Every customer testimonial quoted on the homepage is from a technical/engineering leader speaking about engineers: NVIDIA CEO Jensen Huang ("Every one of our engineers, some 40,000, are now assisted by AI"); Stripe co-founder/CEO Patrick Collison ("Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees"); OpenAI President Greg Brockman; Eureka Labs CEO Andrej Karpathy; and shadcn/ui's creator. The homepage also states Cursor is "Trusted by over half of the Fortune 500 to accelerate development, securely and at scale."
*Source: cursor.com homepage*

This is a clean contrast with every "vibe coding" tool covered earlier in this research (architect.new, Lovable, Emergent, Rocket.new, and even the more technical-leaning Replit and v0): Cursor's own materials do not claim to serve non-technical users at all — it is positioned exclusively as a professional developer/engineering-team tool.

### 7.3 Core features
Per Cursor's own homepage and product pages:
- **Agent mode**: autonomous agents that "use their own computers to build, test, and demo features end to end for you to review," working "autonomously" and "in parallel."
- **Model choice**: users can select from "every cutting-edge model from OpenAI, Anthropic, Gemini, SpaceXAI, and Cursor" (including an "Auto" suggested-model option), or use Cursor's own trained models.
- **Cloud agents**: "Launch fleets of agents that work in parallel on ambitious tasks for hours or days."
- **CLI**: a terminal-based agent (`cursor-agent`), installable via a one-line curl command.
- **Automations**: "always-on agents that run on schedules or triggers to build, maintain, and fix your software."
- **Integrations across the workflow**: Slack (agents respond to requests and open PRs directly from a Slack channel), GitHub (PR review via "Bugbot"/code review), and an extension/plugin "Marketplace."
- **Codebase-wide understanding**: indexes an entire codebase (not just the open file) for context-aware suggestions and multi-file edits, including a "Tab" feature that predicts the user's next edit location, per third-party technical analysis.
*Source (third-party technical explainer, consistent with official positioning): aiunderstanding.org/learn/cursor-and-anysphere*
- **Enterprise/security features**: SOC 2, ISO 27001, ISO 42001, and "AIUC-1" certifications are displayed directly on the homepage footer.
*Source: cursor.com homepage*

No GitHub-import/one-click-deploy-to-a-hosted-URL flow comparable to the vibe-coding tools was found on Cursor's own site during this pass — consistent with Cursor's positioning as a code editor/agent for existing developer workflows (working against a real repo, typically deployed by whatever pipeline the team already uses) rather than a hosted app-builder-and-deployer.

### 7.4 Pricing model
Cursor's own pricing page (cursor.com/pricing) could not be directly fetched during this research pass; the figures below are corroborated consistently across multiple independent third-party pricing trackers (dated May–August 2026), which agree closely with each other:

| Plan | Price | Notes |
|---|---|---|
| Hobby | Free | Limited completions (~2,000) and a capped number of "slow premium requests" (~50/mo); limited model access |
| Pro | $20/mo | ~$20 credit pool (usage-based, varies by model); unlimited tab completions in most configurations |
| Pro+ | $60/mo | ~3x Pro's usage credits; broader model access |
| Ultra | $200/mo | ~20x Pro's usage credits; priority access; early features |
| Business (Teams) | $40/user/mo | All Pro features plus SSO, admin dashboard, usage visibility, centralized billing |
| Enterprise | Custom | Custom limits, SLA, compliance, dedicated support |

*Sources (third-party, cross-corroborating): jetadmin.io, morphllm.com, costbench.com, toolradar.com — all independently reporting the same Hobby/Pro $20/Pro+ $60/Ultra $200/Business $40-per-user/Enterprise-custom structure as of mid-2026*

Multiple sources note Cursor moved from a flat/predictable "fast requests" pricing model to a usage-based credit-pool model in June 2025, which drew some user pushback over less predictable costs.
*Source (third-party): jetadmin.io/blog/cursor-pricing-explained-plans-credit-system-and-real-costs-in-2026*

### 7.5 Positioning history — from founding to present

**Founding (2022)**: Cursor's developer, Anysphere, was founded in 2022 in San Francisco by four MIT graduates: Michael Truell (CEO), Sualeh Asif, Arvid Lunnemark, and Aman Sanger. Per Wikipedia, Cursor is a fork of Visual Studio Code with added AI features.
*Source: Wikipedia, "Cursor (code editor)" — https://en.wikipedia.org/wiki/Cursor_(code_editor); corroborated by multiple third-party sources (aiunderstanding.org, neuronfeed.com)*

**Early funding (2023)**: Anysphere's first funding round, led by the OpenAI Startup Fund, raised $8M, bringing total investment to $11M shortly after.
*Source (third-party): test.kureansiklopedi.com/en/detay/anysphere-385e8, citing Crunchbase/TechCrunch*

**Consistent developer-only positioning throughout**: Unlike architect.new, Lovable, Rocket.new, Replit, or v0, no dated source found in this pass documents Cursor ever pivoting toward a "no-code" or non-technical-user framing. Its positioning as a professional developer/engineering tool, per the sources above, appears consistent from founding through the current (Sept 2026) homepage.

**Rapid enterprise growth (2025–2026, third-party figures)**: Third-party reporting states Cursor's annual recurring revenue grew from roughly $100M in January 2025 to over $2B by early-to-mid 2026, with the company reporting roughly $2.6B in annualized B2B revenue by mid-2026 — figures reported via Reuters/TechCrunch/CNBC coverage of the acquisition described below, not confirmed directly on Cursor's own site during this pass.
*Sources (third-party): datanorth.ai/news/spacex-acquires-cursor-maker-anysphere; letsdatascience.com/news/spacex-acquires-cursor-in-60-billion-deal-b8ddd33d*

**Major ownership event — acquisition by SpaceX (2026)**: This is the most significant dated event found for any tool in this research pass. Per Wikipedia and extensive third-party press coverage: in early 2026, Cursor was reportedly in talks to raise ~$5B at a $50–60B valuation; on April 21, 2026, SpaceX announced a deal giving it the right to acquire Anysphere for $60B later in the year, or pay $10B for a partnership; on June 16, 2026, SpaceX announced it was exercising the purchase option in an all-stock deal; the acquisition closed on August 14, 2026, making Anysphere a wholly owned subsidiary of SpaceX. Cursor's own blog published a post titled "Cursor is now a part of SpaceX" on Aug 14, 2026, confirming the closing from the company's own side.
*Sources: Wikipedia, "Cursor (company)" — https://en.wikipedia.org/wiki/Cursor_(company); Cursor's own blog (referenced in cursor.com homepage's "Recent highlights" list, "Aug 14, 2026 · Company · Cursor is now a part of SpaceX") — https://cursor.com/blog/joining-spacex; Reuters/TechCrunch/CNBC coverage aggregated by letsdatascience.com — https://letsdatascience.com/news/spacex-acquires-cursor-owner-anysphere-for-60-billion-b9e1f403*

**Strategic context for the acquisition**: SpaceX merged with xAI (maker of Grok) in February 2026, finalized May 6, 2026; third-party press frames the Cursor acquisition as xAI's move to gain "a stronger position in the AI coding market" and to give Cursor "access to more computing power," including xAI's Colossus supercluster.
*Source (third-party): techzine.eu/news/devops/142197/spacex-acquires-cursor-for-60-billion/*

**Visible product effect of the acquisition (as observed today)**: Cursor's current homepage (observed Sept 25, 2026) prominently features "Grok 4.7" as a suggested/default model choice and lists "SpaceXAI" among the model providers offered ("OpenAI, Anthropic, Gemini, SpaceXAI, and Cursor"), and a dedicated "Grok Bot" product link appears in the site's top navigation — consistent with closer integration between Cursor and xAI's models following the acquisition, though Cursor continues to also offer models from OpenAI, Anthropic, and Google.
*Source: cursor.com homepage, observed Sept 25, 2026*

**No pivot toward non-technical users found, even after the acquisition**: Despite this major ownership change, no dated source in this pass indicates any shift in Cursor's target audience — the product remains positioned exclusively for professional developers and engineering teams.

### 7.6 Sources
- cursor.com (homepage), observed Sept 25, 2026 — https://cursor.com
- en.wikipedia.org/wiki/Cursor_(code_editor) (third-party, founding/product facts)
- en.wikipedia.org/wiki/Cursor_(company) (third-party, funding and SpaceX acquisition timeline)
- test.kureansiklopedi.com/en/detay/anysphere-385e8 (third-party, early funding detail)
- aiunderstanding.org/learn/cursor-and-anysphere (third-party technical explainer)
- techzine.eu/news/devops/142197/spacex-acquires-cursor-for-60-billion (third-party press)
- datanorth.ai/news/spacex-acquires-cursor-maker-anysphere (third-party press)
- letsdatascience.com (third-party press, two articles on the SpaceX acquisition, deal terms and revenue figures)
- hirunews.lk, businessday.ng, fireup.pro (third-party press, corroborating acquisition timeline and closing date)
- jetadmin.io, morphllm.com, costbench.com, toolradar.com (third-party pricing trackers, cross-corroborating pricing structure as of mid-2026)

---

## 8. Codex (OpenAI)

### 8.1 What it is
OpenAI's own developer documentation states plainly: "Codex is OpenAI's coding agent for software development. ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex." The page's tagline is "One agent for everywhere you code."
*Source: developers.openai.com/codex (official OpenAI developer docs), observed Sept 25, 2026 — https://developers.openai.com/codex*

Per the same official page, Codex helps with: "Write code" (generating code matching a described intent and existing project conventions), "Understand unfamiliar codebases," "Review code" (identifying bugs, logic errors, unhandled edge cases), "Debug and fix problems," and "Automate development tasks" (refactoring, testing, migrations, setup tasks).
*Source: developers.openai.com/codex*

Codex ships across several surfaces per OpenAI's own docs navigation: a desktop "App," an "IDE Extension," a "CLI," and a cloud/"Web" version, plus integrations with GitHub, Slack, and Linear.
*Source: developers.openai.com/codex (site navigation)*

### 8.2 Target users
OpenAI's own Codex documentation uses exclusively professional-developer framing throughout — "existing project structure and conventions," "legacy code," "refactoring, testing, migrations" — with no "non-technical," "no code," or "anyone can build" language found on the official Codex docs during this pass.

Third-party coverage of Codex's 2025 relaunch corroborates this: Ars Technica described it as "meant to allow experienced developers to delegate rote and relatively simple programming tasks to an AI agent," and other outlets described it as designed for "professional software development."
*Sources (third-party): tagteam.harvard.edu (reproducing Ars Technica) — https://tagteam.harvard.edu/hub_feeds/3382/feed_items/13810369/content; digitalpakistan.pk — https://digitalpakistan.pk/openai-unveils-codex-ai-revolution-in-coding/*

Like Cursor, Codex is positioned exclusively as a professional developer tool — it does not carry the non-technical/"anyone can build" framing found at architect.new, Lovable, Emergent, Rocket.new, or (for at least part of their audience) Replit and v0.

### 8.3 Core features
Per OpenAI's own docs:
- **Multi-surface access**: desktop app, IDE extension, CLI, and cloud/web-based execution — the same agent usable "everywhere you code," per the page's own tagline.
- **Cloud sandboxed execution**: per OpenAI's official system-card addendum, "Each agent runs in its own cloud container with no internet access. The container is preloaded with the user's code and a development environment defined by the user... After setup, internet access is disabled."
*Source: OpenAI official system card addendum, May 16, 2025 — https://openai.com/index/o3-o4-mini-codex-system-card-addendum*
- **GitHub integration**: official docs list a dedicated GitHub integration page; per earlier third-party coverage of the initial launch, "By connecting with GitHub, Codex's environment can come preloaded with your code repositories."
*Sources: developers.openai.com/codex/integrations/github; oodaloop.com (third-party) — https://oodaloop.com/briefs/technology/openai-launches-codex-an-ai-coding-agent-in-chatgpt*
- **Slack and Linear integrations**: listed as official integrations alongside GitHub.
- **Parallel task handling**: per OpenAI's own initial announcement (reported by third-party press), Codex "can handle multiple software engineering tasks simultaneously" and does not block the user from their computer/browser while running.
*Source (third-party, reporting OpenAI's own statement): oodaloop.com*
- **AGENTS.md customization**: a repo-level file that lets teams teach the agent project-specific conventions (custom test runners, code style, CI flags) — analogous to Cursor's `.cursorrules`.
*Source (third-party, describing an official feature): handyai.substack.com/p/openais-coding-agent-is-here*
- **Automations**: per official docs navigation, scheduled/triggered automation workflows are supported within the Codex App.
- **Security features**: a dedicated "Codex Security" product line is listed in official docs, including a security-scanning plugin and cloud-based threat modeling.
*Source: developers.openai.com/codex (site navigation, "Codex Security")*
- **Enterprise administration**: official docs list SCIM, EKM (Enterprise Key Management), user analytics, domain verification, and role-based access control (RBAC) as Enterprise-tier features.
*Source: developers.openai.com/codex/pricing*

### 8.4 Pricing model
Codex is not sold as a standalone subscription — it is bundled into ChatGPT plans. Per OpenAI's own official pricing docs (developers.openai.com/codex/pricing) and its Help Center article:

| Plan | Notes (per official docs) |
|---|---|
| Free / Go / Plus | Codex included, with usage limits varying by plan; Plus ($20/mo, per third-party corroboration) is described elsewhere by OpenAI as "the default for most developers" |
| Pro | Includes "Access to GPT-5.3-Codex-Spark (research preview)" and "5x or 20x more Codex usage than Plus" depending on the specific Pro tier chosen; a time-limited promotion doubled usage on the $100/mo tier through May 31, 2026 |
| Business | Pay-as-you-go via API key or seat-based Business plan; "no training on your business data by default" |
| Enterprise & Edu | Custom; "everything in Business" plus priority request processing, SCIM, EKM, user analytics, domain verification, RBAC, and audit logs/usage monitoring via a Compliance API |

*Source: developers.openai.com/codex/pricing, official OpenAI docs, observed Sept 25, 2026*

Third-party press corroborates specific dollar figures and a pricing-structure change: OpenAI introduced a $100/month "Pro" tier on April 9, 2026 (splitting what had been a single $200/month Pro plan into "Pro 5x" at $100/mo and "Pro 20x" at $200/mo), explicitly positioned to undercut Anthropic's and Google's higher-priced coding-focused tiers. An OpenAI spokesperson told TechCrunch: "Compared with Claude Code, Codex delivers more coding capacity per dollar across paid tiers, with the difference showing up most clearly during active coding use."
*Source (third-party, with direct OpenAI spokesperson quote): TechCrunch, April 9, 2026 — https://techcrunch.com/2026/04/09/chatgpt-pro-plan-100-month-codex; the-decoder.com (third-party) — https://the-decoder.com/openai-halves-its-pro-price-to-100-for-heavy-codex-users-undercuts-anthropic-and-google/*

Separately, third-party sources note Codex API/token-based pricing changed in April 2026 to bill more directly by token usage for API-key access.
*Source (third-party): cloudzero.com/blog/openai-codex-pricing*

### 8.5 Positioning history — from founding to present

**A name reused for a completely different product — this is the central positioning-history fact for Codex.** OpenAI's own blog post from August 10, 2021 (still live, with dated update annotations added later) describes the original "OpenAI Codex" as "an improved version of OpenAI Codex, our AI system that translates natural language to code," released "through our API in private beta." That original Codex was, per the same post, "the model that powers GitHub Copilot," built and launched "in partnership with GitHub" about a month earlier (i.e., ~June 2021).
*Source: OpenAI official blog, Aug 10, 2021 (with later dated update banners) — https://openai.com/blog/openai-codex*

**Original Codex deprecated (March 2023)**: The same official OpenAI blog post carries a banner: "The OpenAI Codex models were deprecated in March 2023. To learn about our latest coding models, please visit our docs." This is OpenAI's own, direct, dated confirmation that the original Codex product line was fully retired.
*Source: OpenAI official blog — https://openai.com/blog/openai-codex*

**The name's return, in two stages (April–May 2025)**: The same official blog post's update banners state: "Update on April 16, 2025: We launched Codex CLI, our new open source local coding agent," and "Update on May 16, 2025: We launched Codex, a cloud-based software engineering agent that can work on many tasks in parallel." This is OpenAI directly, on its own original 2021 post, documenting that it reused the "Codex" name in 2025 for an unrelated, newly-built agentic product — not a continuation or v2 of the original 2021 Codex model. Per integrity rule 6, this is a clearly documented, dated event, though it is better described as a name relaunch on a new product than a "pivot" of the same product's positioning.
*Source: OpenAI official blog — https://openai.com/blog/openai-codex*

**Initial 2025 Codex agent launch and access tiers**: The May 16, 2025 relaunch was announced as a "research preview," rolling out first to ChatGPT Pro, Enterprise, and Team subscribers, with Plus and Edu support "coming soon," per third-party reporting of OpenAI's own announcement.
*Source (third-party, reporting OpenAI's announcement): yourstory.com, May 2025 — https://yourstory.com/2025/05/open-ai-launches-ai-coding-agent-codex*

**Growth and broadened access (2025–2026)**: Per a third-party aggregator citing usage figures, "By March 2026, Codex had grown to more than 2 million weekly active users," and OpenAI was "positioning it as a broader enterprise agent platform that could eventually be used for tasks beyond" pure coding — a claim attributed to unspecified sourcing and not independently confirmed against an OpenAI statement in this pass.
*Source (third-party, sourcing unclear): lists.norml.org/wlg/what-is-codex-agent.html*

**Pricing restructure (April 2026)**: As detailed in section 8.4, OpenAI split its Pro tier and introduced a $100/mo option specifically to support heavier Codex usage, explicitly framed by an OpenAI spokesperson as a competitive move against Anthropic's Claude Code and Google's offerings.
*Source (third-party, with direct OpenAI spokesperson quote): TechCrunch, April 9, 2026*

**No pivot toward non-technical users found**: Like Cursor, no dated source in this pass documents Codex ever adopting "no-code"/non-technical-user framing; its positioning as a professional developer tool has been consistent since the 2025 relaunch through the current (Sept 2026) official docs.

### 8.6 Sources
- developers.openai.com/codex (official OpenAI developer docs), observed Sept 25, 2026 — https://developers.openai.com/codex
- developers.openai.com/codex/pricing (official OpenAI pricing docs)
- openai.com/blog/openai-codex (official OpenAI blog, original Aug 10, 2021 post with dated update banners through 2025) — https://openai.com/blog/openai-codex
- openai.com/index/o3-o4-mini-codex-system-card-addendum (official OpenAI system card, May 16, 2025)
- help-lb.openai.com/en/articles/11369540 (official OpenAI Help Center article)
- techcrunch.com, April 9, 2026 (third-party press, with direct OpenAI spokesperson quote on pricing) — https://techcrunch.com/2026/04/09/chatgpt-pro-plan-100-month-codex
- the-decoder.com (third-party press, pricing change coverage)
- yourstory.com, May 2025 (third-party, reporting OpenAI's launch announcement)
- oodaloop.com, tagteam.harvard.edu/Ars Technica, digitalpakistan.pk (third-party press, initial 2025 launch coverage)
- handyai.substack.com (third-party, feature detail on AGENTS.md)
- cloudzero.com/blog/openai-codex-pricing (third-party, pricing/token-billing detail)
- lists.norml.org (third-party aggregator, usage-growth figure — sourcing unclear, flagged)
- codex.danielvaughan.com; kunalganglani.com (third-party retrospectives, corroborating the 2021→2023→2025 Codex naming history)

---

## 9. Claude Code (Anthropic)

*Per the project's integrity instructions, facts about Claude Code are checked against Anthropic's current official documentation rather than drawn from general knowledge, since product details change over time.*

### 9.1 What it is
Anthropic's own official documentation states plainly: "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."
*Source: code.claude.com/docs (official Claude Code docs, consistent across localized versions), observed Sept 25, 2026 — https://code.claude.com/docs/en/overview*

Anthropic's own Claude Code glossary distinguishes the tool from the underlying model: "It is not a model... Claude Code is the harness; Claude is the model inside it. The harness supplies file access, shell execution, permission gating, memory loading, and the loop that chains actions together." The same glossary defines "agentic coding" as "a workflow where the AI can read files, run commands, and make changes autonomously while you watch, redirect, or step away, as opposed to chat-based assistants that only respond with text you must apply yourself."
*Source: code.claude.com/docs/en/glossary (official) — https://code.claude.com/docs/en/glossary*

### 9.2 Target users
Like Cursor and Codex, Claude Code's own documentation is written exclusively in professional-developer terms — codebases, git commits, permission gating over file writes and shell commands, IDE integrations — with no "non-technical" or "no-code" framing found in official docs during this pass. The official glossary itself assumes a developer audience throughout (e.g., defining terms like "subagents," "hooks," and "MCP" without any simplification aimed at non-engineers).
*Source: code.claude.com/docs/en/glossary*

This places Claude Code, alongside Cursor and Codex, in the "developer-only" category of this research set — contrasted with architect.new, Lovable, Emergent, and Rocket.new (non-technical-facing), and Replit/v0 (explicitly dual-audience).

### 9.3 Core features
Per Anthropic's official docs:
- **Agentic loop**: "the cycle Claude works through for every task: gather context, take action, verify results, and repeat until done... You can interrupt the loop at any point to redirect."
- **CLAUDE.md**: a markdown file added to a project root that Claude Code reads at the start of every session, used to set coding standards, architecture decisions, preferred libraries, and review checklists.
- **Auto memory**: Claude Code builds memory automatically while working, saving learnings such as build commands and debugging insights across sessions.
- **Skills**: packaged, repeatable workflows a team can share (e.g., `/review-pr`, `/deploy-staging`).
- **Hooks**: shell commands that run before or after Claude Code actions (e.g., auto-formatting after every file edit, or running lint before a commit).
- **Subagents and agent teams**: Claude Code can spawn multiple agents to work on different parts of a task in parallel; a "lead" agent coordinates work, assigns subtasks, and merges results. "Agent teams" (multiple independent sessions with a shared task list and peer-to-peer messaging) are noted as an experimental feature requiring an explicit environment-variable opt-in.
- **Agent SDK**: lets developers build fully custom agents powered by Claude Code's own tools and features, with full control over orchestration, tool access, and permissions.
- **MCP (Model Context Protocol) support**: SSE and HTTP transports for MCP servers, OAuth 2.0 authentication via `/mcp`, and inline resource references.
- **Multi-surface availability**: terminal, IDE (VS Code/JetBrains integrations), desktop app, and browser.
- **Artifacts**: "a live, interactive web page Claude Code publishes from your session to a private URL on claude.ai, so you can see output visually or share it inside your organization instead of reading terminal text."
*Source: code.claude.com/docs/en/glossary; code.claude.com/docs (overview, features-overview pages)*

Per Anthropic's own release notes, GitHub/GitLab-related workflow support (git commits, pull requests) and enterprise platform connections (Amazon Bedrock, Google Cloud Vertex AI) are also part of the product, consistent with its developer-tool positioning.
*Source: docs.anthropic.com/en/release-notes/claude-code (official)*

### 9.4 Pricing model
Claude Code is not sold as a standalone product — like Codex, it draws on the usage included with a paid Claude plan. Per Anthropic's own official pricing page (claude.com/pricing) and homepage (claude.com), observed Sept 25, 2026:

| Plan | Price | Claude Code notes |
|---|---|---|
| Free | $0 | Claude Code is not included on Free |
| Pro | $17/mo billed annually ($200 upfront), or $20/mo billed monthly | "Everything in Free, plus: More usage, Claude Code, Cowork..." — Claude Code included |
| Max | From $100/mo | "5–20x more usage than Pro... Recommended for Claude Code & Cowork" |
| Team | Standard and Premium seat tiers (third-party trackers report Standard ~$25/seat and Premium ~$100–125/seat, not independently confirmed at exact figures on Anthropic's own page during this pass) | Official page states Team includes "Claude Code and Cowork" |
| Enterprise | Custom | Official page states: "Claude Code available with premium seat," alongside SCIM, audit logs, a Compliance API, custom data retention, and network-level access controls |

*Source: claude.com and claude.com/pricing (official Anthropic site), observed Sept 25, 2026 — https://claude.com/; https://claude.com/pricing*

The exact Team-tier per-seat dollar figures are corroborated consistently across several third-party pricing guides (~$25/seat Standard, ~$100–125/seat Premium) but were not independently confirmed at that exact figure directly on Anthropic's own page during this research pass — recorded per integrity rule 3 as third-party-sourced for the precise numbers, official for the tier structure and inclusion of Claude Code.
*Sources (third-party, corroborating exact seat prices): ai.zenken.co.jp/en/post/claude-code-pricing; blogs.novita.ai/claude-code-price; seawork.ai/en/blogs/claude-code-pricing-guide*

### 9.5 Positioning history — from founding to present

**Launch as a research preview (February 24, 2025)**: Anthropic's own official release notes state: "February 24th, 2025 — Claude Code, the agentic command line tool, is now officially available in research preview."
*Source: docs.anthropic.com/en/release-notes/claude-code (official) — https://docs.anthropic.com/en/release-notes/claude-code*

**General availability (May 22, 2025)**: The same official release notes state: "May 22nd, 2025 — Claude Code is now generally available (GA)!" Third-party coverage notes this coincided with the addition of IDE integrations (e.g., VS Code), which broadened the tool beyond a pure command-line experience.
*Sources: docs.anthropic.com/en/release-notes/claude-code (official); dev.classmethod.jp (third-party) — https://dev.classmethod.jp/en/articles/get-started-claude-code-1-th*

**Access broadened to the Pro plan (June 4, 2025)**: Official release notes state: "June 4, 2025 — You can now access Claude Code with both the Pro and Max plans." Per third-party commentary, Claude Code was originally available only on the higher-priced Max plan, and this change "led to an apparent expansion in the user base" by making it accessible at the lower Pro price point.
*Sources: docs.anthropic.com/en/release-notes/claude-code (official); dev.classmethod.jp (third-party)*

**Continued capability expansion (mid-to-late 2025)**: Per the same official release notes: TypeScript and Python SDKs released June 11, 2025; SSE/HTTP transport support and OAuth 2.0 authentication for MCP servers added June 18, 2025; hooks support added June 30, 2025. Later capabilities documented in the current official glossary — subagents, agent teams, Skills, and Artifacts publishing to claude.ai — represent continued, incremental feature expansion rather than a documented audience or positioning pivot.
*Source: docs.anthropic.com/en/release-notes/claude-code (official); code.claude.com/docs/en/glossary (official)*

**Rapid revenue growth (official, dated)**: Anthropic's own statement, made when announcing a $30 billion Series G funding round (reported Feb 12, 2026), states: "Claude Code was made available to the general public in May 2025. Today, Claude Code's run-rate revenue has grown to over $2.5 billion; this figure has more than doubled since the beginning of 2026. The number of weekly active Claude Code users has also doubled since January 1 [six weeks earlier]." This is a direct, dated, official Anthropic statement (not third-party estimation) on Claude Code's scale as of the funding announcement.
*Source: Anthropic (quoted directly, via Simon Willison's blog reproducing the announcement) — https://simonwillison.net/2026/Feb/12/anthropic/*

**No documented pivot toward non-technical users found**: Consistent with Cursor and Codex, no dated source in this pass documents Claude Code adopting any "no-code" or non-technical-audience framing; its positioning as a professional developer tool has been consistent from the February 2025 research preview through the current (Sept 2026) official docs, even as its feature set (subagents, agent teams, Artifacts, Cowork integration) has expanded substantially.

### 9.6 Sources
- code.claude.com/docs/en/overview (official Claude Code docs), observed Sept 25, 2026
- code.claude.com/docs/en/glossary (official Claude Code glossary)
- docs.anthropic.com/en/release-notes/claude-code (official Anthropic release notes — primary source for all dated launch/feature events)
- claude.com and claude.com/pricing (official Anthropic site, current plan structure), observed Sept 25, 2026
- simonwillison.net/2026/Feb/12/anthropic (reproducing Anthropic's own official $30B Series G funding announcement, dated Feb 12, 2026)
- dev.classmethod.jp (third-party, corroborating GA-era IDE integration and Pro-plan-access impact)
- ai.zenken.co.jp, blogs.novita.ai, seawork.ai (third-party pricing guides, corroborating exact Team-tier seat pricing)

---

*This completes Phase 1 desk research for all 9 tools in the research plan.*
