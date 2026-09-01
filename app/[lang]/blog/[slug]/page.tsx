import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getPosts, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export function generateStaticParams() {
  const sl = getPosts("sl").map((p) => ({ lang: "sl", slug: p.slug }));
  const en = getPosts("en").map((p) => ({ lang: "en", slug: p.slug }));
  return [...sl, ...en];
}

export default async function PostPage({
  params,
}: {
  params: { lang: Lang; slug: string };
}) {
  const { lang, slug } = params;
  const post = await getPost(lang, slug);
  if (!post) notFound();

  const dict = getDictionary(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href={`/${lang}/blog`}
          className="mb-8 inline-block font-mono text-xs uppercase tracking-wider text-dust hover:text-moon"
        >
          ← {dict.nav.blog}
        </Link>
        <span className="mb-2 block font-mono text-xs text-moon">
          {post.frontmatter.date}
        </span>
        <h1 className="mb-8 font-display text-3xl text-ink">
          {post.frontmatter.title}
        </h1>
        <article
          className="prose prose-invert prose-headings:font-display prose-a:text-moon max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </main>
      <Footer lang={lang} dict={dict} />
      <BackToTop />
    </div>
  );
}
