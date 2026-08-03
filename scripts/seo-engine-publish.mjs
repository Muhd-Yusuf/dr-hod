// Closes the loop for APPROVED engine articles (guide §8): tells the engine
// each one is live so its keyword is marked covered and future articles can
// link to it and won't duplicate it.
//
// Flow: a human reviews a draft at /blog/<slug>/, sets "approved": true in
// data/engine-articles.json, redeploys (so the page is actually live), then
// runs this. It POSTs /v1/articles/{id}/published for every approved article
// that has no published_at yet, and records published_at locally.
//
// Env: SEO_KEY (required), SEO_BASE (default https://seo.bles-software.com),
//      SITE_BASE (default https://www.dr-hod.info) — the public canonical host.
//
// Run: SEO_KEY=... node scripts/seo-engine-publish.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "data", "engine-articles.json");

const KEY = process.env.SEO_KEY;
const BASE = process.env.SEO_BASE || "https://seo.bles-software.com";
const SITE = (process.env.SITE_BASE || "https://www.dr-hod.info").replace(/\/$/, "");

if (!KEY) {
  console.error("✗ SEO_KEY is not set.");
  process.exit(1);
}
if (!fs.existsSync(FILE)) {
  console.error("✗ data/engine-articles.json not found — run seo-engine-sync.mjs first.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const pending = (data.articles || []).filter((a) => a.approved && !a.published_at);

if (pending.length === 0) {
  console.log("Nothing to publish: no approved article is awaiting the /published callback.");
  process.exit(0);
}

let done = 0;
for (const a of pending) {
  const url = `${SITE}/blog/${a.slug}/`;
  const res = await fetch(`${BASE}/v1/articles/${a.id}/published`, {
    method: "POST",
    headers: { "X-API-Key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`✗ ${res.status} publishing ${a.id} (${a.slug}): ${body.slice(0, 200)}`);
    continue;
  }
  a.published_at = new Date().toISOString();
  done++;
  console.log(`✓ marked published on the engine: ${url}`);
}

fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`Done. ${done}/${pending.length} article(s) closed the loop.`);
