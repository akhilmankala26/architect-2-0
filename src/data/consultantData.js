export const TEAM_SIZES = ["Just me", "2–10", "11–50", "50+"];

export const ROLES = [
  "Founder",
  "Marketer",
  "Developer / Engineering",
  "Solutions Architect",
  "Support",
  "Product Manager",
];

export const TIME_SINKS = [
  "Repetitive data entry",
  "Writing first drafts",
  "Answering the same questions",
  "Manual QA / testing",
  "Tracking tasks across tools",
  "Onboarding new teammates",
];

export const CONSULTANT_TOOLS = ["GitHub", "Slack", "Notion", "Gmail", "Google Drive", "Jira"];

export const ROLE_RECOMMENDATIONS = {
  Founder: [
    { name: "Landing Page + Waitlist", description: "A launch page that captures signups before you've built anything.", prompt: "A landing page with a waitlist signup form that stores emails" },
    { name: "Pitch Feedback Tracker", description: "Collect and tag investor feedback on your deck in one board.", prompt: "A board to collect and tag investor feedback on a pitch deck" },
    { name: "Customer Interview Summarizer", description: "Turns a call transcript into themes and quotable insights.", prompt: "An agent that summarizes customer interview transcripts into themes" },
  ],
  Marketer: [
    { name: "Campaign Performance Dashboard", description: "Compares spend against signups by channel, at a glance.", prompt: "A dashboard comparing campaign spend against signups by channel" },
    { name: "Social Caption Generator", description: "Three on-brand caption variants for any product photo.", prompt: "An agent that writes three caption variants for a product photo" },
    { name: "Newsletter Curator", description: "Picks your week's best links and drafts the send.", prompt: "An agent that picks the week's best links and drafts a newsletter" },
  ],
  "Developer / Engineering": [
    { name: "Code Review Assistant", description: "Flags style and correctness issues before a human review.", prompt: "An agent that flags style and correctness issues on a pull request" },
    { name: "Bug Triage Agent", description: "Labels new issues by severity and suggests an owning team.", prompt: "An agent that triages new bugs by severity and suggests an owning team" },
    { name: "Release Notes Writer", description: "Turns a list of merged PRs into readable release notes.", prompt: "An agent that turns a list of merged PRs into release notes" },
  ],
  "Solutions Architect": [
    { name: "Architecture Decision Log", description: "A running record of technical decisions and their rationale.", prompt: "A log for recording architecture decisions and their rationale" },
    { name: "Agent Orchestration Dashboard", description: "See every agent in a system and how they hand off work.", prompt: "A dashboard showing how multiple agents in a system hand off work" },
    { name: "Integration Health Monitor", description: "Tracks uptime and error rates across connected services.", prompt: "A dashboard tracking uptime and error rates across integrations" },
  ],
  Support: [
    { name: "Ticket Triage Agent", description: "Classifies incoming tickets by urgency and routes them.", prompt: "An agent that triages incoming support tickets by urgency" },
    { name: "FAQ Responder", description: "Answers common questions straight from your help docs.", prompt: "An agent that answers common questions from our help docs" },
    { name: "Customer Sentiment Tracker", description: "Tracks sentiment across tickets over time.", prompt: "A dashboard tracking customer sentiment from support tickets over time" },
  ],
  "Product Manager": [
    { name: "Feature Request Tracker", description: "Collects requests from every channel into one backlog.", prompt: "A board that collects feature requests from every channel into one backlog" },
    { name: "Roadmap Prioritizer", description: "Scores backlog items against reach, impact, and effort.", prompt: "A tool that scores backlog items against reach, impact, and effort" },
    { name: "User Feedback Summarizer", description: "Turns raw user feedback into weekly themes.", prompt: "An agent that summarizes raw user feedback into weekly themes" },
  ],
};
