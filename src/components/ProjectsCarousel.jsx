import { Globe, Users } from "lucide-react";
import { SEED_PROJECTS } from "../data/mockData";

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

export default function ProjectsCarousel() {
  return (
    <section className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-[var(--color-text-muted)]">
          Your projects
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {SEED_PROJECTS.map((project) => (
          <button
            key={project.id}
            className="group w-56 shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] text-left transition-colors hover:border-[var(--color-primary)]"
          >
            <div
              className={`h-28 w-full bg-gradient-to-br ${GRADIENTS[project.thumbnail]}`}
            />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-medium text-[var(--color-text)]">
                  {project.name}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-[var(--color-text-faint)]">
                <StatusBadge status={project.status} />
                <span>{relativeDate(project.createdAt)}</span>
                {project.isPublished && <Globe size={12} title="Published" />}
                {project.isShared && <Users size={12} title="Shared" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
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
