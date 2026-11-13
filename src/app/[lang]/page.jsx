import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../../components/Icon';
import Reveal from '../../components/Reveal';
import HeroSearchBar from '../../components/HeroSearchBar';
import CharacterPortrait from '../../components/CharacterPortrait';
import { DEFAULT_LOCALE, LOCALES } from '../../lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';
import { getDatabaseStats } from '../../lib/gameData';

const DATABASE_CATEGORIES = [
  { key: 'items', icon: 'package', href: lang => `/${lang}/database/items` },
  { key: 'recipes', icon: 'cake', href: lang => `/${lang}/database/recipes` },
  { key: 'characters', icon: 'users', href: lang => `/${lang}/database/characters` },
  { key: 'crops', icon: 'farm', href: lang => `/${lang}/database/crops` },
  { key: 'monsters', icon: 'sparkle', href: lang => `/${lang}/database/monsters` },
  { key: 'weapons', icon: 'sword', href: lang => `/${lang}/database/weapons` },
  { key: 'perks', icon: 'book-open', href: lang => `/${lang}/database/perks` },
  { key: 'locations', icon: 'map-pin', href: lang => `/${lang}/database/locations` },
];

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default async function HomePage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);
  const stats = getDatabaseStats(lang);

  return (
    <div className={styles.homeWrapper}>
      {/* 1. HERO SHOWCASE & CTA NỔI BẬT */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.kicker}>
            <span>{dict.home.kicker}</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>{dict.home.heroTitle}</span>
          </h1>

          <div className={styles.heroSearchWrap}>
            <HeroSearchBar lang={lang} />
          </div>

          {/* CTA NỔI BẬT DÀNH CHO NGƯỜI MỚI CHƠI */}
          <div className={styles.starterCtaWrap}>
            <Link
              href={`/${lang}/wiki/getting-started`}
              className={`${styles.starterCtaBtn} pixel-frame`}
            >
              <span className={styles.starterBadge}>
                <Icon name="sparkle" size={13} /> {dict.wiki.starterFeaturedBadge}
              </span>
              <span className={styles.starterText}>{dict.home.starterCta}</span>
              <Icon name="arrow-right" size={15} className={styles.starterArrow} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CỔNG BÁCH KHOA TRÒ CHƠI — ĐƯA LÊN NGAY DƯỚI HERO */}
      <Reveal delay={100}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>{dict.home.portalKicker}</p>
            <h2>{dict.home.portalTitle}</h2>
            <p className={styles.sectionDesc}>{dict.home.portalDesc}</p>
          </div>

          <div className={styles.databaseGrid}>
            {DATABASE_CATEGORIES.map(cat => {
              const catData = dict.database.categories[cat.key];
              if (!catData) return null;
              const count = stats[cat.key] || 0;

              return (
                <Link
                  key={cat.key}
                  href={cat.href(lang)}
                  className={`${styles.categoryCard} pixel-frame`}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardIconBox}>
                      <Icon name={cat.icon} size={20} />
                    </div>
                    <span className="badge amber" style={{ fontSize: '11px' }}>
                      {count} {dict.home.entriesCount}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{catData.title}</h3>
                    <p className={styles.cardDesc}>{catData.desc}</p>
                  </div>

                  <div className={styles.cardLink}>
                    <span>{dict.database.exploreCategory}</span>
                    <Icon name="arrow-right" size={13} />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className={styles.sectionActionCenter}>
            <Link href={`/${lang}/database`} className={styles.actionBtn}>
              <Icon name="package" size={16} /> {dict.home.viewAllDatabase}
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 3. NHÂN VẬT ĐỒNG HÀNH — HẠ XUỐNG DƯỚI, LƯỚI 4 CỘT HOẶC 2X2 */}
      <Reveal delay={150}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>{dict.home.companionsKicker}</p>
            <h2>{dict.home.companionsTitle}</h2>
            <p className={styles.sectionDesc}>{dict.home.companionsDesc}</p>
          </div>

          <div className={styles.companionsGrid}>
            {dict.home.companions.map(char => (
              <article key={char.id} className={`${styles.companionCard} pixel-frame`}>
                <div className={styles.compHeader}>
                  <CharacterPortrait id={char.id} size={48} />
                  <div className={styles.compHeaderInfo}>
                    <h3 className={styles.compName}>{char.name}</h3>
                    <span className={styles.compRole}>{char.role}</span>
                    <span className="badge forest" style={{ fontSize: '11px', alignSelf: 'flex-start' }}>
                      {char.species}
                    </span>
                  </div>
                </div>

                <p className={styles.compDesc}>{char.desc}</p>
              </article>
            ))}
          </div>

          <div className={styles.sectionActionCenter}>
            <Link href={`/${lang}/database/characters`} className={styles.actionBtn}>
              <Icon name="users" size={16} /> {dict.home.companionsAllBtn}
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
