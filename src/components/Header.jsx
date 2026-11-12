'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import SearchModal from './SearchModal';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/wiki', label: 'Tài liệu hướng dẫn' },
  { href: '/database', label: 'Cơ sở dữ liệu' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  const isActive = href =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
            <span className={styles.brandMark}><Icon name="tea-bag" size={20} /></span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>ROWAN OF OAKHAVEN</span>
              <span className={styles.brandSub}>Bách Khoa Toàn Thư</span>
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
            <button
              type="button"
              className={styles.searchBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Tìm kiếm bách khoa (Ctrl+K)"
            >
              <Icon name="magnifying-glass" size={15} />
              <span className={styles.searchBtnText}>Tìm kiếm bách khoa</span>
              <kbd className={styles.searchKbd}>Ctrl K</kbd>
            </button>

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

        {/* Mobile drawer */}
        <div
          className={`${styles.mobileDrawer} ${open ? styles.mobileDrawerOpen : ''}`}
          aria-hidden={!open}
        >
          <ul className={styles.mobileLinks}>
            {NAV_LINKS.map(link => (
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
                <Icon name="magnifying-glass" size={16} /> Tìm kiếm bách khoa (Ctrl+K)
              </button>
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
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
