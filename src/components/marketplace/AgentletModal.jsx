import { useState } from "react";
import { Eye, GitFork, Star, Check } from "lucide-react";
import Modal from "../build/Modal";
import AgentletThumbnail from "./AgentletThumbnail";

export default function AgentletModal({ agentlet, onClose }) {
  const [cloned, setCloned] = useState(false);

  return (
    <Modal title={agentlet.name} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <AgentletThumbnail category={agentlet.category} standalone />
        <span className="w-fit rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
          {agentlet.category}
        </span>
        <p className="text-sm text-[var(--color-text-muted)]">{agentlet.description}</p>

        <div className="flex items-center gap-4 text-xs text-[var(--color-text-faint)]">
          <span className="flex items-center gap-1">
            <Eye size={13} /> {agentlet.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={13} /> {agentlet.clones.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="text-[var(--color-warning)]" /> {agentlet.rating}
          </span>
          <span>by {agentlet.author}</span>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]">
            View
          </button>
          <button
            onClick={() => setCloned(true)}
            disabled={cloned}
            className="brand-gradient flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {cloned ? <Check size={14} /> : <GitFork size={14} />}
            {cloned ? "Cloned to My Projects" : "Clone"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
