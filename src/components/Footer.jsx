import Link from 'next/link';
import Icon from './Icon';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.about}>
            <h3 className={styles.brand}><Icon name="leaf" size={18} /> Rowan of Oakhaven</h3>
            <p>
              Tựa game Cozy Dark Pixel RPG kết hợp nghệ thuật pha trà ASMR, nướng bánh ma thuật,
              trồng trọt và chiến đấu thanh tẩy quái vật trong thế giới Năm Vương Quốc.
            </p>
          </div>

          <div className={styles.links}>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link href="/wiki">Thư Viện Tài Liệu</Link></li>
                <li><Link href="/wiki/game-overview">Giới Thiệu Game</Link></li>
                <li><Link href="/wiki/getting-started">Hướng Dẫn Khởi Đầu</Link></li>
                <li><Link href="/wiki/world-overview">Bản Đồ 5 Vực</Link></li>
                <li><Link href="/wiki/character-roster">Dàn Nhân Vật</Link></li>
                <li><Link href="/wiki/dungeon-combat">Hầm Ngục & Chiến Đấu</Link></li>
              </ul>
            </div>

            <div>
              <h4>Database</h4>
              <ul>
                <li><Link href="/database">Tổng Quan Database</Link></li>
                <li><Link href="/database/items">Kho Vật Phẩm</Link></li>
                <li><Link href="/database/recipes">Sổ Công Thức</Link></li>
                <li><Link href="/database/characters">Hồ Sơ Cư Dân</Link></li>
                <li><Link href="/database/crops">Sổ Cây Trồng</Link></li>
                <li><Link href="/database/monsters">Sổ Quái Vật</Link></li>
              </ul>
            </div>

            <div>
              <h4>Legal</h4>
              <ul>
                <li><Link href="/privacy">Chính Sách Bảo Mật</Link></li>
                <li><Link href="/terms">Điều Khoản Sử Dụng</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span>© 2026 <strong>Fluvio Games</strong>. All rights reserved.</span>
          <span>Dựng bằng Next.js & SCSS · Single Source of Truth Wiki</span>
        </div>
      </div>
    </footer>
  );
}
