import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import HeroSearchBar from '../components/HeroSearchBar';

const COMPANIONS = [
  {
    id: 'rowan',
    icon: 'sparkle',
    name: 'Rowan',
    role: 'Chủ Tiệm Trà Bụi Sao',
    species: 'Human (Phù Thủy Trẻ)',
    quote: 'Tiệm Bụi Sao luôn sáng đèn, nước đã sôi và trà luôn ấm chờ bạn ghé thăm.',
  },
  {
    id: 'pip',
    icon: 'leaf',
    name: 'Pip',
    role: 'Sứ Giả Đưa Thư Đêm',
    species: 'Cú Đưa Thư Rừng Thầm Thì',
    quote: 'Goo-hoo! Lá thư từ phương xa và túi hạt giống hoa tuyết đêm nay đã về rồi!',
  },
  {
    id: 'mallow',
    icon: 'cake',
    name: 'Mallow',
    role: 'Thợ Bánh Mì Đáng Yêu',
    species: 'Mèo Thần Phụ Bếp',
    quote: 'Meow~ Bánh mì brioche hoa cúc vừa ra lò, giòn vỏ xốp ruột thơm phức!',
  },
  {
    id: 'boris',
    icon: 'sword',
    name: 'Boris',
    role: 'Thợ Rèn Thị Trấn',
    species: 'Dwarf Oakhaven',
    quote: 'Đe búa của ta sẵn sàng rèn nên thanh kiếm pha lê sắc bén nhất cho chuyến đi của cậu.',
  },
];

const QUICK_CODEX = [
  {
    icon: 'book-open',
    title: 'Cẩm Nang Hướng Dẫn',
    desc: 'Nhập môn 7 ngày đầu, nhịp sống đời thường và lễ hội truyền thống Năm Vương Quốc.',
    href: '/wiki',
    linkText: 'Mở thư viện tài liệu',
  },
  {
    icon: 'package',
    title: 'Kho Vật Phẩm & Thảo Mộc',
    desc: 'Tra cứu hạt giống, nông sản, khoáng thạch quý và nguyên liệu pha chế cổ xưa.',
    href: '/database/items',
    linkText: 'Tra cứu vật phẩm',
  },
  {
    icon: 'cake',
    title: 'Sổ Công Thức Trà & Bánh',
    desc: 'Danh mục các món trà ASMR chữa lành và công thức nướng bánh ma thuật.',
    href: '/database/recipes',
    linkText: 'Tra cứu công thức',
  },
  {
    icon: 'map-pin',
    title: 'Bản Đồ Năm Vương Quốc',
    desc: 'Khám phá Thị trấn Oakhaven, Xứ Lò Rèn, Rừng Tinh Linh và Địa Đàng Cực Quang.',
    href: '/database/locations',
    linkText: 'Khám phá địa danh',
  },
];

export default function HomePage() {
  return (
    <div className={styles.homeWrapper}>
      {/* 1. HERO SHOWCASE */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.kicker}>
            <span>TIỆM BỤI SAO · RÌA RỪNG THẦM THÌ</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.pixel}>Rowan of Oakhaven</span>
          </h1>

          <div className={styles.heroSearchWrap}>
            <HeroSearchBar />
          </div>
        </div>
      </section>

      {/* 2. MEET THE COMPANIONS — NHỮNG NGƯỜI BẠN ĐỒNG HÀNH */}
      <Reveal delay={100}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>THE COMPANIONS</p>
            <h2>Những Người Bạn Rừng Thầm Thì</h2>
            <p>Gặp gỡ những người bạn ấm áp luôn đồng hành cùng Rowan tại Oakhaven.</p>
          </div>

          <div className={styles.companionsGrid}>
            {COMPANIONS.map(char => (
              <article key={char.id} className={`${styles.companionCard} pixel-frame`}>
                <div className={styles.compTop}>
                  <div className={styles.compAvatar}>
                    <Icon name={char.icon} size={28} />
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
            <Link href="/database/characters" className={styles.actionBtn}>
              <Icon name="users" size={16} /> Gặp gỡ toàn bộ 22 cư dân Năm Vương Quốc
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 4. CODEX & DATABASE GATEWAY — CỔNG BÁCH KHOA TOÀN THƯ */}
      <Reveal delay={150}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>ENCYCLOPEDIA PORTAL</p>
            <h2>Cổng Bách Khoa Toàn Thư</h2>
            <p>Tra cứu nhanh cẩm nang hướng dẫn, công thức và dữ liệu trò chơi.</p>
          </div>

          <div className={styles.codexPortalGrid}>
            {QUICK_CODEX.map(item => (
              <article key={item.title} className={`${styles.portalCard} pixel-frame`}>
                <div className={styles.portalIconBox}>
                  <Icon name={item.icon} size={22} />
                </div>
                <div className={styles.portalBody}>
                  <h3 className={styles.portalTitle}>{item.title}</h3>
                  <p className={styles.portalDesc}>{item.desc}</p>
                </div>
                <Link href={item.href} className={styles.portalLink}>
                  {item.linkText} <Icon name="arrow-right" size={13} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
