import { notFound } from 'next/navigation';
import styles from './Doc.module.scss';
import Sidebar from '../../../components/Sidebar';
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

  return (
    <div className={styles.container}>
      <Sidebar docs={allDocs} />

      <article className={styles.contentWrapper}>
        <div className={styles.docMeta}>
          <span className="badge">Audience: {doc.audience}</span>
          {doc.spoiler && <span className="badge crystal">Spoiler Warning</span>}
          <span className={styles.date}>🕒 Cập nhật: {doc.updated}</span>

          <div className={styles.tags}>
            {doc.tags.map(t => (
              <span key={t} className="badge forest">#{t}</span>
            ))}
          </div>
        </div>

        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: doc.content }}
        />
      </article>
    </div>
  );
}
