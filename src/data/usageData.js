// Static daily credit usage for the last 14 days — no backend, per spec §2.
const RAW_VALUES = [120, 80, 200, 150, 60, 30, 175, 140, 210, 95, 110, 260, 180, 90];

const TODAY = new Date("2026-09-26T00:00:00Z");

export const CREDIT_USAGE = RAW_VALUES.map((value, i) => {
  const date = new Date(TODAY);
  date.setDate(date.getDate() - (RAW_VALUES.length - 1 - i));
  return { date, value };
});

export const USAGE_SUMMARY = {
  totalUsed: RAW_VALUES.reduce((a, b) => a + b, 0),
  remaining: 2450,
  plan: "Free",
};
