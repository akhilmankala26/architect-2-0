import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUp, GitBranch, Mic, Paperclip, Sparkle } from "lucide-react";
import IntegrationRow from "../components/IntegrationRow";
import Badge2_0 from "../components/Badge2_0";
import logo from "../assets/logo.png";
import { EXAMPLE_PROMPTS } from "../data/mockData";

const ROTATING_PLACEHOLDERS = [
  "Build me an Intercom-like customer support agent",
  "Build me a knowledge base like Perplexity",
  "Build me a to-do list with add, complete, and delete",
  "Build me a dashboard for tracking weekly spend",
];

export default function Landing() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  function handleBuildClick(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setShowAuth(true);
  }

  function continueWith(method) {
    navigate(`/auth?method=${method}`, { state: { prompt: prompt.trim() || undefined } });
  }

  function submitEmail(e) {
    e.preventDefault();
    if (!email.trim()) return;
    navigate(`/auth?method=email&email=${encodeURIComponent(email.trim())}`, {
      state: { prompt: prompt.trim() || undefined },
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[var(--color-bg)] px-6">
      <header className="flex w-full max-w-6xl items-center justify-between py-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8 rounded-lg object-cover" />
          <span className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
            Architect
          </span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-[var(--color-text-muted)] sm:flex">
          <a href="#" className="transition-colors hover:text-[var(--color-text)]">
            How it works
          </a>
          <a href="#" className="transition-colors hover:text-[var(--color-text)]">
            Marketplace
          </a>
          <a href="#" className="transition-colors hover:text-[var(--color-text)]">
            Docs
          </a>
          <button
            onClick={() => setShowAuth(true)}
            className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
          >
            Sign in
          </button>
        </nav>
      </header>

      <main className="flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-9 py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
            <Sparkle size={11} className="text-[var(--color-primary)]" />
            Prompt-to-app, agents included
            <Badge2_0 title="Architect 2.0: the prompt box now lives on the landing page itself — sign-in only happens after you click Build, with your prompt preserved through auth." />
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-[2.75rem]">
            Describe the app.
            <br />
            Architect builds it.
          </h1>
          <p className="max-w-md text-base text-[var(--color-text-muted)]">
            Full-stack apps with agents baked in — no code required, full code
            available if you want it.
          </p>
        </div>

        {!showAuth ? (
          <div className="flex w-full max-w-lg flex-col items-center gap-4">
            <form
              onSubmit={handleBuildClick}
              className="w-full rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left shadow-sm focus-within:border-[var(--color-primary)]"
            >
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
                rows={2}
                className="w-full resize-none bg-transparent text-[15px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)]"
              />
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  title="Attach a file"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-muted)]"
                >
                  <Paperclip size={15} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Voice input"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-faint)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-muted)]"
                  >
                    <Mic size={15} />
                  </button>
                  <button
                    type="submit"
                    disabled={!prompt.trim()}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>
                </div>
              </div>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {EXAMPLE_PROMPTS.map((example) => (
                <button
                  key={example}
                  onClick={() => setPrompt(example)}
                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
            <p className="mb-4 text-sm font-medium text-[var(--color-text)]">
              {prompt.trim() ? "Sign in to start building" : "Sign in to Architect"}
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => continueWith("google")}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
              >
                <GoogleGlyph />
                Continue with Google
              </button>
              <button
                onClick={() => continueWith("github")}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
              >
                <GitBranch size={16} />
                Continue with GitHub
                <Badge2_0 title="Architect 2.0: GitHub is now a first-class sign-in option, not just a later integration — signing in this way pre-links your account for auto-sync." />
              </button>
            </div>

            <div className="my-3 flex items-center gap-3 text-xs text-[var(--color-text-faint)]">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              or
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            {!showEmailForm ? (
              <button
                onClick={() => setShowEmailForm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                Continue with email
              </button>
            ) : (
              <form onSubmit={submitEmail} className="flex flex-col gap-2">
                <input
                  autoFocus
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-primary)]"
                />
                <button
                  type="submit"
                  className="brand-gradient flex items-center justify-center gap-1.5 rounded-[var(--radius-control)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Continue
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            <p className="mt-3 text-center text-[11px] text-[var(--color-text-faint)]">
              No phone verification, ever.
            </p>

            {prompt.trim() && (
              <button
                onClick={() => setShowAuth(false)}
                className="mt-3 w-full text-center text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
              >
                ← Back to editing your prompt
              </button>
            )}
          </div>
        )}

        <IntegrationRow />
      </main>

      <footer className="pb-8 text-xs text-[var(--color-text-faint)]">
        © 2026 Architect. All rights reserved.
      </footer>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.5H24v7h11.3C33.9 31.7 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5-5C32.6 7.9 28.5 6 24 6 13.5 6 5 14.5 5 25s8.5 19 19 19s19-8.5 19-19c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l5.8 4.2C13.6 15.2 18.4 12 24 12c2.8 0 5.3 1 7.3 2.7l5-5C32.6 5.9 28.5 4 24 4 16 4 9.1 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-1.8 13.5-5.1l-6.2-5.3C29.4 35.7 26.9 36.5 24 36.5c-5.4 0-9.9-3.2-11.4-7.8l-6.1 4.7C9 39.8 15.9 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.5H24v7h11.3c-.9 2.6-2.6 4.7-4.9 6.1l6.2 5.3C40.6 36.1 43 30.9 43 25c0-1.5-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
