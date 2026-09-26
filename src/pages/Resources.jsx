import { Compass, BookOpen, GraduationCap, MessageCircle, Clock } from "lucide-react";
import PageShell from "../components/PageShell";

const LINKS = [
  { icon: Compass, name: "How it works", description: "A walkthrough of the prompt-to-app flow." },
  { icon: BookOpen, name: "Docs", description: "Guides and API reference." },
  { icon: GraduationCap, name: "Lyzr University", description: "Courses on building with agents." },
  { icon: MessageCircle, name: "Discord", description: "Join the community." },
];

export default function Resources() {
  return (
    <PageShell activeId="docs">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">Resources & Docs</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Guides, courses, and community links.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LINKS.map(({ icon: Icon, name, description }) => (
          <div
            key={name}
            className="flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
              <Icon size={16} className="text-[var(--color-primary)]" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text)]">{name}</span>
                <span className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-faint)]">
                  <Clock size={10} /> Coming soon
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
