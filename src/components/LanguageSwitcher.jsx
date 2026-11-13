'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LOCALES } from '../lib/i18n/config';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();

  function getLocaleUrl(targetLocale) {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && LOCALES.includes(segments[0])) {
      segments[0] = targetLocale;
      return '/' + segments.join('/');
    }

    return `/${targetLocale}${pathname.startsWith('/') ? pathname : '/' + pathname}`;
  }

  function handleSwitch(locale) {
    if (locale === currentLang) return;
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`;
    const targetUrl = getLocaleUrl(locale);
    router.push(targetUrl);
  }

  return (
    <div className={styles.langToggle} role="group" aria-label="Change language / Đổi ngôn ngữ">
      <button
        type="button"
        className={`${styles.toggleBtn} ${currentLang === 'vi' ? styles.active : ''}`}
        onClick={() => handleSwitch('vi')}
        aria-pressed={currentLang === 'vi'}
        title="Tiếng Việt"
      >
        VI
      </button>
      <span className={styles.divider} aria-hidden="true">|</span>
      <button
        type="button"
        className={`${styles.toggleBtn} ${currentLang === 'en' ? styles.active : ''}`}
        onClick={() => handleSwitch('en')}
        aria-pressed={currentLang === 'en'}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
