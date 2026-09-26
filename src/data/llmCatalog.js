// A small, illustrative model catalog used to power the "best LLM match"
// recommendation shown when a user adds an agent. Pricing is per 1M tokens —
// directionally realistic, not live pricing.
export const LLM_MODELS = [
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    tier: "fast",
    inputPer1M: 0.15,
    outputPer1M: 0.6,
    speed: 5,
    quality: 3,
    tags: ["triage", "classification", "routing", "faq", "lookup", "high-volume", "simple", "labeling"],
  },
  {
    id: "gpt-5-1-mini",
    name: "GPT-5.1 Mini",
    provider: "OpenAI",
    tier: "fast",
    inputPer1M: 0.25,
    outputPer1M: 1.0,
    speed: 5,
    quality: 3,
    tags: ["triage", "classification", "support", "drafting", "simple", "faq"],
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    tier: "fast",
    inputPer1M: 0.8,
    outputPer1M: 4.0,
    speed: 4,
    quality: 4,
    tags: ["triage", "classification", "support", "drafting", "coding-assist", "summarize"],
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    tier: "balanced",
    inputPer1M: 1.25,
    outputPer1M: 5.0,
    speed: 3,
    quality: 4,
    tags: ["research", "analysis", "long-context", "summarize", "writing", "balanced"],
  },
  {
    id: "gpt-5-1",
    name: "GPT-5.1",
    provider: "OpenAI",
    tier: "balanced",
    inputPer1M: 2.5,
    outputPer1M: 10.0,
    speed: 3,
    quality: 5,
    tags: ["writing", "analysis", "coding", "agentic", "tool-use", "balanced"],
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    provider: "Anthropic",
    tier: "balanced",
    inputPer1M: 3.0,
    outputPer1M: 15.0,
    speed: 3,
    quality: 5,
    tags: ["coding", "writing", "analysis", "agentic", "tool-use", "balanced", "code review"],
  },
  {
    id: "gpt-5-1-pro",
    name: "GPT-5.1 Pro",
    provider: "OpenAI",
    tier: "flagship",
    inputPer1M: 12.0,
    outputPer1M: 60.0,
    speed: 2,
    quality: 5,
    tags: ["complex reasoning", "architecture", "research", "multi-step", "critical"],
  },
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    provider: "Anthropic",
    tier: "flagship",
    inputPer1M: 15.0,
    outputPer1M: 75.0,
    speed: 2,
    quality: 5,
    tags: ["complex reasoning", "architecture", "research", "multi-step", "critical", "code review"],
  },
];

const TIER_HINTS = {
  fast: ["simple", "triage", "classify", "classification", "route", "routing", "faq", "lookup", "label", "high volume", "high-volume", "quick", "cheap"],
  flagship: ["complex", "reasoning", "architecture", "critical", "multi-step", "research", "deep", "advanced", "hard"],
};

function scoreModel(model, words) {
  let score = 0;
  for (const tag of model.tags) {
    const tagWords = tag.split(/\s|-/);
    if (tagWords.every((tw) => words.includes(tw))) score += 3;
    else if (tagWords.some((tw) => words.includes(tw))) score += 1;
  }
  for (const hint of TIER_HINTS.fast) {
    if (words.includes(hint) && model.tier === "fast") score += 2;
  }
  for (const hint of TIER_HINTS.flagship) {
    if (words.includes(hint) && model.tier === "flagship") score += 2;
  }
  return score;
}

// Returns { recommended, alternatives: [one per other tier], reasoning }
export function recommendModel(text) {
  const words = (text || "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  const scored = LLM_MODELS.map((model) => ({ model, score: scoreModel(model, words) }));
  scored.sort((a, b) => b.score - a.score);

  const recommended = scored[0].model;
  const alternatives = ["fast", "balanced", "flagship"]
    .filter((tier) => tier !== recommended.tier)
    .map((tier) => scored.find((s) => s.model.tier === tier).model);

  const reasoning = buildReasoning(recommended, words);

  return { recommended, alternatives, reasoning };
}

function buildReasoning(model, words) {
  const matchedTags = model.tags.filter((tag) =>
    tag.split(/\s|-/).some((tw) => words.includes(tw)),
  );
  if (model.tier === "fast") {
    return matchedTags.length
      ? `This reads like a ${matchedTags[0]} task — deterministic and high-frequency, so a fast, low-cost model is the better trade than paying for reasoning depth you won't use.`
      : "Nothing here needs deep multi-step reasoning, so a fast, low-cost model covers it without overpaying for capability you won't use.";
  }
  if (model.tier === "flagship") {
    return matchedTags.length
      ? `This involves ${matchedTags[0]}, where mistakes are costly — worth paying for the strongest available reasoning rather than risking a cheaper model's error rate.`
      : "This looks open-ended enough that reasoning quality matters more than cost per call — a flagship model reduces the risk of subtle errors.";
  }
  return matchedTags.length
    ? `This is a ${matchedTags[0]} task — enough complexity to need a capable model, but not so high-stakes that it needs a flagship-tier price tag.`
    : "This sits in the middle: more than a lookup, less than open-ended research — a balanced model is the better cost-to-capability trade.";
}

// Rough monthly cost estimate for a given usage volume, used in the
// cost-benefit comparison. Assumes a short agent turn (~600 in / ~300 out).
export function estimateMonthlyCost(model, requestsPerMonth = 10_000) {
  const avgInputTokens = 600;
  const avgOutputTokens = 300;
  const inputCost = (requestsPerMonth * avgInputTokens) / 1_000_000 * model.inputPer1M;
  const outputCost = (requestsPerMonth * avgOutputTokens) / 1_000_000 * model.outputPer1M;
  return inputCost + outputCost;
}
