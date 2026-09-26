import { useMemo, useState } from "react";
import { CircleSlash, Pencil, Trash2, Bot, Plus, Sparkle } from "lucide-react";
import { NO_AGENT_REASONING } from "../../data/buildScript";
import { LLM_MODELS, recommendModel } from "../../data/llmCatalog";
import LLMRecommendation from "./LLMRecommendation";
import Badge2_0 from "../Badge2_0";

const TOOL_OPTIONS = ["Web search", "Code execution", "File access"];
const FRAMEWORKS = ["Native", "LangChain", "CrewAI", "AutoGen", "OpenAI function-calling", "MCP server"];

function emptyDraft() {
  return {
    name: "Custom Agent",
    systemPrompt: "",
    model: LLM_MODELS[0].name,
    tools: [],
    framework: FRAMEWORKS[0],
  };
}

export default function AgentsTab() {
  const [agent, setAgent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);

  const liveMatch = useMemo(
    () => recommendModel(`${draft.name} ${draft.systemPrompt}`),
    [draft.name, draft.systemPrompt],
  );
  const savedMatch = useMemo(
    () => (agent ? recommendModel(`${agent.name} ${agent.systemPrompt}`) : null),
    [agent],
  );

  function startAdd() {
    setDraft(emptyDraft());
    setEditing(true);
  }

  function startEdit() {
    setDraft(agent);
    setEditing(true);
  }

  function toggleTool(tool) {
    setDraft((d) => ({
      ...d,
      tools: d.tools.includes(tool) ? d.tools.filter((t) => t !== tool) : [...d.tools, tool],
    }));
  }

  function save() {
    setAgent(draft);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-soft)] bg-[var(--color-bg)] p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
          <CircleSlash size={15} className="text-[var(--color-text-faint)]" />
          No agent needed
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">{NO_AGENT_REASONING}</p>
      </div>

      {agent && !editing && (
        <>
          <div className="flex flex-col gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
                <Bot size={14} className="text-[var(--color-primary)]" />
                {agent.name}
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-faint)]">
                  {agent.framework}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={startEdit}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setAgent(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-faint)] transition-colors hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              {agent.systemPrompt || "No system prompt set."}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--color-text-faint)]">
              <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5">
                {agent.model}
              </span>
              {agent.tools.map((t) => (
                <span key={t} className="rounded-full border border-[var(--color-border)] px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {savedMatch && (
            <LLMRecommendation
              recommended={savedMatch.recommended}
              alternatives={savedMatch.alternatives}
              reasoning={savedMatch.reasoning}
            />
          )}
        </>
      )}

      {!editing && (
        <div className="flex items-center gap-1.5 self-start">
          <button
            onClick={agent ? startEdit : startAdd}
            className="flex items-center justify-center gap-1.5 rounded-[var(--radius-control)] border border-dashed border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
          >
            {!agent && <Plus size={13} />}
            {agent ? "Edit agent config" : "Add an agent anyway"}
          </button>
          {!agent && (
            <Badge2_0 title="Architect 2.0: the Agents tab is editable, not read-only — edit system prompt, model, tools, and tag any-framework agents (LangChain, CrewAI, AutoGen, OpenAI function-calling, MCP server) right here." />
          )}
        </div>
      )}

      {editing && (
        <div className="flex flex-col gap-3 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <input
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="Agent name"
            className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
          />
          <textarea
            value={draft.systemPrompt}
            onChange={(e) => setDraft((d) => ({ ...d, systemPrompt: e.target.value }))}
            placeholder="System prompt — describe what this agent does…"
            rows={3}
            className="resize-none rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
          />

          {draft.systemPrompt.trim() && (
            <button
              type="button"
              onClick={() => setDraft((d) => ({ ...d, model: liveMatch.recommended.name }))}
              className="flex items-center gap-1.5 self-start rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary-soft)] px-2.5 py-1 text-[11px] text-[var(--color-primary)] transition-opacity hover:opacity-80"
            >
              <Sparkle size={11} />
              Suggested: {liveMatch.recommended.name} — use this
            </button>
          )}

          <div className="flex gap-2">
            <select
              value={draft.model}
              onChange={(e) => setDraft((d) => ({ ...d, model: e.target.value }))}
              className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-xs text-[var(--color-text)] outline-none"
            >
              {LLM_MODELS.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <select
              value={draft.framework}
              onChange={(e) => setDraft((d) => ({ ...d, framework: e.target.value }))}
              className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-xs text-[var(--color-text)] outline-none"
            >
              {FRAMEWORKS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TOOL_OPTIONS.map((tool) => {
              const active = draft.tools.includes(tool);
              return (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={[
                    "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)]",
                  ].join(" ")}
                >
                  {tool}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-muted)]"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="brand-gradient rounded-[var(--radius-control)] px-3 py-1.5 text-xs font-medium text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
