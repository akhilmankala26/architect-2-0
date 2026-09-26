import { useEffect, useState } from "react";
import { GitBranch, Check, Copy, ChevronDown, GitCommitHorizontal } from "lucide-react";
import Modal from "./Modal";
import Badge2_0 from "../Badge2_0";
import { useAuth } from "../../context/AuthContext";
import { slugify } from "../../lib/slug";

const STEPS = ["Redirecting to GitHub…", "Authorizing Architect…", "Creating private repo…"];

const SEED_COMMITS = [
  { hash: "a3f9c2e", message: "Wire up add, complete, and delete handlers", time: "2 min ago" },
  { hash: "e71b04d", message: "Scaffold page layout and components", time: "3 min ago" },
  { hash: "1c88f6a", message: "Initial commit", time: "4 min ago" },
];

export default function GithubModal({ onClose }) {
  const { user } = useAuth();
  // Signing in with GitHub pre-links the account (phase-4-design-translation.md §1),
  // so the connect step is skipped entirely for those sessions.
  const [status, setStatus] = useState(user?.githubLinked ? "connected" : "idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [branch, setBranch] = useState("main");
  const [commitMsg, setCommitMsg] = useState("");
  const [commits, setCommits] = useState(SEED_COMMITS);

  const ownerSlug = slugify(user?.name || "you");
  const repoPath = `${ownerSlug}/my-tasks-app`;
  const repoUrl = `github.com/${repoPath}`;

  useEffect(() => {
    if (status !== "connecting") return;
    setStepIndex(0);
    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 500);
    const doneTimer = setTimeout(() => setStatus("connected"), STEPS.length * 500 + 200);
    return () => {
      clearInterval(stepTimer);
      clearTimeout(doneTimer);
    };
  }, [status]);

  function copyUrl() {
    navigator.clipboard?.writeText(`https://${repoUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function commitAndPush() {
    if (!commitMsg.trim()) return;
    setCommits((prev) => [
      { hash: Math.random().toString(16).slice(2, 9), message: commitMsg.trim(), time: "just now" },
      ...prev,
    ]);
    setCommitMsg("");
  }

  return (
    <Modal title="GitHub" onClose={onClose}>
      {status === "idle" && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Connect once and Architect auto-creates a private repo, then pushes
            every change automatically — no manual commits needed.
          </p>
          <button
            onClick={() => setStatus("connecting")}
            className="flex items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
          >
            <GitBranch size={16} />
            Connect GitHub
          </button>
        </div>
      )}

      {status === "connecting" && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-muted)]">{STEPS[stepIndex]}</p>
        </div>
      )}

      {status === "connected" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-success)]">
            <Check size={15} strokeWidth={2.5} />
            Connected — auto-sync is on
          </div>
          <div className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">
            <span className="truncate text-sm text-[var(--color-text)]">{repoUrl}</span>
            <button
              onClick={copyUrl}
              className="flex shrink-0 items-center gap-1 text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-[var(--color-text-faint)]">
            Every change you make from here pushes to this repo automatically.
          </p>

          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className="flex items-center gap-1 self-start text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <ChevronDown
              size={13}
              className={`transition-transform ${advancedOpen ? "rotate-180" : ""}`}
            />
            Advanced — manual git control
            <Badge2_0 title="Architect 2.0: auto-sync is the default, but a real git panel — branch selection, manual commit/push/pull, commit history — is one click away, never buried behind a separate settings page." />
          </button>

          {advancedOpen && (
            <div className="flex flex-col gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-soft)] bg-[var(--color-bg)] p-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-[var(--color-text-faint)]">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-text)] outline-none"
                >
                  <option value="main">main</option>
                  <option value="dev">dev</option>
                </select>
                <button className="ml-auto rounded-[var(--radius-control)] border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]">
                  Pull
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  value={commitMsg}
                  onChange={(e) => setCommitMsg(e.target.value)}
                  placeholder="Commit message…"
                  className="flex-1 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
                />
                <button
                  onClick={commitAndPush}
                  disabled={!commitMsg.trim()}
                  className="rounded-[var(--radius-control)] border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)] disabled:opacity-40"
                >
                  Commit & push
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {commits.map((c) => (
                  <div key={c.hash} className="flex items-center gap-2 text-xs text-[var(--color-text-faint)]">
                    <GitCommitHorizontal size={12} className="shrink-0" />
                    <span className="font-mono text-[var(--color-text-muted)]">{c.hash}</span>
                    <span className="truncate text-[var(--color-text-muted)]">{c.message}</span>
                    <span className="ml-auto shrink-0">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
