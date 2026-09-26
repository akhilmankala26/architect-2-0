import { CATEGORY_COLORS } from "../../data/marketplaceData";

// A lightweight stand-in for a real app screenshot — a small dashboard
// silhouette tinted by category so cards read as distinct apps at a glance.
export default function AgentletThumbnail({ category, standalone = false }) {
  const color = CATEGORY_COLORS[category] || "#71717a";

  return (
    <div
      className={[
        "relative h-28 w-full overflow-hidden",
        standalone ? "rounded-[var(--radius-control)]" : "rounded-t-[var(--radius-card)]",
      ].join(" ")}
      style={{ background: `${color}12` }}
    >
      <div className="absolute inset-0 p-3">
        <div className="mb-2.5 flex items-center gap-1.5">
          <div className="h-5 w-5 rounded-md" style={{ background: color }} />
          <div className="h-2 w-16 rounded-full" style={{ background: `${color}55` }} />
        </div>
        <div className="flex gap-2">
          <div className="h-12 w-12 shrink-0 rounded-md" style={{ background: `${color}30` }} />
          <div className="flex flex-1 flex-col gap-1.5 pt-1">
            <div className="h-2 w-full rounded-full bg-black/[0.07]" />
            <div className="h-2 w-4/5 rounded-full bg-black/[0.07]" />
            <div className="h-2 w-3/5 rounded-full bg-black/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}
