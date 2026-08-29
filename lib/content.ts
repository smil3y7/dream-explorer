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
 * About page is shared across languages — one file, no lang suffix.
 * content/pages/about.md
 */
export async function getAboutPage() {
  const filePath = path.join(CONTENT_DIR, "pages", "about.md");
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
