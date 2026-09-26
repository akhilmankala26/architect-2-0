// Marks a feature as an Architect 2.0 addition (not part of the architect.new
// baseline clone) — dropped next to the label of anything that came from
// phase-4-design-translation.md, so a reviewer can spot what's new at a glance.
export default function Badge2_0({ title }) {
  return (
    <span
      title={title}
      className="inline-flex shrink-0 items-center rounded-full bg-[var(--color-primary)] px-1.5 py-[1px] text-[9px] font-bold tracking-wide text-white"
    >
      2.0
    </span>
  );
}
