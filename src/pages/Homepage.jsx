import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import PromptBox from "../components/PromptBox";
import AdvancedDisclosure from "../components/AdvancedDisclosure";
import ProjectsCarousel from "../components/ProjectsCarousel";
import { useAuth } from "../context/AuthContext";

export default function Homepage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const firstName = user?.name?.split(" ")[0];

  function handlePromptSubmit(prompt) {
    navigate("/build", { state: { prompt } });
  }

  return (
    <div className="flex h-screen bg-[var(--color-bg)]">
      <Sidebar activeId="home" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex flex-1 flex-col items-center gap-14 overflow-y-auto px-6 py-16">
          <div className="flex w-full max-w-2xl flex-col items-center gap-4">
            <h1 className="text-center text-2xl font-medium text-[var(--color-text)]">
              What do you want to build, {firstName}?
            </h1>
            <PromptBox onSubmit={handlePromptSubmit} initialValue={state?.prefill} />
            <AdvancedDisclosure />
            <button
              onClick={() => navigate("/consultant")}
              className="text-sm text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
            >
              Not sure what to build? <span className="text-[var(--color-primary)]">Ask the AI Consultant →</span>
            </button>
          </div>

          <div className="w-full max-w-4xl">
            <ProjectsCarousel />
          </div>
        </main>
      </div>
    </div>
  );
}
