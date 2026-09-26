import { useState } from "react";
import { ChevronDown, GitBranch, Bot, Check } from "lucide-react";
import Badge2_0 from "./Badge2_0";

const FRAMEWORKS = ["Auto-detect", "React", "Next.js", "Vue", "Plain HTML/JS"];
const TEMPLATES = ["Blank", "Dashboard", "Landing page", "To-do app"];
const AGENT_FRAMEWORKS = ["LangChain", "CrewAI", "AutoGen", "OpenAI function-calling", "MCP server"];

export default function AdvancedDisclosure() {
  const [open, setOpen] = useState(false);
  const [framework, setFramework] = useState(FRAMEWORKS[0]);
  const [template, setTemplate] = useState(TEMPLATES[0]);
  const [repoUrl, setRepoUrl] = useState("");
  const [repoImported, setRepoImported] = useState(false);
  const [agentFramework, setAgentFramework] = useState(AGENT_FRAMEWORKS[0]);
  const [agentEndpoint, setAgentEndpoint] = useState("");
  const [agentImported, setAgentImported] = useState(false);

  function importRepo(e) {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    setRepoImported(true);
  }

  function importAgent(e) {
    e.preventDefault();
    if (!agentEndpoint.trim()) return;
    setAgentImported(true);
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
      >
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        Advanced — framework, template, or import existing work
        <Badge2_0 title="Architect 2.0: lets a technical user pre-select a framework/template or import an existing GitHub repo or agent — addresses the brief's 'import existing project' and 'agents in any framework' asks." />
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Framework">
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
              >
                {FRAMEWORKS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </Field>
            <Field label="Starting template">
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
              >
                {TEMPLATES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="h-px bg-[var(--color-border-soft)]" />

          <form onSubmit={importRepo} className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
              <GitBranch size={12} /> Import an existing GitHub repo
            </span>
            <div className="flex gap-2">
              <input
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  setRepoImported(false);
                }}
                placeholder="github.com/you/existing-project"
                className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
              />
              <button
                type="submit"
                disabled={!repoUrl.trim()}
                className="flex shrink-0 items-center gap-1 rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)] disabled:opacity-40"
              >
                {repoImported ? <Check size={12} /> : null}
                {repoImported ? "Imported" : "Import"}
              </button>
            </div>
          </form>

          <form onSubmit={importAgent} className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
              <Bot size={12} /> Import an agent built in another framework
            </span>
            <div className="flex gap-2">
              <select
                value={agentFramework}
                onChange={(e) => setAgentFramework(e.target.value)}
                className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-xs text-[var(--color-text)] outline-none"
              >
                {AGENT_FRAMEWORKS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
              <input
                value={agentEndpoint}
                onChange={(e) => {
                  setAgentEndpoint(e.target.value);
                  setAgentImported(false);
                }}
                placeholder="Endpoint, CLI command, or SDK entry point"
                className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
              />
              <button
                type="submit"
                disabled={!agentEndpoint.trim()}
                className="flex shrink-0 items-center gap-1 rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)] disabled:opacity-40"
              >
                {agentImported ? <Check size={12} /> : null}
                {agentImported ? "Imported" : "Import"}
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-text-faint)]">
              Wrapped and called as-is — your agent's own logic keeps running, nothing gets ported.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-[var(--color-text-faint)]">{label}</span>
      {children}
    </label>
  );
}
