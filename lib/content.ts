import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Lang = "sl" | "en";

async function mdToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

/**
 * Origin story is language-specific (not a translation pair by force —
 * each file is independent, per the site's i18n approach).
 * content/origin/sl.md, content/origin/en.md
 */
export async function getOriginStory(lang: Lang) {
  const filePath = path.join(CONTENT_DIR, "origin", `${lang}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = await mdToHtml(content);
  return { frontmatter: data, html };
}

/**
 * About page — sedaj po jeziku ločena datoteka (ne prevod v enem, ampak
 * dva neodvisna teksta), enako kot Origin story.
 * content/pages/about-sl.md, content/pages/about-en.md
 */
export async function getAboutPage(lang: Lang) {
  const filePath = path.join(CONTENT_DIR, "pages", `about-${lang}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const html = await mdToHtml(content);
  return { frontmatter: data, html };
}

/**
 * UI dictionary (shared chrome: nav, buttons, labels) — separate from content.
 * content/i18n/sl.json, content/i18n/en.json
 */
export function getDictionary(lang: Lang) {
  const filePath = path.join(CONTENT_DIR, "i18n", `${lang}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// ---------- Vodnik / Guide ----------

export type GuideCategory = "zakaj" | "kako" | "tehnike" | "pripomocki" | "navdih";

export const GUIDE_CATEGORY_ORDER: { key: GuideCategory; labelSl: string }[] = [
  { key: "zakaj", labelSl: "Zakaj" },
  { key: "kako", labelSl: "Kako" },
  { key: "tehnike", labelSl: "Tehnike" },
  { key: "pripomocki", labelSl: "Pripomočki" },
  { key: "navdih", labelSl: "Navdih" },
];

const CATEGORY_RANK: Record<string, number> = Object.fromEntries(
  GUIDE_CATEGORY_ORDER.map((c, i) => [c.key, i])
);

function readMarkdownDir(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(full, filename), "utf-8");
      const { data, content } = matter(raw);
      // gray-matter samodejno pretvori YAML datume v JS Date objekte —
      // za prikaz jih normaliziramo nazaj v niz (YYYY-MM-DD).
      if (data.date instanceof Date) {
        data.date = data.date.toISOString().slice(0, 10);
      }
      const slug = filename.replace(/\.md$/, "");
      return { slug, frontmatter: data, content };
    });
}

export function getGuidePages(lang: Lang) {
  return readMarkdownDir("guide")
    .filter((p) => p.frontmatter.lang === lang)
    .sort((a, b) => {
      const catDiff =
        (CATEGORY_RANK[a.frontmatter.category] ?? 99) -
        (CATEGORY_RANK[b.frontmatter.category] ?? 99);
      if (catDiff !== 0) return catDiff;
      return (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0);
    });
}

export async function getGuidePage(lang: Lang, slug: string) {
  const all = readMarkdownDir("guide");
  const match = all.find((p) => p.slug === slug && p.frontmatter.lang === lang);
  if (!match) return null;
  const html = await mdToHtml(match.content);
  return { frontmatter: match.frontmatter, html };
}

// ---------- Blog ----------

export function getPosts(lang: Lang) {
  return readMarkdownDir("post")
    .filter((p) => p.frontmatter.lang === lang)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getPost(lang: Lang, slug: string) {
  const all = readMarkdownDir("post");
  const match = all.find((p) => p.slug === slug && p.frontmatter.lang === lang);
  if (!match) return null;
  const html = await mdToHtml(match.content);
  return { frontmatter: match.frontmatter, html };
}

// ---------- Trgovina / Shop ----------

export function getProducts(lang: Lang) {
  return readMarkdownDir("products").filter((p) =>
    (p.frontmatter.languages || []).includes(lang)
  );
}

// ---------- Testimonials ----------

export function getTestimonials(program?: string) {
  const all = readMarkdownDir("testimonials");
  return program ? all.filter((t) => t.frontmatter.program === program) : all;
}
