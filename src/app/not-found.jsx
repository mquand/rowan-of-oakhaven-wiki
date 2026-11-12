import Link from 'next/link';
import Icon from '../components/Icon';
import styles from './NotFound.module.scss';

export const metadata = {
  title: 'Không tìm thấy trang — Rowan of Oakhaven Wiki',
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={`${styles.box} pixel-frame`}>
        <div className={styles.iconBox}>
          <Icon name="mountains" size={36} />
        </div>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Trang này lạc vào rừng sâu mất rồi</h1>
        <p className={styles.desc}>
          Con đường mòn này không còn nữa hoặc đã bị sương mù che phủ. Hãy quay về tiệm trà để tiếp tục hành trình khám phá Rowan of Oakhaven.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            <Icon name="tea-bag" size={16} /> Về trang chủ
          </Link>
          <Link href="/wiki" className={styles.secondaryBtn}>
            <Icon name="book-open" size={16} /> Tài liệu
          </Link>
          <Link href="/database" className={styles.secondaryBtn}>
            <Icon name="package" size={16} /> Cơ sở dữ liệu
          </Link>
        </div>
      </div>
    </div>
  );
}
