import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { BUILD_TIPS } from "../../data/buildScript";

export default function TipsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % BUILD_TIPS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-xs text-[var(--color-text-muted)]">
      <Lightbulb size={14} className="mt-0.5 shrink-0 text-[var(--color-warning)]" />
      <span key={index} className="animate-[fadein_0.4s_ease]">
        {BUILD_TIPS[index]}
      </span>
      <style>{`@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
