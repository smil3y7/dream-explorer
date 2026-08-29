import Link from "next/link";
import { getPosts, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ lang: "sl" }, { lang: "en" }];
}

export default function BlogIndexPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  const dict = getDictionary(lang);
  const posts = getPosts(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="mb-12 font-display text-4xl text-ink">
          {dict.nav.blog}
        </h1>
        <ul className="flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-night-line pb-8">
              <span className="mb-1 block font-mono text-xs text-moon">
                {post.frontmatter.date}
              </span>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="font-display text-xl text-ink transition-colors hover:text-moon"
              >
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
