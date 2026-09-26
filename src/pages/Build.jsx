import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, GitBranch, Rocket, Check } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ChatFeed from "../components/build/ChatFeed";
import PlanPanel from "../components/build/PlanPanel";
import GithubModal from "../components/build/GithubModal";
import DeployModal from "../components/build/DeployModal";
import { BUILD_LOG, planBullets, WHY_ARCHITECTURE } from "../data/buildScript";

let seq = 0;
const nextId = () => `m${++seq}`;

export default function Build() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const prompt = state?.prompt;

  const [messages, setMessages] = useState([]);
  const [phase, setPhase] = useState("quality"); // quality -> plan -> building -> done
  const [bullets, setBullets] = useState([]);
  const [rightTab, setRightTab] = useState("plan");
  const [activeModal, setActiveModal] = useState(null); // null | 'github' | 'deploy'
  const [deploy, setDeploy] = useState({
    status: "idle", // idle -> deploying -> deployed
    marketplace: false,
    securityScan: false,
    message: "",
  });

  useEffect(() => {
    if (!prompt) {
      navigate("/home", { replace: true });
      return;
    }

    setMessages([{ id: nextId(), kind: "user", text: prompt }]);

    const t1 = setTimeout(() => {
      pushMessage({ kind: "quality" });
    }, 500);

    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  function pushMessage(msg) {
    setMessages((prev) => [...prev, { id: nextId(), ...msg }]);
  }

  function updateMessage(id, updater) {
    setMessages((prev) => prev.map((m) => (m.id === id ? updater(m) : m)));
  }

  // Non-blocking prompt-quality read-out — never gates the build, per
  // phase-4-design-translation.md §3 ("I don't want to improve my prompt
  // further" is always available).
  function handleQualityDone(improveChoice) {
    setBullets(planBullets(improveChoice));
    setPhase("plan");
    setRightTab("plan");
    setTimeout(() => {
      pushMessage({
        kind: "text",
        text: "Here's the plan I'd build — take a look in the panel on the right.",
      });
    }, 400);
    setTimeout(() => {
      pushMessage({ kind: "action" });
    }, 900);
  }

  function handleBuildClick() {
    if (phase === "building" || phase === "done") return;
    setPhase("building");
    setRightTab("app");

    const reasoningId = nextId();
    setMessages((prev) => [...prev, { id: reasoningId, kind: "reasoning", lines: [], done: false }]);

    BUILD_LOG.forEach((line, i) => {
      setTimeout(() => {
        updateMessage(reasoningId, (m) => ({ ...m, lines: [...m.lines, line] }));
      }, 500 + i * 750);
    });

    const finishDelay = 500 + BUILD_LOG.length * 750 + 400;
    setTimeout(() => {
      updateMessage(reasoningId, (m) => ({ ...m, done: true }));
      setPhase("done");
      pushMessage({
        kind: "text",
        text: "I tested add → complete → delete on the running app — all three worked as expected.",
      });
      pushMessage({ kind: "text", text: `Why this architecture: ${WHY_ARCHITECTURE}` });
      pushMessage({
        kind: "text",
        text: "No agent was needed for this one — see the Agents tab for why.",
      });
    }, finishDelay);
  }

  // Deploy state is lifted here (not owned by the modal) so closing the
  // dialog mid-deploy never cancels it — phase-4-design-translation.md §7's
  // "non-blocking publish" requirement.
  function startDeploy(marketplace, securityScan) {
    setDeploy({
      status: "deploying",
      marketplace,
      securityScan,
      message: securityScan ? "Running security scan…" : "Deploying…",
    });

    const scanDelay = securityScan ? 1300 : 0;
    if (securityScan) {
      setTimeout(() => {
        setDeploy((d) => ({ ...d, message: "Deploying…" }));
      }, scanDelay);
    }
    setTimeout(() => {
      setDeploy((d) => ({ ...d, status: "deployed" }));
    }, scanDelay + 1400);
  }

  if (!prompt) return null;

  const title = prompt.length > 48 ? `${prompt.slice(0, 48)}…` : prompt;

  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      <Sidebar activeId={null} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          left={
            <>
              <button
                onClick={() => navigate("/home")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <ArrowLeft size={15} />
              </button>
              <span className="truncate text-sm font-medium text-[var(--color-text)]">
                {title}
              </span>
              {phase === "done" && (
                <div className="ml-3 flex items-center gap-2">
                  <button
                    onClick={() => setActiveModal("github")}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    <GitBranch size={13} />
                    GitHub
                  </button>
                  <button
                    onClick={() => setActiveModal("deploy")}
                    className={[
                      "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90",
                      deploy.status === "deployed"
                        ? "border border-[var(--color-success)]/40 bg-[var(--color-success)]/15 text-[var(--color-success)]"
                        : "brand-gradient text-white",
                    ].join(" ")}
                  >
                    {deploy.status === "deployed" ? <Check size={13} /> : <Rocket size={13} />}
                    {deploy.status === "deployed"
                      ? "Deployed"
                      : deploy.status === "deploying"
                        ? "Deploying…"
                        : "Deploy"}
                  </button>
                </div>
              )}
            </>
          }
        />

        <div className="flex flex-1 gap-4 overflow-hidden p-4">
          <div className="flex w-[420px] shrink-0 flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <ChatFeed
              messages={messages}
              onQualityDone={handleQualityDone}
              onBuildClick={handleBuildClick}
              phase={phase}
            />
          </div>

          <div className="flex-1 overflow-hidden">
            <PlanPanel
              phase={phase}
              bullets={bullets}
              activeTab={rightTab}
              onTabChange={setRightTab}
            />
          </div>
        </div>
      </div>

      {activeModal === "github" && <GithubModal onClose={() => setActiveModal(null)} />}
      {activeModal === "deploy" && (
        <DeployModal
          deploy={deploy}
          onStartDeploy={startDeploy}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
