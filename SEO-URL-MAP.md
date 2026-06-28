# Dr-Hod SEO URL Migration Map

Source of truth: live dr-hod.info (WordPress + All in One SEO). **Every URL below must be reproduced 1:1** (exact Hebrew slug, trailing slash, root-level path — NOT under /articles/ or /services/).

Site config: `trailingSlash: true`, root-level `/<hebrew-slug>/` for posts.

## post-sitemap.xml — 20 URLs (captured 26/06/2026 as text)

| # | Live URL (slug, root-level, trailing slash) | Topic | Last mod | My build match |
|---|---|---|---|---|
| 1 | `/מחפשים-פתרון-לשינה-רגועה-ושקטה-ללא-נחי/` | snoring – calm sleep | 2026-05-04 | snoring |
| 2 | `/מרפאת-השיניים-המובילה-ביהוד-והאזור/` | leading clinic Yehud + area | 2026-05-04 | leading-clinic-yehud |
| 3 | `/מרפאת-שיניים-המעניקה-טיפולי-עזרה-ראשו/` | clinic – first aid | 2026-05-04 | first-aid-dental |
| 4 | `/מרפאת-השיניים-המובילה-ביהוד-והסביבה/` | leading clinic Yehud + surroundings | 2026-05-04 | leading-clinic-yehud (2nd) |
| 5 | `/דר-יורם-הוד-רופא-שיניים-מנוסה/` | experienced dentist | 2026-05-04 | experienced-dentist |
| 6 | `/נחירות-פוגעות-בשינה-ובאיכות-החיים/` | snoring harms sleep/quality of life | 2026-05-04 | snoring-not-just-nuisance? |
| 7 | `/במקרה-של-מצב-חירום-דנטלי/` | in case of dental emergency | 2026-05-04 | dental-emergency |
| 8 | `/כאשר-מופיעים-כאב-חד-דימום-פתאומי-או-נפי/` | sharp pain / sudden bleeding / swelling | 2026-05-04 | sharp-pain-bleeding |
| 9 | `/נחירות-אינן-רק-מטרד-לילי/` | snoring not just a nightly nuisance | 2026-05-04 | snoring-not-just-nuisance |
| 10 | `/ישנם-גורמים-שונים-לנחירות-לעיתים-הן-מה/` | various causes of snoring | 2026-05-04 | snoring-causes |
| 11 | `/במרפאת-דר-יורם-הוד-ביהוד-מוצע-טיפול-בנ/` | clinic offers snoring treatment | 2026-05-04 | fotona-laser-snoring? |
| 12 | `/סובלים-מנחירות-שמפריעות-לשינה-שלכם/` | suffering from snoring | 2026-03-25 | (new) |
| 13 | `/עזרה-ראשונה-ומצבי-חירום-בתחום-השיניים/` | first aid & dental emergencies | 2026-03-25 | first-aid-dental (2nd) |
| 14 | `/טיפולי-שיניים-בלייזר-כל-מה-שחשוב-לדעת/` | laser dentistry – all to know | 2024-07-07 | (new) |
| 15 | `/טיפול-בנחירות-בלייזר-הדרך-האפקטיבי/` | laser snoring – effective way | 2024-07-07 | fotona-laser-snoring |
| 16 | `/רפואת-שיניים-בלייזר-דנטלי/` | laser dentistry | 2022-09-19 | (new) |
| 17 | `/טיפולי-שיניים-לילדים/` | pediatric dentistry | 2020-08-26 | (new) |
| 18 | `/השתלות-שיניים/` | dental implants | 2020-08-24 | (new / implants) |
| 19 | `/ריח-רע-מהפה/` | bad breath | 2020-08-24 | (new) |
| 20 | `/בדיקת-שיניים/` | dental checkup | 2020-08-24 | (new) |

## page-sitemap.xml — 5 URLs (captured)
| Live URL | Page | My build |
|---|---|---|
| `/` | Home (WP page slug = `ראשי`, High priority) | home — KEEP |
| `/מאמרים-נוספים/` | "More articles" blog hub (16 imgs) | /articles → move here |
| `/מדיניות-פרטיות-דר-יורם-הוד-רופא-שיני/` | Privacy policy | /privacy → move here |
| `/תנאי-שימוש-דר-יורם-הוד/` | Terms of use | /terms → move here |
| `/thanks/` | Form thank-you page | build new |

**No** /about, /contact, /services pages exist on live site — it's a **one-pager** (those sections are inline on `/`). My English routes 301→`/` (see next.config redirects).

## Attachment / image-sitemap URLs — DO NOT rebuild
Hundreds of WP media-attachment pages (`/ראשי/braces/`, `/השתלות-שיניים/happy-couple-smiling/`, `?attachment_id=NNN`, `/thanks/thanks3/` …). These are auto-generated media pages. SEO-correct handling: 301 to parent post / noindex — NOT individual pages. Will add a catch-all redirect for `/ראשי/*` and `?attachment_id` → home/parent.

## Status
- ✅ next.config.ts: `trailingSlash: true` global + 301 redirects (English→Hebrew) on Vercel.
- ⏳ Need WP REST export (`/wp-json/wp/v2/posts` + `/pages`) for real body text → then build posts registry + root `[slug]` route + hub + legal + thanks + sitemap.ts.

## Notes
- 9 of my placeholder articles map to real posts above; ~11 real posts need their body content (from live site) to migrate properly. PDF rule: do not invent content.
- Real-site article body text still required for 1:1 keyword/SEO match.
