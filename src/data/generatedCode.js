export const GENERATED_FILES = [
  {
    name: "TodoApp.jsx",
    path: "src/TodoApp.jsx",
    content: `export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", done: false },
    { id: 2, text: "Write weekly report", done: true },
  ]);
  const [draft, setDraft] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (!draft.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: draft, done: false },
    ]);
    setDraft("");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // ...render add/complete/delete UI
}`,
  },
  {
    name: "App.jsx",
    path: "src/App.jsx",
    content: `import TodoApp from "./TodoApp";

export default function App() {
  return (
    <main className="app-shell">
      <TodoApp />
    </main>
  );
}`,
  },
  {
    name: "index.css",
    path: "src/index.css",
    content: `.app-shell {
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
}

.task-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
}`,
  },
];

export const TERMINAL_LINES = [
  "$ npm install",
  "added 214 packages in 3.1s",
  "$ npm run dev",
  "  VITE  ready in 312 ms",
  "  ➜  Local:   http://localhost:5173/",
];
