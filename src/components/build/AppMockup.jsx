import { Check } from "lucide-react";

const FAKE_ROWS = [
  { label: "Buy groceries", done: false },
  { label: "Write weekly report", done: true },
  { label: "Call the dentist", done: false },
];

export default function AppMockup() {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
      <span className="absolute right-3 top-3 z-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-0.5 text-[10px] text-[var(--color-text-faint)]">
        Preview render
      </span>

      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-border)]" />
      </div>

      <div className="pointer-events-none select-none p-5 opacity-70">
        <h3 className="mb-4 text-base font-medium text-[var(--color-text)]">My Tasks</h3>
        <div className="mb-4 h-8 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)]" />
        <div className="flex flex-col gap-2">
          {FAKE_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
            >
              <span
                className={[
                  "flex h-4 w-4 items-center justify-center rounded border",
                  row.done
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : "border-[var(--color-border)]",
                ].join(" ")}
              >
                {row.done && <Check size={10} className="text-white" strokeWidth={3} />}
              </span>
              <span
                className={[
                  "text-sm",
                  row.done ? "text-[var(--color-text-faint)] line-through" : "text-[var(--color-text)]",
                ].join(" ")}
              >
                {row.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
