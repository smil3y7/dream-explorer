import { notFound } from "next/navigation";
import { getDictionary, type Lang } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ShopContent } from "@/components/ShopContent";

export function generateStaticParams() {
  return [{ lang: "en" }];
}

export default function ShopPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  if (lang !== "en") notFound();

  const dict = getDictionary(lang);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-10 font-display text-4xl text-ink">Shop</h1>
        <ShopContent lang={lang} />
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
