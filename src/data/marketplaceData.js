export const MARKETPLACE_CATEGORIES = [
  "All",
  "Productivity",
  "Support",
  "Sales",
  "Engineering",
  "Content",
];

// Fixed categorical order (never cycled) — first 5 slots of a validated
// CVD-safe categorical palette, assigned in the order categories appear above.
export const CATEGORY_COLORS = {
  Productivity: "#2a78d6", // blue
  Support: "#eb6834", // orange
  Sales: "#1baf7a", // aqua
  Engineering: "#eda100", // yellow
  Content: "#e87ba4", // magenta
};

export const AGENTLETS = [
  { id: "a1", name: "Habit Tracker", category: "Productivity", author: "lyzr-team", views: 4210, clones: 312, rating: 4.8, description: "Daily habit streaks with reminders and a weekly review summary." },
  { id: "a2", name: "Support Ticket Triage", category: "Support", author: "alex-rivera", views: 3890, clones: 501, rating: 4.9, description: "Classifies incoming tickets by urgency and routes them to the right queue." },
  { id: "a3", name: "Meeting Notes Summarizer", category: "Productivity", author: "priya-k", views: 2765, clones: 198, rating: 4.6, description: "Turns a call transcript into action items and a one-paragraph summary." },
  { id: "a4", name: "Lead Qualifier", category: "Sales", author: "sam-chen", views: 5120, clones: 640, rating: 4.7, description: "Scores inbound leads against your ICP and drafts a first-touch email." },
  { id: "a5", name: "Code Review Assistant", category: "Engineering", author: "lyzr-team", views: 6034, clones: 812, rating: 4.9, description: "Flags style and correctness issues on a PR diff before a human review." },
  { id: "a6", name: "Blog Post Drafter", category: "Content", author: "jamie-lee", views: 2210, clones: 145, rating: 4.4, description: "Outlines and drafts a first pass of a blog post from three bullet points." },
  { id: "a7", name: "Invoice Parser", category: "Productivity", author: "alex-rivera", views: 3320, clones: 267, rating: 4.5, description: "Extracts line items and totals from a PDF invoice into a spreadsheet row." },
  { id: "a8", name: "Bug Triage Agent", category: "Engineering", author: "devon-park", views: 4590, clones: 390, rating: 4.7, description: "Labels new issues by severity and suggests a likely owning team." },
  { id: "a9", name: "Cold Outreach Writer", category: "Sales", author: "sam-chen", views: 2980, clones: 210, rating: 4.3, description: "Personalizes a cold email template using a prospect's public profile." },
  { id: "a10", name: "Social Caption Generator", category: "Content", author: "jamie-lee", views: 1870, clones: 98, rating: 4.2, description: "Writes three caption variants for a product photo, tuned to your voice." },
  { id: "a11", name: "Standup Bot", category: "Productivity", author: "priya-k", views: 3105, clones: 275, rating: 4.6, description: "Collects async standup updates and posts a daily digest to your team." },
  { id: "a12", name: "Customer FAQ Responder", category: "Support", author: "devon-park", views: 3660, clones: 301, rating: 4.5, description: "Answers common support questions from your docs, escalates the rest." },
  { id: "a13", name: "Release Notes Writer", category: "Engineering", author: "lyzr-team", views: 1540, clones: 87, rating: 4.4, description: "Turns a list of merged PRs into human-readable release notes." },
  { id: "a14", name: "Budget Dashboard", category: "Productivity", author: "alex-rivera", views: 2440, clones: 176, rating: 4.5, description: "Tracks monthly spend by category with a simple over/under indicator." },
  { id: "a15", name: "Churn Risk Flagger", category: "Sales", author: "sam-chen", views: 2015, clones: 132, rating: 4.3, description: "Flags accounts with declining usage before their renewal date." },
  { id: "a16", name: "Newsletter Curator", category: "Content", author: "jamie-lee", views: 1690, clones: 104, rating: 4.1, description: "Picks the week's best links from your saved reads and drafts a send." },
];
