import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuidePage, getGuidePages, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href={`/${lang}/vodnik`}
          className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-dust hover:text-moon"
        >
          ← Vodnik
        </Link>
        <h1 className="mb-8 font-display text-3xl text-ink">
          {page.frontmatter.title}
        </h1>
        <article
          className="prose prose-invert prose-headings:font-display prose-a:text-moon max-w-none"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
