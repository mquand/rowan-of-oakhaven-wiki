'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.scss';

export default function Sidebar({ docs = [] }) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3>Tài Liệu Cốt Lõi</h3>
        <ul>
          {docs.map(doc => {
            const href = `/wiki/${doc.slug}`;
            const isActive = pathname === href;
            return (
              <li key={doc.slug}>
                <Link href={href} className={isActive ? styles.active : ''}>
                  <span>📜</span> {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.section}>
        <h3>Dữ Liệu Khám Phá</h3>
        <ul>
          <li>
            <Link href="/database/items" className={pathname === '/database/items' ? styles.active : ''}>
              <span>📦</span> Danh Mục Vật Phẩm
            </Link>
          </li>
          <li>
            <Link href="/database/recipes" className={pathname === '/database/recipes' ? styles.active : ''}>
              <span>☕</span> Sổ Công Thức Trà & Bánh
            </Link>
          </li>
          <li>
            <Link href="/database/characters" className={pathname === '/database/characters' ? styles.active : ''}>
              <span>👥</span> Cư Dân & Nhân Vật
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
