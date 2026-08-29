import { getOriginStory, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Thread } from "@/components/Thread";

export function generateStaticParams() {
  return [{ lang: "sl" }, { lang: "en" }];
}

const WAYPOINTS: Record<Lang, { year: string; title: string; text: string }[]> = {
  sl: [
    {
      year: "2013",
      title: "Začetek",
      text: "Dream eXplorer se rodi kot osebno orodje za beleženje in analizo sanj.",
    },
    {
      year: "2013–2018",
      title: "Rast",
      text: "Aplikacija, delavnice, Inkubator sanj — projekt raste vzporedno z izobraževanjem.",
    },
    {
      year: "Zastoj",
      title: "Premor",
      text: "Sredstev za nadaljnji razvoj zmanjka. Projekt miruje, a ni opuščen.",
    },
    {
      year: "Danes",
      title: "Sentria",
      text: "Ob prihodu AI ista nit zraste naprej — v modularen ekosistem raziskovanja sanj.",
    },
  ],
  en: [
    {
      year: "2013",
      title: "The beginning",
      text: "Dream eXplorer starts as a personal tool for recording and analyzing dreams.",
    },
    {
      year: "2013–2018",
      title: "Growth",
      text: "The application, workshops, a dream incubator program — growing alongside teaching.",
    },
    {
      year: "Pause",
      title: "Standstill",
      text: "Funding for further development runs out. The project rests, not abandoned.",
    },
    {
      year: "Today",
      title: "Sentria",
      text: "With AI, the same thread grows forward — into a modular ecosystem for dream research.",
    },
  ],
};

export default async function HomePage({
  params,
}: {
  params: { lang: Lang };
}) {
  const lang = params.lang;
  const { frontmatter } = await getOriginStory(lang);
  const dict = getDictionary(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />

      <main className="mx-auto max-w-3xl px-6 py-20">
        <section className="mb-24 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-moon">
            {frontmatter.hero_eyebrow}
          </p>
          <h1 className="mb-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            {frontmatter.hero_headline}
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg text-dust">
            {frontmatter.hero_sub}
          </p>
          <a
            href={frontmatter.cta_href}
            className="inline-block border border-moon/60 px-6 py-3 font-mono text-sm uppercase tracking-wider text-moon transition-colors hover:bg-moon hover:text-night"
          >
            {frontmatter.cta_label}
          </a>
        </section>

        <Thread waypoints={WAYPOINTS[lang]} />
      </main>

      <Footer lang={lang} dict={dict} />
    </div>
  );
}
