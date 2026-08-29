import type { Lang } from "@/lib/content";
import { getProducts } from "@/lib/content";

const COPY: Record<Lang, { empty: string; shippingNote: (s: string) => string }> = {
  sl: {
    empty:
      "Trgovina se ravno postavlja na novo. Knjige, e-knjige in tinkture se vračajo kmalu — payment linki so v pripravi.",
    shippingNote: (shipping) =>
      shipping === "domestic" ? "Pošiljanje samo znotraj Slovenije." : "",
  },
  en: {
    empty:
      "The shop is being rebuilt. Books, ebooks and tinctures are coming back soon — payment links are in progress.",
    shippingNote: (shipping) =>
      shipping === "domestic" ? "Shipping within Slovenia only." : "",
  },
};

export function ShopContent({ lang }: { lang: Lang }) {
  const products = getProducts(lang);
  const copy = COPY[lang];

  if (products.length === 0) {
    return <p className="text-dust">{copy.empty}</p>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2">
      {products.map((p) => (
        <li key={p.slug} className="border border-night-line p-6">
          <h3 className="mb-1 font-display text-lg text-ink">
            {p.frontmatter.name}
          </h3>
          {p.frontmatter.price && (
            <p className="mb-2 font-mono text-sm text-moon">
              {p.frontmatter.price}
            </p>
          )}
          {copy.shippingNote(p.frontmatter.shipping) && (
            <p className="mb-3 text-xs text-dust">
              {copy.shippingNote(p.frontmatter.shipping)}
            </p>
          )}
          {p.frontmatter.payment_link && (
            <a
              href={p.frontmatter.payment_link}
              className="font-mono text-xs uppercase tracking-wider text-moon hover:underline"
            >
              {lang === "sl" ? "Naroči" : "Order"} →
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
