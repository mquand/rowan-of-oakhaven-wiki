import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Doc.module.scss';
import Sidebar from '../../../components/Sidebar';
import Icon from '../../../components/Icon';
import { getAllDocs, getDocBySlug } from '../../../lib/docs';

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

  return (
    <div className={styles.container}>
      <Sidebar docs={allDocs} />

      <article className={`${styles.contentWrapper} pixel-frame`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <span>Tài liệu</span>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{doc.title}</span>
        </nav>

        <header className={styles.docHeader}>
          <h1>{doc.title}</h1>
          <div className={styles.docMeta}>
            <span className="badge">Audience: {doc.audience}</span>
            {doc.spoiler && <span className="badge crystal">Spoiler</span>}
            <span className={styles.date}><Icon name="clock" size={14} /> Cập nhật: {doc.updated}</span>
            <div className={styles.tags}>
              {doc.tags.map(t => (
                <span key={t} className="badge forest">#{t}</span>
              ))}
            </div>
          </div>
        </header>

        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {(prevDoc || nextDoc) && (
          <nav className={styles.docNav} aria-label="Điều hướng bài viết">
            {prevDoc ? (
              <Link href={`/wiki/${prevDoc.slug}`} className={styles.docNavPrev}>
                <span className={styles.docNavLabel}>← Bài trước</span>
                <span className={styles.docNavTitle}>{prevDoc.title}</span>
              </Link>
            ) : <span />}
            {nextDoc && (
              <Link href={`/wiki/${nextDoc.slug}`} className={styles.docNavNext}>
                <span className={styles.docNavLabel}>Bài tiếp →</span>
                <span className={styles.docNavTitle}>{nextDoc.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
