// Pulls "ready" articles from the Bles SEO Engine and stores them as local
// DRAFTS in data/engine-articles.json. Nothing is published to the live site
// here — this client is YMYL (a dental clinic), so every article lands as a
// draft for the practitioner to approve (guide §8). Publishing + the
// /published callback happen separately, in seo-engine-publish.mjs, after a
// human flips "approved": true.
//
// Credentials come from the environment, never the repo:
//   SEO_KEY   client API key (X-API-Key)   [required]
//   SEO_BASE  engine base url              [default https://seo.bles-software.com]
//   SEO_CLIENT client id                   [default dr-hod]
//
// Run: SEO_KEY=... node scripts/seo-engine-sync.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "data", "engine-articles.json");

const KEY = process.env.SEO_KEY;
const BASE = process.env.SEO_BASE || "https://seo.bles-software.com";
const CLIENT = process.env.SEO_CLIENT || "dr-hod";

if (!KEY) {
  console.error("✗ SEO_KEY is not set. Put the client key in the environment (e.g. an .env file, git-ignored).");
  process.exit(1);
}

// Fields the site actually renders/needs. We keep the engine payload but also
// carry two LOCAL fields the engine does not own: `approved` and `published_at`.
const KEEP = [
  "id", "keyword", "status", "language", "title", "slug",
  "meta_title", "meta_description", "excerpt", "body_html",
  "faq_json", "schema_json", "internal_links_json", "images_json",
  "word_count", "ready_at",
  // v1.1: the engine draws a photo ~30s after the article is ready.
  // image_url is public (no key) and carries a ?v= timestamp — keep it verbatim.
  "image_url", "image",
];

async function main() {
  const url = `${BASE}/v1/clients/${CLIENT}/articles?status=ready&full=true`;
  const res = await fetch(url, { headers: { "X-API-Key": KEY } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`✗ ${res.status} from engine: ${body.slice(0, 300)}`);
    if (res.status === 401) console.error("  → missing/invalid X-API-Key");
    if (res.status === 403) console.error("  → this key belongs to a different client");
    process.exit(1);
  }
  const data = await res.json();
  const ready = Array.isArray(data.articles) ? data.articles : [];

  // Preserve local state (approval + publish) across syncs, keyed by article id.
  let existing = [];
  if (fs.existsSync(OUT)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT, "utf8")).articles || [];
    } catch {
      /* start fresh if unreadable */
    }
  }
  const prev = new Map(existing.map((a) => [a.id, a]));

  const now = new Date().toISOString();
  let added = 0;
  const merged = new Map(existing.map((a) => [a.id, a]));

  for (const a of ready) {
    const local = prev.get(a.id);
    const rec = {};
    for (const k of KEEP) rec[k] = a[k];
    rec.approved = local?.approved ?? false; // YMYL: default to draft
    rec.published_at = local?.published_at ?? null;
    rec.pulled_at = local?.pulled_at ?? now;
    if (!local) added++;
    merged.set(a.id, rec);
  }

  const articles = [...merged.values()];

  // Backfill photos: the image lands ~30s after an article is ready, and
  // already-published articles predate the feature. For any article still
  // missing image_url, fetch it by id (status=ready only lists un-published ones).
  for (const rec of articles) {
    if (rec.image_url) continue;
    try {
      const r = await fetch(`${BASE}/v1/articles/${rec.id}`, { headers: { "X-API-Key": KEY } });
      if (r.ok) {
        const a = await r.json();
        if (a.image_url) {
          rec.image_url = a.image_url;
          rec.image = a.image;
          console.log(`  + backfilled image for ${rec.slug}`);
        }
      }
    } catch {
      /* leave without an image; a later run will retry */
    }
  }

  // Only rewrite when the article set actually changed (ignore the synced_at
  // stamp) so the cron does not rebuild/commit on every no-op run.
  const changed = JSON.stringify(articles) !== JSON.stringify(existing);
  if (!changed) {
    console.log(`Synced ${ready.length} ready article(s) — no change, file left as-is.`);
    return;
  }

  const out = { client_id: CLIENT, synced_at: now, articles };
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");

  const drafts = out.articles.filter((a) => !a.approved && !a.published_at);
  console.log(`Synced ${ready.length} ready article(s) from the engine → ${path.relative(ROOT, OUT)}`);
  console.log(`  ${added} new, ${out.articles.length} total, ${drafts.length} awaiting approval.`);
  for (const a of out.articles) {
    const state = a.published_at ? "published" : a.approved ? "approved" : "DRAFT";
    console.log(`  [${state}] /blog/${a.slug}/  (${a.word_count}w)  ${a.title}`);
  }
}

main().catch((e) => {
  console.error("✗ sync failed:", e.message);
  process.exit(1);
});
