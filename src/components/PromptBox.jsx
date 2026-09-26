import { useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { EXAMPLE_PROMPTS } from "../data/mockData";

export default function PromptBox({ onSubmit, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xl shadow-black/20 focus-within:border-[var(--color-primary)]"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe the app you want to build…"
          rows={3}
          className="w-full resize-none bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)]"
        />
        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            title="Attach a file"
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-muted)]"
          >
            <Paperclip size={15} />
          </button>
          <button
            type="submit"
            disabled={!value.trim()}
            className="brand-gradient flex h-8 w-8 items-center justify-center rounded-full text-white disabled:opacity-40"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setValue(prompt)}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
