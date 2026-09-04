import type { Lang } from "@/lib/content";
import { getProducts } from "@/lib/content";

const COPY: Record<Lang, { empty: string; shippingNote: (s: string) => string; categories: Record<string, string> }> = {
  sl: {
    empty:
      "Trgovina se ravno postavlja na novo. Knjige, e-knjige in tinkture se vračajo kmalu — payment linki so v pripravi.",
    shippingNote: (shipping) =>
      shipping === "domestic" ? "Pošiljanje samo znotraj Slovenije." : "",
    categories: { tinktura: "Tinkture", knjiga: "Knjige", "e-knjiga": "E-knjige", affiliate: "Priporočeno" },
  },
  en: {
    empty:
      "The shop is being rebuilt. Books, ebooks and tinctures are coming back soon — payment links are in progress.",
    shippingNote: (shipping) =>
      shipping === "domestic" ? "Shipping within Slovenia only." : "",
    categories: { tinktura: "Tinctures", knjiga: "Books", "e-knjiga": "Ebooks", affiliate: "Recommended" },
  },
};

const CATEGORY_ORDER = ["knjiga", "e-knjiga", "tinktura", "affiliate"];

export function ShopContent({ lang }: { lang: Lang }) {
  const products = getProducts(lang);
  const copy = COPY[lang];

  if (products.length === 0) {
    return <p className="text-dust">{copy.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-14">
      {CATEGORY_ORDER.map((cat) => {
        const items = products.filter((p) => p.frontmatter.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat}>
            <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-moon">
              {copy.categories[cat] ?? cat}
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {items.map((p) => (
                <li
                  key={p.slug}
                  className="flex flex-col overflow-hidden border border-night-line transition-colors hover:border-moon/60"
                >
                  {p.frontmatter.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.frontmatter.image}
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
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
                    <div className="mt-auto pt-2">
                      {p.frontmatter.payment_link ? (
                        <a
                          href={p.frontmatter.payment_link}
                          className="font-mono text-xs uppercase tracking-wider text-moon hover:underline"
                        >
                          {lang === "sl" ? "Naroči" : "Order"} →
                        </a>
                      ) : (
                        <span className="font-mono text-xs uppercase tracking-wider text-dust">
                          {lang === "sl" ? "Kmalu na voljo" : "Coming soon"}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
