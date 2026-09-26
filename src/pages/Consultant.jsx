import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Sparkles, Check, Gauge } from "lucide-react";
import PageShell from "../components/PageShell";
import Badge2_0 from "../components/Badge2_0";
import { recommendModel } from "../data/llmCatalog";
import {
  TEAM_SIZES,
  ROLES,
  TIME_SINKS,
  CONSULTANT_TOOLS,
  ROLE_RECOMMENDATIONS,
} from "../data/consultantData";

const STEPS = ["Profile", "Role", "Time sinks", "Tools", "Notes"];

function initialAnswers() {
  return { teamSize: TEAM_SIZES[0], role: ROLES[0], timeSinks: [], tools: [], notes: "" };
}

export default function Consultant() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [done, setDone] = useState(false);

  function toggleMulti(field, value) {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setDone(true);
  }

  function back() {
    if (done) setDone(false);
    else if (step > 0) setStep(step - 1);
  }

  function buildThis(prompt) {
    navigate("/home", { state: { prefill: prompt } });
  }

  return (
    <PageShell activeId={null}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/home")}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
        >
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-xl font-medium text-[var(--color-text)]">AI Consultant</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            A few quick questions, then a few agents worth building.
          </p>
        </div>
      </div>

      {!done ? (
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
          <div className="flex items-center gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={[
                    "h-1.5 w-full rounded-full",
                    i <= step ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]",
                  ].join(" ")}
                />
                <span className="text-[10px] text-[var(--color-text-faint)]">{label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            {step === 0 && (
              <StepChips
                title="How big is your team?"
                options={TEAM_SIZES}
                selected={[answers.teamSize]}
                onToggle={(v) => setAnswers((a) => ({ ...a, teamSize: v }))}
                single
              />
            )}
            {step === 1 && (
              <StepChips
                title="What best describes your role?"
                options={ROLES}
                selected={[answers.role]}
                onToggle={(v) => setAnswers((a) => ({ ...a, role: v }))}
                single
              />
            )}
            {step === 2 && (
              <StepChips
                title="What eats up most of your time?"
                options={TIME_SINKS}
                selected={answers.timeSinks}
                onToggle={(v) => toggleMulti("timeSinks", v)}
              />
            )}
            {step === 3 && (
              <StepChips
                title="Which tools do you already use?"
                options={CONSULTANT_TOOLS}
                selected={answers.tools}
                onToggle={(v) => toggleMulti("tools", v)}
              />
            )}
            {step === 4 && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[var(--color-text)]">
                  Anything else we should know? (optional)
                </span>
                <textarea
                  value={answers.notes}
                  onChange={(e) => setAnswers((a) => ({ ...a, notes: e.target.value }))}
                  rows={4}
                  placeholder="e.g. we're mostly async, or our stack is Python-heavy…"
                  className="w-full resize-none rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={back}
              disabled={step === 0}
              className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={next}
              className="brand-gradient flex items-center gap-1.5 rounded-[var(--radius-control)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {step === STEPS.length - 1 ? "See recommendations" : "Next"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--color-primary)]" />
            <h2 className="text-base font-medium text-[var(--color-text)]">
              Recommended for a {answers.role}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(ROLE_RECOMMENDATIONS[answers.role] || []).map((agent) => {
              const match = recommendModel(`${agent.name} ${agent.description}`);
              return (
              <div
                key={agent.name}
                className="flex flex-col gap-2.5 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
              >
                <span className="text-sm font-medium text-[var(--color-text)]">{agent.name}</span>
                <p className="flex-1 text-xs text-[var(--color-text-muted)]">{agent.description}</p>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-faint)]">
                  <Gauge size={11} className="text-[var(--color-primary)]" />
                  Best LLM match: <span className="text-[var(--color-text-muted)]">{match.recommended.name}</span>
                  <Badge2_0 title="Architect 2.0: proposes the best-fit LLM for this agent, with a cost-benefit comparison shown once you build it." />
                </span>
                <button
                  onClick={() => buildThis(agent.prompt)}
                  className="brand-gradient mt-1 flex items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Check size={13} />
                  Build This
                </button>
              </div>
              );
            })}
          </div>
          <button
            onClick={back}
            className="w-fit text-sm text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
          >
            ← Back to questions
          </button>
        </div>
      )}
    </PageShell>
  );
}

function StepChips({ title, options, selected, onToggle, single = false }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-[var(--color-text)]">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={[
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              {isSelected && <Check size={12} strokeWidth={2.5} />}
              {opt}
            </button>
          );
        })}
      </div>
      {single && (
        <span className="text-[11px] text-[var(--color-text-faint)]">Pick one to continue</span>
      )}
    </div>
  );
}
