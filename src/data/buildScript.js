// Fully scripted planning + build flow — build-spec-baseline-clone.md, screens 5–6,
// redesigned per phase-4-design-translation.md §3: a non-blocking prompt-quality
// read-out with one optional improving question, replacing architect.new's
// mandatory multi-question clarifying flow. The flow always converges on the
// to-do list demo app regardless of the typed prompt (per the baseline spec's
// own note: "whatever the demo app is — add/complete/delete").

export const PROMPT_QUALITY = {
  score: 72,
  note: "Scope is clear — add/complete/delete is well specified.",
};

export const IMPROVE_QUESTION = {
  prompt: "One optional detail before I start:",
  options: [
    { id: "cross-out", label: "Show completed tasks crossed out (recommended)" },
    { id: "hide", label: "Hide completed tasks instead" },
  ],
};

export const BUILD_LOG = [
  { actor: "architect", text: "Delegating UI work to ui_generator…" },
  { actor: "ui_generator", text: "Scaffolding page layout and components…" },
  { actor: "ui_generator", text: "Wiring up add, complete, and delete handlers…" },
  { actor: "architect", text: "Running a self-test: add → complete → delete…" },
  { actor: "architect", text: "✓ All checks passed." },
  { actor: "architect", text: "Your app is ready." },
];

export const BUILD_TIPS = [
  "Every build gets a plain-language plan before any code is written.",
  "You can revisit the Agents tab any time — even if no agent was needed.",
  "This preview is the real thing, not a mockup — try clicking around.",
  "Deploys are always free and permanent — no expiring links.",
];

export function planBullets(improveChoice) {
  const bullets = [
    "A single-page to-do list app",
    "Add, complete, and delete tasks",
    "Tasks persist for this session — no account-gated data",
  ];
  bullets.push(
    improveChoice === "hide"
      ? "Completed tasks are hidden from the list"
      : "Completed tasks stay visible, shown crossed out",
  );
  return bullets;
}

export const NO_AGENT_REASONING =
  "This app's logic is fully deterministic — adding, completing, and deleting a task are simple state changes with no judgment calls to make. No AI agent is required to run it, so none was created.";

export const WHY_ARCHITECTURE =
  "A single React component with local state is enough here — there's no multi-step workflow, no external data source, and nothing that needs to survive a server restart. No backend or database needed for a list that lives in your browser tab.";
