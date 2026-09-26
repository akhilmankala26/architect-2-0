import { Gauge } from "lucide-react";
import { estimateMonthlyCost } from "../../data/llmCatalog";
import Badge2_0 from "../Badge2_0";

const TIER_ORDER = { fast: 0, balanced: 1, flagship: 2 };
const TIER_LABEL = { fast: "Fast & cheap", balanced: "Balanced", flagship: "Flagship" };

export default function LLMRecommendation({ recommended, alternatives, reasoning }) {
  const rows = [recommended, ...alternatives].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );

  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="flex items-center gap-2">
        <Gauge size={14} className="text-[var(--color-primary)]" />
        <span className="text-sm font-medium text-[var(--color-text)]">Best LLM match</span>
        <Badge2_0 title="Architect 2.0: proposes the best-fit LLM for what you're building — not a 100% match, the best available trade-off — plus a cost-benefit comparison against alternatives." />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--color-text)]">{recommended.name}</span>
        <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-text-faint)]">
          {recommended.provider}
        </span>
        <span className="rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-primary)]">
          Recommended
        </span>
      </div>

      <p className="text-xs text-[var(--color-text-muted)]">{reasoning}</p>

      <div className="overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-border-soft)]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--color-surface)] text-[var(--color-text-faint)]">
              <th className="px-3 py-2 text-left font-medium">Model</th>
              <th className="px-3 py-2 text-left font-medium">Speed</th>
              <th className="px-3 py-2 text-left font-medium">Quality</th>
              <th className="px-3 py-2 text-right font-medium">Est. cost / mo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((model) => {
              const isRecommended = model.id === recommended.id;
              return (
                <tr
                  key={model.id}
                  className={[
                    "border-t border-[var(--color-border-soft)]",
                    isRecommended ? "bg-[var(--color-primary-soft)]" : "",
                  ].join(" ")}
                >
                  <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span
                        className={
                          isRecommended
                            ? "font-medium text-[var(--color-text)]"
                            : "text-[var(--color-text)]"
                        }
                      >
                        {model.name}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-faint)]">
                        {TIER_LABEL[model.tier]}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <DotMeter value={model.speed} />
                  </td>
                  <td className="px-3 py-2">
                    <DotMeter value={model.quality} />
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-[var(--color-text)]">
                    ${estimateMonthlyCost(model).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-[var(--color-text-faint)]">
        Estimated at ~10,000 requests/month, typical prompt length. Not a 100% match — the best
        available trade-off for this task.
      </p>
    </div>
  );
}

function DotMeter({ value, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={[
            "h-1.5 w-1.5 rounded-full",
            i < value ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
