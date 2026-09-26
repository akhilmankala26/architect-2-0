import { createContext, useContext, useEffect, useState } from "react";
import { THEME_PRESETS } from "../data/themePresets";

const ThemeContext = createContext(null);

function applyPresetToDocument(preset) {
  const root = document.documentElement.style;
  root.setProperty("--color-primary", preset.colors.primary);
  root.setProperty("--color-primary-hover", preset.colors.primaryHover);
  root.setProperty("--color-accent", preset.colors.accent);
  root.setProperty("--color-primary-soft", `${preset.colors.primary}1a`);
}

export function ThemeProvider({ children }) {
  const [presetId, setPresetId] = useState(THEME_PRESETS[0].id);

  useEffect(() => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId) || THEME_PRESETS[0];
    applyPresetToDocument(preset);
  }, [presetId]);

  return (
    <ThemeContext.Provider value={{ presetId, setPresetId }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
