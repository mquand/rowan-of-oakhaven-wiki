import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Doc.module.scss';
import Sidebar from '../../../components/Sidebar';
import Icon from '../../../components/Icon';
import { getAllDocs, getDocBySlug } from '../../../lib/docs';

// Pixel font chỉ dùng cho nhãn ASCII (tránh glyph tiếng Việt bị fallback)
const SMART_PUNCTUATION = /[\u2013\u2014\u2018\u2019\u201C\u201D\u2026]/g;

function canUsePixelFont(text) {
  return /^[\x20-\x7E]*$/.test(text.replace(SMART_PUNCTUATION, '-'));
}

function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || '');
  if (!match) return value || '—';
  return `${match[3]}.${match[2]}.${match[1]}`;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map(doc => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) return { title: 'Không tìm thấy trang' };
  return {
    title: `${doc.title} — Rowan of Oakhaven Wiki`,
  };
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) notFound();

  const allDocs = getAllDocs();
  const index = allDocs.findIndex(d => d.slug === slug);
  const prevDoc = index > 0 ? allDocs[index - 1] : null;
  const nextDoc = index < allDocs.length - 1 ? allDocs[index + 1] : null;

  // Bỏ h1 đầu tiên trong markdown vì header bài viết đã render riêng
  const content = doc.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '');
  const updated = formatDate(doc.updated);

  return (
    <div className={styles.container}>
      <Sidebar docs={allDocs} />

      <article className={`${styles.contentWrapper} pixel-frame`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link href="/wiki">Tài liệu</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{doc.title}</span>
        </nav>

        <header className={styles.docHeader}>
          <span className={styles.kicker}>
            <Icon name="book-open" size={14} />
            Wiki Document
          </span>
          <h1 className={canUsePixelFont(doc.title) ? styles.pixelTitle : undefined}>
            {doc.title}
          </h1>
          <div className={styles.docMeta}>
            <span className={styles.date}>
              <Icon name="clock" size={14} /> Cập nhật {updated}
            </span>
            <span className={styles.status}>{doc.status}</span>
          </div>
        </header>

        <div className={styles.docLayout}>
          <div
            className={`${styles.docBody} markdown-content`}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <aside className={styles.infobox} aria-label="Thông tin trang">
            <h2 className={styles.infoboxTitle}>Info</h2>
            <table>
              <tbody>
                <tr>
                  <th>Đối tượng</th>
                  <td>{doc.audience}</td>
                </tr>
                <tr>
                  <th>Cập nhật</th>
                  <td>{updated}</td>
                </tr>
                <tr>
                  <th>Trạng thái</th>
                  <td>{doc.status}</td>
                </tr>
                {doc.tags.length > 0 && (
                  <tr>
                    <th>Thẻ</th>
                    <td>
                      <span className={styles.tagList}>
                        {doc.tags.map(t => (
                          <span key={t} className="badge forest">
                            #{t}
                          </span>
                        ))}
                      </span>
                    </td>
                  </tr>
                )}
                {doc.spoiler && (
                  <tr>
                    <th>Cảnh báo</th>
                    <td>
                      <span className="badge crystal">Spoiler</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </aside>
        </div>

        {(prevDoc || nextDoc) && (
          <nav className={styles.docNav} aria-label="Điều hướng bài viết">
            {prevDoc ? (
              <Link href={`/wiki/${prevDoc.slug}`} className={styles.docNavPrev}>
                <span className={styles.docNavLabel}>
                  <Icon name="arrow-left" size={12} /> Bài trước
                </span>
                <span className={styles.docNavTitle}>{prevDoc.title}</span>
              </Link>
            ) : <span />}
            {nextDoc && (
              <Link href={`/wiki/${nextDoc.slug}`} className={styles.docNavNext}>
                <span className={styles.docNavLabel}>
                  Bài tiếp <Icon name="arrow-right" size={12} />
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
