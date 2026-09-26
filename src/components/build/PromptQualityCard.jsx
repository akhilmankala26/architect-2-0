import { useState } from "react";
import { Check } from "lucide-react";
import { PROMPT_QUALITY, IMPROVE_QUESTION } from "../../data/buildScript";
import Badge2_0 from "../Badge2_0";

export default function PromptQualityCard({ onDone }) {
  const [choice, setChoice] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function pick(optionId) {
    setChoice(optionId);
    setSubmitted(true);
    onDone(optionId);
  }

  function skip() {
    setSubmitted(true);
    onDone(null);
  }

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-[var(--color-text)]">
          Prompt clarity
          <Badge2_0 title="Architect 2.0: replaces the baseline's mandatory clarifying questions with a non-blocking quality score + one optional improving question — never gates the build." />
        </span>
        <span className="text-sm font-medium text-[var(--color-primary)]">
          {PROMPT_QUALITY.score}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="brand-gradient h-full rounded-full"
          style={{ width: `${PROMPT_QUALITY.score}%` }}
        />
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">{PROMPT_QUALITY.note}</p>

      {!submitted && !expanded && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExpanded(true)}
            className="text-xs font-medium text-[var(--color-primary)] transition-opacity hover:opacity-80"
          >
            Improve it →
          </button>
          <button
            onClick={skip}
            className="text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
          >
            I don't want to improve my prompt further
          </button>
        </div>
      )}

      {!submitted && expanded && (
        <div className="flex flex-col gap-2 border-t border-[var(--color-border-soft)] pt-3">
          <span className="text-xs text-[var(--color-text)]">{IMPROVE_QUESTION.prompt}</span>
          <div className="flex flex-col gap-1.5">
            {IMPROVE_QUESTION.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => pick(opt.id)}
                className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-left text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={skip}
            className="self-start text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
          >
            Never mind, build with what I have
          </button>
        </div>
      )}

      {submitted && (
        <span className="flex items-center gap-1.5 text-xs text-[var(--color-success)]">
          <Check size={12} strokeWidth={2.5} />
          {choice ? "Got it — locked in" : "Building with the prompt as written"}
        </span>
      )}
    </div>
  );
}
