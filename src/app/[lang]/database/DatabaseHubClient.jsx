'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import { DEFAULT_LOCALE } from '../../../lib/i18n/config';
import { getDictionary } from '../../../lib/i18n/getDictionary';
import styles from './DatabaseHub.module.scss';

const CATEGORY_CONFIG = [
  {
    key: 'items',
    group: 'craft',
    icon: 'package',
  },
  {
    key: 'recipes',
    group: 'craft',
    icon: 'cake',
  },
  {
    key: 'characters',
    group: 'world',
    icon: 'users',
  },
  {
    key: 'crops',
    group: 'craft',
    icon: 'farm',
  },
  {
    key: 'monsters',
    group: 'combat',
    icon: 'sparkle',
  },
  {
    key: 'weapons',
    group: 'combat',
    icon: 'sword',
  },
  {
    key: 'perks',
    group: 'craft',
    icon: 'book-open',
  },
  {
    key: 'locations',
    group: 'world',
    icon: 'map-pin',
  },
];

export default function DatabaseHubClient({ counts, lang = DEFAULT_LOCALE }) {
  const [activeGroup, setActiveGroup] = useState('all');
  const dict = getDictionary(lang);
  const isEn = lang === 'en';

  const groups = [
    { id: 'all', label: dict.database.browser.filterAll },
    { id: 'craft', label: isEn ? 'Farming & Bakery' : 'Nông trại & Bếp bánh' },
    { id: 'combat', label: isEn ? 'Combat & Armory' : 'Chiến đấu & Trang bị' },
    { id: 'world', label: isEn ? 'World & Citizens' : 'Thế giới & Cư dân' },
  ];

  const filteredCategories = CATEGORY_CONFIG.filter(
    cat => activeGroup === 'all' || cat.group === activeGroup
  );

  return (
    <>
      <div className={styles.filterChips} role="group" aria-label="Category filter">
        {groups.map(g => (
          <button
            key={g.id}
            type="button"
            className={`${styles.filterChip} ${activeGroup === g.id ? styles.activeChip : ''}`}
            onClick={() => setActiveGroup(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={styles.categoryGrid}>
        {filteredCategories.map(cat => {
          const info = dict.database.categories[cat.key] || {};
          const count = counts[cat.key] || 0;

          return (
            <article key={cat.key} className={`${styles.categoryCard} pixel-frame`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>
                  <Icon name={cat.icon} size={24} />
                </div>
                <span className={styles.countBadge}>
                  {count} {dict.database.browser.entries}
                </span>
              </div>

              <h2 className={styles.cardTitle}>{info.title || cat.key}</h2>
              <p className={styles.cardDesc}>{info.desc}</p>

              <div className={styles.cardFooter}>
                <Link href={`/${lang}/database/${cat.key}`} className={styles.viewBtn}>
                  {dict.database.exploreCategory} <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
