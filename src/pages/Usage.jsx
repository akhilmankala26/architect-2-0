import { Coins, TrendingDown } from "lucide-react";
import PageShell from "../components/PageShell";
import CreditsChart from "../components/usage/CreditsChart";
import { USAGE_SUMMARY } from "../data/usageData";

export default function Usage() {
  return (
    <PageShell activeId="usage">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Usage</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Credit usage over the last 14 days.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile icon={Coins} label="Remaining credits" value={USAGE_SUMMARY.remaining.toLocaleString()} />
        <StatTile icon={TrendingDown} label="Used (14 days)" value={USAGE_SUMMARY.totalUsed.toLocaleString()} />
        <StatTile icon={Coins} label="Plan" value={USAGE_SUMMARY.plan} />
      </div>

      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <CreditsChart />
      </div>
    </PageShell>
  );
}

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="brand-gradient flex h-9 w-9 items-center justify-center rounded-full">
        <Icon size={16} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[var(--color-text)]">{value}</span>
        <span className="text-xs text-[var(--color-text-faint)]">{label}</span>
      </div>
    </div>
  );
}
