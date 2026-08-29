import Link from "next/link";
import type { Lang } from "@/lib/content";

type NavItem = { href: string; labelKey: string };

// Meniji so namerno različni po jeziku — prikazujemo samo tisto,
// kar dejansko obstaja v tem jeziku (glej sitemap v načrtu prenove).
const NAV_BY_LANG: Record<Lang, NavItem[]> = {
  sl: [
    { href: "", labelKey: "home" },
    { href: "/vodnik", labelKey: "guide" },
    { href: "/blog", labelKey: "blog" },
    { href: "/programi", labelKey: "programs" },
    { href: "/trgovina", labelKey: "shop" },
    { href: "/about", labelKey: "about" },
    { href: "/kontakt", labelKey: "contact" },
  ],
  en: [
    { href: "", labelKey: "home" },
    { href: "/blog", labelKey: "blog" },
    { href: "/shop", labelKey: "shop" },
    { href: "/about", labelKey: "about" },
    { href: "/contact", labelKey: "contact" },
  ],
};

export function Nav({ lang, dict }: { lang: Lang; dict: any }) {
  const items = NAV_BY_LANG[lang];
  const otherLang = lang === "sl" ? "en" : "sl";

  return (
    <header className="border-b border-night-line">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href={`/${lang}`} className="font-display text-lg tracking-wide text-ink">
          Dream eXplorer
        </Link>
        <ul className="hidden gap-6 font-body text-sm text-dust md:flex">
          {items.map((item) => (
            <li key={item.labelKey}>
              <Link
                href={`/${lang}${item.href}`}
                className="transition-colors hover:text-ink"
              >
                {dict.nav[item.labelKey]}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`/${otherLang}`}
          className="font-mono text-xs uppercase tracking-wider text-dust transition-colors hover:text-moon"
          aria-label={otherLang === "sl" ? "Slovenščina" : "English"}
        >
          {otherLang}
        </Link>
      </nav>
    </header>
  );
}
