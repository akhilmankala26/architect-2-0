# Architect 2.0 — Technical Architecture

This describes how Architect 2.0 would actually be built in production — not the
scripted demo in this repo, but the real system behind it. See
`architecture-diagram.png` alongside this file for the full service map; this
document explains the reasoning behind it and walks through what happens
end-to-end when a user builds and ships an app.

## Walkthrough: from a typed prompt to a live app

1. The user types a prompt into the browser SPA. The SPA opens a WebSocket to
   the **Backend API** and sends the prompt plus project context.
2. The Backend API writes a `BuildRequest` row to Postgres, pushes a job onto a
   **Redis Streams** queue, and returns immediately — the WebSocket stays open
   for streaming.
3. An **Orchestrator worker** picks up the job. It calls the **Model Gateway**
   (not a provider SDK directly) to ask the selected model to produce a plan.
   Every reasoning token and tool call is published back onto the same Redis
   stream, which the Backend API relays to the browser over the WebSocket —
   this is what powers the live "Reasoning" panel and the plan/agents/app tabs.
4. Once a plan is approved, the Orchestrator requests a **sandbox** from the
   **Sandbox Orchestrator** service. For a plain frontend app, this is a
   WebContainer that boots inside the user's own browser tab in ~1s; for
   anything needing a real backend, database, or arbitrary shell/network
   access, it's a Firecracker microVM leased from a pooled sandbox provider.
5. The Orchestrator's `ui_generator` / `backend_generator` sub-agents write
   files into the sandbox through a small **exec/fs RPC** the sandbox exposes,
   then run the dev server. Every file write and command result streams back
   over the same WebSocket, and a headless-browser **self-test** step hits the
   running preview and reports pass/fail — this is the "I tested add → complete
   → delete" note in the UI, done for real.
6. The sandbox's dev server port is exposed through the **Preview Proxy**,
   which mints a short-lived signed URL (`https://preview-<id>.architect.app`)
   that only the owning user's browser can load. The App tab's iframe points
   straight at that URL, so Vite/webpack HMR flows through untouched.
7. On each successful build step, a **GitHub Sync worker** reads the changed
   files from the sandbox and commits them via the GitHub API (no git binary
   needed inside the sandbox).
8. On Deploy, a **Deploy worker** runs a production build inside a fresh
   sandbox and either uploads static output to an R2/S3 bucket served through
   Cloudflare's CDN (static apps), or builds and pushes a container image to a
   long-running service on Fly.io/Cloud Run (apps with a real backend/agent
   runtime). The resulting URL is permanent and free-tier by default, per our
   own UI's "never expire, never paywall the core deploy action" principle.

## Sandboxes — what runs each user's app, and why

Two tiers, chosen by what the generated app actually needs, not one
one-size-fits-all sandbox:

- **WebContainers** (StackBlitz's tech) for the common case: a static/Vite/React
  app with no real backend. It runs an actual Node dev server inside a WASM
  Linux userland *in the user's own browser tab* — no server-side compute cost,
  ~1s boot, and the live-reload story is trivial because the "sandbox" and the
  preview iframe are already same-origin. This is the right default because
  most first prompts (a to-do list, a dashboard, a landing page) don't need
  anything more.
- **Firecracker microVMs via a managed provider (E2B)** for anything needing a
  real filesystem, outbound network access, a database, or the ability to run
  arbitrary agent/tool code the harness writes. Firecracker gives ~125ms cold
  boot and strong kernel-level isolation between tenants (the same primitive
  AWS Lambda and Fly.io use), and E2B specifically packages this as an SDK
  built for "AI writes and runs code" rather than general container hosting,
  which matters for cold-start latency at our scale.

The Sandbox Orchestrator decides which tier to hand out based on the approved
plan (does it need a database, a package outside the WebContainer's supported
runtimes, or real egress?) and escalates from WebContainer to a real VM
mid-session if the agent's own plan changes.

## The agent harness

The Orchestrator is a planner, not a single call: it decomposes the prompt into
a plan (matching the Plan/Agents/App split already in the UI), then delegates
to typed sub-agents (`ui_generator`, `backend_generator`, `agent_generator`)
that each run their own bounded ReAct loop — reason, call a tool
(`read_file`/`write_file`/`run_command`/`git_commit`/`preview_screenshot`),
observe the result, repeat — with a hard step budget so a confused sub-agent
can't loop forever on the user's credits.

Error recovery is automatic, not a human-in-the-loop step: after every
write/run, the harness runs the project's own build/lint/typecheck and a
headless-browser smoke test against the live preview. A failure is fed back
into the *same* sub-agent's context as the next observation (not escalated to
the user) for up to N self-heal attempts (we use 3) before the harness gives up
and surfaces a plain-language explanation — this is exactly the "visible
self-test" behavior in the UI, and it's what stops a broken build from ever
reaching the user silently.

Project memory across turns (so "now add due dates" doesn't need the whole
codebase re-sent) is a structured per-project manifest — file tree, the
written plan, and prior decisions — kept in Postgres and hydrated into context
on each turn, rather than re-indexing the whole repo every time.

## Model-agnostic by construction

Every agent/tool call goes through one internal **Model Gateway** — a
self-hosted LiteLLM proxy — instead of hitting Claude/GPT/Gemini SDKs directly
anywhere in the codebase. LiteLLM normalizes the request/response and
tool-calling schema across providers, so switching models is changing a string
(`claude-sonnet-5`, `gpt-5.1`, `gemini-2.5-pro`, or a self-hosted OSS model
behind vLLM) in one config, never a code change in the harness. This is also
where our own "Best LLM match" recommendation plugs in for real: the
recommended model id from the catalog *is* the LiteLLM model string, and the
gateway's per-model rate limits and automatic fallback-on-provider-outage keep
a bad model choice or a provider incident from breaking a build outright — it
retries on the next-best model in the same tier instead of failing the job.

Context-window and tool-syntax differences between providers are handled the
same way: a small model-capabilities table drives adaptive context truncation,
so a model swap never breaks the harness even when the new model's window is
smaller.

## Frontend ↔ sandbox ↔ backend, and the live preview

The browser never talks to a sandbox directly. It talks to the Backend API
over HTTPS (normal requests) and one WebSocket (streaming reasoning, build
logs, file events). The Backend API talks to the sandbox through the Sandbox
Orchestrator's RPC. The live preview is the one exception that *looks* direct:
the App tab's iframe loads the Preview Proxy's signed URL, which either is the
WebContainer's own virtual server (already same-origin, zero extra hop) or a
reverse-proxied tunnel to the Firecracker VM's exposed port. Either way, the
generated app's own HMR/websocket traffic flows through unmodified — we're
never rewriting the generated app's code to make preview work.

## Where the proxy sits, and what it does

A single edge layer (Cloudflare) fronts everything: the Backend API, every
sandbox preview URL, and the Model Gateway. It terminates TLS, enforces
per-user auth on preview URLs (a short-lived signed token, so only the owning
user's browser can load their own preview), rate-limits per user/IP, and
rewrites the response body of free-tier previews to inject the dismissible
"Built with Architect" watermark — without touching the sandbox's own served
files. The same edge layer is where the GitHub webhook receiver and the deploy
pipeline's ingress eventually sit too, so there's one place that owns
TLS/auth/rate-limiting for the whole product, not one per service.

## GitHub integration

A GitHub App (not a long-lived personal-access-token OAuth app) installed
per-account, scoped to just the repos it creates. Commits happen from the
**GitHub Sync worker** calling the GitHub API directly (Git Data API: create a
tree, a commit, update the ref) using the changed files read straight out of
the sandbox's filesystem — there's no git binary or git credentials living
inside the ephemeral sandbox itself, which keeps the sandbox side stateless and
avoids ever having repo credentials in a shared, untrusted execution
environment. Auto-sync fires after every successful build step by default,
matching the UI's "auto-sync is on unless you turn it off" default; the
Advanced git panel's manual commit/branch/pull actions call the same API,
just user-triggered instead of automatic.

## Deploying the app — and deploying Architect 2.0 itself

**A user's app**: a production build runs in a fresh sandbox (never the dev
sandbox, to avoid shipping dev-only state). Static output goes to an R2/S3
bucket served through Cloudflare's CDN under a permanent
`<slug>.architect-clone.app` subdomain. An app with a real backend/agent
runtime instead gets built into a container and deployed to a serverless-
container platform (Fly.io machines or Cloud Run) so the backend keeps
running between requests. Free tier is resource-capped, never time-capped —
deploys don't expire, matching the product decision already baked into the
Deploy modal.

**Architect 2.0 itself**: the control-plane services (Backend API, Model
Gateway, Sandbox Orchestrator, GitHub Sync worker, Deploy worker, billing) are
each a container, deployed to a managed Kubernetes cluster (GKE/EKS) once
traffic justifies the ops overhead — or Fly.io/Render at smaller scale, since
the actual services don't change, just where they run. Postgres (managed —
Neon or RDS) holds users/projects/billing/agent-config; Redis backs the job
queue and the pub/sub that streaming relies on; the same R2/S3 bucket used for
user deploys also holds build artifacts.

## Scaling to thousands of concurrent users

- **Backend API and workers are stateless** and scale horizontally behind a
  load balancer. The one thing that looks stateful — a user's WebSocket
  session — isn't tied to a specific instance: agent events publish to Redis
  Streams, so any backend instance can pick up and relay a given session,
  not just the one that opened it.
- **Sandboxes are the real bottleneck**, not the API. This is exactly why we
  offload to a provider (E2B) built for thousands of ephemeral Firecracker
  VMs with a pre-warmed pool underneath, rather than running our own VM fleet
  from day one. Idle sandboxes get checkpointed and suspended (Firecracker
  snapshot/resume) instead of kept warm, and free-tier accounts get a
  concurrent-sandbox cap with overflow queued, not rejected.
- **Model Gateway scaling** is just more LiteLLM replicas behind the same load
  balancer, with per-provider rate-limit-aware queuing and the same
  fallback-to-next-model behavior described above absorbing provider-side
  rate limits under load instead of surfacing them to users.
- **Database**: read replicas for Postgres, PgBouncer for connection pooling,
  and keeping high-churn ephemeral state (streaming tokens, build logs) in
  Redis/object storage instead of the relational database, so the database
  that actually needs to be consistent (billing, project ownership) stays
  small and fast.
- **Observability**: OpenTelemetry tracing through the whole
  prompt → sandbox → deploy pipeline, so a slow step is diagnosable per-request
  rather than showing up only as an aggregate latency number, and the same
  trace data feeds the per-user credit metering already surfaced in the UI.
