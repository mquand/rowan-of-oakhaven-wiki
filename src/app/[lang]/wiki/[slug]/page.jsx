import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Doc.module.scss';
import Sidebar from '../../../../components/Sidebar';
import Icon from '../../../../components/Icon';
import { getAllDocs, getDocBySlug } from '../../../../lib/docs';
import { DEFAULT_LOCALE, LOCALES } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '');
  if (!match) return value || '—';
  return `${match[3]}.${match[2]}.${match[1]}`;
}

function extractHeadingsAndInjectIds(html) {
  const headings = [];
  const headingCounts = {};

  const transformedHtml = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, text) => {
    const rawText = text.replace(/<[^>]+>/g, '').trim();
    let slug = rawText
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    if (!slug) slug = `section-${level}`;
    headingCounts[slug] = (headingCounts[slug] || 0) + 1;
    if (headingCounts[slug] > 1) {
      slug = `${slug}-${headingCounts[slug]}`;
    }

    headings.push({
      id: slug,
      text: rawText,
      level: parseInt(level, 10),
    });

    return `<h${level} id="${slug}"${attrs}>${text}</h${level}>`;
  });

  return { html: transformedHtml, headings };
}

export async function generateStaticParams() {
  const params = [];
  for (const lang of LOCALES) {
    const docs = getAllDocs(lang);
    for (const doc of docs) {
      params.push({ lang, slug: doc.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE, slug } = await params;
  const doc = await getDocBySlug(slug, lang);
  if (!doc) return { title: 'Not Found — Rowan of Oakhaven Wiki' };
  return {
    title: `${doc.title} — Rowan of Oakhaven Wiki`,
  };
}

export default async function DocPage({ params }) {
  const { lang = DEFAULT_LOCALE, slug } = await params;
  const dict = getDictionary(lang);
  const doc = await getDocBySlug(slug, lang);
  if (!doc) notFound();

  const allDocs = getAllDocs(lang);
  const index = allDocs.findIndex(d => d.slug === slug);
  const prevDoc = index > 0 ? allDocs[index - 1] : null;
  const nextDoc = index < allDocs.length - 1 ? allDocs[index + 1] : null;

  // Bỏ h1 đầu tiên trong markdown vì header bài viết đã render riêng
  let content = doc.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');

  // Localize internal links inside markdown
  content = content
    .replace(/href="\/wiki\//g, `href="/${lang}/wiki/`)
    .replace(/href="\/database\//g, `href="/${lang}/database/`);

  // Trích xuất heading và gắn anchor id
  const { html: contentWithIds, headings } = extractHeadingsAndInjectIds(content);
  const updated = formatDate(doc.updated);
  const readingTime = (dict.wiki.readingTimes && dict.wiki.readingTimes[doc.slug]) || 5;

  return (
    <div className={styles.container}>
      {/* 1. SIDEBAR DẠNG CÂY BÊN TRÁI */}
      <Sidebar docs={allDocs} lang={lang} />

      {/* 2. KHUNG NỘI DUNG CHÍNH */}
      <article className={`${styles.contentWrapper} pixel-frame`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href={`/${lang}`}>{dict.nav.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/wiki`}>{dict.wiki.breadcrumb}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{doc.title}</span>
        </nav>

        <header className={styles.docHeader}>
          <h1 className={styles.docMainTitle}>{doc.title}</h1>
          <div className={styles.docMeta}>
            <span className={styles.date}>
              <Icon name="clock" size={14} /> {dict.wiki.archiveDate} {updated}
            </span>
            <span className={styles.readingTimeBadge}>
              <Icon name="clock" size={13} /> {readingTime} {dict.wiki.readingTimeMin}
            </span>
            <span className={styles.statusBadge}>
              <Icon name="sparkle" size={12} /> {doc.status === 'draft' ? dict.wiki.draftStatus : doc.status}
            </span>
          </div>
        </header>

        <div className={styles.docLayout}>
          <div
            className={`${styles.docBody} markdown-content`}
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />

          {/* CỘT PHỤ BÊN PHẢI: MỤC LỤC TRÊN TRANG NÀY + INFOBOX */}
          <aside className={styles.rightColumn}>
            {/* MỤC LỤC "TRÊN TRANG NÀY" */}
            {headings.length > 1 && (
              <div className={`${styles.tocBox} pixel-frame`} aria-label={dict.wiki.onThisPage}>
                <div className={styles.tocHeader}>
                  <Icon name="scroll" size={14} />
                  <span>{dict.wiki.onThisPage}</span>
                </div>
                <nav className={styles.tocNav}>
                  <ul className={styles.tocList}>
                    {headings.map(h => (
                      <li
                        key={h.id}
                        className={`${styles.tocItem} ${h.level === 3 ? styles.tocSubItem : ''}`}
                      >
                        <a href={`#${h.id}`} className={styles.tocLink}>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* BẢNG THÔNG TIN BÀI VIẾT */}
            <div className={`${styles.infobox} pixel-frame`} aria-label={dict.wiki.infoboxTitle}>
              <div className={styles.infoboxHeader}>
                <Icon name="book-open" size={15} />
                <h2 className={styles.infoboxTitle}>{dict.wiki.infoboxTitle}</h2>
              </div>
              <table className={styles.infoboxTable}>
                <tbody>
                  <tr>
                    <th>{dict.wiki.infoboxEra}</th>
                    <td>{updated}</td>
                  </tr>
                  <tr>
                    <th>{dict.wiki.infoboxStatus}</th>
                    <td>
                      <span className="badge amber">
                        {doc.status === 'draft' ? dict.wiki.draftStatus : doc.status}
                      </span>
                    </td>
                  </tr>
                  {doc.tags && doc.tags.length > 0 && (
                    <tr>
                      <th>{dict.wiki.infoboxTopics}</th>
                      <td>
                        <div className={styles.tagList}>
                          {doc.tags.map(t => (
                            <span key={t} className="badge forest">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                  {doc.spoiler && (
                    <tr>
                      <th>{lang === 'en' ? 'Notice' : 'Lưu ý'}</th>
                      <td>
                        <span className="badge crystal">
                          {lang === 'en' ? 'Story Spoiler' : 'Tiết lộ cốt truyện'}
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className={styles.codexFootnote}>
                <Icon name="acorn" size={12} />
                <span>{dict.footer.brandTag}</span>
              </div>
            </div>
          </aside>
        </div>

        {(prevDoc || nextDoc) && (
          <nav className={styles.docNav} aria-label={dict.wiki.infoboxTitle}>
            {prevDoc ? (
              <Link href={`/${lang}/wiki/${prevDoc.slug}`} className={`${styles.docNavPrev} pixel-frame`}>
                <span className={styles.docNavLabel}>
                  <Icon name="arrow-left" size={12} /> {dict.wiki.navigationPrev}
                </span>
                <span className={styles.docNavTitle}>{prevDoc.title}</span>
              </Link>
            ) : <span />}
            {nextDoc && (
              <Link href={`/${lang}/wiki/${nextDoc.slug}`} className={`${styles.docNavNext} pixel-frame`}>
                <span className={styles.docNavLabel}>
                  {dict.wiki.navigationNext} <Icon name="arrow-right" size={12} />
                </span>
                <span className={styles.docNavTitle}>{nextDoc.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
