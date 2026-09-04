import { notFound } from "next/navigation";
import {
  getDictionary,
  getTestimonials,
  getPrograms,
  type Lang,
} from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ProgramStatus } from "@/components/ProgramStatus";
import { ProgramCTA } from "@/components/ProgramCTA";

export function generateStaticParams() {
  return [{ lang: "sl" }];
}

export default function ProgramiPage({ params }: { params: { lang: Lang } }) {
  const { lang } = params;
  if (lang !== "sl") notFound();

  const dict = getDictionary(lang);
  const testimonials = getTestimonials("Inkubator sanj");
  const programs = getPrograms();

  const anyInactive = Object.values(programs).some((p) => !p.frontmatter.active);

  return (
    <div className="min-h-screen bg-night">
      <Nav lang={lang} dict={dict} />

      {anyInactive && (
        <div className="border-b border-night-line bg-night-panel">
          <p className="mx-auto max-w-2xl px-6 py-3 text-center text-sm text-dust">
            Programi trenutno ne potekajo aktivno — prijavi se prek{" "}
            <a href={`/${lang}/kontakt`} className="text-moon hover:underline">
              kontaktnega obrazca
            </a>{" "}
            za obvestilo, ko bodo znova na voljo.
          </p>
        </div>
      )}

      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="mb-16 font-display text-4xl text-ink">Programi</h1>

        {/* --- Inkubator sanj --- */}
        <section className="mb-20 border-b border-night-line pb-20">
          <ProgramStatus lang={lang} program={programs["inkubator-sanj"]} />
          <h2 className="mb-4 font-display text-2xl text-ink">Inkubator sanj</h2>
          <p className="mb-4 text-dust">
            Sanjanje že od nekdaj velja za eno od orodij šamanov in zdravilcev
            v tradicionalnih kulturah po vsem svetu. Sanje so najbolj naraven
            način prehoda iz običajnega v spremenjeno stanje zavesti, v
            katerem lahko pridemo do najrazličnejših informacij, učenja in
            zdravljenja.
          </p>
          <p className="mb-6 text-dust">
            <strong className="text-ink">Inkubator sanj</strong> je
            10-tedenski sanjalski program, namenjen vsem, ki si želite
            spoznati svoje sanje in v njih aktivno (so)delovati — skupinsko,
            v majhni skupini, ki ustvari varen prostor za individualne
            procese.
          </p>
          <ul className="mb-6 flex flex-col gap-1.5 border-l border-night-line pl-5 text-sm text-dust">
            <li>vas zanimajo sanje in sanjski svetovi</li>
            <li>si želite izboljšati sposobnost spominjanja sanj</li>
            <li>vas zanimajo praktični napotki in tehnike za lucidno sanjanje</li>
            <li>iščete navdih ali odgovore na življenjska vprašanja</li>
          </ul>
          <p className="mb-6 text-sm text-dust">
            Vključuje dostop do Somnie (dnevnik sanj) in paket Oneiro
            kreditov za AI interpretacijo sanj.
          </p>
          <ProgramCTA lang={lang} program={programs["inkubator-sanj"]} />
        </section>

        {/* --- Inkubator 101 --- */}
        <section className="mb-20 border-b border-night-line pb-20">
          <ProgramStatus lang={lang} program={programs["inkubator-101"]} />
          <h2 className="mb-4 font-display text-2xl text-ink">Inkubator 101</h2>
          <p className="mb-6 text-dust">
            Enak proces kot Inkubator sanj, v <strong className="text-ink">individualni</strong> obliki
            — za tiste, ki se ne morejo ali ne želijo udeležiti skupinske
            različice. Dinamika se prilagodi tvojim predhodnim izkušnjam,
            željam in interesom, srečanja pa potekajo na daljavo, v terminu,
            ki ustreza tebi.
          </p>
          <ProgramCTA lang={lang} program={programs["inkubator-101"]} />
        </section>

        {/* --- Sanjalski intenziv --- */}
        <section className="mb-20 border-b border-night-line pb-20">
          <ProgramStatus lang={lang} program={programs["sanjalski-intenziv"]} />
          <h2 className="mb-4 font-display text-2xl text-ink">Sanjalski intenziv</h2>
          <p className="mb-6 text-dust">
            Celodnevna delavnica o lucidnem sanjanju — od osnov in različnih
            opisnih sistemov do Castanedovih &bdquo;vrat sanjanja&ldquo;.
            Spoznaš dnevne in nočne aktivnosti, ki pomagajo pri ozaveščanju v
            sanjah, najučinkovitejše tehnike in pripomočke, ter kako
            poskrbeti, da se sanje ne končajo prehitro. Strnjena izkušnja za
            tiste, ki želijo hiter, poglobljen vpogled namesto dolgotrajnega
            procesa.
          </p>
          <ProgramCTA lang={lang} program={programs["sanjalski-intenziv"]} />
        </section>

        {/* --- Individualno svetovanje --- */}
        <section className="mb-16">
          <ProgramStatus lang={lang} program={programs["individualno-svetovanje"]} />
          <h2 className="mb-4 font-display text-2xl text-ink">
            Individualno svetovanje
          </h2>
          <p className="mb-4 text-dust">
            Prostor, da poveš, s čim se trenutno srečuješ — skupaj raziščeva,
            kako se to kaže v tvojih sanjah ali stanjih zavesti, in dobiš
            orodja ter vprašanja za nadaljnje raziskovanje sam.
          </p>
          <p className="mb-6 text-sm text-dust">
            Primeri tega, s čimer ljudje običajno pridejo: spanje,
            ozaveščanje v sanjah, nočne more in nočni teror, prehranska
            dopolnila in pripomočki za sanjanje — a to niso edine teme, samo
            izhodišče.
          </p>
          <p className="mb-6 text-xs text-dust">
            To ni nadomestilo za psihološko ali psihiatrično pomoč.
          </p>
          <ProgramCTA lang={lang} program={programs["individualno-svetovanje"]} />
        </section>

        {testimonials.length > 0 && (
          <section>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-moon">
              Izkušnje udeležencev — Inkubator sanj
            </h2>
            <TestimonialSlider testimonials={testimonials} />
          </section>
        )}
      </main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
