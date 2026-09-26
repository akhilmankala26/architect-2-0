import {
  Home,
  FolderKanban,
  Globe,
  Users,
  Store,
  BookText,
  BarChart3,
  Palette,
  UserCircle,
  HelpCircle,
  Lock,
  Gift,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const ICONS = {
  home: Home,
  projects: FolderKanban,
  published: Globe,
  shared: Users,
  marketplace: Store,
  prompts: BookText,
  usage: BarChart3,
  theme: Palette,
  account: UserCircle,
  docs: BookText,
  help: HelpCircle,
};

const SECTION_ORDER = ["Projects", "Traceability", "Get started"];

export default function Sidebar({ activeId = "home" }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const topItem = NAV_ITEMS.find((i) => i.section === null);
  const footerItems = NAV_ITEMS.filter((i) => i.section === "footer");

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-5">
      <div className="mb-5 flex items-center gap-2 px-2">
        <img src={logo} alt="" className="h-7 w-7 rounded-md object-cover" />
        <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]">
          Architect
        </span>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto no-scrollbar">
        <NavButton item={topItem} isActive={topItem.id === activeId} onNavigate={navigate} />

        {SECTION_ORDER.map((section) => {
          const items = NAV_ITEMS.filter((i) => i.section === section);
          if (items.length === 0) return null;
          return (
            <div key={section} className="mt-4">
              <span className="mb-1 block px-3 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-faint)]">
                {section}
              </span>
              <div className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <NavButton
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    onNavigate={navigate}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 pt-3">
        <button className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 px-3 py-2 text-xs font-medium text-[var(--color-success)] transition-colors hover:bg-[var(--color-success)]/15">
          <Gift size={13} />
          Get free $10 of credits
        </button>

        <div className="flex flex-col gap-0.5">
          {footerItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={item.id === activeId}
              onNavigate={navigate}
              trailing={
                item.id === "account" ? (
                  <span className="text-xs text-[var(--color-text-faint)]">
                    ${user?.credits?.toLocaleString()}
                  </span>
                ) : item.id === "help" ? (
                  <Settings size={13} className="text-[var(--color-text-faint)]" />
                ) : null
              }
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function NavButton({ item, isActive, onNavigate, trailing }) {
  const Icon = ICONS[item.id];
  return (
    <button
      disabled={!item.enabled}
      onClick={() => item.path && onNavigate(item.path)}
      title={item.enabled ? item.label : `${item.label} — coming soon`}
      className={[
        "flex items-center justify-between rounded-[var(--radius-control)] px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-[var(--color-surface-hover)] font-medium text-[var(--color-text)]"
          : item.enabled
            ? "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
            : "cursor-not-allowed text-[var(--color-text-faint)]",
      ].join(" ")}
    >
      <span className="flex items-center gap-2.5">
        <Icon size={16} strokeWidth={1.75} />
        {item.label}
      </span>
      {trailing ?? (!item.enabled && <Lock size={12} strokeWidth={1.75} />)}
    </button>
  );
}
