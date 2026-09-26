// All presets keep the light surface/text tokens untouched (readability stays safe)
// and only swap the brand primary/accent — enough to genuinely re-skin the app.
export const THEME_PRESETS = [
  {
    id: "indigo",
    name: "Indigo",
    tags: ["Default"],
    colors: { primary: "#6366f1", primaryHover: "#4f46e5", accent: "#4338ca" },
  },
  {
    id: "ocean",
    name: "Ocean",
    tags: ["Cool"],
    colors: { primary: "#0ea5e9", primaryHover: "#0284c7", accent: "#2563eb" },
  },
  {
    id: "forest",
    name: "Forest",
    tags: ["Cool"],
    colors: { primary: "#10b981", primaryHover: "#059669", accent: "#16a34a" },
  },
  {
    id: "sunset",
    name: "Sunset",
    tags: ["Warm"],
    colors: { primary: "#fb7185", primaryHover: "#e11d48", accent: "#f59e0b" },
  },
  {
    id: "amber",
    name: "Amber",
    tags: ["Warm"],
    colors: { primary: "#f59e0b", primaryHover: "#d97706", accent: "#ea580c" },
  },
  {
    id: "rose",
    name: "Rose",
    tags: ["Bold"],
    colors: { primary: "#ec4899", primaryHover: "#db2777", accent: "#c026d3" },
  },
  {
    id: "crimson",
    name: "Crimson",
    tags: ["Bold"],
    colors: { primary: "#ef4444", primaryHover: "#dc2626", accent: "#b91c1c" },
  },
  {
    id: "slate",
    name: "Slate",
    tags: ["Neutral"],
    colors: { primary: "#64748b", primaryHover: "#475569", accent: "#334155" },
  },
];
