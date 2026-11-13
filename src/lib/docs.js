import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const DOCS_DIR = path.join(process.cwd(), 'docs');

// Tài liệu thiết kế/dev sync từ repo game — không hiển thị trên wiki public
const INTERNAL_DOCS = new Set(['game-overview', 'lore-story', 'world-overview']);

// YAML có thể trả về Date; chuẩn hóa thành chuỗi ISO ngắn (YYYY-MM-DD)
function normalizeDate(value) {
  if (!value) return '2026-11-12';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export function getAllDocs() {
  if (!fs.existsSync(DOCS_DIR)) return [];

  const files = fs.readdirSync(DOCS_DIR)
    .filter(file => file.endsWith('.md'))
    .filter(file => !INTERNAL_DOCS.has(file.replace(/\.md$/, '')));
  const docs = files.map(file => {
    const slug = file.replace(/\.md$/, '');
    const fullPath = path.join(DOCS_DIR, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
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

export async function getDocBySlug(slug) {
  if (INTERNAL_DOCS.has(slug)) return null;
  const fullPath = path.join(DOCS_DIR, `${slug}.md`);
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
