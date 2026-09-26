import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import PromptQualityCard from "./PromptQualityCard";
import ReasoningBlock from "./ReasoningBlock";

export default function ChatFeed({ messages, onQualityDone, onBuildClick, phase }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5 no-scrollbar">
      {messages.map((msg) => (
        <MessageRow
          key={msg.id}
          msg={msg}
          onQualityDone={onQualityDone}
          onBuildClick={onBuildClick}
          phase={phase}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageRow({ msg, onQualityDone, onBuildClick, phase }) {
  if (msg.kind === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-[var(--radius-card)] bg-[var(--color-primary)] px-4 py-2.5 text-sm text-white">
          {msg.text}
        </div>
      </div>
    );
  }

  if (msg.kind === "quality") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] w-full">
          <PromptQualityCard onDone={onQualityDone} />
        </div>
      </div>
    );
  }

  if (msg.kind === "reasoning") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%] w-full">
          <ReasoningBlock lines={msg.lines} done={msg.done} />
        </div>
      </div>
    );
  }

  if (msg.kind === "action") {
    const label =
      phase === "building" ? "Building…" : phase === "done" ? "Built ✓" : "Build it →";
    return (
      <div className="flex justify-start">
        <button
          onClick={onBuildClick}
          disabled={phase === "building" || phase === "done"}
          className="brand-gradient flex items-center gap-2 rounded-[var(--radius-control)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {label}
        </button>
      </div>
    );
  }

  // default: architect text bubble
  return (
    <div className="flex items-start gap-2">
      <div className="brand-gradient mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="max-w-[80%] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)]">
        {msg.text}
      </div>
    </div>
  );
}
