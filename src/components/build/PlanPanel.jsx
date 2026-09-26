import { useState } from "react";
import { CircleSlash, ListChecks, MonitorSmartphone, Code2, Eye } from "lucide-react";
import AppMockup from "./AppMockup";
import TodoApp from "./TodoApp";
import CodeView from "./CodeView";
import TipsCarousel from "./TipsCarousel";
import AgentsTab from "./AgentsTab";
import Badge2_0 from "../Badge2_0";

const TABS = [
  { id: "plan", label: "Plan", icon: ListChecks },
  { id: "agents", label: "Agents", icon: CircleSlash },
  { id: "app", label: "App", icon: MonitorSmartphone },
];

export default function PlanPanel({ phase, bullets, activeTab, onTabChange }) {
  const [internalTab, setInternalTab] = useState("plan");
  const tab = activeTab ?? internalTab;

  function selectTab(id) {
    setInternalTab(id);
    onTabChange?.(id);
  }

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex gap-1 border-b border-[var(--color-border)] p-2">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => selectTab(t.id)}
              className={[
                "flex items-center gap-1.5 rounded-[var(--radius-control)] px-3 py-1.5 text-sm transition-colors",
                isActive
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              <Icon size={14} strokeWidth={1.75} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {tab === "plan" && <PlanTab phase={phase} bullets={bullets} />}
        {tab === "agents" && <AgentsTab />}
        {tab === "app" && <AppTab phase={phase} />}
      </div>
    </div>
  );
}

function PlanTab({ phase, bullets }) {
  if (phase === "quality") {
    return (
      <p className="text-sm text-[var(--color-text-faint)]">
        Your written plan will appear here as soon as you're past the prompt
        clarity check in the chat.
      </p>
    );
  }
  return (
    <ul className="flex flex-col gap-2.5">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-[var(--color-text)]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function AppTab({ phase }) {
  const [showCode, setShowCode] = useState(false);

  if (phase === "building") {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-muted)]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
          Building your app…
        </div>
        <TipsCarousel />
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-1.5 self-end">
          <Badge2_0 title="Architect 2.0: a one-click toggle to the full code editor (file tree + terminal) alongside the default click-to-edit preview — matches Rocket/Replit's code view without losing Lovable's inline editing." />
          <button
            onClick={() => setShowCode((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {showCode ? <Eye size={12} /> : <Code2 size={12} />}
            {showCode ? "Back to preview" : "View code"}
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {showCode ? <CodeView /> : <TodoApp />}
        </div>
      </div>
    );
  }

  return <AppMockup />;
}
