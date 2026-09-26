# Tool Flow Findings — Phase 2 (Hands-On UX Pass)

Live walkthroughs via Claude in Chrome. Each entry documents what was actually observed on screen — not docs claims — stage by stage, per the assignment's flow checklist. A to-do list app was built end-to-end where the free tier allowed.

---

## 1. architect.new

**Test build:** "Build me a simple to-do list app where I can add tasks, mark them complete, and delete them." App named itself "DoneList."

### 1.1 Landing page
Clean, centered layout. Headline: "Architect" with tagline **"The Agent Builder Platform for Business Executives & Consultants."** Note: this differs from the "Product Managers, Founders, and Non-Engineering teams" phrasing found in Phase 1's docs research — the live marketing copy uses different wording than the docs. A "#3 Product of the Day" Product Hunt badge is shown in the header. Sign-in box offers "Continue with Google" or "Continue with Email," with a row of "Connect with" icons (Gmail, Slack, Teams, Notion, GitHub, and more) shown even before sign-in.

### 1.2 Signup/auth
User signed in themselves via Google. Not independently tested by Claude (per the user's standing rule against handling credentials).

### 1.3 Homepage/dashboard
Post-login homepage repeats the same hero and tagline, now with a single prompt box ("Build me an agent...") plus a "+" attach button and mic input. Left sidebar: Home, Agent Studio, Projects (My/Published/Shared), Usage, "How it works," Prompt library, Marketplace, "What should I build," Resources, Docs, a "Get free $10 of credits" referral prompt, My Account, Help & Support. Top right shows account balance — **the free account had $20.00 in credits already granted**, more specific than Phase 1's docs, which only said "Free credits included" with no figure.

### 1.4 Chat window / prompt-to-build flow
Submitting the prompt moved into a **"Planning mode"** (confirmed the URL changes to `/plan?app_id=...`). This is not a simple chat — it's a multi-stage guided flow:
1. **Clarifying questions**: before building anything, Architect asked structured questions with checkboxes/radio buttons — "Should the first version include any extras beyond add, complete, and delete?" (Task editing / Due dates / Priority levels / None), and "Will this app need to save and manage data across sessions?" (session-only vs. accounts+persistence). A third question, **"How should this be built?"**, offered "Use default Lyzr agents" (default) vs. **"Workbench UI with GitAgent (beta feature)"** — a previously undocumented option where "Agent lives in its own GitHub repo; app becomes a full AgenticOS workbench." This wasn't mentioned in Phase 1's docs research.
2. **Written plan generation**: after answering, a detailed technical plan streamed into a right-hand panel (Plan/Agents/App tabs), including sections like "3.a. Agent Architecture" (correctly reasoning that no AI agent was needed for a deterministic to-do app) and "3.g. Database Configuration" (correctly deciding no database was needed, specifying a `sessionStorage`-based client-side data model with exact fields: `id`, `title`, `completed`, `createdAt`).
3. **Design/UX spec**: a further "Designing" step produced a detailed written UX spec — interaction states, accessibility requirements (44px touch targets, focus rings, reduced-motion support), and a specific interaction detail not requested in the prompt: undo-able deletion via a toast. A theme token (`tw:amber-minimal`) and route (`/`) were also specified.
4. **App Mockup**: a static, fully-styled visual mockup rendered in a new "App Mockup" tab, matching the written spec exactly, with the app named "DoneList."

### 1.5 App preview / agent section
Clicking "Start Building" opened a confirmation modal ("Start building — Choose what carries into the build") listing the Plan (required) and the App Mockup artifact (optional, checked by default) before proceeding. After confirming, the UI switched to a **"Build Mode"** layout with persistent Plan/Agents/App tabs and, in the top bar, **Edit Agents in Studio**, a refresh/reload-preview icon, a GitHub icon, **Preview**, and **Deploy**.

The **Agents** tab showed "Workflow will appear when agents are generated" — for this app, no agent was generated (confirmed by the chat log: "the app has no agent or database dependency"), consistent with the plan's own reasoning that a to-do app needs no AI agent.

Build progress streamed live in the left chat panel with named agent roles — "Architect" (orchestrator) delegating to a "**ui_generator**" subagent — each step logged with real actions (reading the mockup, loading UI components and "polish guidance" for spacing/focus/motion, writing `app/page.tsx`, then running actual verification commands including `npx tsc --noEmit`). The build screen itself showed a "usually 4–6 min" estimate, a rotating tips carousel (7 tips total, covering things like recommending the Plan workspace for big changes), and even a **"Play a game"** button to pass the time. Total build time observed: **~5 minutes**.

One live self-correction was visible in the log: the UI Generator noted the generated page had added a "sample-data toggle... outside the agreed minimal scope" and fixed it itself so a fresh session starts empty — a real example of the "self-correction loop" Phase 1's docs described.

Build finished with a verification summary: Next.js diagnostics passed with zero app errors, the live route returned HTTP 200, and pre-existing (unrelated) TypeScript issues in scaffold library files were explicitly called out as not blocking.

**Functional testing on the free tier**: the finished app was tested directly — add, mark-complete (strikethrough applied), and delete (with a working "Undo" toast naming the deleted task, exactly as the design spec promised) all worked correctly. Credits dropped from $20.00 to $18.66 over the course of planning + building this one simple app (~$1.34 spent).

### 1.6 GitHub integration
Clicking the GitHub icon opened a **"Your Code — Connect GitHub to sync your code"** modal, stating: "Your code is saved in cloud storage. Connect your GitHub account to move it to your personal repository," with a "Connect & Move to GitHub" button. This matches Phase 1's docs claim exactly.

**Update — completed with the user's explicit authorization**: the user authorized the GitHub OAuth connection. Re-opening the GitHub panel afterward showed: **"GitHub Connected — @[user's GitHub handle]"**, "Account connected — code syncs automatically," the target repository, a "Sandbox sync" status reading "Working tree clean · up to date" on branch `main`, Pull/Push buttons, a "Push destination" selector, "View on GitHub," and "Disconnect GitHub."

Following "View on GitHub" (navigated directly since the linked tab opened outside the managed tab group) confirmed a real, working repository:
- Repo created **private** by default, named after the app's auto-generated slug, with the description "Created with Architect by Lyzr"
- One commit, authored by the connected GitHub account, message "Snapshot from Architect," timestamped to when the build finished
- Real project structure pushed: `app/`, `components/`, `drizzle/`, `hooks/`, `lib/`, `plan-handoff/`, `public/`, plus a `.design-system-style-applied` marker file and `.gitignore`

**Discrepancy worth noting**: a `drizzle/` folder (Drizzle ORM, typically used for database schema/migrations) was present in the pushed repo even though the plan phase had explicitly stated "No database will be provisioned" for this app. This looks like a leftover from Architect's default project scaffold rather than something actually wired up for this specific to-do app — worth a closer look if evaluating code cleanliness, but doesn't affect the app's functionality (which worked correctly with client-side `sessionStorage` as planned).

This confirms Phase 1's GitHub-integration claims are accurate: real source code, in a real private repo, with automatic commit-on-change syncing (per the "Working tree clean · up to date" status) — not a stub or placeholder.

### 1.7 Deploying the app
Clicking **Deploy** opened a "Deploy Your App — Make your app available to the world" modal with: an Analytics option, a **"Publish to Marketplace"** toggle (on by default — makes the app publicly discoverable, with a warning that visitors consume the owner's Architect credits), App Name/Category/Description fields (only required when Marketplace publishing is on), and a "Use a Custom Domain" toggle. Turning off Marketplace publishing simplified the modal to just Analytics, Marketplace (off), Custom Domain (off), and Deploy — confirming marketplace listing is optional and separate from deployment itself.

Deploying (with Marketplace off, so not publicly listed) took about a minute, with a branded "Your app is being deployed... Built with Architect by Lyzr" loading screen. Result: **"App Deployed! Your app is live and ready to share,"** with a real deployment URL, share buttons for LinkedIn/X/Facebook/WhatsApp/Instagram, a copy-link icon, an "Add Custom Domain" option, "Open App," and "Redeploy Changes."

**Discrepancy worth noting**: the live deployment URL used the domain **`architect.space`** (e.g., `https://task-forge-sharp-beam-b1nd.architect.space`), not `architect.new` as the example URL in Phase 1's official docs suggested (`travel-planner.architect.new`). The deployed app was confirmed fully live and functional at this URL, including a "Built with Architect" watermark badge (dismissible per-session via an X, consistent with Phase 1's pricing research that this badge is only permanently removable on a paid plan).

### 1.8 Summary
Every flow stage in the assignment's checklist — landing page, auth, homepage, chat/prompt-to-build, app preview, agent section, UI generation, GitHub integration, and deploy — was reached, tested, and confirmed working on the **free tier alone**. The planning/clarifying-questions/mockup sequence before any code is written is substantially more elaborate in practice than Phase 1's docs conveyed, and is arguably the platform's most distinctive UX trait relative to the more single-shot chat interfaces expected from some competitors.

---

## 2. Lovable

**Test build:** Same prompt as architect.new. App named itself "My Daily Tasks" (project) / "Lumen — Today's Focus" (in-app branding).

### 2.1 Landing page
Colorful, animated gradient background (blue → pink). Headline: "Build something Lovable," subtext "Bring a new product, internal tool, or entire company to life." Notably, a **working prompt box is on the landing page itself**, before any login — "Ask Lovable to create a landing page for my..." with a "Build" mode dropdown, "+" attach, and mic icon. Top nav: Solutions, Resources, Community, Enterprise, Pricing, Security, with "Log in" / "Get started" buttons top-right. This is a different first impression from architect.new, which gates the prompt box behind sign-in.

### 2.2 Signup/auth
The browser session was already signed into an existing Lovable workspace ("Akhil's Lovable"), so a fresh signup flow wasn't observed this pass. Typing into the landing-page prompt box and submitting routed straight into the logged-in dashboard rather than a signup screen.

### 2.3 Homepage/dashboard
"Let's build something, Akhil" — a personalized greeting. Center prompt box ("Ask Lovable to generate a report on...") with the same "Build" mode selector and mic icon as the landing page. Left sidebar: New, Search, Connectors, Projects, Recents (existing projects listed). Bottom: Search/My projects/Recently viewed/Lovable templates tabs with "Browse all." Two feature-announcement popups appeared unprompted during this session — a "Chats" mode explainer and a "Chat for free" tooltip — both dismissible, both about a separate chat-only mode that doesn't spend build credits.

### 2.4 Chat window / prompt-to-build flow
Submitting the prompt created a new project ("My Daily Tasks") and moved to a dedicated project URL. Unlike architect.new, **there was no structured clarifying-questions phase**. Instead:
1. **Design-direction picker**: "Which design direction should I build?" showing one live-rendered mockup card (styled "Lumen — Today's Focus," with sample tasks) with "Skip" or "Select" options.
2. **Direct build**: selecting a direction moved straight into building — no separate written plan/PRD step, no database/architecture reasoning shown to the user (unlike architect.new's explicit "no agent needed, no database needed" plan section).
3. An expandable **"Details" / Timeline panel** showed real build activity when opened: elapsed time and a running credit counter in the header (e.g., "1m 34s · 0.90" credits), a sequence of "Thought for Ns" reasoning steps, and concrete file edits (`styles.css`, `index.tsx`, `__root.tsx`).

### 2.5 App preview / agent section
No distinct "Agent" section or tab was found anywhere in the UI — consistent with Lovable's positioning as a single AI builder rather than an explicit multi-agent orchestration product (Phase 1 found no agent-studio-style feature in Lovable's docs either).

**Distinctive self-testing behavior observed live**: mid-build, the log showed "Checking the app built cleanly and the preview is up" and "Testing the to-do app end to end: adding, completing, deleting, and reloading," followed by a **"Read 2_added_done.png"** entry — Lovable actually took and reviewed a screenshot of its own test run as part of the build, before reporting completion. This is a more visible/explicit self-QA step than architect.new's build log showed.

Build finished in **2 minutes 4 seconds** (faster than architect.new's ~5 minutes), ending with a chat summary: "I tested the whole flow and everything checks out," plus three AI-suggested follow-ups ("Break tasks into subtasks," "Add task filters," "Add due dates") — a proactive-iteration nudge not seen in architect.new's build-completion flow.

### 2.6 UI getting built
The live preview rendered a polished "Lumen" themed to-do list (dark gradient background, frosted-glass card, "0 OPEN" counter, empty state) matching the selected design direction. The preview pane has an **inline visual-editing toolbar** overlaid at the bottom (shape/text/pencil/comment icons) not present in architect.new's preview — suggesting direct-manipulation editing of the live UI is possible, though not tested this pass.

**Functional testing**: performed on a separate, non-embedded preview tab (the embedded in-app iframe preview had inconsistent click registration during automation — worth noting as a testing-tool quirk, not necessarily a product issue). On the standalone preview URL, add/complete/delete all worked correctly: added tasks show a timestamp ("added 03:26 PM"), completing a task updates a footer line ("Lumen — a calm place to think · 1 done today"), and deleting returned to the empty state. Unlike architect.new's build, this app had **no undo-on-delete toast** — a difference in what each AI chose to build for an identical prompt, not necessarily a platform capability gap. Daily free-tier chat credits were visibly metered during this session (dropped to "3.80 credits left" at one point).

### 2.7 GitHub integration
No GitHub icon in the main toolbar (unlike architect.new). Found instead under a **"More" panel → Settings → Git** section, which is considerably richer than architect.new's single-provider setup: **three git providers offered — GitHub, GitLab, and Bitbucket** — each described as "two-way sync." An explicit note: "connecting creates a new repository for this project — importing an existing repo isn't supported."

**Completed with the user's explicit authorization**: a GitHub account was already linked at the workspace level (no fresh OAuth screen appeared this pass — connecting just required clicking "Connect" next to the existing linked account). This created a new repository (`[account]/my-daily-tasks`) on branch `main`, confirmed via Lovable's own status panel: **"In sync with GitHub — Lovable and GitHub are on the same commit,"** with a manual "Re-check" option and a "Last synced Ns ago" timestamp. A "Clone repository" section offered HTTPS/SSH/GitHub CLI clone commands. (Directly navigating to the repo URL in the browser returned a GitHub 404, most likely a logged-in-account mismatch in the browser session rather than an integration failure — Lovable's own in-app sync status is the more reliable signal here and confirmed the connection is real.)

### 2.8 Deploying the app
Reached via a **"Publish your app"** button in the chat thread (not a persistent top-bar button like architect.new's "Deploy," though a share icon exists in the top-right icon row too). The publish panel showed: "Not published," an editable Website URL (auto-generated as `[name].lovable.app`), "Visible to anyone with the link," an "Add domain" option gated behind Pro, a "Run security scan" option, and a "Publish" button.

Publishing showed a distinctive non-blocking UX note: **"You can close this dialog and keep chatting. Publishing will continue in the background"** — unlike architect.new's blocking modal. On completion: **"Your website is live,"** with share buttons for X/LinkedIn/Reddit/Discord, and a fully auto-generated social preview card (title "Lumen — Today's Focus," an AI-written description: "A calm frosted-glass to-do list. Add tasks, check them off, tear them away."), plus "Copy link" and "Visit site" buttons. The live production URL (`happy-task-maker-85.lovable.app`) was confirmed working, still carrying the "Made with Lovable" free-tier watermark (dismissible per-session via an X, consistent with Phase 1's pricing research that badge removal requires a paid plan).

### 2.9 Summary
Every flow stage in the assignment's checklist was reached and tested on the **free tier**, including a real GitHub push. Lovable's flow is noticeably more streamlined/faster than architect.new's (no clarifying-questions phase, ~2 min build vs. ~5 min, no separate written plan step) but also less transparent about *why* it made certain technical decisions — architect.new explicitly reasoned through "no database needed, no agent needed" in view of the user, while Lovable's equivalent reasoning happened inside its own build log rather than being surfaced as a distinct plan artifact. Lovable's Git settings (three providers) and publish flow (auto-generated share metadata, non-blocking publish) were more polished than architect.new's equivalents in this pass.

---

## 3. Replit

**Test build:** Same prompt as the previous two tools. Project named "Simple To-Do List" / in-app title "A Little List."

### 3.1 Landing page
`replit.com` redirected straight to a **login screen** rather than showing marketing content first — a different first impression from both architect.new and Lovable, neither of which forced a login wall on the root domain. Tagline shown alongside a moody photo: "Creativity runs on Replit." Sign-in options: email/username + password, SSO, Google, GitHub, X, Apple.

### 3.2 Signup/auth
This was a genuinely new account, so the full signup flow was observed:
1. **Profile setup**: "Let's set up your account" — username and full name fields, pre-filled from the OAuth provider, with a 4-step progress indicator.
2. **Phone verification (mandatory)**: "To keep Replit secure, we verify every new account. We'll send you a 6-digit code" — sent via WhatsApp, with country-code selection and a pre-checked "Send me product updates and offers" box. **This is a distinctive friction point**: neither architect.new nor Lovable required phone verification to create a free account. The user completed this step themselves.

### 3.3 Homepage/dashboard
"[Username], what are we working on today?" — a personalized greeting, but framed as a **general-purpose AI assistant**, not specifically an app builder: "Suggested for you" chips included "Help me get things done" and "Find emails needing my reply" (with a Gmail icon), alongside the prompt box. This matches Phase 1's finding that Replit's current site markets to a broader role set (Founders through Engineers/IT) — the homepage itself doesn't assume the user is here to build an app. Left sidebar: Personal workspace, New, Import, Library, Routines, Integrations, Security. A sidebar promo referenced specific premium models: "Use smarter models — GPT-6 Astra & Claude Fable."

### 3.4 Chat window / prompt-to-build flow
Like Lovable, **no structured clarifying-questions phase** — straight to reasoning and building. The agent narrated its own scoping decision in plain text: "I'll make a small, usable task list with add, complete, and delete actions, then place it in a project you can run," and logged "Loaded skill work-in-replit" — evidence of an internal, named skill/workflow system being invoked. A notification-permission prompt ("Get notified when Agent is done... You'll only be notified when you're away from the page") appeared mid-build; denied without affecting the build.

### 3.5 App preview / agent section
No distinct "Agent" tab/section separate from the main chat — the agent's work is shown inline in the same conversation view, with a "Design" / "Build" toggle at the top (a Design/Canvas mode was teased — "Design freely and explore visuals in Canvas" — but not explored this pass). Build steps were logged in stages ("Determining project context" → "Confirming artifact creation" → scaffold/task-flow implementation), each expandable to show the specific actions taken (count only, not itemized detail, in this view).

Build took roughly **3 minutes** (between architect.new's ~5 min and Lovable's ~2 min), finishing with a live preview: "A Little List — Make room for what matters," a warm cream/lavender themed UI with a "What needs doing?" composer, "Today" section, a live finished-count ("0 of 0 finished"), and a designed empty state ("A clear little slate."). A "Small steps count. Keep them close." tagline appears alongside.

### 3.6 UI getting built
**Functional testing** (again via a standalone preview tab rather than the embedded iframe, due to the same click-registration quirk seen with Lovable): add, mark-complete, and delete all worked correctly. Completing a task struck through the label and updated the finished-count instantly ("1 of 1 finished"); deleting returned to the empty state. Like Lovable's build (and unlike architect.new's), this app had **no undo-on-delete toast**. A small copy touch: "Done is a feeling." appears at the bottom once a task exists.

### 3.7 GitHub integration
Found under a comprehensive **"Tools"** menu (Replit Cloud: Publishing, Domains, Monitoring, Growth, Database, Users & Auth, Security Center, App Storage; Setup: Integrations, Git, Secrets, Agent Skills) — a noticeably richer tool surface than either architect.new's or Lovable's equivalent menus, with first-class Database, Users & Auth, and Security Center sections visible even though this simple to-do app used none of them.

The **Git** panel is the most transparent of the three tools about version control: it shows real local commit history — including "Initial commit" (14 days old, evidently baked into the project template/scaffold) and "Initialize todo list artifact scaffolding" (from this build) — **even before any remote is connected**. Connecting requires two explicit steps, unlike architect.new/Lovable's single-click connect:
1. **Sign in** to a provider (GitHub, GitLab, or Bitbucket all offered — again three providers, like Lovable). Signing in surfaced a full "Connect GitHub" consent screen ("You're connecting to GitHub... Private and secure... You're in control"), redirected to a real GitHub OAuth popup window, and required a follow-up **"Pass GitHub Credentials"** session-confirmation dialog back in Replit.
2. **Create the remote repository** explicitly, via a separate modal (Git Provider, Personal/Organization, repository name, description, Private/Public toggle — private selected by default) — this creates an **empty** GitHub repo.
3. **Push separately**: connecting and creating the remote does not auto-push code (unlike architect.new and Lovable). A distinct "Push branch as 'origin/main'" action was required afterward.

**Completed with the user's explicit authorization.** Verified on GitHub directly: a real private repository, with code committed by a `replit-agent` bot account (2 commits total — the 14-day-old template commit plus this build's commit), containing `artifacts/`, `lib/`, `scripts/`, `.replit`, `.replitignore`, `package.json`, `pnpm-lock.yaml`, etc. After the push, Replit's Git panel showed "Remote Updates: origin/main · upstream" with explicit "Pull"/"Push"/"Sync Changes" controls — a more manual, developer-familiar git workflow than the other two tools' "always in sync" framing.

### 3.8 Deploying the app
Reached via a persistent **"Publish"** button in the top bar (present throughout, unlike Lovable's chat-embedded button). The publish panel: an editable `.replit.app` domain (availability-checked live), "Add a custom domain," a "Who can access your app" selector (Public — anyone with the URL), a "Review security" link, and "Publish."

Publishing opened a **dedicated deployment dashboard** (Overview / Logs / Domains / Manage tabs) with genuinely detailed, staged pipeline progress — Build → Bundle → (further steps) → Promote — each shown as a distinct checkmarked stage, plus a "View logs" option and an optional **"Run a deep security scan"**: "Security Agent combines LLMs with leading static analysis tools to deliver a pen-test-grade security scan of your project." This is a materially more infrastructure-forward deploy experience than either architect.new or Lovable offered.

**This was also the slowest deploy of the three**: the "Promote" stage alone ran for several minutes (total publish time well over 4 minutes, vs. architect.new's ~1 minute and Lovable's near-instant "continues in background" framing).

On completion: **"Congratulations! Your project is live,"** with the live URL, a "Copy link" button, and two distinctive "Present your project" options not seen elsewhere — **"Create a slide deck"** and **"Create an animation."** A prominent, important notice appeared: **"Free deployments are temporary and will expire. Upgrade to Core to keep your app live permanently, connect custom domains, and remove the Replit badge."** The production dashboard confirmed a concrete **29-day expiration** (10/25/2026) alongside real infrastructure detail not disclosed by the other tools: "Autoscale (2 vCPU / 4 GiB RAM / 1 Max)" and a deployment geography ("Asia").

**Not independently verified via direct browser visit**: navigating to the live `.replit.app` URL hit a persistent tool-permission block in this session unrelated to the deployment itself (the URL opened successfully once via a page-click, showing the correct page title "A little list — tasks for today," before the tab was lost to the same permission issue). The deployment's success is otherwise fully confirmed via Replit's own production status panel.

### 3.9 Summary
Every flow stage in the assignment's checklist was reached and tested, including a real GitHub push, on the **free tier** — though signup required phone verification (a meaningfully higher-friction onboarding than the other two tools), and the free-tier deployment itself is **time-limited (29 days)** rather than persistent, which is a first for this research pass and worth weighing heavily for Architect 2.0's own free-tier design. Replit's flow overall reads as the most "developer-infrastructure-aware" of the three tools tested so far — visible git history before any remote, explicit multi-step remote/push (vs. one-click), a staged deploy pipeline with real infra specs, and dedicated first-class panels for Database/Auth/Security — consistent with Phase 1's finding that Replit explicitly serves Engineers/IT alongside non-technical roles, unlike architect.new's non-technical-only positioning.

---

## 4. Emergent

**Test build:** Same prompt as the previous three tools. Project named "checklist-app-292" / in-app title "Checklist."

### 4.1 Landing page
Dark theme with a subtle matrix-style falling-character background. Headline: "Describe your idea — Build websites & apps with AI." Sign-in gated immediately, like architect.new — no marketing content is shown before authentication. Sign-in options: Continue with Google, Continue with Email, Continue with Phone, plus a "View more" expand link.

### 4.2 Signup/auth
Not independently tested by Claude (per standing rule); the user signed in themselves.

### 4.3 Homepage/dashboard
"Start with one prompt. You can change everything later." with **Web app / Mobile app** tabs above the prompt box — a build-target choice not shown up front by any of the other three tools. Example prompt chips underneath ("Inventory tracker for a jewelry store," "Portfolio dashboard for a crypto investor," etc.). Free-tier credit balance shown top-right: **10.00 credits** — matches Phase 1's docs exactly ("10 credits/month" on the Free plan).

### 4.4 Chat window / prompt-to-build flow
Like architect.new (and unlike Lovable/Replit), Emergent asked **structured clarifying questions** before building — two required questions plus one optional:
1. "Beyond add / complete / delete, do you want any extra task features?" — checkboxes (Keep it minimal [Recommended] / Edit task text / Due dates or priorities / Filters / Something else)
2. "Any design preference for the UI?" — checkboxes (Clean modern task app [Recommended] / Dark themed / Playful/colorful / No preference / Something else)
3. "Any additional info? (optional)" — free-text field

Each question could be answered manually or via an "Auto-answer" button. After submitting, the chat confirmed: "The user confirmed minimal scope and a clean modern design. Now let me get the design guidelines before building," followed by **"Delegated to Design Agent"** — a real, visibly named sub-agent handling the design pass. This directly confirms Phase 1's flagged-as-third-party-only claim about named internal agent roles (Planning/Frontend/Design/etc.) — here at least a "Design Agent" is directly observable in the product, not just in third-party marketing copy.

### 4.5 App preview / agent section
No separate "Agent" tab, but agent delegation is visible inline in the chat transcript (the "Design Agent" handoff above). Build steps were logged with real file operations: "Viewed /app/design_guidelines.json," "Viewing 6 paths," "Edited /app/frontend/index.html," **"Created /app/backend/server.py"** — notably, Emergent generated a real backend server file for this build, unlike architect.new, Lovable, and Replit, which all kept the same to-do app entirely client-side (sessionStorage/browser-only). A verification step was also visible: `$ cd /app/backend && python -c 'import server; pri...'`, and a `/app/memory/SPEC.md` file was created — a persistent spec document, distinct from architect.new's in-chat plan panel.

Build took roughly **5–6 minutes** — the slowest of the four tools tested, consistent with the extra Design Agent delegation step and full-stack (frontend + backend) output for a prompt the other tools treated as client-side-only.

Mid-build, the agent also ran its own functional test: a "Taking screenshot" step appeared in the log — similar in spirit to Lovable's self-testing screenshot, though less explicitly narrated ("Testing X, Y, Z" text wasn't shown here, just the screenshot action itself).

### 4.6 UI getting built
Live preview: **"Checklist — A quiet place for the day's tasks,"** dark theme, "What needs doing?" composer, "Add task" button, a progress bar with **percentage complete** ("0 of 2 completed · 0%") — a feature not seen in any of the other three tools' default builds. A "Focus mode" badge and light/dark toggle were also present. An inline **"Edit mode"** was offered via a tooltip: "Click any element in the preview to edit it directly, no need to describe it in chat" — comparable to Lovable's visual-editing toolbar.

**Functional testing**: performed directly in the embedded preview (no iframe click-registration issue this time, unlike Lovable/Replit). Add, mark-complete, and delete all worked correctly, with the completion percentage updating live (0% → 50% → recalculated after delete). No undo-on-delete toast, consistent with Lovable's and Replit's builds. One quirk: a sample task ("Read 20 pages") was already present in the list before I added my own — likely left over from the agent's own mid-build self-test, visible because it's the same live app instance.

After the build finished ("Agent Finished"), the chat surfaced AI-suggested follow-ups similar to Lovable's, but framed as literal feature proposals with a "+" to add each: "Undo Delete," "Drag To Reorder," "Quick Focus," "Clear Completed." Credit usage was shown directly: **6.33 of 10.00 free credits remaining** after this one build (~3.67 credits spent).

### 4.7 GitHub integration
**Not found anywhere in this pass**, despite Phase 1's official FAQ stating "We can integrate with GitHub for version control." Checked: the "Manage → Connectors" panel (searchable list of ~10+ integrations — Google sign-in, email/password login, ChatGPT/Claude/Gemini AI models, file storage, Stripe, Resend — no GitHub among them; searching "GitHub" directly returned "Couldn't find your connector? Request 'GitHub'"); the top toolbar icons (external link, refresh, Share, Publish); and the "Share" modal (a temporary preview link plus X/Facebook/LinkedIn share buttons, no GitHub/export option). This is a genuine discrepancy between Phase 1's documented claim and what's observable in the live product during this pass — recorded as such, not resolved. It's possible GitHub export exists on a paid tier or via a different, unfound path, but no equivalent to the other three tools' one-click GitHub connect was located in the free-tier UI.

### 4.8 Deploying the app
Clicking the persistent top-bar **"Publish"** button did **not** open a deploy panel — it redirected directly to a **"Choose your plan" pricing/upgrade page**. Free deployment is listed as a feature of the **Pro plan only** (₹14,999/mo, 750 credits/mo), alongside a "Standard Trial" (₹249 for 7 days, 100 credits) and "Standard" (₹1,649/mo) tier, neither of which listed free deployment as included in the visible cards. This is the first of the four tools tested where **the free tier does not permit deployment at all** — architect.new, Lovable, and Replit all allowed a real deploy on their free plans (Replit's with a 29-day expiration caveat). No deployment was attempted, since doing so would require a paid upgrade.

(Pricing was displayed in ₹ (Indian Rupees), likely geo-detected — worth noting as a display detail, not a claim about Emergent's actual base pricing, which Phase 1 recorded in USD from the official site.)

### 4.9 Summary
Emergent's flow was the most elaborate of the four tested so far — clarifying questions (like architect.new), a named Design Agent delegation step, a real backend server generated even for a simple client-side app, a persistent spec file, and a percentage-based progress bar not seen elsewhere. It was also the slowest build (~5–6 min) and the only one to gate the core "app preview" and "deploy" flow stages differently: GitHub integration could not be located anywhere in the UI despite being documented in Phase 1, and deployment is Pro-only, redirecting straight to a pricing page rather than offering any free-tier deploy path. This is a meaningfully different free-tier value proposition from the other three tools and worth weighing carefully for Architect 2.0's own tier design.

---

## 5. Rocket.new

**Test build:** Same prompt as the previous four tools. Project auto-named "TaskList."

### 5.1 Landing page
Astronaut-in-a-meadow hero image with bold marketing copy: "Most AI tools help you build faster. None of them tell you what to build. Or how to win after you build. Rocket is the world's first Vibe Solutioning platform." — closely matching Phase 1's Solve/Build/Intelligence positioning research. A stat line: "1.5 million people have tried Rocket across 180 countries." Nav: Product, Resources, Pricing, Sign in, "Get started free." A cookie-consent banner appeared (Reject All chosen). "Start free" / "See it in action" CTAs.

### 5.2 Signup/auth
A "Sign in / Sign up" modal offered Google, SSO, or email — "We'll sign you in or create an account if you don't have one yet." User signed in themselves.

### 5.3 Homepage/dashboard
"What do you want to figure out?" with a single general-purpose prompt box ("Describe any business problem, decision, or thing you need built") — directly confirming Phase 1's three-module framing with three labeled cards shown underneath: **Solve** ("Any question. Any situation. Every angle researched, evidence weighed — ready to act on."), **Build** ("Production-grade from the first generation. Output that used to require design+dev team."), **Intelligence** ("Every platform your competitor is on reveals their strategy. Rocket watches all of them."). Left sidebar: New task, Home, Search, Tasks, Projects, Intelligence, Templates, Help, Notifications.

### 5.4 Chat window / prompt-to-build flow
A distinctive mechanic not seen in any other tool: **"Agent detected prompt score: 76%,"** with a note that the score is "good enough to proceed" but answering a clarifying question would improve it. The single question asked: "Is this just for you, or will multiple people have their own accounts and task lists?" (Just for me / Multiple users with accounts / Shared team list / Other), with an explicit "I don't want to improve my prompt further" opt-out available at any time.

After answering, the score rose to **94%**, and the agent displayed a **"Rocket Enhanced"** rewritten version of the prompt before building — and, notably, stated the tech stack directly: **"Building with Next.js and TypeScript."** No other tool tested disclosed its framework choice this explicitly pre-build.

### 5.5 App preview / agent section
No distinct "Agent" tab; progress was logged as discrete stages in the chat: "Task planned" → "Composing UI..." → "Writing application..." (streaming real file names: `styles/tailwind.css`, `tailwind.config.js`, `app/layout.tsx`, `app/page.tsx`, and ~7 named components like `TaskListPage.tsx`, `TaskHeader.tsx`, `TaskRow.tsx`) → "UI composed" → "Application written" → "Building your app...". Total build time: roughly **2–3 minutes**.

Build finished with a **"Built TaskList Web App"** summary card listing exactly what was added — notably, Rocket expanded scope well beyond the literal prompt on its own initiative (no "keep it minimal" option was offered in its one clarifying question, unlike architect.new/Emergent): priority levels (High/Medium/Low), optional due dates with overdue highlighting, filter tabs, and a completion-percentage progress ring.

### 5.6 UI getting built
The live preview was the most feature-rich default build of any tool tested: "TaskList" header with **active/done/overdue count badges**, a "TODAY'S PROGRESS" card with a circular percentage ring and a "Clear completed" shortcut, an "Add a new task" composer with a priority/due-date dropdown, and All/Active/Completed filter tabs with live counts. It shipped with 10 pre-populated sample tasks (with priorities and due dates, including overdue ones) rather than an empty state.

**Functional testing**: performed directly in the embedded preview (no iframe issue this time). Add (with default "Med" priority tag applied), mark-complete (strikethrough, progress ring updated), and delete (trash icon on hover) all worked correctly. No undo-on-delete toast.

### 5.7 GitHub integration
Found under a **"Connectors"** panel (reached via a "..." menu with Code / Connectors / APIs / Analytics tabs) listing ~10 third-party integrations: GitHub, Notion, Google, Linear, Supabase, Stripe, Razorpay, OpenAI, and more, each with a one-line description and a "Request new connectors" option for anything missing.

**Connecting the GitHub account itself was free and completed with the user's explicit authorization** — a standard OAuth flow, after which the connector page showed the connected `@username` with a "Disconnect" option.

**However, actually pushing code is gated behind a paid upgrade.** Clicking the GitHub icon in the editor's own toolbar (a separate icon from the Connectors settings, found via in-product agent guidance after asking Rocket directly how to push) opened a **"Sync with GitHub in seconds"** panel listing the feature (version control, team collaboration, "Deploy via Actions") behind a **"Last chance: 90% off your first month... Upgrade now to unlock GitHub push"** paywall. This is a distinctive finding: unlike the four other tools, where connecting the account was the only gate, Rocket separates **account connection** (free) from **push capability** (paid) as two different gates. No push was attempted, since doing so would require a paid upgrade.

### 5.8 Deploying the app
Reached via a persistent **"Launch"** button in the top bar, opening a panel with **Staging** and **Production** tabs. Staging is described as "a private preview version of your app/site — use it to test, review, and validate changes before going live," with a choice of hosting: **Rocket hosted domain** (free), **Custom domain**, or **Purchase a new domain** (the latter two appeared to require a paid plan, based on their visual styling, though this wasn't confirmed by clicking through).

Selecting "Rocket hosted domain" and continuing took noticeably long to process (~40+ seconds, longer than any other tool's deploy step observed this pass) before completing: **"Your staging environment is live on the following URL"** — `https://tasklist-hvbm38.app.builtwithrocket.new` — with a "Launch on custom domain" link, "Unpublish," and "Update" (redeploy) options. The live URL was confirmed fully working and functional, carrying a "Built with Rocket.new" watermark badge (no dismiss/close option was visible on this badge, unlike the other four tools' watermarks).

### 5.9 Summary
Every flow stage in the assignment's checklist was reached and tested on the **free tier**, including a real staging deployment — but **GitHub push specifically required a paid upgrade**, a distinctive two-tier gate (free connection, paid push) not seen in the other four tools. Rocket's most distinctive UX traits in this pass: a "prompt score" mechanic that nudges the user toward a better-specified request before building, explicit upfront disclosure of the tech stack (Next.js/TypeScript), and a default build that substantially exceeded the literal prompt's scope (priorities, due dates, progress tracking) — consistent with Phase 1's "day two" positioning (Rocket aiming to solve beyond just the initial build). The Solve/Build/Intelligence three-module framing from Phase 1 was directly visible on the homepage itself.

---

## 6. v0 (Vercel)

**Test build:** Same prompt as the previous five tools. Chat auto-titled "To-do list app."

### 6.1 Landing page
Minimal black-and-white design. Headline: "What do you want to create?" with a working prompt box available directly on the landing page (like Lovable), a "v0 Max" model selector, example prompt chips (Contact Form, Image Editor, Mini Game, Finance Calculator), and a "Start with a template" section below (Apps and Games, Landing Pages, Components, Dashboards). Nav: Templates, Enterprise, Pricing, iOS, Students, FAQ.

### 6.2 Signup/auth
Confirmed Phase 1's finding directly: submitting the prompt pre-login opened **"Continue with Vercel — To use v0, create a Vercel account or log into an existing one."** v0 has no separate account system of its own; it is strictly a Vercel-account feature. User signed in themselves.

### 6.3 Homepage/dashboard
Post-login, the original prompt was preserved and re-shown on "What do you want to create?" Model auto-switched to **"v0 Mini"** (a lighter/cheaper default than the pre-login "v0 Max"). Free-tier credit balance shown bottom-left: **$5** — matches Phase 1's docs exactly ("$5 in included monthly credits" on Free). Left sidebar: New Chat, Search, Home, Projects, Chats, Design Systems, Templates, Drafts, Projects ("No projects yet").

### 6.4 Chat window / prompt-to-build flow
No structured clarifying questions (like Lovable/Replit). A highly transparent, visible chain-of-thought reasoning trace streamed live in the chat — e.g., "I need to implement the client page, and it seems like Lucide might be available for this..." and later, explicitly reasoning about scope: "I need to remember not to include localStorage unless explicitly mentioned." This level of exposed reasoning detail was not seen in any other tool tested.

**Reliability issue observed**: the first generation attempt **stalled indefinitely** at a "Planning page implementation" step — no progress for over 6.5 minutes (confirmed via "Worked for 6m 32s" after manually stopping it), even surviving a full page reload with no change in state. Restarting with a "Please continue and finish building the app" follow-up also stalled again at the same step for a similar duration before finally completing. **Total time to a working build across both attempts: approximately 13–14 minutes** — by far the slowest (or most unreliable) of any tool tested in this pass. This may reflect an atypical session rather than v0's normal behavior, but it's a directly observed finding worth weighing.

### 6.5 App preview / agent section
No distinct "Agent" tab. Once complete, the preview rendered a polished "My tasks" app: "Good morning" greeting, a completion counter ("1/3 done"), a "What needs to be done?" composer with "Add task" button, and pre-populated sample tasks. Footer tagline: "Stay focused, one task at a time."

### 6.6 UI getting built
**Functional testing**: performed first in the embedded editor preview, where Add and Delete worked correctly but the mark-complete checkbox did not visibly toggle after multiple clicks. Re-tested on the **standalone published preview** (opened via the external-link icon, at a `*.v0.build` subdomain) — mark-complete worked correctly there, confirming the embedded-preview issue was a testing-tool/iframe quirk (the same pattern seen with Lovable and Replit's embedded previews), not a genuine bug in the generated app. All three functions (add/complete/delete) are confirmed working. No undo-on-delete toast.

### 6.7 GitHub integration
Found under a dedicated **Settings** tab (opened via the "..." menu), with sub-sections: Vercel Project, Integrations, Environment Variables, **GitHub**, Template, Domains, Analytics. The GitHub sub-page showed "No GitHub repository connected — Connect."

**Completed — GitHub was already linked via the underlying Vercel account** (no fresh OAuth screen appeared), and clicking Connect opened a **"Create Repository"** modal: "Create a new private repository to sync changes. v0 will push changes to a branch on this repository each time you send a message." This directly confirms Phase 1's docs claim that v0 auto-commits on every message, with no manual push step required (unlike Replit's explicit multi-step flow).

Verified directly on GitHub: a real private repository (`akhilmankala26/to-do-list-app`), with **3 commits authored by a "v0" bot account** ("Initial commit from v0," a feature commit, "Add README.md"), containing a real project structure: `app/`, `components/ui/`, `lib/`, `public/`, `.gitignore`, `package.json`, `next.config.mjs`, `components.json`.

### 6.8 Deploying the app
No separate "click to deploy" action was needed — clicking **"Publish"** in the top bar revealed the app was **already deployed to production automatically** as part of the build process itself, since v0 is natively built on Vercel's hosting: "Production Deployment... Ready," with a live URL (`to-do-list-app-rouge-iota.vercel.app`), "Updated 34s ago," and the note "This branch has no new changes to publish." The panel also offered Customize Domain, Visibility (Public), "Inspect on Vercel," Analytics (with a visitor count), and Git Actions (branch: main).

The live URL was confirmed fully functional. **Notably, no "Built with v0" or similar watermark badge was present** on the deployed app — the only tool of the five tested (so far) without a visible free-tier watermark.

### 6.9 Summary
Every flow stage in the assignment's checklist was reached and tested on the **free tier**, including a real GitHub push and a live production deployment — and v0's deploy model is genuinely different from every other tool tested: because it's built directly on Vercel, "deploying" isn't a discrete action the user takes but a continuous state the app is already in by the time you look for a deploy button. GitHub sync works the same way — automatic, on every message, no manual push required. Balanced against this operational smoothness, this pass surfaced a real reliability concern: the initial build stalled for an extended period on two separate attempts before finally completing, a pattern not observed with any other tool. The exposed chain-of-thought reasoning in the chat was also the most detailed and legible of any tool tested, which could be a meaningful trust-building signal for Architect 2.0 to consider.

---

*Next up for review: Cursor.*

---

## Note on remaining tools (Cursor, Claude Code, Codex)

Cursor, Claude Code, and Codex are not browser-based sign-up-and-build products (Cursor: desktop IDE only; Claude Code: primarily CLI, with IDE extensions and a desktop app; Codex: bundled into ChatGPT, with a web surface but not a standalone builder flow). The "sign up → build a to-do app → GitHub → deploy" testing method used for the six hosted tools above doesn't map cleanly onto them.

**Plan going forward:**
- **Cursor** and **Claude Code**: the user has hands-on daily experience with both (Cursor at work, Claude Code for personal projects) and will walk through a structured question set later, mirroring the same flow-stage checklist. These entries will be written up as **user-reported**, explicitly distinguished from Claude's own hands-on observation for the other six tools, per research integrity rule 5.
- **Codex**: the user has no hands-on experience with it. Phase 2 will be skipped for Codex; Phase 3 synthesis and Phase 4 design work will rely on Phase 1's desk research for this tool only. This gap is recorded plainly per integrity rule 9 rather than filled with a manufactured test.
