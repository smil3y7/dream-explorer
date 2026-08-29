import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, getTestimonials, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ lang: "sl" }];
}

export default function ProgramiPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  if (lang !== "sl") notFound();

  const dict = getDictionary(lang);
  const testimonials = getTestimonials("Inkubator sanj");

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <span className="mb-4 inline-block border border-moon/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-moon">
          {dict.cta.comingSoon}
        </span>
        <h1 className="mb-4 font-display text-4xl text-ink">Programi</h1>
        <p className="mb-6 text-dust">
          Inkubator sanj in individualno svetovanje se vračata — trenutno ju ne
          izvajam aktivno, a ponovni zagon je v pripravi.
        </p>
        <Link
          href={`/${lang}/kontakt`}
          className="mb-16 inline-block border border-moon/60 px-6 py-3 font-mono text-sm uppercase tracking-wider text-moon transition-colors hover:bg-moon hover:text-night"
        >
          {dict.cta.writeForInfo}
        </Link>

        {testimonials.length > 0 && (
          <section>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-moon">
              Izkušnje udeležencev — Inkubator sanj
            </h2>
            <ul className="flex flex-col gap-6">
              {testimonials.map((t) => (
                <li
                  key={t.slug}
                  className="border-l border-night-line pl-5 text-dust"
                >
                  <p className="mb-2 italic">&ldquo;{t.frontmatter.quote}&rdquo;</p>
                  <span className="font-mono text-xs text-moon">
                    {t.frontmatter.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
