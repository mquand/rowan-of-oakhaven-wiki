'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import styles from './Sidebar.module.scss';

const DB_LINKS = [
  { href: '/database/items', label: 'Kho vật phẩm', icon: 'package' },
  { href: '/database/recipes', label: 'Sổ công thức trà bánh', icon: 'cake' },
  { href: '/database/characters', label: 'Cư dân & đồng hành', icon: 'users' },
  { href: '/database/crops', label: 'Sổ cây trồng', icon: 'farm' },
  { href: '/database/monsters', label: 'Sổ quái vật Rừng Đêm', icon: 'sparkle' },
  { href: '/database/weapons', label: 'Vũ khí phép thuật', icon: 'sword' },
  { href: '/database/perks', label: 'Kỹ năng & thiên phú', icon: 'book-open' },
  { href: '/database/locations', label: 'Bản đồ 5 Vương Quốc', icon: 'map-pin' },
];

export default function Sidebar({ docs = [] }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* SECTION 1: TÀI LIỆU */}
      <div className={`${styles.section} pixel-frame`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <Icon name="scroll" size={14} />
            <span>Tài liệu</span>
          </div>
          <Link href="/wiki" className={styles.sectionLink}>
            Tất cả
          </Link>
        </div>
        <ul className={styles.linkList}>
          {docs.map(doc => {
            const href = `/wiki/${doc.slug}`;
            const isActive = pathname === href;
            return (
              <li key={doc.slug}>
                <Link href={href} className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                  <span className={styles.bullet}>❖</span>
                  <span className={styles.linkText}>{doc.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* SECTION 2: CƠ SỞ DỮ LIỆU */}
      <div className={`${styles.section} pixel-frame`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <Icon name="book-open" size={14} />
            <span>Sổ Tay Thám Hiểm</span>
          </div>
          <Link href="/database" className={styles.sectionLink}>
            Hub
          </Link>
        </div>
        <ul className={styles.linkList}>
          {DB_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  <Icon name={link.icon} size={15} />
                  <span className={styles.linkText}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
