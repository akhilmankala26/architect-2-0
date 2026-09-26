import { LifeBuoy, Mail } from "lucide-react";
import PageShell from "../components/PageShell";

export default function Help() {
  return (
    <PageShell activeId="help">
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
          <LifeBuoy size={24} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-xl font-medium text-[var(--color-text)]">Help & Support</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Support articles are coming soon — reach out in the meantime.
          </p>
        </div>
        <button
          disabled
          className="flex items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-faint)]"
        >
          <Mail size={14} />
          support@architect.app
        </button>
      </div>
    </PageShell>
  );
}
