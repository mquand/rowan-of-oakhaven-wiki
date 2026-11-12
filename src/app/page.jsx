import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import TaglineReveal from '../components/TaglineReveal';
import { getAllDocs } from '../lib/docs';
import { getDatabaseStats } from '../lib/gameData';

const DOC_META = {
  'calendar-seasons': {
    icon: 'clock',
    category: 'LỊCH TRÌNH',
    desc: 'Chu kỳ 28 ngày mỗi mùa, thời tiết sương mù, mưa rào và lịch gieo trồng thảo mộc theo mùa.',
  },
  'character-roster': {
    icon: 'users',
    category: 'CƯ DÂN',
    desc: 'Hồ sơ Rowan, chú cú Pip, thợ rèn Boris, thợ làm vườn Maeve, Lumi và cư dân Năm Vương Quốc.',
  },
  'dungeon-combat': {
    icon: 'sword',
    category: 'CHIẾN ĐẤU',
    desc: 'Khám phá đới mỏ sâu, vũ khí ma thuật, đòn chém 3 nhịp và cách thanh tẩy Bụi Sao Hắc Hóa.',
  },
  'festivals-events': {
    icon: 'cake',
    category: 'LỄ HỘI',
    desc: 'Các lễ hội truyền thống theo mùa: Hội thả đèn, Chợ hoa xuân, Đêm bánh nướng và Trăng rằm.',
  },
  'game-overview': {
    icon: 'book-open',
    category: 'TỔNG QUAN',
    desc: 'Logline, cốt truyện mở đầu, chu kỳ ngày 15 phút thời gian thực và 12 tính năng đặc trưng.',
  },
  'gameplay-guide': {
    icon: 'farm',
    category: 'LỐI CHƠI',
    desc: 'Nhịp sống một ngày: bình minh, làm vườn, thám hiểm mỏ, pha trà buổi tối và thư giãn đêm muộn.',
  },
  'getting-started': {
    icon: 'sparkle',
    category: 'KHỞI ĐẦU',
    desc: 'Hướng dẫn 7 ngày đầu đời: dọn vườn hoang, làm quen dân làng, chọn ấm trà đầu tiên và quản lý sức lực.',
  },
  'lore-story': {
    icon: 'diamond',
    category: 'TRUYỀN THUYẾT',
    desc: 'Nguồn gốc sâu xa của Bụi Sao, bí mật về người Bà Amalia và sứ mệnh chữa lành vùng đất.',
  },
  'world-overview': {
    icon: 'map-pin',
    category: 'THẾ GIỚI',
    desc: 'Bản đồ Năm Vương Quốc: Oakhaven, Vực Lò Rèn Boris, Rừng Tinh Linh, Đảo Cực Quang và Hoàng Triều.',
  },
};

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
      {/* Hero — Tiệm Bụi Sao Rìa Rừng Thầm Thì */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Tiệm Bụi Sao · Fluvio Games Official Wiki</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>Rowan of Oakhaven</span>
          </h1>
          <TaglineReveal
            text="Cozy dark pixel RPG — ASMR tea brewing, magic bakery, herb farming & crystal mining."
            className={styles.tagline}
          />
          <div className={styles.heroActions}>
            <Link href="/wiki" className={styles.primaryBtn}>
              <Icon name="book-open" size={16} /> Thư viện tài liệu
            </Link>
            <Link href="/database" className={styles.secondaryBtn}>
              <Icon name="package" size={16} /> Cơ sở dữ liệu ({stats.total})
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

      {/* Tàng Thư Các Oakhaven — Lưới Thẻ Cuộn Thư Thay Cho Danh Sách Nhàm Chán */}
      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>Oakhaven Archives</p>
            <h2>Tàng Thư Các Oakhaven</h2>
            <p>Hệ thống cuộn thư hướng dẫn, bí mật thế giới và câu chuyện cư dân Oakhaven.</p>
          </div>

          <div className={styles.codexGrid}>
            {docs.map(doc => {
              const meta = DOC_META[doc.slug] || {
                icon: 'scroll',
                category: 'TÀI LIỆU',
                desc: doc.audience,
              };
              return (
                <article key={doc.slug} className={`${styles.codexCard} pixel-frame`}>
                  <div className={styles.codexTop}>
                    <div className={styles.codexSlot}>
                      <Icon name={meta.icon} size={20} />
                    </div>
                    <span className={styles.codexCategory}>{meta.category}</span>
                  </div>
                  <h3 className={styles.codexTitle}>{doc.title}</h3>
                  <p className={styles.codexDesc}>{meta.desc}</p>
                  <div className={styles.codexFooter}>
                    <Link href={`/wiki/${doc.slug}`} className={styles.codexArrow}>
                      Mở đọc cuộn thư <Icon name="arrow-right" size={13} />
                    </Link>
                    {doc.spoiler && (
                      <span className="badge crystal">Spoiler</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* Sổ Tay Thám Hiểm Của Bà Ngoại Amalia — Toàn Bộ 8 Danh Mục */}
      <Reveal delay={150}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>Grandmother&apos;s Compendium</p>
            <h2>Sổ Tay Thám Hiểm Của Bà Ngoại</h2>
            <p>Kho dữ liệu thực tế về vật phẩm, công thức, quái vật và cư dân Năm Vương Quốc.</p>
          </div>

          <div className={styles.dbEntries}>
            {ALL_DATABASES.map(d => (
              <article key={d.key} className={`${styles.dbEntry} pixel-frame`}>
                <div className={styles.dbTop}>
                  <div className={styles.dbIcon}>
                    <Icon name={d.icon} size={22} />
                  </div>
                  <span className={styles.dbBadge}>
                    {stats[d.key]} mục
                  </span>
                </div>
                <div className={styles.dbBody}>
                  <h3>{d.title}</h3>
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
