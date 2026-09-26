import { useMemo, useState } from "react";
import { Eye, GitFork, Star } from "lucide-react";
import PageShell from "../components/PageShell";
import AgentletModal from "../components/marketplace/AgentletModal";
import AgentletThumbnail from "../components/marketplace/AgentletThumbnail";
import { AGENTLETS, MARKETPLACE_CATEGORIES } from "../data/marketplaceData";

export default function Marketplace() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (category === "All" ? AGENTLETS : AGENTLETS.filter((a) => a.category === category)),
    [category],
  );

  return (
    <PageShell activeId="marketplace">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Agentlets Marketplace</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Browse and clone agents built by the community.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {MARKETPLACE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={[
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              cat === category
                ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-text)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <button
            key={a.id}
            onClick={() => setSelected(a)}
            className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] text-left transition-colors hover:border-[var(--color-primary)]"
          >
            <AgentletThumbnail category={a.category} />
            <div className="flex flex-col gap-2.5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text)]">{a.name}</span>
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-faint)]">
                  {a.category}
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-[var(--color-text-muted)]">{a.description}</p>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-[var(--color-text-faint)]">
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {a.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {a.clones.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-[var(--color-warning)]" /> {a.rating}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && <AgentletModal agentlet={selected} onClose={() => setSelected(null)} />}
    </PageShell>
  );
}
