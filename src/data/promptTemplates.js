export const PROMPT_ROLES = ["Founder", "Marketer", "Engineer", "Support", "Sales"];

export const PROMPT_TEMPLATES = [
  { id: "p1", roleCategory: "Founder", title: "Landing page waitlist", promptText: "A landing page with a waitlist signup form that stores emails" },
  { id: "p2", roleCategory: "Founder", title: "Pitch deck feedback tracker", promptText: "A board to collect and tag investor feedback on a pitch deck" },
  { id: "p3", roleCategory: "Founder", title: "Cap table viewer", promptText: "A simple cap table viewer with ownership percentages by round" },
  { id: "p4", roleCategory: "Marketer", title: "Campaign performance dashboard", promptText: "A dashboard comparing campaign spend against signups by channel" },
  { id: "p5", roleCategory: "Marketer", title: "Social caption generator", promptText: "An agent that writes three caption variants for a product photo" },
  { id: "p6", roleCategory: "Marketer", title: "Newsletter curator", promptText: "An agent that picks the week's best links and drafts a newsletter" },
  { id: "p7", roleCategory: "Engineer", title: "Code review assistant", promptText: "An agent that flags style and correctness issues on a pull request" },
  { id: "p8", roleCategory: "Engineer", title: "Bug triage board", promptText: "A kanban board that auto-labels new bugs by severity" },
  { id: "p9", roleCategory: "Engineer", title: "Release notes writer", promptText: "An agent that turns a list of merged PRs into release notes" },
  { id: "p10", roleCategory: "Support", title: "Ticket triage", promptText: "An agent that triages incoming support tickets by urgency" },
  { id: "p11", roleCategory: "Support", title: "FAQ responder", promptText: "An agent that answers common questions from our help docs" },
  { id: "p12", roleCategory: "Support", title: "Customer sentiment tracker", promptText: "A dashboard tracking customer sentiment from support tickets over time" },
  { id: "p13", roleCategory: "Sales", title: "Lead qualifier", promptText: "An agent that scores inbound leads against our ideal customer profile" },
  { id: "p14", roleCategory: "Sales", title: "Cold outreach writer", promptText: "An agent that personalizes a cold email using a prospect's profile" },
  { id: "p15", roleCategory: "Sales", title: "Churn risk flagger", promptText: "An agent that flags accounts with declining usage before renewal" },
];
