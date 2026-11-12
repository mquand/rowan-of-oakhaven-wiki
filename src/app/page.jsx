import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import TaglineReveal from '../components/TaglineReveal';
import { getAllDocs } from '../lib/docs';
import { getItems, getRecipes, getCharacters } from '../lib/gameData';

const PILLARS = [
  {
    icon: 'tea-bag',
    title: 'Pha trà ASMR xúc giác',
    desc: 'Tiếng đá lách cách, nước sôi róc rách, xoáy nước đổi màu huyền ảo cùng hương hoa sen ngậm sương.',
    href: '/database/recipes',
    link: 'Xem thực đơn trà',
  },
  {
    icon: 'cake',
    title: 'Lò bánh trăng sao',
    desc: 'Nhào bột dẻo quánh, dập khuôn trăng sao, nướng bánh trong lò đá than hồng canh giờ vàng ruộm.',
    href: '/database/recipes',
    link: 'Xem công thức bánh',
  },
  {
    icon: 'farm',
    title: 'Nông trại và hang mỏ',
    desc: 'Gieo trồng thảo mộc, hái dâu tuyết dạ quang và cầm đèn đom đóm soi bóng hang mỏ tinh thể.',
    href: '/database/items',
    link: 'Khám phá tài nguyên',
  },
  {
    icon: 'heart',
    title: 'Xoa dịu quái vật',
    desc: 'Không gươm đao tàn bạo. Giải giáp và thuần hóa quái vật bằng những chiếc bánh thơm lừng trúng điểm yếu vị giác.',
    href: '/wiki/game-overview',
    link: 'Tìm hiểu cơ chế',
  },
];

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
    icon: 'book-open',
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
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Fluvio Games presents</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>Rowan of Oakhaven</span>
          </h1>
          <p className={styles.tagline}>
            Một tách trà ấm sau chuỗi ngày mệt mỏi. Cozy dark pixel RPG kết hợp nghệ thuật pha trà
            ASMR, nướng bánh ma thuật, làm vườn và xoa dịu quái vật.
          </p>
          <div className={styles.heroActions}>
            <Link href="/wiki/game-overview" className={styles.primaryBtn}>
              Khám phá cốt truyện
            </Link>
            <Link href="/database/recipes" className={styles.secondaryBtn}>
              Sổ pha trà và bánh
            </Link>
          </div>
          <dl className={styles.stats}>
            <div><dt>{counts.items}</dt><dd>vật phẩm</dd></div>
            <div><dt>{counts.recipes}</dt><dd>công thức</dd></div>
            <div><dt>{counts.characters}</dt><dd>cư dân</dd></div>
            <div><dt>{docs.length}</dt><dd>tài liệu</dd></div>
          </dl>
          <div className={styles.heroOrnament} aria-hidden="true" />
        </div>
      </section>

      {/* Tagline moment */}
      <section className={styles.taglineSection}>
        <Reveal>
          <TaglineReveal
            text="Giữa những đêm dài và cơn mưa ngoài ô cửa sổ, tiệm trà nhỏ này luôn giữ một chiếc ghế ấm cho bạn."
          />
        </Reveal>
      </section>

      {/* Trụ cột trải nghiệm */}
      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <h2>Bốn điều làm nên Rowan of Oakhaven</h2>
          <p>Ấm áp, thư thái và chữa lành, từng ngày một tách trà một.</p>
        </Reveal>

        <div className={styles.grid}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className={`${styles.card} pixel-frame`}>
                <div className={styles.cardIcon}><Icon name={p.icon} size={24} /></div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <Link href={p.href} className={styles.cardLink}>
                  {p.link} <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cơ sở dữ liệu */}
      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <h2>Cơ sở dữ liệu trò chơi</h2>
          <p>Dữ liệu được cập nhật tự động từ hệ thống tài liệu chuẩn</p>
        </Reveal>

        <div className={styles.grid}>
          {DATABASES.map((d, i) => (
            <Reveal key={d.title} delay={i * 60}>
              <article className={`${styles.card} pixel-frame`}>
                <div className={styles.cardIcon}><Icon name={d.icon} size={24} /></div>
                <h3>
                  {d.title} <span className={styles.count}>({counts[d.key]})</span>
                </h3>
                <p>{d.desc}</p>
                <Link href={d.href} className={styles.cardLink}>
                  {d.link} <span aria-hidden="true">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
