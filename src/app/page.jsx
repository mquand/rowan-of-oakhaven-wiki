import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import TaglineReveal from '../components/TaglineReveal';
import { getAllDocs } from '../lib/docs';
import { getDatabaseStats } from '../lib/gameData';

const ALL_DATABASES = [
  {
    icon: 'package',
    title: 'Kho Vật Phẩm',
    key: 'items',
    desc: 'Hạt giống, thảo mộc, khoáng sản, tinh thể và nguyên liệu pha chế.',
    href: '/database/items',
    link: 'Mở kho vật phẩm',
  },
  {
    icon: 'cake',
    title: 'Sổ Công Thức',
    key: 'recipes',
    desc: 'Các món trà thanh nhiệt và mẻ bánh nướng chữa lành tâm hồn.',
    href: '/database/recipes',
    link: 'Mở sổ công thức',
  },
  {
    icon: 'users',
    title: 'Hồ Sơ Cư Dân',
    key: 'characters',
    desc: 'Gặp gỡ Rowan, Pip, Mallow, Lumi, Boris và cư dân Năm Vương Quốc.',
    href: '/database/characters',
    link: 'Gặp gỡ cư dân',
  },
  {
    icon: 'farm',
    title: 'Sổ Cây Trồng',
    key: 'crops',
    desc: 'Thảo mộc theo mùa, chu kỳ sinh trưởng và sản phẩm thu hoạch.',
    href: '/database/crops',
    link: 'Xem cây trồng',
  },
  {
    icon: 'sparkle',
    title: 'Sổ Quái Vật',
    key: 'monsters',
    desc: 'Sinh vật Bụi Sao Hắc Hóa tại các đới mỏ sâu và điểm yếu cần khai thác.',
    href: '/database/monsters',
    link: 'Xem quái vật',
  },
  {
    icon: 'sword',
    title: 'Vũ Khí Ma Thuật',
    key: 'weapons',
    desc: 'Kiếm pha lê, liềm ma thuật, đèn lồng bão rèn tại Lò Boris.',
    href: '/database/weapons',
    link: 'Xem vũ khí',
  },
  {
    icon: 'book-open',
    title: 'Kỹ Năng Tiện Ích',
    key: 'perks',
    desc: 'Bí kíp bị động của Bà Ngoại phục hồi qua từng hành trình.',
    href: '/database/perks',
    link: 'Xem kỹ năng',
  },
  {
    icon: 'map-pin',
    title: 'Bản Đồ 5 Vực',
    key: 'locations',
    desc: 'Hành trình mở rộng qua Năm Vương Quốc và thị trấn khởi đầu.',
    href: '/database/locations',
    link: 'Khám phá bản đồ',
  },
];

export default function HomePage() {
  const docs = getAllDocs();
  const stats = getDatabaseStats();

  return (
    <div>
      {/* Hero — cassette tape style */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Fluvio Games · Official Wiki</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>Rowan of Oakhaven</span>
          </h1>
          <TaglineReveal
            text="Cozy dark pixel RPG — ASMR tea brewing, magic bakery, herb farming & crystal mining."
            className={styles.tagline}
          />
          <div className={styles.heroActions}>
            <Link href="/wiki" className={styles.primaryBtn}>
              Thư viện tài liệu
            </Link>
            <Link href="/database" className={styles.secondaryBtn}>
              Cơ sở dữ liệu ({stats.total})
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <dt>{stats.items}</dt>
              <dd>vật phẩm</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{stats.recipes}</dt>
              <dd>công thức</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{stats.characters}</dt>
              <dd>cư dân</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{stats.crops}</dt>
              <dd>cây trồng</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{stats.monsters}</dt>
              <dd>quái vật</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{stats.weapons}</dt>
              <dd>vũ khí</dd>
            </div>
            <div className={styles.statItem}>
              <dt>{docs.length}</dt>
              <dd>tài liệu</dd>
            </div>
          </div>
          <div className={styles.heroOrnament} aria-hidden="true" />
        </div>
      </section>

      {/* Core docs — wiki link list */}
      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>Core Docs</p>
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
                  <span className={styles.linkArrow} aria-hidden="true">
                    <Icon name="caret-right" size={14} />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Game database — all 8 entry points */}
      <Reveal delay={150}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>Database</p>
            <h2>Cơ sở dữ liệu trò chơi</h2>
            <p>Dữ liệu vật phẩm, công thức, quái vật và cư dân cập nhật từ sổ tay của Bà Ngoại Amalia.</p>
          </div>

          <div className={styles.dbEntries}>
            {ALL_DATABASES.map(d => (
              <article key={d.key} className={`${styles.dbEntry} pixel-frame`}>
                <div className={styles.dbIcon}>
                  <Icon name={d.icon} size={20} />
                </div>
                <div className={styles.dbBody}>
                  <h3>
                    {d.title} <span className={styles.dbCount}>({stats[d.key]})</span>
                  </h3>
                  <p>{d.desc}</p>
                </div>
                <Link href={d.href} className={styles.dbLink}>
                  {d.link} <Icon name="arrow-right" size={13} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
