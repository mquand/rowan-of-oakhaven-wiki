'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import SearchModal from './SearchModal';
import LanguageSwitcher from './LanguageSwitcher';
import { LOCALES, DEFAULT_LOCALE } from '../lib/i18n/config';
import { getDictionary } from '../lib/i18n/getDictionary';
import styles from './Header.module.scss';

const DB_DROPDOWN_ITEMS = [
  { key: 'items', icon: 'package' },
  { key: 'recipes', icon: 'cake' },
  { key: 'characters', icon: 'users' },
  { key: 'crops', icon: 'farm' },
  { key: 'monsters', icon: 'sparkle' },
  { key: 'weapons', icon: 'sword' },
  { key: 'perks', icon: 'book-open' },
  { key: 'locations', icon: 'map-pin' },
];

export default function Header({ lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dbDropdownOpen, setDbDropdownOpen] = useState(false);
  const [kbdLabel, setKbdLabel] = useState('Ctrl K');
  const dropdownRef = useRef(null);

  // Extract current language from URL if possible
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  const currentLang = LOCALES.includes(segments[0]) ? segments[0] : (lang || DEFAULT_LOCALE);
  const dict = getDictionary(currentLang);

  // Phát hiện macOS để hiện ⌘K
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '');
      setKbdLabel(isMac ? '⌘K' : 'Ctrl K');
    }
  }, []);

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

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDbDropdownOpen(false);
      }
    }
    if (dbDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [dbDropdownOpen]);

  const isActive = href => {
    if (href === `/${currentLang}`) {
      return pathname === `/${currentLang}` || pathname === `/${currentLang}/`;
    }
    return pathname.startsWith(href);
  };

  const isDbActive = pathname.startsWith(`/${currentLang}/database`);

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
              <li>
                <Link
                  href={`/${currentLang}`}
                  className={isActive(`/${currentLang}`) ? styles.active : ''}
                  aria-current={isActive(`/${currentLang}`) ? 'page' : undefined}
                >
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLang}/wiki`}
                  className={isActive(`/${currentLang}/wiki`) ? styles.active : ''}
                  aria-current={isActive(`/${currentLang}/wiki`) ? 'page' : undefined}
                >
                  {dict.nav.wiki}
                </Link>
              </li>

              {/* Dropdown Cơ sở dữ liệu */}
              <li
                className={styles.dropdownWrap}
                ref={dropdownRef}
                onMouseEnter={() => setDbDropdownOpen(true)}
                onMouseLeave={() => setDbDropdownOpen(false)}
              >
                <Link
                  href={`/${currentLang}/database`}
                  className={`${styles.dropdownTrigger} ${isDbActive ? styles.active : ''}`}
                  aria-expanded={dbDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDbDropdownOpen(prev => !prev)}
                >
                  <span>{dict.nav.database}</span>
                  <Icon name="caret-down" size={12} className={styles.caret} />
                </Link>

                {dbDropdownOpen && (
                  <div className={`${styles.dropdownMenu} pixel-frame`}>
                    <div className={styles.dropdownGrid}>
                      {DB_DROPDOWN_ITEMS.map(item => {
                        const catData = dict.database.categories[item.key];
                        if (!catData) return null;
                        const itemHref = `/${currentLang}/database/${item.key}`;
                        return (
                          <Link
                            key={item.key}
                            href={itemHref}
                            className={styles.dropdownItem}
                            onClick={() => setDbDropdownOpen(false)}
                          >
                            <span className={styles.itemIcon}>
                              <Icon name={item.icon} size={16} />
                            </span>
                            <div className={styles.itemText}>
                              <span className={styles.itemTitle}>{catData.title}</span>
                              <span className={styles.itemDesc}>{catData.short}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            {/* Nút tìm kiếm Desktop */}
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label={dict.nav.searchAria}
            >
              <Icon name="magnifying-glass" size={15} />
              <span className={styles.searchBtnText}>{dict.nav.searchBtn}</span>
              <kbd className={styles.searchKbd}>{kbdLabel}</kbd>
            </button>

            {/* Nút tìm kiếm Mobile riêng */}
            <button
              type="button"
              className={styles.mobileSearchIconBtn}
              onClick={() => setSearchOpen(true)}
              aria-label={dict.nav.searchAria}
            >
              <Icon name="magnifying-glass" size={18} />
            </button>

            {/* Nút chuyển ngôn ngữ VI | EN */}
            <LanguageSwitcher currentLang={currentLang} />

            {/* Nút Hamburger cho Mobile */}
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
            <li>
              <Link
                href={`/${currentLang}`}
                className={isActive(`/${currentLang}`) ? styles.active : ''}
                onClick={() => setOpen(false)}
              >
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLang}/wiki`}
                className={isActive(`/${currentLang}/wiki`) ? styles.active : ''}
                onClick={() => setOpen(false)}
              >
                {dict.nav.wiki}
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLang}/database`}
                className={isDbActive ? styles.active : ''}
                onClick={() => setOpen(false)}
              >
                {dict.nav.database}
              </Link>
            </li>

            {/* Mục con cơ sở dữ liệu trên mobile */}
            <li className={styles.mobileSubList}>
              {DB_DROPDOWN_ITEMS.map(item => {
                const catData = dict.database.categories[item.key];
                if (!catData) return null;
                return (
                  <Link
                    key={item.key}
                    href={`/${currentLang}/database/${item.key}`}
                    className={styles.mobileSubItem}
                    onClick={() => setOpen(false)}
                  >
                    <Icon name={item.icon} size={14} />
                    <span>{catData.title}</span>
                  </Link>
                );
              })}
            </li>

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
                <Icon name="magnifying-glass" size={16} /> {dict.nav.searchBtn} ({kbdLabel})
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Modal tìm kiếm Ctrl+K / Cmd+K */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={currentLang} />
    </>
  );
}
