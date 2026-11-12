import Link from 'next/link';
import Icon from '../../components/Icon';
import styles from './WikiHub.module.scss';
import { getAllDocs } from '../../lib/docs';

export const metadata = {
  title: 'Thư Viện Tài Liệu — Rowan of Oakhaven Wiki',
  description: 'Toàn bộ tài liệu hướng dẫn lối chơi, thế giới, dàn nhân vật và cốt truyện Rowan of Oakhaven.',
};

const DOC_GROUPS = [
  {
    id: 'intro',
    title: 'Khởi Đầu & Giới Thiệu',
    slugs: ['game-overview', 'getting-started'],
    descriptions: {
      'game-overview': 'Tổng quan tựa game: logline, cốt truyện mở đầu, chu kỳ ngày 15 phút và 12 tính năng đặc trưng.',
      'getting-started': 'Hướng dẫn 7 ngày đầu đời: dọn vườn, gặp gỡ dân làng, chọn trà đầu tiên và quản lý năng lượng.',
    },
    icon: 'book-open',
  },
  {
    id: 'gameplay',
    title: 'Lối Chơi & Sinh Hoạt Đời Thường',
    slugs: ['gameplay-guide', 'calendar-seasons', 'festivals-events'],
    descriptions: {
      'gameplay-guide': 'Chi tiết nhịp sống một ngày: bình minh, làm vườn, thám hiểm mỏ, pha trà buổi tối và thư giãn đêm muộn.',
      'calendar-seasons': 'Chu kỳ 4 mùa trong năm (Xuân, Hạ, Thu, Đông), thời tiết đặc biệt và lịch gieo trồng thảo mộc.',
      'festivals-events': 'Các lễ hội truyền thống theo mùa: Hội thả đèn, Chợ hoa xuân, Lễ hội nướng bánh và Đêm trăng rằm.',
    },
    icon: 'farm',
  },
  {
    id: 'world',
    title: 'Thế Giới & Cư Dân Oakhaven',
    slugs: ['world-overview', 'character-roster'],
    descriptions: {
      'world-overview': 'Bản đồ Năm Vương Quốc: Oakhaven, Vực Lò Rèn Boris, Rừng Tinh Linh, Đảo Cực Quang và Hoàng Triều.',
      'character-roster': 'Hồ sơ Rowan, chú cú Pip, thợ rèn Boris, thợ làm vườn Mallow, họa sĩ Lumi và cư dân Năm Vực.',
    },
    icon: 'map-pin',
  },
  {
    id: 'combat',
    title: 'Chiến Đấu & Bí Mật Cốt Truyện',
    slugs: ['dungeon-combat', 'lore-story'],
    descriptions: {
      'dungeon-combat': 'Cơ chế thám hiểm hang mỏ, vũ khí ma thuật, đòn chém 3 nhịp và thanh tẩy Bụi Sao Hắc Hóa.',
      'lore-story': 'Nguồn gốc sâu xa của Bụi Sao, bí mật về người Bà Amalia và sứ mệnh chữa lành vùng đất.',
    },
    icon: 'sword',
  },
];

export default function WikiHubPage() {
  const allDocs = getAllDocs();
  const docsBySlug = Object.fromEntries(allDocs.map(d => [d.slug, d]));

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>Tài liệu</span>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>Core Documentation</p>
        <h1>Thư Viện Hướng Dẫn & Thế Giới</h1>
        <p>
          Hệ thống tài liệu chính thức dành cho người chơi Rowan of Oakhaven — giúp bạn làm chủ nghệ thuật pha trà ASMR,
          chăm sóc khu vườn thảo mộc và khám phá bí mật Năm Vương Quốc.
        </p>
      </header>

      <div className={styles.sectionsList}>
        {DOC_GROUPS.map(group => {
          const groupDocs = group.slugs.map(s => docsBySlug[s]).filter(Boolean);
          if (groupDocs.length === 0) return null;

          return (
            <section key={group.id} className={styles.sectionBlock}>
              <div className={styles.sectionHead}>
                <Icon name={group.icon} size={20} />
                <h2>{group.title}</h2>
                <span className={styles.sectionCount}>({groupDocs.length} bài)</span>
              </div>

              <div className={styles.docGrid}>
                {groupDocs.map(doc => (
                  <article key={doc.slug} className={`${styles.docCard} pixel-frame`}>
                    <div className={styles.cardTop}>
                      <div className={styles.iconBox}>
                        <Icon name="scroll" size={18} />
                      </div>
                      {doc.spoiler && (
                        <span className="badge crystal">Spoiler</span>
                      )}
                    </div>

                    <h3 className={styles.docTitle}>{doc.title}</h3>
                    <p className={styles.docSummary}>
                      {group.descriptions[doc.slug] || doc.audience}
                    </p>

                    <div className={styles.tags}>
                      {doc.tags?.slice(0, 4).map(t => (
                        <span key={t} className="badge forest">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <Link href={`/wiki/${doc.slug}`} className={styles.docLink}>
                        Đọc bài viết <Icon name="arrow-right" size={13} />
                      </Link>
                      <span className={styles.updated}>
                        <Icon name="clock" size={12} /> {doc.updated}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
