import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.brand}>
          <div className={styles.brandLogo}>🍵</div>
          <div>
            <span>Rowan of Oakhaven</span>
            <span className={styles.studioTag}>Fluvio Games Wiki</span>
          </div>
        </Link>

        <nav>
          <ul className={styles.navLinks}>
            <li><Link href="/">Trang Chủ</Link></li>
            <li><Link href="/wiki/game-overview">Tổng Quan</Link></li>
            <li><Link href="/wiki/world-overview">5 Vương Quốc</Link></li>
            <li><Link href="/database/items">Vật Phẩm</Link></li>
            <li><Link href="/database/recipes">Trà & Bánh</Link></li>
            <li><Link href="/database/characters">Cư Dân</Link></li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href="https://github.com/mquand/rowan-of-oakhaven-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            <span>GitHub</span> ↗
          </a>
        </div>
      </div>
    </header>
  );
}
