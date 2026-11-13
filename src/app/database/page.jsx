import Link from 'next/link';
import Icon from '../../components/Icon';
import DatabaseHubClient from './DatabaseHubClient';
import styles from './DatabaseHub.module.scss';
import { getDatabaseStats } from '../../lib/gameData';

export const metadata = {
  title: 'Cơ Sở Dữ Liệu — Rowan of Oakhaven Wiki',
  description: 'Toàn bộ dữ liệu vật phẩm, công thức trà & bánh, quái vật, cây trồng, vũ khí và cư dân của Rowan of Oakhaven.',
};

export default function DatabaseHubPage() {
  const counts = getDatabaseStats();

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>Cơ sở dữ liệu</span>
      </nav>

      <header className={styles.header}>
        <p className={styles.kicker}>OAKHAVEN COMPENDIUM</p>
        <h1>Cơ Sở Dữ Liệu Trò Chơi</h1>
        <p>
          Bách khoa toàn thư tra cứu chi tiết về thảo mộc bốn mùa, sổ công thức trà thảo mộc & bánh nướng,
          hồ sơ cư dân, sinh vật hắc hóa và bản đồ Năm Vương Quốc.
        </p>
      </header>

      <DatabaseHubClient counts={counts} />
    </div>
  );
}
