'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Icon from './Icon';
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT_NAMES } from '../lib/i18n/config';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [open]);

  // Compute destination URL for a given locale
  function getLocaleUrl(targetLocale) {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && LOCALES.includes(segments[0])) {
      segments[0] = targetLocale;
      return '/' + segments.join('/');
    }

    return `/${targetLocale}${pathname.startsWith('/') ? pathname : '/' + pathname}`;
  }

  function handleSelect(locale) {
    setOpen(false);
    if (locale === currentLang) return;

    // Set cookie for 1 year
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    const targetUrl = getLocaleUrl(locale);
    router.push(targetUrl);
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={`${styles.switchBtn} pixel-frame`}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Change language / Đổi ngôn ngữ"
        aria-expanded={open}
      >
        <Icon name="globe" size={16} />
        <span className={styles.langCode}>{LOCALE_SHORT_NAMES[currentLang] || currentLang.toUpperCase()}</span>
      </button>

      {open && (
        <div className={`${styles.dropdown} pixel-frame`}>
          {LOCALES.map(loc => {
            const isActive = loc === currentLang;
            return (
              <button
                key={loc}
                type="button"
                className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                onClick={() => handleSelect(loc)}
              >
                <span className={styles.itemCode}>{LOCALE_SHORT_NAMES[loc]}</span>
                <span className={styles.itemName}>{LOCALE_NAMES[loc]}</span>
                {isActive && <Icon name="check" size={14} className={styles.checkIcon} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
