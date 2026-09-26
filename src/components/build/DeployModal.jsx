import { useState } from "react";
import { Check, Copy, Rocket, Store, ShieldCheck, X } from "lucide-react";
import Modal from "./Modal";
import Badge2_0 from "../Badge2_0";

const DEPLOY_URL = "my-tasks-app.architect-clone.app";

// Deploy state lives in the parent (Build.jsx), not here — closing this modal
// mid-deploy doesn't cancel it, matching Lovable's "close and keep chatting"
// pattern from phase-4-design-translation.md §7 ("non-blocking publish").
export default function DeployModal({ deploy, onStartDeploy, onClose }) {
  const [marketplace, setMarketplace] = useState(deploy.marketplace);
  const [securityScan, setSecurityScan] = useState(deploy.securityScan);
  const [copied, setCopied] = useState(false);
  const [watermarkDismissed, setWatermarkDismissed] = useState(false);

  function copyUrl() {
    navigator.clipboard?.writeText(`https://${DEPLOY_URL}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Modal title="Deploy" onClose={onClose}>
      {deploy.status === "idle" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text)]">
              <Store size={15} className="text-[var(--color-text-faint)]" />
              List in Agentlets Marketplace
            </div>
            <Switch checked={marketplace} onChange={setMarketplace} />
          </div>

          <button
            onClick={() => setSecurityScan((v) => !v)}
            className="flex items-center justify-between rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 text-left"
          >
            <span className="flex items-center gap-2 text-sm text-[var(--color-text)]">
              <ShieldCheck size={15} className="text-[var(--color-text-faint)]" />
              Run a security scan before deploying
              <Badge2_0 title="Architect 2.0: an optional deep security scan, offered as a pre-deploy checkbox — modeled on Replit's Security Agent but surfaced earlier so a non-technical user actually notices it." />
            </span>
            <Switch checked={securityScan} onChange={setSecurityScan} />
          </button>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--color-text-faint)]">Custom domain</label>
            <input
              disabled
              placeholder="yourdomain.com — upgrade to enable"
              className="w-full cursor-not-allowed rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-faint)] placeholder:text-[var(--color-text-faint)]"
            />
          </div>

          <p className="text-[11px] text-[var(--color-text-faint)]">
            Free-tier deploys show a small "Built with Architect" badge —
            removable on a paid plan. Deploys never expire and are always free.
          </p>

          <button
            onClick={() => onStartDeploy(marketplace, securityScan)}
            className="brand-gradient flex items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Rocket size={15} />
            Deploy
          </button>
        </div>
      )}

      {deploy.status === "deploying" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" />
            <p className="text-sm text-[var(--color-text-muted)]">{deploy.message}</p>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <button
              onClick={onClose}
              className="text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text-muted)]"
            >
              Close this and keep chatting — I'll finish in the background
            </button>
            <Badge2_0 title="Architect 2.0: deploy state lives outside this dialog, so closing it mid-deploy genuinely doesn't cancel — this isn't just a claim, the top bar reflects live status even with the modal closed." />
          </div>
        </div>
      )}

      {deploy.status === "deployed" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-[var(--color-success)]">
            <Check size={15} strokeWidth={2.5} />
            Deployed — permanent, free hosting
          </div>
          <div className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">
            <span className="truncate text-sm text-[var(--color-text)]">{DEPLOY_URL}</span>
            <button
              onClick={copyUrl}
              className="flex shrink-0 items-center gap-1 text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {deploy.securityScan && (
            <div className="flex items-center gap-2 text-xs text-[var(--color-success)]">
              <ShieldCheck size={13} />
              Security scan passed — no issues found.
            </div>
          )}

          {deploy.marketplace && (
            <p className="text-xs text-[var(--color-text-faint)]">
              Also published to the Agentlets Marketplace for others to discover and clone.
            </p>
          )}

          {!watermarkDismissed && (
            <div className="flex items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs text-[var(--color-text-faint)]">
              <span>⚡ Built with Architect badge shown on this deploy</span>
              <button onClick={() => setWatermarkDismissed(true)} className="hover:text-[var(--color-text)]">
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={[
        "relative h-5 w-9 shrink-0 rounded-full transition-colors",
        checked ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}
