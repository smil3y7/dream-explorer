import type { Lang } from "@/lib/content";

export function Footer({ lang, dict }: { lang: Lang; dict: any }) {
  return (
    <footer className="border-t border-night-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-dust md:flex-row md:justify-between">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} Dream eXplorer. {dict.footer.rights}
        </p>
        <div className="flex gap-5">
          <a
            href="https://facebook.com"
            className="transition-colors hover:text-moon"
          >
            {dict.footer.followFacebook}
          </a>
          <a
            href="https://youtube.com"
            className="transition-colors hover:text-moon"
          >
            {dict.footer.followYoutube}
          </a>
        </div>
      </div>
    </footer>
  );
}
