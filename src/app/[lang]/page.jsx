import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../../components/Icon';
import Reveal from '../../components/Reveal';
import HeroSearchBar from '../../components/HeroSearchBar';
import { DEFAULT_LOCALE, LOCALES } from '../../lib/i18n/config';
import { getDictionary } from '../../lib/i18n/getDictionary';

const COMPANION_ICONS = {
  rowan: 'sparkle',
  pip: 'leaf',
  mallow: 'cake',
  boris: 'sword',
};

const PORTAL_ITEMS = [
  { key: 'wiki', icon: 'book-open', getHref: lang => `/${lang}/wiki` },
  { key: 'items', icon: 'package', getHref: lang => `/${lang}/database/items` },
  { key: 'recipes', icon: 'cake', getHref: lang => `/${lang}/database/recipes` },
  { key: 'locations', icon: 'map-pin', getHref: lang => `/${lang}/database/locations` },
];

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default async function HomePage({ params }) {
  const { lang = DEFAULT_LOCALE } = await params;
  const dict = getDictionary(lang);

  return (
    <div className={styles.homeWrapper}>
      {/* 1. HERO SHOWCASE */}
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
        </div>
      </section>

      {/* 2. MEET THE COMPANIONS — NHỮNG NGƯỜI BẠN ĐỒNG HÀNH */}
      <Reveal delay={100}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>{dict.home.companionsKicker}</p>
            <h2>{dict.home.companionsTitle}</h2>
            <p>{dict.home.companionsDesc}</p>
          </div>

          <div className={styles.companionsGrid}>
            {dict.home.companions.map(char => (
              <article key={char.id} className={`${styles.companionCard} pixel-frame`}>
                <div className={styles.compTop}>
                  <div className={styles.compAvatar}>
                    <Icon name={COMPANION_ICONS[char.id] || 'sparkle'} size={28} />
                  </div>
                  <div className={styles.compInfo}>
                    <h3 className={styles.compName}>{char.name}</h3>
                    <div className={styles.compRole}>{char.role}</div>
                    <span className="badge forest" style={{ fontSize: '11px' }}>{char.species}</span>
                  </div>
                </div>
                <div className={styles.compQuote}>
                  &ldquo;{char.quote}&rdquo;
                </div>
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

      {/* 3. CODEX & DATABASE GATEWAY — CỔNG BÁCH KHOA TOÀN THƯ */}
      <Reveal delay={150}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>{dict.home.portalKicker}</p>
            <h2>{dict.home.portalTitle}</h2>
            <p>{dict.home.portalDesc}</p>
          </div>

          <div className={styles.codexPortalGrid}>
            {PORTAL_ITEMS.map(item => {
              const cardData = dict.home.portalCards[item.key];
              if (!cardData) return null;
              return (
                <article key={item.key} className={`${styles.portalCard} pixel-frame`}>
                  <div className={styles.portalIconBox}>
                    <Icon name={item.icon} size={22} />
                  </div>
                  <div className={styles.portalBody}>
                    <h3 className={styles.portalTitle}>{cardData.title}</h3>
                    <p className={styles.portalDesc}>{cardData.desc}</p>
                  </div>
                  <Link href={item.getHref(lang)} className={styles.portalLink}>
                    {cardData.linkText} <Icon name="arrow-right" size={13} />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
