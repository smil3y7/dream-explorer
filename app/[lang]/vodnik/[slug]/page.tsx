import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuidePage, getGuidePages, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GuideSidebar } from "@/components/GuideSidebar";
import { BackToTop } from "@/components/BackToTop";

export function generateStaticParams() {
  const pages = getGuidePages("sl");
  return pages.map((p) => ({ lang: "sl", slug: p.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: { lang: Lang; slug: string };
}) {
  const { lang, slug } = params;
  if (lang !== "sl") notFound();

  const page = await getGuidePage(lang, slug);
  if (!page) notFound();

  const dict = getDictionary(lang);
  const allPages = getGuidePages(lang);
  const currentIndex = allPages.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < allPages.length - 1
      ? allPages[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <div className="mx-auto flex max-w-5xl gap-10 px-6 py-20">
        <GuideSidebar lang={lang} pages={allPages} activeSlug={slug} />

        <main className="min-w-0 flex-1">
          <h1 className="mb-8 font-display text-3xl text-ink">
            {page.frontmatter.title}
          </h1>
          <article
            className="prose prose-invert prose-headings:font-display prose-a:text-moon max-w-none"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />

          <nav className="mt-16 flex items-center justify-between border-t border-night-line pt-8">
            {prev ? (
              <Link
                href={`/${lang}/vodnik/${prev.slug}`}
                className="max-w-[45%] text-sm text-dust transition-colors hover:text-moon"
              >
                ← {prev.frontmatter.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/${lang}/vodnik/${next.slug}`}
                className="max-w-[45%] text-right text-sm text-dust transition-colors hover:text-moon"
              >
                {next.frontmatter.title} →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
      <Footer lang={lang} dict={dict} />
      <BackToTop />
    </div>
  );
}
