// Approves the oldest N pending engine article(s) (default 1) so the scheduled
// job publishes at most one per run — the cadence the client asked for
// (one on Sunday, one on Wednesday, never two on the same day).
//
// "Pending" = pulled but not yet approved and not yet published. Ordered by the
// engine's ready_at so the oldest draft goes first.
//
// Run: node scripts/seo-engine-approve.mjs [count]
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "data", "engine-articles.json");
const N = Math.max(1, parseInt(process.argv[2] || "1", 10) || 1);

if (!fs.existsSync(FILE)) {
  console.error("✗ data/engine-articles.json not found — run seo-engine-sync.mjs first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const pending = (data.articles || [])
  .filter((a) => !a.approved && !a.published_at)
  .sort((x, y) => (x.ready_at || 0) - (y.ready_at || 0));

if (pending.length === 0) {
  console.log("No pending drafts to approve.");
  process.exit(0);
}

const picked = pending.slice(0, N);
for (const a of picked) {
  a.approved = true;
  console.log(`approved for publish: /blog/${a.slug}/  (${a.title})`);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Approved ${picked.length} of ${pending.length} pending.`);
