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
  };
});

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
};

export const posts: Post[] = `;

fs.writeFileSync(OUT, header + JSON.stringify(posts, null, 2) + ";\n", "utf8");
console.log(`Wrote ${posts.length} posts → ${path.relative(ROOT, OUT)}`);
for (const p of posts) console.log(`  /${p.slug}/  (${p.body.length} blocks, img:${p.image ? "yes" : "no"})`);
