import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function PageShell({ activeId, children }) {
  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      <Sidebar activeId={activeId} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-6 py-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
