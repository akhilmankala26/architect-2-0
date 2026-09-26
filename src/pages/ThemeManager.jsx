import { Check } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ThemePreview from "../components/theme/ThemePreview";
import { THEME_PRESETS } from "../data/themePresets";
import { useTheme } from "../context/ThemeContext";

export default function ThemeManager() {
  const { presetId, setPresetId } = useTheme();

  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      <Sidebar activeId="theme" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-10">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <div>
              <h1 className="text-xl font-medium text-[var(--color-text)]">Theme Manager</h1>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Pick a preset — the whole app re-skins instantly, live preview included.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {THEME_PRESETS.map((preset) => {
                const active = preset.id === presetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setPresetId(preset.id)}
                    className={[
                      "flex flex-col gap-3 rounded-[var(--radius-card)] border p-3 text-left transition-colors",
                      active
                        ? "border-[var(--color-primary)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-soft)]",
                    ].join(" ")}
                  >
                    <div
                      className="h-12 w-full rounded-[var(--radius-control)]"
                      style={{
                        background: `linear-gradient(135deg, ${preset.colors.primary}, ${preset.colors.accent})`,
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-[var(--color-text)]">{preset.name}</span>
                        <span className="text-[11px] text-[var(--color-text-faint)]">
                          {preset.tags.join(", ")}
                        </span>
                      </div>
                      {active && <Check size={15} className="text-[var(--color-primary)]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div>
              <h2 className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">
                Live preview
              </h2>
              <ThemePreview />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
