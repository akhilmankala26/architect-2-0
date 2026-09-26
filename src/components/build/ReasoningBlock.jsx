import { useState } from "react";
import { ChevronDown, Sparkles, Bot } from "lucide-react";
import Badge2_0 from "../Badge2_0";

const ACTOR_META = {
  architect: { label: "Architect", icon: Sparkles },
  ui_generator: { label: "ui_generator", icon: Bot },
};

// Reasoning is always visible, never hidden — but collapsed to a one-line
// running summary by default, expandable to the full log. Per
// phase-4-design-translation.md §3 (modeled on v0's exposed chain-of-thought,
// the most trust-building pattern found in the tool research).
export default function ReasoningBlock({ lines, done }) {
  const [expanded, setExpanded] = useState(false);
  const last = lines[lines.length - 1];

  return (
    <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2 text-left"
      >
        {!done ? (
          <div className="h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
        ) : (
          <Sparkles size={13} className="shrink-0 text-[var(--color-primary)]" />
        )}
        <span className="flex-1 truncate text-xs text-[var(--color-text-muted)]">
          {done ? "Reasoning" : (last?.text ?? "Thinking…")}
        </span>
        <Badge2_0 title="Architect 2.0: the build log streams as reasoning collapsed to a one-line running summary by default, expandable to the full Architect → ui_generator log." />
        <ChevronDown
          size={13}
          className={`shrink-0 text-[var(--color-text-faint)] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="flex flex-col gap-1.5 border-t border-[var(--color-border-soft)] pt-2">
          {lines.map((line, i) => {
            const meta = ACTOR_META[line.actor];
            const Icon = meta.icon;
            return (
              <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                <Icon size={12} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[var(--color-text-faint)]" />
                <span className="font-mono">
                  <span className="text-[var(--color-text-faint)]">{meta.label}:</span> {line.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
