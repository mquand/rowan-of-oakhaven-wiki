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
  if (!doc) return { title: 'Not Found — Rowan of Oakhaven Codex' };
  return {
    title: `${doc.title} — Rowan of Oakhaven Codex`,
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

  const updated = formatDate(doc.updated);

  return (
    <div className={styles.container}>
      <Sidebar docs={allDocs} lang={lang} />

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
            <span className={styles.statusBadge}>
              <Icon name="sparkle" size={12} /> {doc.status === 'draft' ? dict.wiki.draftStatus : doc.status}
            </span>
          </div>
        </header>

        <div className={styles.docLayout}>
          <div
            className={`${styles.docBody} markdown-content`}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <aside className={`${styles.infobox} pixel-frame`} aria-label={dict.wiki.infoboxTitle}>
            <div className={styles.infoboxHeader}>
              <Icon name="scroll" size={16} />
              <h2 className={styles.infoboxTitle}>{dict.wiki.infoboxTitle}</h2>
            </div>
            <table className={styles.infoboxTable}>
              <tbody>
                <tr>
                  <th>{dict.wiki.infoboxScope}</th>
                  <td>{doc.audience === 'public' ? dict.wiki.infoboxAudiencePublic : doc.audience}</td>
                </tr>
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
                      <span className="badge crystal">{lang === 'en' ? 'Story Spoiler' : 'Tiết lộ cốt truyện'}</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.codexFootnote}>
              <Icon name="acorn" size={12} />
              <span>{dict.footer.brandTag}</span>
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
