import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { DEFAULT_LOCALE } from './i18n/config';

const BASE_DOCS_DIR = path.join(process.cwd(), 'docs');

function getDocsDir(lang = DEFAULT_LOCALE) {
  const langDir = path.join(BASE_DOCS_DIR, lang);
  if (fs.existsSync(langDir)) return langDir;
  const viDir = path.join(BASE_DOCS_DIR, 'vi');
  if (fs.existsSync(viDir)) return viDir;
  return BASE_DOCS_DIR;
}

// YAML có thể trả về Date; chuẩn hóa thành chuỗi ISO ngắn (YYYY-MM-DD)
function normalizeDate(value) {
  if (!value) return '2026-11-12';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export function getAllDocs(lang = DEFAULT_LOCALE) {
  const dir = getDocsDir(lang);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.md'));
  const docs = files.map(file => {
    const slug = file.replace(/\.md$/, '');
    const fullPath = path.join(/*turbopackIgnore: true*/ dir, file);
    const fileContents = fs.readFileSync(/*turbopackIgnore: true*/ fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      status: data.status || 'draft',
      audience: data.audience || 'public',
      updated: normalizeDate(data.updated),
      tags: data.tags || [],
      spoiler: Boolean(data.spoiler),
    };
  });

  return docs;
}

export async function getDocBySlug(slug, lang = DEFAULT_LOCALE) {
  let fullPath = path.join(BASE_DOCS_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(BASE_DOCS_DIR, 'vi', `${slug}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(BASE_DOCS_DIR, `${slug}.md`);
  }
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Configure marked for clean HTML
  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const htmlContent = marked.parse(content);

  return {
    slug,
    title: data.title || slug,
    status: data.status || 'draft',
    audience: data.audience || 'public',
    updated: normalizeDate(data.updated),
    tags: data.tags || [],
    spoiler: Boolean(data.spoiler),
    content: htmlContent,
  };
}
