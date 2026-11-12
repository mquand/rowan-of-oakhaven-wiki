'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import styles from './Sidebar.module.scss';

const DOC_ICON = 'scroll';
const DB_LINKS = [
  { href: '/database/items', label: 'Danh mục vật phẩm', icon: 'package' },
  { href: '/database/recipes', label: 'Sổ công thức trà & bánh', icon: 'cake' },
  { href: '/database/characters', label: 'Cư dân & nhân vật', icon: 'users' },
  { href: '/database/crops', label: 'Sổ cây trồng', icon: 'farm' },
  { href: '/database/monsters', label: 'Sổ quái vật', icon: 'sparkle' },
  { href: '/database/weapons', label: 'Vũ khí phép thuật', icon: 'sword' },
  { href: '/database/perks', label: 'Kỹ năng tiện ích', icon: 'book-open' },
  { href: '/database/locations', label: 'Bản đồ & vương quốc', icon: 'map-pin' },
];

export default function Sidebar({ docs = [] }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3>Tài liệu cốt lõi</h3>
          <Link href="/wiki" style={{ fontSize: '11px', color: '#ffcf40', textDecoration: 'none' }}>
            Xem tất cả
          </Link>
        </div>
        <ul>
          {docs.map(doc => {
            const href = `/wiki/${doc.slug}`;
            const isActive = pathname === href;
            return (
              <li key={doc.slug}>
                <Link href={href} className={isActive ? styles.active : ''}>
                  <Icon name={DOC_ICON} size={16} /> {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.section}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3>Dữ liệu khám phá</h3>
          <Link href="/database" style={{ fontSize: '11px', color: '#ffcf40', textDecoration: 'none' }}>
            Tổng quan
          </Link>
        </div>
        <ul>
          {DB_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? styles.active : ''}
              >
                <Icon name={link.icon} size={16} /> {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
