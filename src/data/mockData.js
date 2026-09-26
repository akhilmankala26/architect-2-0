// Client-side mock data only — no backend, per build-spec-baseline-clone.md §2.

export const AUTH_PROFILES = {
  google: {
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    org: "Personal",
  },
  github: {
    name: "Alex Rivera",
    email: "alex-rivera@users.noreply.github.com",
    org: "Personal",
  },
  email: {
    name: "Alex Rivera",
    org: "Personal",
  },
};

export function makeUser(method, email) {
  const profile = AUTH_PROFILES[method] ?? AUTH_PROFILES.email;
  return {
    id: "user_1",
    name: profile.name,
    email: email || profile.email,
    org: profile.org,
    roleSelected: null,
    credits: 2450,
    plan: "Free",
    // Signing in with GitHub pre-links the account, per phase-4-design-translation.md §1.
    githubLinked: method === "github",
  };
}

export const SEED_PROJECTS = [
  {
    id: "proj_1",
    name: "Habit Tracker",
    slug: "habit-tracker",
    createdAt: "2026-09-20T10:00:00Z",
    status: "deployed",
    thumbnail: "gradient-1",
    isPublished: true,
    isShared: false,
  },
  {
    id: "proj_2",
    name: "Team Standup Bot",
    slug: "team-standup-bot",
    createdAt: "2026-09-18T14:30:00Z",
    status: "draft",
    thumbnail: "gradient-2",
    isPublished: false,
    isShared: false,
  },
  {
    id: "proj_3",
    name: "Invoice Parser Agent",
    slug: "invoice-parser-agent",
    createdAt: "2026-09-15T09:00:00Z",
    status: "deployed",
    thumbnail: "gradient-3",
    isPublished: true,
    isShared: true,
  },
  {
    id: "proj_4",
    name: "Recipe Planner",
    slug: "recipe-planner",
    createdAt: "2026-09-10T16:45:00Z",
    status: "draft",
    thumbnail: "gradient-4",
    isPublished: false,
    isShared: false,
  },
  {
    id: "proj_5",
    name: "Support Ticket Triage",
    slug: "support-ticket-triage",
    createdAt: "2026-09-08T11:20:00Z",
    status: "deployed",
    thumbnail: "gradient-1",
    isPublished: true,
    isShared: true,
  },
  {
    id: "proj_6",
    name: "Meeting Notes Summarizer",
    slug: "meeting-notes-summarizer",
    createdAt: "2026-09-05T13:00:00Z",
    status: "draft",
    thumbnail: "gradient-2",
    isPublished: false,
    isShared: true,
  },
];

export const INTEGRATIONS = [
  "GitHub",
  "Slack",
  "Notion",
  "Gmail",
  "Google Drive",
  "Jira",
];

export const EXAMPLE_PROMPTS = [
  "A to-do list app with add, complete, and delete",
  "A habit tracker with daily streaks",
  "An agent that triages incoming support tickets",
  "A personal budget dashboard",
];

export const NAV_ITEMS = [
  { id: "home", label: "Home", enabled: true, path: "/home", section: null },
  { id: "projects", label: "My Projects", enabled: true, path: "/projects", section: "Projects" },
  { id: "published", label: "Published Projects", enabled: true, path: "/published", section: "Projects" },
  { id: "shared", label: "Shared Projects", enabled: true, path: "/shared", section: "Projects" },
  { id: "usage", label: "Usage", enabled: true, path: "/usage", section: "Traceability" },
  { id: "prompts", label: "Prompt Library", enabled: true, path: "/prompts", section: "Get started" },
  { id: "marketplace", label: "Agentlets Marketplace", enabled: true, path: "/marketplace", section: "Get started" },
  { id: "theme", label: "Theme Manager", enabled: true, path: "/theme", section: "Get started" },
  { id: "docs", label: "Resources & Docs", enabled: true, path: "/resources", section: "Get started" },
  { id: "account", label: "My Account", enabled: true, path: "/account", section: "footer" },
  { id: "help", label: "Help & Support", enabled: true, path: "/help", section: "footer" },
];
