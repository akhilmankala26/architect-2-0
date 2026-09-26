import { Globe, Users, Copy, Download } from "lucide-react";

const GRADIENTS = {
  "gradient-1": "from-violet-500 to-blue-500",
  "gradient-2": "from-emerald-500 to-teal-500",
  "gradient-3": "from-amber-500 to-orange-500",
  "gradient-4": "from-pink-500 to-rose-500",
};

function relativeDate(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function ProjectsGrid({ projects, emptyLabel = "Nothing here yet." }) {
  if (projects.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-text-faint)]">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-primary)]"
        >
          <div className={`h-28 w-full bg-gradient-to-br ${GRADIENTS[project.thumbnail]}`} />
          <div className="p-3">
            <span className="truncate text-sm font-medium text-[var(--color-text)]">
              {project.name}
            </span>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--color-text-faint)]">
              <StatusBadge status={project.status} />
              <span>{relativeDate(project.createdAt)}</span>
              {project.isPublished && <Globe size={12} title="Published" />}
              {project.isShared && <Users size={12} title="Shared" />}
            </div>
            <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="flex flex-1 items-center justify-center gap-1 rounded-[var(--radius-control)] border border-[var(--color-border)] py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                <Copy size={12} /> Duplicate
              </button>
              <button className="flex flex-1 items-center justify-center gap-1 rounded-[var(--radius-control)] border border-[var(--color-border)] py-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                <Download size={12} /> Code
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const isDeployed = status === "deployed";
  return (
    <span
      className={[
        "rounded-full px-2 py-0.5 font-medium",
        isDeployed
          ? "bg-[var(--color-success)]/15 text-[var(--color-success)]"
          : "bg-[var(--color-border-soft)] text-[var(--color-text-muted)]",
      ].join(" ")}
    >
      {isDeployed ? "Deployed" : "Draft"}
    </span>
  );
}
