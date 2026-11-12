'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import SearchModal from './SearchModal';
import styles from './HeroSearchBar.module.scss';

const QUICK_LINKS = [
  { label: 'Trà Sen An Thần', href: '/database/recipes' },
  { label: 'Hạt Trà Sen', href: '/database/items/seed_sen_tea' },
  { label: 'Bánh Mì Brioche', href: '/database/recipes' },
  { label: 'Thợ Rèn Boris', href: '/database/characters' },
  { label: 'Lịch 4 Mùa & Vụ Mùa', href: '/wiki/calendar-seasons' },
  { label: 'Quái Vật Hắc Hóa', href: '/database/monsters' },
];

export default function HeroSearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className={styles.searchContainer}>
        <button
          type="button"
          className={`${styles.searchBox} pixel-frame`}
          onClick={() => setSearchOpen(true)}
          aria-label="Mở tìm kiếm nhanh bách khoa toàn thư"
        >
          <div className={styles.searchLeft}>
            <Icon name="magnifying-glass" size={20} className={styles.searchIcon} />
            <span className={styles.searchPlaceholder}>
              Tìm kiếm vật phẩm, công thức trà bánh, cư dân, quái vật...
            </span>
          </div>
          <kbd className={styles.searchKbd}>Ctrl K</kbd>
        </button>

        <div className={styles.quickTags}>
          <span className={styles.quickLabel}>Tra cứu nhanh:</span>
          <div className={styles.tagList}>
            {QUICK_LINKS.map(item => (
              <Link key={item.label} href={item.href} className={styles.quickLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
