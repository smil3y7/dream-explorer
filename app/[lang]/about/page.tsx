import { getAboutPage, getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ lang: "sl" }, { lang: "en" }];
}

export default async function AboutPage({
  params,
}: {
  params: { lang: Lang };
}) {
  const lang = params.lang;
  const { html } = await getAboutPage(lang);
  const dict = getDictionary(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />

      <main className="mx-auto max-w-2xl px-6 py-20">
        <article
          className="prose prose-invert prose-headings:font-display prose-a:text-moon max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <Footer lang={lang} dict={dict} />
    </div>
  );
}
