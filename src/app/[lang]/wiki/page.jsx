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
    title: `${dict.wiki.hubTitle} — Rowan of Oakhaven Wiki`,
    description: dict.wiki.hubDesc,
  };
}

const DOC_GROUP_CONFIG = [
  {
    id: 'gameplay',
    slugs: ['gameplay-guide', 'calendar-seasons', 'festivals-events'],
    icon: 'farm',
    accent: 'green',
  },
  {
    id: 'world',
    slugs: ['world-overview', 'character-roster'],
    icon: 'map-pin',
    accent: 'blue',
  },
  {
    id: 'combat',
    slugs: ['dungeon-combat', 'lore-story'],
    icon: 'sword',
    accent: 'purple',
  },
  {
    id: 'intro',
    slugs: ['game-overview'],
    icon: 'book-open',
    accent: 'amber',
  },
];

export default async function WikiHubPage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const allDocs = getAllDocs(lang);
  const docsBySlug = Object.fromEntries(allDocs.map(d => [d.slug, d]));

  const starterDoc = docsBySlug['getting-started'];
  const starterDesc = dict.wiki.docDescriptions['getting-started'] || (starterDoc && starterDoc.title);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${lang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{dict.wiki.breadcrumb}</span>
      </nav>

      <header className={styles.header}>
        <h1>{dict.wiki.hubTitle}</h1>
        <p className={styles.headerDesc}>{dict.wiki.hubDesc}</p>
      </header>

      {/* 1. THẺ LỚN NỔI BẬT: HƯỚNG DẪN KHỞI ĐẦU */}
      {starterDoc && (
        <section className={styles.featuredSection}>
          <div className={`${styles.featuredCard} pixel-frame`}>
            <div className={styles.featuredTop}>
              <div className={styles.featuredBadgeRow}>
                <span className="badge amber">
                  <Icon name="sparkle" size={13} /> {dict.wiki.starterFeaturedBadge}
                </span>
                <span className={styles.readTime}>
                  <Icon name="clock" size={13} /> 5 {dict.wiki.readingTimeMin}
                </span>
              </div>
            </div>

            <div className={styles.featuredContent}>
              <h2 className={styles.featuredTitle}>
                {dict.wiki.starterFeaturedTitle}
              </h2>
              <p className={styles.featuredDesc}>
                {dict.wiki.starterFeaturedDesc || starterDesc}
              </p>

              <div className={styles.featuredSteps}>
                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>1</span>
                  <span>Dọn nông trại & nhặt củi than</span>
                </div>
                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>2</span>
                  <span>Gieo hạt mầm thảo mộc đầu tiên</span>
                </div>
                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>3</span>
                  <span>Gặp thợ rèn Boris & dân làng</span>
                </div>
                <div className={styles.stepItem}>
                  <span className={styles.stepNum}>4</span>
                  <span>Mở tiệm trà Bụi Sao buổi tối</span>
                </div>
              </div>
            </div>

            <div className={styles.featuredFooter}>
              <Link href={`/${lang}/wiki/getting-started`} className={styles.featuredActionBtn}>
                <span>{dict.wiki.starterAction}</span>
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. CÁC NHÓM BÀI VIẾT: DANH SÁCH HÀNG GỌN 2 CỘT */}
      <div className={styles.sectionsList}>
        {DOC_GROUP_CONFIG.map(group => {
          const groupDocs = group.slugs.map(s => docsBySlug[s]).filter(Boolean);
          if (groupDocs.length === 0) return null;
          const groupTitle = dict.wiki.groups[group.id] || group.id;

          return (
            <section key={group.id} className={`${styles.sectionBlock} ${styles[`accent-${group.accent}`]}`}>
              <div className={styles.sectionHead}>
                <div className={styles.groupIconBox}>
                  <Icon name={group.icon} size={18} />
                </div>
                <h2>{groupTitle}</h2>
              </div>

              <div className={styles.compactRowGrid}>
                {groupDocs.map(doc => {
                  const cleanTitle = doc.title.replace(/\s*\(Spoil\)/i, '');
                  const docDescription = dict.wiki.docDescriptions[doc.slug] || doc.title;
                  const time = (dict.wiki.readingTimes && dict.wiki.readingTimes[doc.slug]) || 5;
                  const tagLabel = (dict.wiki.difficultyLabels && dict.wiki.difficultyLabels[doc.slug]) || 'Hướng dẫn';

                  return (
                    <Link
                      key={doc.slug}
                      href={`/${lang}/wiki/${doc.slug}`}
                      className={`${styles.compactRowCard} pixel-frame`}
                    >
                      <div className={styles.rowLeft}>
                        <div className={styles.rowIcon}>
                          <Icon name={group.icon} size={16} />
                        </div>
                        <div className={styles.rowInfo}>
                          <h3 className={styles.rowTitle}>{cleanTitle}</h3>
                          <p className={styles.rowDesc}>{docDescription}</p>
                        </div>
                      </div>

                      <div className={styles.rowMeta}>
                        <span className={styles.rowTag}>{tagLabel}</span>
                        <span className={styles.rowTime}>
                          <Icon name="clock" size={12} /> {time} {dict.wiki.readingTimeMin}
                        </span>
                      </div>
                    </Link>
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
