'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './Sidebar.module.scss';

const TREE_GROUPS = [
  {
    id: 'intro',
    icon: 'book-open',
    slugs: ['getting-started', 'game-overview'],
  },
  {
    id: 'gameplay',
    icon: 'farm',
    slugs: ['gameplay-guide', 'farming-crops-guide', 'cooking-recipes-guide', 'calendar-seasons', 'festivals-events'],
  },
  {
    id: 'world',
    icon: 'map-pin',
    slugs: ['world-overview', 'character-roster'],
  },
  {
    id: 'combat',
    icon: 'sword',
    slugs: ['dungeon-combat', 'minerals-guide', 'lore-story'],
  },
];

export default function Sidebar({ docs = [], lang = DEFAULT_LOCALE }) {
  const pathname = usePathname();
  const dict = getDictionary(lang);
  const docsBySlug = Object.fromEntries(docs.map(d => [d.slug, d]));

  return (
    <aside className={styles.sidebar}>
      {/* SIDEBAR DẠNG CÂY: CẨM NANG HƯỚNG DẪN */}
      <div className={`${styles.treeCard} pixel-frame`}>
        <div className={styles.treeHeader}>
          <div className={styles.treeTitle}>
            <Icon name="scroll" size={14} />
            <span>{dict.wiki.breadcrumb}</span>
          </div>
          <Link href={`/${lang}/wiki`} className={styles.hubLink}>
            {dict.database.browser.filterAll}
          </Link>
        </div>

        <nav className={styles.treeNav} aria-label="Tree navigation">
          {TREE_GROUPS.map(group => {
            const groupDocs = group.slugs.map(s => docsBySlug[s]).filter(Boolean);
            if (groupDocs.length === 0) return null;
            const groupTitle = dict.wiki.groups[group.id] || group.id;

            return (
              <div key={group.id} className={styles.treeBranch}>
                <div className={styles.branchHead}>
                  <Icon name={group.icon} size={14} className={styles.branchIcon} />
                  <span className={styles.branchLabel}>{groupTitle}</span>
                </div>

                <ul className={styles.leafList}>
                  {groupDocs.map(doc => {
                    const href = `/${lang}/wiki/${doc.slug}`;
                    const isActive = pathname === href;
                    return (
                      <li key={doc.slug} className={styles.leafItem}>
                        <Link
                          href={href}
                          className={`${styles.leafLink} ${isActive ? styles.leafActive : ''}`}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span className={styles.leafLine} />
                          <span className={styles.leafText}>{doc.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      {/* SHORTCUT CƠ SỞ DỮ LIỆU */}
      <div className={`${styles.dbCard} pixel-frame`}>
        <div className={styles.treeHeader}>
          <div className={styles.treeTitle}>
            <Icon name="package" size={14} />
            <span>{dict.nav.database}</span>
          </div>
          <Link href={`/${lang}/database`} className={styles.hubLink}>
            Hub
          </Link>
        </div>
        <div className={styles.dbChips}>
          <Link href={`/${lang}/database/items`} className={styles.dbChip}>
            {dict.database.categories.items.short}
          </Link>
          <Link href={`/${lang}/database/recipes`} className={styles.dbChip}>
            {dict.database.categories.recipes.short}
          </Link>
          <Link href={`/${lang}/database/characters`} className={styles.dbChip}>
            {dict.database.categories.characters.short}
          </Link>
          <Link href={`/${lang}/database/crops`} className={styles.dbChip}>
            {dict.database.categories.crops.short}
          </Link>
          <Link href={`/${lang}/database/monsters`} className={styles.dbChip}>
            {dict.database.categories.monsters.short}
          </Link>
          <Link href={`/${lang}/database/locations`} className={styles.dbChip}>
            {dict.database.categories.locations.short}
          </Link>
        </div>
      </div>
    </aside>
  );
}
