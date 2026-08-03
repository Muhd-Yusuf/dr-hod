// Generates src/lib/posts.ts from the live WordPress REST export
// (data/wp-posts.json). Decodes Hebrew slugs, strips Elementor/Gutenberg
// HTML to clean paragraphs, and applies the client's PDF content rules.
//
// Run: node scripts/gen-posts.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IN = path.join(ROOT, "data", "wp-posts.json");
const OUT = path.join(ROOT, "src", "lib", "posts.ts");

let raw = fs.readFileSync(IN, "utf8").trim();
// The clipboard paste sometimes contains the array twice ( ...}][{... ).
const dbl = raw.indexOf("][");
if (dbl !== -1) raw = raw.slice(0, dbl + 1);
const records = JSON.parse(raw);

const ENT = {
  "&quot;": '"', "&#8211;": "–", "&#8230;": "…", "&nbsp;": " ",
  "&amp;": "&", "&#038;": "&", "&lt;": "<", "&gt;": ">", " ": " ",
  "‏": "", "‎": "",
};
const decodeEntities = (s) =>
  s.replace(/&quot;|&#8211;|&#8230;|&nbsp;|&amp;|&#038;|&lt;|&gt;| |‏|‎/g, (m) => ENT[m] ?? m);

const stripTags = (s) => decodeEntities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

// Pull block-level text (paragraphs, list items, sub-headings) in order.
function blocks(html) {
  const out = [];
  const re = /<(p|li|h[2-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = stripTags(m[2]);
    if (text) out.push({ tag: m[1].toLowerCase(), text });
  }
  return out;
}

// Featured / first content image (prefer a non-thumbnail size).
function firstImage(html) {
  const m = html.match(/src="(https:\/\/www\.dr-hod\.info\/wp-content\/uploads\/[^"]+?\.(?:jpe?g|png))"/i);
  return m ? m[1] : null;
}

// ---- Client PDF rules, applied to body text ----
function applyRules(t) {
  // Experience: 40+ years (never 30)
  t = t.replace(/מעל\s*30/g, "מעל 40").replace(/מ-?\s*30/g, "מ-40").replace(/30\s*שנ/g, "40 שנ");
  // Banned title "מומחה" when it describes Dr Hod → use a permitted alternative.
  // (External implant/root-canal specialists aren't named in these posts.)
  t = t.replace(/מומחה/g, "מנוסה");
  // No laughing gas; he uses NLP / acupuncture / TV / jokes instead.
  t = t
    .replace(/בגז צחוק או דיקור סיני/g, "בדיקור סיני")
    .replace(/גז צחוק או דיקור סיני/g, "דיקור סיני")
    .replace(/גז צחוק,\s*/g, "")
    .replace(/גז צחוק\s*/g, "");
  return t.replace(/\s+/g, " ").trim();
}

// Strip the inline phone / address / hours / site-name / CTA fragments that the
// new template renders itself — WITHOUT discarding the surrounding real copy.
function cleanInline(t) {
  return t
    .replace(/לתיאום[^.!?]*?חייגו כעת/g, "")
    .replace(/לתיאום[^.!?]*?התקשרו[^.!?]*/g, "")
    .replace(/התקשרו\s*(עכשיו|עוד היום|כעת)/g, "")
    .replace(/tel:\S+/g, "")
    .replace(/052-?\s?917-?2942|052-?9172942|0529172942/g, "")
    .replace(/054-?559-?4444|054-5594444/g, "")
    .replace(/https?:\/\/(?:www\.)?dr-hod\.info\/?/gi, "")
    .replace(/dr-hod\.info/gi, "")
    .replace(/קליניקה\s*:?\s*\/?\s*/g, "")
    .replace(/נייד\s*:?\s*/g, "")
    .replace(/ה?וורדים\s*34,?\s*יהוד\.?/g, "")
    .replace(/א\s*[–-]\s*ה\s*:\s*\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2}(?:\s*,\s*\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2})?/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/[\/|,\s–-]+$/g, "")
    .trim();
}

// Drop a block only if it is empty or a pure legal disclaimer.
function isDrop(t) {
  return (
    !t ||
    /^[*]{2,}/.test(t) ||
    /מידע זה אינו מהווה ייעוץ/.test(t) ||
    /לא נועד לאבחן|לא נועד לטפל/.test(t) ||
    /^[.,\s–-]*$/.test(t)
  );
}

function category(title, body) {
  const s = title + " " + body;
  if (/נחיר/.test(s)) return "נחירות";
  if (/חירום|עזרה ראשונה|כאב חד|דימום/.test(s)) return "חירום";
  if (/לייזר/.test(s)) return "לייזר";
  if (/השתל/.test(s)) return "השתלות";
  if (/ילדים/.test(s)) return "ילדים";
  return "כללי";
}

// Local fallback images by topic (the live wp-content images are Cloudflare-
// locked, so we can't hot-link them). Rotated for visual variety.
// PLACEHOLDERS — swap for the client's real photos when supplied.
const LOCAL_IMAGES = {
  נחירות: ["/images/article-snoring1.jpg", "/images/article-snoring2.jpg", "/images/svc-snoring.jpg", "/images/article-fotona.jpg"],
  חירום: ["/images/article-emergency.jpg", "/images/article-firstaid.jpg", "/images/svc-emergency.jpg"],
  לייזר: ["/images/article-fotona.jpg", "/images/svc-snoring.jpg"],
  השתלות: ["/images/svc-implants.jpg", "/images/svc-rehabilitation.jpg"],
  ילדים: ["/images/svc-general.jpg", "/images/article-clinic.jpg"],
  כללי: ["/images/svc-general.jpg", "/images/article-clinic.jpg", "/images/svc-whitening.jpg", "/images/svc-rehabilitation.jpg"],
};
const catCount = {};
function localImage(cat) {
  const list = LOCAL_IMAGES[cat] || LOCAL_IMAGES["כללי"];
  const i = catCount[cat] = (catCount[cat] ?? -1) + 1;
  return list[i % list.length];
}

const posts = records.map((r) => {
  const slug = decodeURIComponent(r.slug);
  const title = applyRules(stripTags(r.title.rendered));
  const all = blocks(r.content.rendered);
  const body = all
    .map((b) => ({ ...b, text: cleanInline(applyRules(b.text)) }))
    .filter((b) => !isDrop(b.text))
    .map((b) => (b.tag.startsWith("h") ? { heading: b.text } : { p: b.text }));
  const cat = category(title, all.map((b) => b.text).join(" "));
  return {
    slug,
    title,
    date: r.date.slice(0, 10),
    category: cat,
    image: localImage(cat), // local placeholder (live images Cloudflare-locked)
    remoteImage: firstImage(r.content.rendered), // real live image, for later 1:1 swap
    body,
    source: "wp",
  };
});

// ---- Merge AI-authored SEO auto-articles (data/auto-articles.json) ----
// These are written in the clean Post shape already (H2 blocks + paragraphs),
// so they skip the WP HTML-stripping path. This EXTENDS the pipeline; the WP
// import above is untouched. Existing WP slugs always win a collision.
const AUTO = path.join(ROOT, "data", "auto-articles.json");
if (fs.existsSync(AUTO)) {
  const wpSlugs = new Set(posts.map((p) => p.slug));
  let autoRecords = [];
  try {
    autoRecords = JSON.parse(fs.readFileSync(AUTO, "utf8").trim() || "[]");
  } catch (e) {
    console.error(`⚠️  Could not parse ${path.relative(ROOT, AUTO)}: ${e.message}`);
  }
  let added = 0;
  for (const a of autoRecords) {
    if (!a.slug || !a.title || !Array.isArray(a.body)) continue;
    if (wpSlugs.has(a.slug)) {
      console.error(`⚠️  auto-article slug collides with a live WP slug, skipped: ${a.slug}`);
      continue;
    }
    posts.push({
      slug: a.slug,
      title: a.title,
      date: (a.date || "").slice(0, 10),
      category: a.category || "כללי",
      image: a.image || localImage(a.category || "כללי"),
      remoteImage: null,
      body: a.body,
      source: "auto",
      description: a.description,
      targetKeyword: a.targetKeyword,
      service: a.service,
    });
    added++;
  }
  if (added) console.log(`+ merged ${added} auto-article(s) from ${path.relative(ROOT, AUTO)}`);
}

// newest first
posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const header = `// AUTO-GENERATED by scripts/gen-posts.mjs from the live dr-hod.info WordPress
// export. Slugs are the exact live Hebrew permalinks (root-level, 1:1 SEO).
// Do not edit by hand — re-run the generator.

export type PostBlock = { p: string } | { heading: string };

export type Post = {
  slug: string;       // exact live Hebrew slug (no leading/trailing slash)
  title: string;
  date: string;       // YYYY-MM-DD
  category: string;
  image: string;          // local image shown now (placeholder)
  remoteImage: string | null; // real live wp-content image, for later swap
  body: PostBlock[];
  source?: "wp" | "auto";   // "auto" = generated by the SEO auto-article job
  description?: string;     // SEO meta description (auto articles)
  targetKeyword?: string;   // the single keyword the article targets
  service?: { href: string; label: string }; // internal link to matching service
};

export const posts: Post[] = `;

fs.writeFileSync(OUT, header + JSON.stringify(posts, null, 2) + ";\n", "utf8");
console.log(`Wrote ${posts.length} posts → ${path.relative(ROOT, OUT)}`);
for (const p of posts) console.log(`  /${p.slug}/  (${p.body.length} blocks, img:${p.image ? "yes" : "no"})`);

// ---- Codegen: src/lib/engine-posts.ts from data/engine-articles.json ----
// The Bles SEO Engine hands back finished articles (see scripts/seo-engine-sync.mjs).
// This is a PURE codegen step (no network) so builds are deterministic offline.
// These render at /blog/<latin-slug>/ — a separate namespace from the SEO-
// critical root Hebrew slugs above, which are never touched.
const ENGINE_IN = path.join(ROOT, "data", "engine-articles.json");
const ENGINE_OUT = path.join(ROOT, "src", "lib", "engine-posts.ts");
const safeParse = (s, fb) => {
  try { return typeof s === "string" ? JSON.parse(s) : (s ?? fb); } catch { return fb; }
};
if (fs.existsSync(ENGINE_IN)) {
  const raw = safeParse(fs.readFileSync(ENGINE_IN, "utf8"), { articles: [] });
  const engine = (raw.articles || []).map((a) => ({
    id: a.id,
    keyword: a.keyword,
    title: a.title,
    slug: a.slug,
    metaTitle: a.meta_title || a.title,
    metaDescription: a.meta_description || a.excerpt || "",
    excerpt: a.excerpt || "",
    bodyHtml: a.body_html || "",
    faq: safeParse(a.faq_json, []),
    schemaJson: typeof a.schema_json === "string" ? a.schema_json : JSON.stringify(a.schema_json ?? {}),
    wordCount: a.word_count || 0,
    approved: !!a.approved,
    publishedAt: a.published_at || null,
    imageSlots: safeParse(a.images_json, []).length,
  }));
  const eHeader = `// AUTO-GENERATED by scripts/gen-posts.mjs from data/engine-articles.json
// (articles pulled from the Bles SEO Engine). Do not edit by hand.
// Rendered at /blog/<slug>/ by src/app/blog/[slug]/page.tsx.
// approved=false → draft: noindex + kept out of the sitemap until the
// practitioner approves (YMYL). Do not edit by hand — re-run the generator.

export type EngineFaq = { q: string; a: string };
export type EngineArticle = {
  id: string;
  keyword: string;
  title: string;         // H1 (not inside bodyHtml)
  slug: string;          // latin, url-safe
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  bodyHtml: string;      // semantic HTML: h2 h3 p ul ol li table strong a
  faq: EngineFaq[];
  schemaJson: string;    // ready-made JSON-LD (raw), drop into a <script>
  wordCount: number;
  approved: boolean;     // false = draft (noindex, not in sitemap)
  publishedAt: string | null;
  imageSlots: number;    // image placements the engine suggested (we supply real photos)
};

export const engineArticles: EngineArticle[] = `;
  fs.writeFileSync(ENGINE_OUT, eHeader + JSON.stringify(engine, null, 2) + ";\n", "utf8");
  const appr = engine.filter((a) => a.approved).length;
  console.log(`Wrote ${engine.length} engine article(s) → ${path.relative(ROOT, ENGINE_OUT)} (${appr} approved, ${engine.length - appr} draft)`);
} else {
  // Emit an empty module so the /blog route always type-checks.
  fs.writeFileSync(ENGINE_OUT, `// AUTO-GENERATED — no data/engine-articles.json present yet.
export type EngineFaq = { q: string; a: string };
export type EngineArticle = { id: string; keyword: string; title: string; slug: string; metaTitle: string; metaDescription: string; excerpt: string; bodyHtml: string; faq: EngineFaq[]; schemaJson: string; wordCount: number; approved: boolean; publishedAt: string | null; imageSlots: number; };
export const engineArticles: EngineArticle[] = [];
`, "utf8");
  console.log(`No data/engine-articles.json — wrote empty ${path.relative(ROOT, ENGINE_OUT)}`);
}
