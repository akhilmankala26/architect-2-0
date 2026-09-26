import {
  GitBranch,
  MessageSquare,
  NotebookText,
  Mail,
  HardDrive,
  Kanban,
} from "lucide-react";
import { INTEGRATIONS } from "../data/mockData";

const ICONS = {
  GitHub: GitBranch,
  Slack: MessageSquare,
  Notion: NotebookText,
  Gmail: Mail,
  "Google Drive": HardDrive,
  Jira: Kanban,
};

export default function IntegrationRow() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-[var(--color-text-faint)]">
        Connect with
      </span>
      <div className="flex items-center gap-4">
        {INTEGRATIONS.map((name) => {
          const Icon = ICONS[name];
          return (
            <div
              key={name}
              title={name}
              className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
            >
              <Icon size={18} strokeWidth={1.75} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
