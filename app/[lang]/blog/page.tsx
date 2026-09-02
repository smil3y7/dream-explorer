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
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-12 font-display text-4xl text-ink">
          {dict.nav.blog}
        </h1>

        {featured && (
          <Link
            href={`/${lang}/blog/${featured.slug}`}
            className="mb-14 block overflow-hidden border border-night-line transition-colors hover:border-moon/60"
          >
            {featured.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.coverImage}
                alt=""
                className="h-56 w-full object-cover sm:h-72"
              />
            )}
            <div className="p-6">
              <div className="mb-2 flex items-center gap-3 font-mono text-xs text-moon">
                <span>{featured.frontmatter.date}</span>
                <span className="text-dust">·</span>
                <span className="text-dust">
                  {featured.readingTime} {dict.blog.readingTime}
                </span>
              </div>
              <h2 className="mb-2 font-display text-2xl text-ink">
                {featured.frontmatter.title}
              </h2>
              <p className="text-dust">{featured.excerpt}</p>
            </div>
          </Link>
        )}

        <ul className="grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="flex h-full flex-col overflow-hidden border border-night-line transition-colors hover:border-moon/60"
              >
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs text-dust">
                    <span>{post.frontmatter.date}</span>
                    <span>·</span>
                    <span>
                      {post.readingTime} {dict.blog.readingTime}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-lg text-ink">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-dust">{post.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
