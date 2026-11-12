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
        <p className={styles.kicker}>Encyclopedic Database</p>
        <h1>Cơ Sở Dữ Liệu Trò Chơi</h1>
        <p>
          Kho tri thức toàn thư của Rowan of Oakhaven — từ hạt giống thảo mộc, sổ công thức pha trà ASMR,
          hồ sơ cư dân, sinh vật hắc hóa cho đến bản đồ Năm Vương Quốc.
        </p>
      </header>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <dt>{counts.total}</dt>
          <dd>Tổng mục dữ liệu</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.items}</dt>
          <dd>Vật phẩm</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.recipes}</dt>
          <dd>Công thức</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.characters}</dt>
          <dd>Cư dân</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.crops}</dt>
          <dd>Cây trồng</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.monsters}</dt>
          <dd>Quái vật</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.weapons}</dt>
          <dd>Vũ khí</dd>
        </div>
        <div className={styles.statItem}>
          <dt>{counts.locations}</dt>
          <dd>Vương quốc</dd>
        </div>
      </div>

      <DatabaseHubClient counts={counts} />
    </div>
  );
}
