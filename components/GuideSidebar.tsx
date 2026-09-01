import Link from "next/link";
import { GUIDE_CATEGORY_ORDER, type Lang } from "@/lib/content";

type GuideItem = { slug: string; frontmatter: any };

export function GuideSidebar({
  lang,
  pages,
  activeSlug,
}: {
  lang: Lang;
  pages: GuideItem[];
  activeSlug?: string;
}) {
  return (
    <nav
      aria-label="Vodnik — kategorije"
      className="hidden w-56 shrink-0 md:block"
    >
      <div className="sticky top-10 flex max-h-[calc(100vh-5rem)] flex-col gap-8 overflow-y-auto pb-10">
        {GUIDE_CATEGORY_ORDER.map(({ key, labelSl }) => {
          const items = pages.filter((p) => p.frontmatter.category === key);
          if (items.length === 0) return null;
          return (
            <div key={key}>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-moon">
                {labelSl}
              </h3>
              <ul className="flex flex-col gap-1.5 border-l border-night-line pl-3">
                {items.map((item) => {
                  const isActive = item.slug === activeSlug;
                  return (
                    <li key={item.slug}>
                      <Link
                        href={`/${lang}/vodnik/${item.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={
                          isActive
                            ? "text-sm text-moon"
                            : "text-sm text-dust transition-colors hover:text-ink"
                        }
                      >
                        {item.frontmatter.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
