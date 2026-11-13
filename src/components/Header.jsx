'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import SearchModal from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';
import { LOCALES, DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './Header.module.scss';

export default function Header({ lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Extract current language from URL if possible
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  const currentLang = LOCALES.includes(segments[0]) ? segments[0] : (lang || DEFAULT_LOCALE);
  const dict = getDictionary(currentLang);

  const navLinks = [
    { href: `/${currentLang}`, label: dict.nav.home },
    { href: `/${currentLang}/wiki`, label: dict.nav.wiki },
    { href: `/${currentLang}/database`, label: dict.nav.database },
  ];

  // Lắng nghe phím tắt Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = href => {
    if (href === `/${currentLang}`) {
      return pathname === `/${currentLang}` || pathname === `/${currentLang}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <Link href={`/${currentLang}`} className={styles.brand} onClick={() => setOpen(false)}>
            <span className={styles.brandMark}><Icon name="tea-bag" size={20} /></span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>{dict.nav.brandName}</span>
              <span className={styles.brandSub}>{dict.nav.brandSub}</span>
            </span>
          </Link>

          <nav aria-label={dict.nav.mainNavAria}>
            <ul className={styles.navLinks}>
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? styles.active : ''}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label={dict.nav.searchAria}
            >
              <Icon name="magnifying-glass" size={15} />
              <span className={styles.searchBtnText}>{dict.nav.searchBtn}</span>
              <kbd className={styles.searchKbd}>{dict.nav.searchKbd}</kbd>
            </button>

            <LanguageSwitcher currentLang={currentLang} />

            <a
              href="https://github.com/mquand/rowan-of-oakhaven-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubBtn}
            >
              {dict.nav.github}
            </a>

            <button
              type="button"
              className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              <span /><span />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ''}`}
          aria-hidden={!open}
        >
          <ul className={styles.mobileLinks}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? styles.active : ''}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className={styles.mobileDivider} />
            <li>
              <button
                type="button"
                className={styles.mobileSearchBtn}
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Icon name="magnifying-glass" size={16} /> {dict.nav.searchBtn} ({dict.nav.searchKbd})
              </button>
            </li>
            <li style={{ padding: '8px 16px' }}>
              <LanguageSwitcher currentLang={currentLang} />
            </li>
            <li>
              <a
                href="https://github.com/mquand/rowan-of-oakhaven-wiki"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileGithubLink}
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Modal tìm kiếm Ctrl+K */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={currentLang} />
    </>
  );
}
