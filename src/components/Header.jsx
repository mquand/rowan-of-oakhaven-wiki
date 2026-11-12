'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/wiki/game-overview', label: 'Tổng quan' },
  { href: '/wiki/world-overview', label: '5 Vương quốc' },
  { href: '/database/items', label: 'Vật phẩm' },
  { href: '/database/recipes', label: 'Trà & bánh' },
  { href: '/database/characters', label: 'Cư dân' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = href =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={styles.navPill}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.brandMark}><Icon name="tea-bag" size={20} /></span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Rowan of Oakhaven</span>
            <span className={styles.brandSub}>Fluvio Games Wiki</span>
          </span>
        </Link>

        <nav aria-label="Điều hướng chính">
          <ul className={styles.navLinks}>
            {NAV_LINKS.map(link => (
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
          <a
            href="https://github.com/mquand/rowan-of-oakhaven-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            GitHub
          </a>
          <button
            type="button"
            className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
        <nav aria-label="Menu di động">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${60 + i * 60}ms` : '0ms' }}
              >
                <Link
                  href={link.href}
                  className={isActive(link.href) ? styles.mobileActive : ''}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
