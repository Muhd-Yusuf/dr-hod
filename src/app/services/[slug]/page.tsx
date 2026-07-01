import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone, ArrowLeft } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { KenBurns } from "@/components/ui/KenBurns";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { clinic, services } from "@/lib/site";
import { img } from "@/lib/images";

type Slug = (typeof services)[number]["slug"];

type ServiceContent = {
  intro: string;
  paragraphs: string[];
  benefits: string[];
};

const SERVICE_CONTENT: Record<Slug, ServiceContent> = {
  whitening: {
    intro:
      "החזירו לחיוך שלכם את הזוהר הטבעי בעזרת טיפול הלבנה מקצועי, בטוח ומותאם אישית.",
    paragraphs: [
      "לפני כל טיפול הלבנה אנו מבצעים בדיקה יסודית וניקוי אבנית. ההלבנה היא הלבנה מרפאתית, ותוך כשעה אתם יוצאים עם שיניים לבנות.",
      "החומרים שאנו משתמשים בהם מבטיחים תוצאה אופטימלית ומונעים רגישות יתר לאחר הטיפול.",
      "תוצאות ההלבנה נשמרות לאורך זמן בעזרת שגרת היגיינה נכונה והימנעות מגורמים מכתימים. אנו מלווים אתכם גם לאחר הטיפול בהמלצות לשימור החיוך הבהיר לאורך זמן.",
    ],
    benefits: [
      "חיוך בהיר ומבריק יותר תוך ביקור אחד",
      "טיפול עדין השומר על אמייל השן",
      "התאמה אישית",
      "ליווי מקצועי לשימור התוצאה לאורך זמן",
    ],
  },
  implants: {
    intro:
      "פתרון קבוע, יציב וטבעי לשיניים חסרות — השתלות שיניים בטכנולוגיה המתקדמת ביותר.",
    paragraphs: [
      "השתלת שיניים היא הדרך המתקדמת והאמינה ביותר לשחזור שיניים חסרות. השתל, העשוי טיטניום ביו-תואם, משתלב בעצם הלסת ומשמש בסיס יציב לכתר בעל מראה ותחושה של שן טבעית לחלוטין.",
      "הליך ההשתלה מבוצע על ידי רופא מומחה, בתכנון מדויק הכולל הדמיה דיגיטלית והערכת מבנה העצם, לקבלת תוצאה אסתטית ופונקציונלית מיטבית. אנו מקפידים על תהליך נטול כאב ככל הניתן ועל החלמה נוחה ומהירה.",
      "מעבר לאסתטיקה, השתלות מסייעות בשמירה על מבנה העצם ומונעות את שקיעתו לאחר אובדן שן. הן מאפשרות לכם לאכול, לדבר ולחייך בביטחון מלא, ללא הסתמכות על תותבות נשלפות.",
    ],
    benefits: [
      "פתרון קבוע לכל החיים בטיפול נכון",
      "מראה ותחושה של שן טבעית",
      "שמירה על מבנה עצם הלסת",
      "תכנון דיגיטלי מדויק לפני ההשתלה",
      "שיקום הביטחון באכילה ובדיבור",
    ],
  },
  rehabilitation: {
    intro:
      "שיקום פה מקיף המחזיר תפקוד, אסתטיקה ובריאות — תוכנית טיפול אישית מקצה לקצה.",
    paragraphs: [
      "שיקום הפה הוא תהליך מקיף שמטרתו להחזיר את הפה לתפקוד מלא ולמראה אסתטי, במקרים של בלאי, שברים, חוסר שיניים או בעיות סגר. הטיפול משלב מספר תחומים ומתוכנן בקפידה בהתאם לצרכים הייחודיים של כל מטופל.",
      "במרפאת ד״ר יורם הוד אנו בונים עבורכם תוכנית שיקום מדורגת, הכוללת שילוב של כתרים, גשרים, השתלות וטיפולים משמרים, לקבלת תוצאה הרמונית ויציבה לאורך זמן. כל שלב מתואם איתכם מראש כדי שתדעו בדיוק למה לצפות.",
      "מטרת השיקום אינה רק אסתטית — אנו משיבים לכם את היכולת ללעוס בנוחות, את בריאות החניכיים ואת הביטחון העצמי שמגיע עם חיוך שלם ובריא.",
      "המטרה היא איכות חיים טובה יותר.",
    ],
    benefits: [
      "תוכנית טיפול אישית ומדורגת",
      "שילוב כתרים, גשרים והשתלות לפי הצורך",
      "שיפור התפקוד והנוחות בלעיסה",
      "תוצאה אסתטית והרמונית לאורך זמן",
      "ליווי צמוד בכל שלב בתהליך",
    ],
  },
  emergency: {
    intro:
      "כאב פתאומי, שבר או דימום? אנו כאן עבורכם עם מענה מהיר וטיפולי חירום זמינים.",
    paragraphs: [
      "כאב שיניים חריף או פגיעה פתאומית דורשים טיפול מהיר ומקצועי. במרפאת ד״ר יורם הוד אנו מקדישים תשומת לב מיוחדת למקרי חירום ומשתדלים לקבל אתכם בהקדם האפשרי כדי להקל על הכאב ולמנוע החמרה.",
      "טיפולי החירום שלנו כוללים מענה לשיניים שבורות, סתימות שנפלו, מורסות, דלקות וכאבים עזים. אנו מאבחנים במדויק את מקור הבעיה ומספקים פתרון יעיל — בין אם זה טיפול מיידי או ייצוב הבעיה עד להמשך הטיפול.",
      "אנו מבינים שהכאב לא ממתין, ולכן אנו זמינים עבורכם גם מחוץ לשעות העבודה הרגילות, וגם בחגים ובסופי שבוע. אל תתמודדו עם הכאב לבד — צרו קשר ונדאג לכם.",
    ],
    benefits: [
      "מענה מהיר וזמינות למקרי חירום",
      "הקלה מיידית על כאב ואי-נוחות",
      "טיפול בשברים, מורסות ודלקות",
      "אבחון מדויק של מקור הבעיה",
      "יחס אישי, סבלני ומרגיע",
    ],
  },
  snoring: {
    intro:
      "טיפול לייזר FOTONA חדשני ולא פולשני המפחית נחירות ומשפר את איכות השינה שלכם.",
    paragraphs: [
      "נחירות אינן רק מטרד לבן/בת הזוג — הן עלולות להעיד על איכות שינה ירודה ועל בעיות בריאותיות. הטיפול בלייזר FOTONA מציע פתרון מתקדם, לא פולשני וללא צורך בניתוח או במכשירים מסורבלים.",
      "הלייזר פועל בעדינות על רקמות החך הרך, מקבץ וממצק אותן, ומקטין את הרטט שגורם לנחירות ולדום נשימה. הטיפול קצר ונוח, מתבצע במרפאה ללא הרדמה כללית וללא זמן החלמה משמעותי — חוזרים לשגרה מיד, כאילו לא עברתם טיפול בכלל.",
      "מעבר להפחתת הנחירות, הטיפול בלייזר משפר גם תסמינים הקשורים לדום נשימה בשינה (סליפ אפניאה). מרבית המטופלים מדווחים על שיפור ניכר באיכות השינה כבר לאחר הטיפול הראשון, ובני/בנות הזוג מדווחים על שינה רגועה ושקטה יותר. במרפאת ד״ר יורם הוד נבצע הערכה מקדימה כדי לוודא שהטיפול מתאים לכם ונבנה תוכנית מותאמת אישית.",
    ],
    benefits: [
      "טיפול לא פולשני וללא ניתוח",
      "ללא הרדמה כללית — חוזרים לשגרה מיד",
      "הפחתה משמעותית בעוצמת הנחירות",
      "שיפור גם בתסמיני דום נשימה בשינה (סליפ אפניאה)",
      "תוכנית מותאמת אישית לאחר הערכה",
    ],
  },
  general: {
    intro:
      "שגרת טיפול מקיפה לכל המשפחה — בדיקות, סתימות, ניקוי אבנית וטיפולי שורש.",
    paragraphs: [
      "רפואת שיניים כללית היא הבסיס לבריאות הפה לאורך זמן. במרפאת ד״ר יורם הוד אנו מספקים את כל מגוון הטיפולים השוטפים הדרושים לשמירה על חיוך בריא — מבדיקות תקופתיות ועד לטיפולים מורכבים יותר, הכל באותו מקום.",
      "הטיפול מתבצע ללא כאבים בעזרת הלייזר הדנטלי של חברת פוטונה. רוב הטיפולים נעשים ללא כאבים וללא הרדמה בכלל. דמיינו לקבל סתימה חדשה ללא זריקת הרדמה וללא כאבים בכלל.",
      "טיפולינו כוללים בדיקות מקיפות, ניקוי אבנית והסרת רובד, סתימות אסתטיות, טיפולי שורש והדרכה אישית לשמירה על היגיינת הפה בבית. בטיפולי שורש נעזר ד״ר הוד ברופא מומחה לטיפולי שורש, להבטחת תוצאה מדויקת ונטולת כאב. אנו מאמינים שמניעה היא המפתח, ולכן מקפידים על אבחון מוקדם של בעיות.",
      "אנו מעניקים יחס חם ואישי לכל מטופל, מבוגרים וילדים כאחד, ומשתדלים להפוך כל ביקור לחוויה רגועה ונעימה. צוות המרפאה ילווה אתכם בסבלנות ובמקצועיות בכל שלב.",
    ],
    benefits: [
      "טיפולים ללא כאב בעזרת לייזר פוטונה — ללא הרדמה",
      "בדיקות תקופתיות ואבחון מוקדם",
      "ניקוי אבנית והסרת רובד מקצועי",
      "סתימות אסתטיות בצבע השן",
      "טיפולי שורש מדויקים בליווי רופא מומחה",
      "יחס אישי וחם לכל המשפחה",
    ],
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "השירות לא נמצא | ד״ר יורם הוד" };

  const content = SERVICE_CONTENT[service.slug];
  return {
    title: `${service.title} | ד״ר יורם הוד — מרפאת שיניים ביהוד`,
    description: content.intro,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[service.slug];
  const image = img.services[service.slug];

  // Related services (everything except current)
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative">
          <KenBurns
            src={image.src}
            alt={image.alt}
            className="h-[24rem] md:h-[30rem]"
            priority
            overlay
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12">
              <Reveal direction="up">
                <Link
                  href="/services"
                  className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  כל השירותים
                </Link>
                <h1 className="text-display text-4xl font-bold text-white md:text-6xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-white/85 md:text-xl">
                  {content.intro}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Body + benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Paragraphs */}
              <div className="lg:col-span-2">
                <Reveal direction="up">
                  <div className="space-y-6">
                    {content.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-lg leading-relaxed text-ink-soft"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Benefits card */}
              <Reveal direction="left" delay={0.1}>
                <aside className="glass-strong sticky top-28 rounded-glass border border-line p-7">
                  <h2 className="text-display text-2xl font-bold text-ink">
                    היתרונות שלכם
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {content.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-ink-soft">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-line pt-6">
                    <p className="mb-4 text-sm text-ink-faint">
                      רוצים לקבוע תור או להתייעץ?
                    </p>
                    <MagneticButton
                      href={`tel:${clinic.tel}`}
                      className="w-full bg-brand-500 text-white shadow-xl shadow-brand-500/30"
                    >
                      <Phone className="h-4 w-4" />
                      חייגו {clinic.phone}
                    </MagneticButton>
                  </div>
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="border-t border-line bg-bg-elev py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal direction="up">
              <h2 className="text-display text-3xl font-bold text-ink md:text-4xl">
                שירותים נוספים
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} direction="up" delay={i * 0.08}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group glass relative block overflow-hidden rounded-glass border border-line transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-500/20"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <KenBurns
                        src={img.services[s.slug].src}
                        alt={img.services[s.slug].alt}
                        className="absolute inset-0"
                        overlay
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <h3 className="text-display absolute bottom-4 right-5 left-5 text-xl font-bold text-white">
                        {s.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between p-5">
                      <span className="font-semibold text-brand-700 transition-colors group-hover:text-brand-500">
                        קראו עוד
                      </span>
                      <ArrowLeft className="h-4 w-4 text-brand-700 transition-transform duration-300 group-hover:-translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
