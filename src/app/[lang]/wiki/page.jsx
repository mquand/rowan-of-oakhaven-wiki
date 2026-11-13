import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from './WikiHub.module.scss';
import { getAllDocs } from '../../../lib/docs';
import { DEFAULT_LOCALE, LOCALES } from '../../../lib/i18n/config';
import { getDictionary } from '../../../lib/i18n/getDictionary';

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  return {
    title: `${dict.wiki.hubTitle} — Rowan of Oakhaven Codex`,
    description: dict.wiki.hubDesc,
  };
}

const DOC_GROUP_CONFIG = [
  {
    id: 'intro',
    slugs: ['game-overview', 'getting-started'],
    icon: 'book-open',
  },
  {
    id: 'gameplay',
    slugs: ['gameplay-guide', 'calendar-seasons', 'festivals-events'],
    icon: 'farm',
  },
  {
    id: 'world',
    slugs: ['world-overview', 'character-roster'],
    icon: 'map-pin',
  },
  {
    id: 'combat',
    slugs: ['dungeon-combat', 'lore-story'],
    icon: 'sword',
  },
];

export default async function WikiHubPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const allDocs = getAllDocs(lang);
  const docsBySlug = Object.fromEntries(allDocs.map(d => [d.slug, d]));

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.wiki.breadcrumb}</span>
      </nav>

      <header className={styles.header}>
        <h1>{dict.wiki.hubTitle}</h1>
        <p>{dict.wiki.hubDesc}</p>
      </header>

      <div className={styles.sectionsList}>
        {DOC_GROUP_CONFIG.map(group => {
          const groupDocs = group.slugs.map(s => docsBySlug[s]).filter(Boolean);
          if (groupDocs.length === 0) return null;
          const groupTitle = dict.wiki.groups[group.id] || group.id;

          return (
            <section key={group.id} className={styles.sectionBlock}>
              <div className={styles.sectionHead}>
                <Icon name={group.icon} size={20} />
                <h2>{groupTitle}</h2>
              </div>

              <div className={styles.docGrid}>
                {groupDocs.map(doc => {
                  const cleanTitle = doc.title.replace(/\s*\(Spoil\)/i, '');
                  const docDescription = dict.wiki.docDescriptions[doc.slug] || doc.title;

                  return (
                    <article key={doc.slug} className={`${styles.docCard} pixel-frame`}>
                      <div className={styles.cardTop}>
                        <div className={styles.iconBox}>
                          <Icon name="scroll" size={18} />
                        </div>
                      </div>

                      <h3 className={styles.docTitle}>{cleanTitle}</h3>
                      <p className={styles.docSummary}>
                        {docDescription}
                      </p>

                      <div className={styles.cardFooter}>
                        <Link href={`/${lang}/wiki/${doc.slug}`} className={styles.docLink}>
                          {dict.wiki.readMore} <Icon name="arrow-right" size={13} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
