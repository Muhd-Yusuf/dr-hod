// Compresses each engine article photo and self-hosts a small WebP, so the
// article page loads fast. The engine serves the original at full resolution
// (2-3 MB JPEG) which is far too heavy for the web; we resize + re-encode to a
// ~1600px WebP (typically 80-180 KB) and serve it from our own /public.
//
// The output filename embeds the ?v= timestamp, so when the engine REDRAWS an
// image the URL changes and caches (browser + Cloudflare) refresh correctly.
// Stale versions for the same article are removed.
//
// Sets `image_local` (e.g. /images/articles/<id>-<v>.webp) on each record in
// data/engine-articles.json. The site renders that in preference to the remote
// URL. Idempotent: an already-compressed file is skipped.
//
// Run: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const FILE = path.join(ROOT, "data", "engine-articles.json");
const OUTDIR = path.join(ROOT, "public", "images", "articles");
const MAX_WIDTH = 1600;
const QUALITY = 70;

if (!fs.existsSync(FILE)) {
  console.error("✗ data/engine-articles.json not found — run seo-engine-sync.mjs first.");
  process.exit(1);
}
fs.mkdirSync(OUTDIR, { recursive: true });

const versionOf = (url) => (url.match(/[?&]v=(\d+)/) || [])[1] || "0";
const kb = (n) => Math.round(n / 1024);

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
let changed = false;

for (const a of data.articles || []) {
  if (!a.image_url) continue;
  const v = versionOf(a.image_url);
  const name = `${a.id}-${v}.webp`;
  const outPath = path.join(OUTDIR, name);
  const localUrl = `/images/articles/${name}`;

  // Remove any stale versions of this article's image (older ?v=).
  for (const f of fs.readdirSync(OUTDIR)) {
    if (f.startsWith(`${a.id}-`) && f !== name) {
      fs.unlinkSync(path.join(OUTDIR, f));
      console.log(`  - removed stale ${f}`);
    }
  }

  if (fs.existsSync(outPath)) {
    if (a.image_local !== localUrl) { a.image_local = localUrl; changed = true; }
    continue;
  }

  try {
    const res = await fetch(a.image_url);
    if (!res.ok) { console.error(`  ✗ ${res.status} fetching image for ${a.slug}`); continue; }
    const input = Buffer.from(await res.arrayBuffer());
    await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const outSize = fs.statSync(outPath).size;
    a.image_local = localUrl;
    changed = true;
    console.log(`  ✓ ${a.slug}: ${kb(input.length)}KB → ${kb(outSize)}KB  ${localUrl}`);
  } catch (e) {
    console.error(`  ✗ compress failed for ${a.slug}: ${e.message}`);
  }
}

if (changed) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("Updated data/engine-articles.json with image_local paths.");
} else {
  console.log("No image changes.");
}
