import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import { SEED_PROJECTS } from "../data/mockData";

const TABS = ["All", "Deployed", "Shared with me"];

export default function PublishedProjects() {
  const [tab, setTab] = useState("All");

  const published = SEED_PROJECTS.filter((p) => p.isPublished);

  const filtered = useMemo(() => {
    if (tab === "Deployed") return published.filter((p) => p.status === "deployed");
    if (tab === "Shared with me") return published.filter((p) => p.isShared);
    return published;
  }, [tab, published]);

  return (
    <PageShell activeId="published">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Published Projects</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Your apps that are live, and any published to a shared link.
        </p>
      </div>

      <div className="flex gap-1 border-b border-[var(--color-border)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-3 py-2 text-sm transition-colors",
              t === tab
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <ProjectsGrid projects={filtered} emptyLabel="Nothing published yet." />
    </PageShell>
  );
}
