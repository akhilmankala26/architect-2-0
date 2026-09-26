import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "../components/PageShell";
import { PROMPT_ROLES, PROMPT_TEMPLATES } from "../data/promptTemplates";

export default function PromptLibrary() {
  const navigate = useNavigate();
  const [role, setRole] = useState(PROMPT_ROLES[0]);

  const templates = PROMPT_TEMPLATES.filter((t) => t.roleCategory === role);

  function selectPrompt(text) {
    navigate("/home", { state: { prefill: text } });
  }

  return (
    <PageShell activeId="prompts">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Prompt Library</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Pick a starter prompt — it drops straight into your homepage box.
        </p>
      </div>

      <div className="flex gap-1 border-b border-[var(--color-border)]">
        {PROMPT_ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={[
              "px-3 py-2 text-sm transition-colors",
              r === role
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            ].join(" ")}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => selectPrompt(t.promptText)}
            className="group flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-colors hover:border-[var(--color-primary)]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text)]">{t.title}</span>
              <ArrowRight
                size={14}
                className="text-[var(--color-text-faint)] transition-colors group-hover:text-[var(--color-primary)]"
              />
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">{t.promptText}</p>
          </button>
        ))}
      </div>
    </PageShell>
  );
}
