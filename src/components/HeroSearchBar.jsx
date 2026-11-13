'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import SearchModal from './SearchModal';
import { DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './HeroSearchBar.module.scss';

export default function HeroSearchBar({ lang = DEFAULT_LOCALE }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  const quickLinks = [
    {
      label: isEn ? 'Calming Lotus Tea' : 'Trà Sen An Thần',
      href: `/${lang}/database/recipes#tra_sen_an_than`,
    },
    {
      label: isEn ? 'Honey Brioche' : 'Bánh Mì Brioche',
      href: `/${lang}/database/recipes#bread_brioche`,
    },
    {
      label: isEn ? 'Oakhaven Villagers' : 'Cư Dân Oakhaven',
      href: `/${lang}/database/characters`,
    },
    {
      label: isEn ? '4 Seasons Calendar' : 'Lịch 4 Mùa',
      href: `/${lang}/wiki/calendar-seasons`,
    },
    {
      label: isEn ? 'Monsters Codex' : 'Sổ Quái Vật',
      href: `/${lang}/database/monsters`,
    },
  ];

  return (
    <>
      <div className={styles.searchContainer}>
        <button
          type="button"
          className={`${styles.searchBox} pixel-frame`}
          onClick={() => setSearchOpen(true)}
          aria-label={dict.nav.searchAria}
        >
          <div className={styles.searchLeft}>
            <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
            <span className={styles.searchPlaceholder}>
              {dict.home.searchPlaceholder}
            </span>
          </div>
          <kbd className={styles.searchKbd}>{dict.nav.searchKbd}</kbd>
        </button>

        <div className={styles.quickTags}>
          <span className={styles.quickLabel}>
            {dict.search.quickPrompt}
          </span>
          <div className={styles.tagList}>
            {quickLinks.map(item => (
              <Link key={item.label} href={item.href} className={styles.quickLink}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} />
    </>
  );
}
