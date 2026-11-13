import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Doc.module.scss';
import Sidebar from '../../../components/Sidebar';
import Icon from '../../../components/Icon';
import { getAllDocs, getDocBySlug } from '../../../lib/docs';

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
          <Link href="/wiki">Tàng Thư Các</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{doc.title}</span>
        </nav>

        <header className={styles.docHeader}>
          <h1 className={styles.docMainTitle}>{doc.title}</h1>
          <div className={styles.docMeta}>
            <span className={styles.date}>
              <Icon name="clock" size={14} /> Lưu trữ ngày {updated}
            </span>
            <span className={styles.statusBadge}>
              <Icon name="sparkle" size={12} /> {doc.status === 'draft' ? 'Bản thảo Oakhaven' : doc.status}
            </span>
          </div>
        </header>

        <div className={styles.docLayout}>
          <div
            className={`${styles.docBody} markdown-content`}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <aside className={`${styles.infobox} pixel-frame`} aria-label="Thông tin cuộn thư">
            <div className={styles.infoboxHeader}>
              <Icon name="scroll" size={16} />
              <h2 className={styles.infoboxTitle}>Sổ Tay Lưu Trữ</h2>
            </div>
            <table className={styles.infoboxTable}>
              <tbody>
                <tr>
                  <th>Phạm vi</th>
                  <td>{doc.audience === 'public' ? 'Công khai 5 Vương Quốc' : doc.audience}</td>
                </tr>
                <tr>
                  <th>Niên đại</th>
                  <td>{updated}</td>
                </tr>
                <tr>
                  <th>Trạng thái</th>
                  <td>
                    <span className="badge amber">
                      {doc.status === 'draft' ? 'Bản thảo' : doc.status}
                    </span>
                  </td>
                </tr>
                {doc.tags && doc.tags.length > 0 && (
                  <tr>
                    <th>Thần chú</th>
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
                    <th>Lưu ý</th>
                    <td>
                      <span className="badge crystal">Tiết lộ cốt truyện</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className={styles.codexFootnote}>
              <Icon name="acorn" size={12} />
              <span>Tiệm Bụi Sao · Rìa Rừng Thầm Thì</span>
            </div>
          </aside>
        </div>

        {(prevDoc || nextDoc) && (
          <nav className={styles.docNav} aria-label="Điều hướng cuộn thư">
            {prevDoc ? (
              <Link href={`/wiki/${prevDoc.slug}`} className={`${styles.docNavPrev} pixel-frame`}>
                <span className={styles.docNavLabel}>
                  <Icon name="arrow-left" size={12} /> Cuộn thư trước
                </span>
                <span className={styles.docNavTitle}>{prevDoc.title}</span>
              </Link>
            ) : <span />}
            {nextDoc && (
              <Link href={`/wiki/${nextDoc.slug}`} className={`${styles.docNavNext} pixel-frame`}>
                <span className={styles.docNavLabel}>
                  Cuộn thư tiếp <Icon name="arrow-right" size={12} />
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
