import { DollarSign, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopBar({ left }) {
  const { user, logout } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-[var(--color-border)] px-6">
      <div className="flex min-w-0 items-center gap-3">{left}</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
          <DollarSign size={14} />
          <span className="text-[var(--color-text)]">{user?.credits?.toLocaleString()}</span>
        </div>

        <button
          title="Settings"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
        >
          <Settings size={15} strokeWidth={1.75} />
        </button>

        <button
          onClick={logout}
          title="Sign out"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-primary)]/40 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-soft)]"
        >
          {initials || "U"}
        </button>
      </div>
    </header>
  );
}
