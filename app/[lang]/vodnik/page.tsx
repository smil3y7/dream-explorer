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

export function generateStaticParams() {
  return [{ lang: "sl" }];
}

export default function GuideIndexPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  if (lang !== "sl") notFound(); // Vodnik trenutno obstaja samo v SL

  const dict = getDictionary(lang);
  const pages = getGuidePages(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-12 font-display text-4xl text-ink">Vodnik</h1>

        {GUIDE_CATEGORY_ORDER.map(({ key, labelSl }) => {
          const items = pages.filter((p) => p.frontmatter.category === key);
          if (items.length === 0) return null;
          return (
            <section key={key} className="mb-14">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-moon">
                {labelSl}
              </h2>
              <ul className="grid gap-2 border-l border-night-line pl-5">
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${lang}/vodnik/${item.slug}`}
                      className="text-ink transition-colors hover:text-moon"
                    >
                      {item.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
