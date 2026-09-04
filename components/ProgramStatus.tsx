import type { Lang } from "@/lib/content";

export function ProgramStatus({
  lang,
  program,
}: {
  lang: Lang;
  program: { frontmatter: any } | undefined;
}) {
  if (!program) return null;
  const { active, price, format } = program.frontmatter;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span
        className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
          active ? "border-moon/60 text-moon" : "border-night-line text-dust"
        }`}
      >
        {active
          ? lang === "sl"
            ? "Aktivno"
            : "Active"
          : lang === "sl"
            ? "V pripravi"
            : "Coming soon"}
      </span>
      {price && <span className="font-mono text-xs text-dust">{price}</span>}
      {(format ?? []).map((f: string) => (
        <span
          key={f}
          className="border border-night-line px-2 py-0.5 font-mono text-[11px] text-dust"
        >
          {f}
        </span>
      ))}
    </div>
  );
}
