import PageShell from "../components/PageShell";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import { SEED_PROJECTS } from "../data/mockData";

export default function MyProjects() {
  return (
    <PageShell activeId="projects">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">My Projects</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Every app you've started, draft or deployed.
        </p>
      </div>
      <ProjectsGrid projects={SEED_PROJECTS} />
    </PageShell>
  );
}
