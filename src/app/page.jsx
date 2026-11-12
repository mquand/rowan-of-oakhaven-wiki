import Link from 'next/link';
import styles from './Home.module.scss';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import HeroSearchBar from '../components/HeroSearchBar';

const GAME_PILLARS = [
  {
    icon: 'tea-bag',
    badge: 'ASMR TEA BREWING',
    title: 'Nghệ Thuật Pha Trà ASMR',
    desc: 'Lắng nghe tiếng ấm nước reo dịu êm, ngắm nhìn cánh sen tuyết nở hoa và dòng mật ong hoa rừng rót chậm. Mỗi ấm trà là một liệu pháp xoa dịu tâm can lữ khách và hồi phục thể lực.',
    link: '/database/recipes',
    linkText: 'Xem sổ công thức trà',
  },
  {
    icon: 'cake',
    badge: 'MAGIC BAKERY',
    title: 'Tiệm Bánh Nướng Ma Thuật',
    desc: 'Tiếp quản lò nướng đá cổ kính của người bà Amalia. Xay bột lúa mì bạc, nướng những mẻ bánh brioche hoa cúc và bánh pie bí ngô mật mang lại bùa hộ mệnh kỳ diệu cho chuyến hành trình.',
    link: '/database/recipes',
    linkText: 'Khám phá các mẻ bánh',
  },
  {
    icon: 'farm',
    badge: 'SEASONAL FARMING',
    title: 'Nông Trại Thảo Mộc 4 Mùa',
    desc: 'Làm chủ chu kỳ 28 ngày mỗi mùa. Thích ứng với sương mù buổi sớm, mưa rào mùa hạ và đêm trăng rằm thanh tịnh để chăm sóc những luống dâu tuyết dạ quang quý hiếm.',
    link: '/wiki/calendar-seasons',
    linkText: 'Xem chu kỳ 4 mùa & mùa màng',
  },
  {
    icon: 'sword',
    badge: 'DUNGEON EXPEDITION',
    title: 'Thám Hiểm & Thanh Tẩy Đới Mỏ',
    desc: 'Cầm trên tay kiếm pha lê ma thuật và lồng đèn đom đóm, tiến sâu vào các tầng mỏ sâu thẳm. Vượt qua thử thách, thanh tẩy sinh vật nhiễm Bụi Sao Hắc Hóa và thu thập khoáng thạch cổ.',
    link: '/wiki/dungeon-combat',
    linkText: 'Tìm hiểu cơ chế thám hiểm',
  },
];

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

          <p className={styles.tagline}>
            Tựa game Cozy Dark Pixel RPG kết hợp nghệ thuật pha trà ASMR, nướng bánh ma thuật,
            chăm sóc khu vườn thảo mộc và thám hiểm Năm Vương Quốc kỳ ảo.
          </p>

          <div className={styles.heroSearchWrap}>
            <HeroSearchBar />
          </div>
        </div>
      </section>

      {/* 2. GAMEPLAY PILLARS — TRẢI NGHIỆM ĐẶC SẮC */}
      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionKicker}>GAMEPLAY EXPERIENCE</p>
            <h2>Trải Nghiệm Lối Chơi Đặc Sắc</h2>
            <p>Hòa mình vào nhịp sống chậm rãi, ấm áp và chữa lành tâm hồn.</p>
          </div>

          <div className={styles.pillarsGrid}>
            {GAME_PILLARS.map(p => (
              <article key={p.title} className={`${styles.pillarCard} pixel-frame`}>
                <div className={styles.pillarTop}>
                  <div className={styles.pillarIcon}>
                    <Icon name={p.icon} size={24} />
                  </div>
                  <span className={styles.pillarBadge}>{p.badge}</span>
                </div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
                <Link href={p.link} className={styles.pillarLink}>
                  {p.linkText} <Icon name="arrow-right" size={13} />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      {/* 3. MEET THE COMPANIONS — NHỮNG NGƯỜI BẠN ĐỒNG HÀNH */}
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
