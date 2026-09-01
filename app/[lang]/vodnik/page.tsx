import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getGuidePages,
  getDictionary,
  GUIDE_CATEGORY_ORDER,
  type Lang,
} from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GuideSidebar } from "@/components/GuideSidebar";
import { BackToTop } from "@/components/BackToTop";

export function generateStaticParams() {
  return [{ lang: "sl" }];
}

export default function GuideIndexPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  if (lang !== "sl") notFound();

  const dict = getDictionary(lang);
  const pages = getGuidePages(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <div className="mx-auto flex max-w-5xl gap-10 px-6 py-20">
        <GuideSidebar lang={lang} pages={pages} />

        <main className="min-w-0 flex-1">
          <h1 className="mb-4 font-display text-4xl text-ink">Vodnik</h1>
          <p className="mb-12 max-w-xl text-dust">
            Izberi kategorijo v stranskem meniju, ali začni tukaj — vsaka
            kategorija je zasnovana tako, da jo lahko bereš po vrsti, od
            začetka do konca.
          </p>

          {GUIDE_CATEGORY_ORDER.map(({ key, labelSl }) => {
            const items = pages.filter((p) => p.frontmatter.category === key);
            if (items.length === 0) return null;
            const first = items[0];
            return (
              <Link
                key={key}
                href={`/${lang}/vodnik/${first.slug}`}
                className="mb-4 block border border-night-line p-6 transition-colors hover:border-moon/60"
              >
                <span className="mb-1 block font-mono text-xs uppercase tracking-[0.2em] text-moon">
                  {labelSl}
                </span>
                <span className="text-dust">{items.length} strani →</span>
              </Link>
            );
          })}
        </main>
      </div>
      <Footer lang={lang} dict={dict} />
      <BackToTop />
    </div>
  );
}
