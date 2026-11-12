import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import { getAllDocs } from '../lib/docs';
import { getItems, getRecipes, getCharacters } from '../lib/gameData';

const DATABASES = [
  {
    icon: 'package',
    title: 'Vật phẩm',
    key: 'items',
    desc: 'Hạt giống, thảo mộc, khoáng sản, tinh thể và nguyên liệu pha chế.',
    href: '/database/items',
    link: 'Mở kho vật phẩm',
  },
  {
    icon: 'cake',
    title: 'Công thức',
    key: 'recipes',
    desc: 'Các món trà thanh nhiệt và mẻ bánh nướng chữa lành tâm hồn.',
    href: '/database/recipes',
    link: 'Mở sổ công thức',
  },
  {
    icon: 'users',
    title: 'Dân làng',
    key: 'characters',
    desc: 'Gặp gỡ Rowan, Pip, Mallow, Lumi, Boris và các cư dân Năm Vương quốc.',
    href: '/database/characters',
    link: 'Gặp gỡ cư dân',
  },
];

export default function HomePage() {
  const docs = getAllDocs();
  const items = getItems();
  const recipes = getRecipes();
  const characters = getCharacters();
  const counts = { items: items.length, recipes: recipes.length, characters: characters.length };

  return (
    <div>
      {/* Hero — cassette tape style, not a landing-page billboard */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Fluvio Games · Official Wiki</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>Rowan of Oakhaven</span>
          </h1>
          <p className={styles.tagline}>
            Cozy dark pixel RPG — ASMR tea brewing, magic bakery, herb farming & crystal mining.
          </p>
          <div className={styles.heroActions}>
            <Link href="/wiki/game-overview" className={styles.primaryBtn}>
              Đọc tổng quan game
            </Link>
            <Link href="/database/recipes" className={styles.secondaryBtn}>
              Xem sổ công thức
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <dt>{counts.items}</dt>
              <dd>vật phẩm</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{counts.recipes}</dt>
              <dd>công thức</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{counts.characters}</dt>
              <dd>cư dân</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{docs.length}</dt>
              <dd>tài liệu</dd>
            </div>
          </div>
          <div className={styles.heroOrnament} aria-hidden="true" />
        </div>
      </section>

      {/* Core docs — wiki link list, not marketing cards */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Tài liệu cốt lõi</h2>
          <p>Hướng dẫn, thế giới và nhân vật của Rowan of Oakhaven.</p>
        </div>

        <div className={styles.linkList}>
          {docs.map(doc => (
            <article key={doc.slug} className={styles.linkItem}>
              <Link href={`/wiki/${doc.slug}`} className={styles.linkRow}>
                <span className={styles.linkIcon}><Icon name="scroll" size={16} /></span>
                <span className={styles.linkTitle}>{doc.title}</span>
                <span className={styles.linkDesc}>{doc.audience}</span>
                <span className={styles.linkArrow} aria-hidden="true">›</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Game database — compact entry points */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Cơ sở dữ liệu trò chơi</h2>
          <p>Dữ liệu vật phẩm, công thức và cư dân được cập nhật từ sổ thử nghiệm của Bà Ngoại Amalia.</p>
        </div>

        <div className={styles.dbEntries}>
          {DATABASES.map(d => (
            <article key={d.key} className={styles.dbEntry}>
              <div className={styles.dbIcon}>
                <Icon name={d.icon} size={20} />
              </div>
              <div className={styles.dbBody}>
                <h3>
                  {d.title} <span className={styles.dbCount}>({counts[d.key]})</span>
                </h3>
                <p>{d.desc}</p>
              </div>
              <Link href={d.href} className={styles.dbLink}>
                {d.link} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
