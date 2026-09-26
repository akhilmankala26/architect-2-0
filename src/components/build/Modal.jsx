import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl shadow-black/50"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-medium text-[var(--color-text)]">{title}</h2>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <X size={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
