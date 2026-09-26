import { Coins, FolderKanban, Sparkles, TrendingUp } from "lucide-react";

export default function ThemePreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <MarketingSnippet />
      <DashboardSnippet />
      <CardSnippet />
    </div>
  );
}

function MarketingSnippet() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <span className="text-xs uppercase tracking-widest text-[var(--color-text-faint)]">
        Marketing
      </span>
      <h3 className="text-xl font-semibold leading-tight">
        Describe the app.
        <br />
        <span className="brand-gradient-text">Architect builds it.</span>
      </h3>
      <button className="brand-gradient mt-1 rounded-[var(--radius-control)] px-4 py-2 text-sm font-medium text-white">
        Get started
      </button>
    </div>
  );
}

function DashboardSnippet() {
  const stats = [
    { icon: Coins, label: "Credits", value: "2,450" },
    { icon: FolderKanban, label: "Projects", value: "12" },
    { icon: TrendingUp, label: "Uptime", value: "99.9%" },
  ];
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <span className="text-xs uppercase tracking-widest text-[var(--color-text-faint)]">
        Dashboard
      </span>
      <div className="flex flex-col gap-2">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-soft)] bg-[var(--color-bg)] px-3 py-2"
          >
            <div className="brand-gradient flex h-7 w-7 items-center justify-center rounded-full">
              <Icon size={13} className="text-white" />
            </div>
            <span className="text-sm text-[var(--color-text)]">{value}</span>
            <span className="ml-auto text-xs text-[var(--color-text-faint)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardSnippet() {
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <span className="text-xs uppercase tracking-widest text-[var(--color-text-faint)]">
        Project card
      </span>
      <div className="overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-border)]">
        <div
          className="h-20 w-full"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          }}
        />
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[var(--color-primary)]" />
            <span className="text-sm text-[var(--color-text)]">Habit Tracker</span>
          </div>
          <span className="rounded-full bg-[var(--color-success)]/15 px-2 py-0.5 text-xs font-medium text-[var(--color-success)]">
            Deployed
          </span>
        </div>
      </div>
    </div>
  );
}
