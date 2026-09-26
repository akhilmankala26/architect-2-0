import PageShell from "../components/PageShell";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import { SEED_PROJECTS } from "../data/mockData";

export default function SharedProjects() {
  const shared = SEED_PROJECTS.filter((p) => p.isShared);

  return (
    <PageShell activeId="shared">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Shared Projects</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Projects shared with you or by you to a team.
        </p>
      </div>
      <ProjectsGrid projects={shared} emptyLabel="Nothing shared yet." />
    </PageShell>
  );
}
