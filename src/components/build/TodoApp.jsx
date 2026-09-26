import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

let nextId = 4;

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", done: false },
    { id: 2, text: "Write weekly report", done: true },
    { id: 3, text: "Call the dentist", done: false },
  ]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);

  function commitEdit(id, text) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() || t.text } : t)),
    );
    setEditingId(null);
  }

  function addTask(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setTasks((prev) => [...prev, { id: nextId++, text: draft.trim(), done: false }]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        <span className="ml-2 text-[11px] text-[var(--color-text-faint)]">my-tasks.app</span>
      </div>

      <div className="p-5">
        <h3 className="mb-4 text-base font-medium text-[var(--color-text)]">My Tasks</h3>

        <form onSubmit={addTask} className="mb-4 flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a task…"
            className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-white disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </form>

        <div className="flex flex-col gap-2">
          {tasks.length === 0 && (
            <p className="py-4 text-center text-sm text-[var(--color-text-faint)]">
              All done — add a new task above.
            </p>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={[
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  task.done
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-primary)]",
                ].join(" ")}
              >
                {task.done && (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M1 5l2.5 2.5L9 1.5" stroke="white" strokeWidth="1.6" fill="none" />
                  </svg>
                )}
              </button>
              {editingId === task.id ? (
                <input
                  autoFocus
                  defaultValue={task.text}
                  onBlur={(e) => commitEdit(task.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit(task.id, e.target.value);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-primary)] bg-[var(--color-bg)] px-2 py-0.5 text-sm text-[var(--color-text)] outline-none"
                />
              ) : (
                <span
                  onClick={() => setEditingId(task.id)}
                  title="Click to edit"
                  className={[
                    "flex-1 cursor-text text-sm",
                    task.done
                      ? "text-[var(--color-text-faint)] line-through"
                      : "text-[var(--color-text)]",
                  ].join(" ")}
                >
                  {task.text}
                </span>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-[var(--color-text-faint)] opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
