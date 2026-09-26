import { useRef, useState } from "react";
import { CREDIT_USAGE } from "../../data/usageData";

const WIDTH = 720;
const HEIGHT = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 40 };
const PLOT_W = WIDTH - PAD.left - PAD.right;
const PLOT_H = HEIGHT - PAD.top - PAD.bottom;

function niceMax(value) {
  const step = value <= 100 ? 20 : value <= 250 ? 50 : 100;
  return Math.ceil(value / step) * step;
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export default function CreditsChart() {
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const max = niceMax(Math.max(...CREDIT_USAGE.map((d) => d.value)));
  const n = CREDIT_USAGE.length;

  const xAt = (i) => PAD.left + (i / (n - 1)) * PLOT_W;
  const yAt = (v) => PAD.top + (1 - v / max) * PLOT_H;

  const points = CREDIT_USAGE.map((d, i) => [xAt(i), yAt(d.value)]);
  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = `${linePath} L${points[n - 1][0]},${PAD.top + PLOT_H} L${points[0][0]},${PAD.top + PLOT_H} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(max * f));

  function handleMove(e) {
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let best = Infinity;
    points.forEach(([x], i) => {
      const d = Math.abs(x - relX);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  }

  const hover = hoverIndex !== null ? CREDIT_USAGE[hoverIndex] : null;
  const hoverX = hoverIndex !== null ? points[hoverIndex][0] : null;
  const hoverY = hoverIndex !== null ? points[hoverIndex][1] : null;
  const last = CREDIT_USAGE[n - 1];

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 8}
              y={yAt(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-[var(--color-text-faint)] text-[10px]"
            >
              {t.toLocaleString()}
            </text>
          </g>
        ))}

        {CREDIT_USAGE.map((d, i) => {
          if (i % 3 !== 0 && i !== n - 1) return null;
          return (
            <text
              key={i}
              x={xAt(i)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-[var(--color-text-faint)] text-[10px]"
            >
              {DATE_FMT.format(d.date)}
            </text>
          );
        })}

        <path d={areaPath} fill="var(--color-primary)" fillOpacity={0.1} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <circle
          cx={points[n - 1][0]}
          cy={points[n - 1][1]}
          r={4}
          fill="var(--color-primary)"
          stroke="var(--color-surface)"
          strokeWidth={2}
        />
        <text
          x={points[n - 1][0] - 8}
          y={points[n - 1][1] - 10}
          textAnchor="end"
          className="fill-[var(--color-text)] text-[11px] font-medium"
        >
          {last.value}
        </text>

        {hoverIndex !== null && (
          <>
            <line
              x1={hoverX}
              x2={hoverX}
              y1={PAD.top}
              y2={PAD.top + PLOT_H}
              stroke="var(--color-text-faint)"
              strokeWidth={1}
            />
            <circle
              cx={hoverX}
              cy={hoverY}
              r={5}
              fill="var(--color-primary)"
              stroke="var(--color-surface)"
              strokeWidth={2}
            />
          </>
        )}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute top-2 flex flex-col gap-0.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs shadow-sm"
          style={{
            left: `${(hoverX / WIDTH) * 100}%`,
            transform:
              hoverX / WIDTH > 0.8 ? "translateX(-100%)" : hoverX / WIDTH < 0.2 ? "none" : "translateX(-50%)",
          }}
        >
          <span className="font-medium text-[var(--color-text)]">{hover.value} credits</span>
          <span className="text-[var(--color-text-faint)]">{DATE_FMT.format(hover.date)}</span>
        </div>
      )}
    </div>
  );
}
