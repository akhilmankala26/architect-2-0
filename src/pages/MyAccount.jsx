import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import PageShell from "../components/PageShell";
import { useAuth } from "../context/AuthContext";

const TABS = ["Profile", "Organization", "Plans & Credits", "Billing", "Referrals"];

export default function MyAccount() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <PageShell activeId="account">
      <div>
        <h1 className="text-xl font-medium text-[var(--color-text)]">My Account</h1>
      </div>

      <div className="flex gap-1 border-b border-[var(--color-border)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-3 py-2 text-sm transition-colors",
              t === tab
                ? "border-b-2 border-[var(--color-primary)] text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-lg">
        {tab === "Profile" && <ProfileTab />}
        {tab === "Organization" && <OrganizationTab />}
        {tab === "Plans & Credits" && <PlansTab />}
        {tab === "Billing" && <BillingTab />}
        {tab === "Referrals" && <ReferralsTab />}
      </div>
    </PageShell>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-[var(--color-text-faint)]">{label}</label>
      <input
        defaultValue={value}
        className="w-full rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-primary)]"
      />
    </div>
  );
}

function ProfileTab() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <Field label="Name" value={user?.name} />
      <Field label="Email" value={user?.email} />
    </div>
  );
}

function OrganizationTab() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <Field label="Organization name" value={user?.org} />
      <Field label="Members" value="1 member" />
    </div>
  );
}

function PlansTab() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text)]">{user?.plan} plan</span>
          <span className="rounded-full bg-[var(--color-success)]/15 px-2 py-0.5 text-xs font-medium text-[var(--color-success)]">
            Active
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {user?.credits?.toLocaleString()} credits remaining this cycle.
        </p>
      </div>
      <button className="brand-gradient w-fit rounded-[var(--radius-control)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
        Upgrade plan
      </button>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[var(--color-text-muted)]">
        You're on the Free plan — no billing details on file.
      </p>
      <button className="flex w-fit items-center gap-1.5 rounded-[var(--radius-control)] border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]">
        Open Billing Portal
        <ExternalLink size={14} />
      </button>
    </div>
  );
}

function ReferralsTab() {
  const [copied, setCopied] = useState(false);
  const code = "ALEX-RIVERA-K3F9";

  function copy() {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-[var(--color-text-muted)]">
        Share your code — you both get bonus credits when they sign up.
      </p>
      <div className="flex items-center justify-between gap-2 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5">
        <span className="font-mono text-sm text-[var(--color-text)]">{code}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-xs text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-text)]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
