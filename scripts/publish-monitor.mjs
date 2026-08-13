// Supply-gap monitor. Runs at the END of every scheduled cron run (Sun/Wed).
// It flags the case the client cares about: a scheduled run that published
// NOTHING because the engine had no article ready — the reason Aug 9 was empty.
//
// It writes a running alert log + a small status file, and — if ALERT_WEBHOOK
// is set in the env — POSTs a message so someone is actually notified. Nothing
// here is committed (logs/ is git-ignored, so status survives redeploys).
//
// Env: SEO_KEY (to read the engine ready-queue), SEO_BASE, SEO_CLIENT,
//      ALERT_WEBHOOK (optional Slack/Discord/generic incoming webhook URL).
//
// Run: node scripts/publish-monitor.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "data", "engine-articles.json");
const LOGDIR = path.join(ROOT, "logs");
const STATUS = path.join(LOGDIR, "publish-status.json");
const ALERTS = path.join(LOGDIR, "alerts.log");

const KEY = process.env.SEO_KEY;
const BASE = process.env.SEO_BASE || "https://seo.bles-software.com";
const CLIENT = process.env.SEO_CLIENT || "dr-hod";
const WEBHOOK = process.env.ALERT_WEBHOOK;

fs.mkdirSync(LOGDIR, { recursive: true });
const iso = new Date().toISOString();

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const publishedCount = (data.articles || []).filter((a) => a.published_at).length;

const hadStatus = fs.existsSync(STATUS);
let status = {};
try { status = JSON.parse(fs.readFileSync(STATUS, "utf8")); } catch { /* corrupt/first run */ }

// First ever run: record a baseline, never alert (there is nothing to compare to).
if (!hadStatus) {
  fs.writeFileSync(STATUS, JSON.stringify({ lastRunAt: iso, lastResult: "baseline", publishedCount, consecutiveEmpty: 0 }, null, 2) + "\n");
  console.log(`monitor: baseline initialized (publishedCount=${publishedCount}).`);
  process.exit(0);
}

const prevCount = status.publishedCount ?? publishedCount;
const publishedThisRun = publishedCount > prevCount;

// Best-effort: how many articles the engine currently has ready (un-published).
let readyCount = null;
if (KEY) {
  try {
    const r = await fetch(`${BASE}/v1/clients/${CLIENT}/articles?status=ready`, {
      headers: { "X-API-Key": KEY },
    });
    if (r.ok) { const j = await r.json(); readyCount = j.count ?? (j.articles || []).length; }
  } catch { /* leave unknown */ }
}

let consecutiveEmpty = status.consecutiveEmpty ?? 0;

if (publishedThisRun) {
  consecutiveEmpty = 0;
  console.log(`monitor: OK — published ${publishedCount - prevCount} this run (total ${publishedCount}).`);
} else {
  consecutiveEmpty += 1;
  const msg =
    `[${iso}] WARNING: scheduled run published nothing. ` +
    `engine ready=${readyCount ?? "unknown"}, consecutive empty runs=${consecutiveEmpty}. ` +
    `The engine must have >=1 ready article before each Sun/Wed run to sustain 2/week.`;
  fs.appendFileSync(ALERTS, msg + "\n");
  console.log("monitor: " + msg);

  if (WEBHOOK) {
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `⚠️ Dr-Hod SEO — scheduled publish run found nothing to post (engine ready=${readyCount ?? "?"}, ${consecutiveEmpty} empty run(s) in a row). The engine needs an article ready before each Sun/Wed.`,
        }),
      });
      console.log("monitor: alert webhook sent");
    } catch (e) {
      console.log("monitor: webhook failed —", e.message);
    }
  }
}

fs.writeFileSync(
  STATUS,
  JSON.stringify(
    { lastRunAt: iso, lastResult: publishedThisRun ? "published" : "empty", publishedCount, consecutiveEmpty, lastReadyCount: readyCount },
    null,
    2,
  ) + "\n",
);
