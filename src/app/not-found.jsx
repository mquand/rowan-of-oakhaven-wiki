import Link from 'next/link';
import styles from './NotFound.module.scss';

export const metadata = {
  title: 'Không tìm thấy trang — Rowan of Oakhaven Wiki',
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Trang này lạc vào rừng sâu mất rồi</h1>
      <p className={styles.desc}>
        Con đường mòn này không còn nữa. Quay về tiệm trà để tiếp tục hành trình khám phá
        Rowan of Oakhaven.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.primaryBtn}>Về trang chủ</Link>
        <Link href="/wiki/game-overview" className={styles.secondaryBtn}>Đọc tổng quan game</Link>
      </div>
    </div>
  );
}
