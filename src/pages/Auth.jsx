import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const STEPS = {
  google: ["Connecting to Google…", "Verifying your account…", "Setting up your workspace…"],
  github: ["Connecting to GitHub…", "Authorizing Architect…", "Setting up your workspace…"],
  email: ["Verifying your email…", "Creating your account…", "Setting up your workspace…"],
};

const VALID_METHODS = ["google", "github", "email"];

export default function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();
  const requestedMethod = params.get("method");
  const method = VALID_METHODS.includes(requestedMethod) ? requestedMethod : "google";
  const email = params.get("email") || "";
  const prompt = state?.prompt;
  const [stepIndex, setStepIndex] = useState(0);
  const steps = STEPS[method];

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    }, 480);

    login(method, email).then(() => {
      if (prompt) {
        navigate("/build", { replace: true, state: { prompt } });
      } else {
        navigate("/home", { replace: true });
      }
    });

    return () => clearInterval(stepTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-bg)] px-6">
      <div className="brand-gradient flex h-12 w-12 animate-pulse items-center justify-center rounded-xl">
        <Sparkles size={22} className="text-white" strokeWidth={2} />
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
        <p className="text-sm text-[var(--color-text-muted)]">{steps[stepIndex]}</p>
      </div>
    </div>
  );
}
