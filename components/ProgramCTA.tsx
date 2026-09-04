import Link from "next/link";
import type { Lang } from "@/lib/content";

export function ProgramCTA({
  lang,
  program,
}: {
  lang: Lang;
  program: { frontmatter: any } | undefined;
}) {
  if (!program) return null;
  const { active, cta_label_active, cta_label_inactive } = program.frontmatter;

  const label = active ? cta_label_active : cta_label_inactive;
  // Ko je program aktiven, TODO: zamenjaj href s pravo prijavnico/koledarjem.
  const href = active ? "#" : `/${lang}/${lang === "sl" ? "kontakt" : "contact"}`;

  return (
    <Link
      href={href}
      className="inline-block border border-moon/60 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-moon transition-colors hover:bg-moon hover:text-night"
    >
      {label}
    </Link>
  );
}
