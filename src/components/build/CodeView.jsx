import { useState } from "react";
import { FileCode, Terminal } from "lucide-react";
import { GENERATED_FILES, TERMINAL_LINES } from "../../data/generatedCode";

export default function CodeView() {
  const [activeFile, setActiveFile] = useState(GENERATED_FILES[0].name);
  const file = GENERATED_FILES.find((f) => f.name === activeFile);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-36 shrink-0 border-r border-[var(--color-border)] p-2">
          {GENERATED_FILES.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFile(f.name)}
              className={[
                "flex w-full items-center gap-1.5 truncate rounded-[var(--radius-control)] px-2 py-1.5 text-left text-xs transition-colors",
                f.name === activeFile
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              <FileCode size={12} className="shrink-0" />
              {f.name}
            </button>
          ))}
        </div>
        <pre className="flex-1 overflow-auto p-3 text-[11px] leading-relaxed text-[var(--color-text-muted)]">
          <code>{file.content}</code>
        </pre>
      </div>

      <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] px-3 py-1.5 text-[10px] text-[var(--color-text-faint)]">
        <Terminal size={11} />
        terminal
      </div>
      <div className="max-h-24 overflow-auto px-3 pb-2 font-mono text-[11px] text-[var(--color-success)]">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}
