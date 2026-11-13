'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import { DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './Sidebar.module.scss';

export default function Sidebar({ docs = [], lang = DEFAULT_LOCALE }) {
  const pathname = usePathname();
  const dict = getDictionary(lang);

  const dbLinks = [
    { href: `/${lang}/database/items`, label: dict.database.categories.items.title, icon: 'package' },
    { href: `/${lang}/database/recipes`, label: dict.database.categories.recipes.title, icon: 'cake' },
    { href: `/${lang}/database/characters`, label: dict.database.categories.characters.title, icon: 'users' },
    { href: `/${lang}/database/crops`, label: dict.database.categories.crops.title, icon: 'farm' },
    { href: `/${lang}/database/monsters`, label: dict.database.categories.monsters.title, icon: 'sparkle' },
    { href: `/${lang}/database/weapons`, label: dict.database.categories.weapons.title, icon: 'sword' },
    { href: `/${lang}/database/perks`, label: dict.database.categories.perks.title, icon: 'book-open' },
    { href: `/${lang}/database/locations`, label: dict.database.categories.locations.title, icon: 'map-pin' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* SECTION 1: TÀI LIỆU */}
      <div className={`${styles.section} pixel-frame`}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <Icon name="scroll" size={14} />
            <span>{dict.wiki.breadcrumb}</span>
          </div>
          <Link href={`/${lang}/wiki`} className={styles.sectionLink}>
            {dict.database.browser.filterAll}
          </Link>
        </div>
        <ul className={styles.linkList}>
          {docs.map(doc => {
            const href = `/${lang}/wiki/${doc.slug}`;
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
            <span>{dict.database.categories.items.short}</span>
          </div>
          <Link href={`/${lang}/database`} className={styles.sectionLink}>
            Hub
          </Link>
        </div>
        <ul className={styles.linkList}>
          {dbLinks.map(link => {
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
