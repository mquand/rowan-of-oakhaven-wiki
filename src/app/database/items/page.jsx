import Link from 'next/link';
import styles from '../Database.module.scss';
import { getItems } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import ItemsBrowser from './ItemsBrowser';

export const metadata = {
  title: 'Kho Vật Phẩm & Tài Nguyên — Rowan of Oakhaven Wiki',
  description: 'Hạt giống thảo mộc, quặng khoáng sản, tinh thể và nguyên liệu thu hoạch trên khắp Năm Vương Quốc.',
};

export default function ItemsPage() {
  const items = getItems();

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database">Cơ sở dữ liệu</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>Vật phẩm</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>Database / Items</p>
        <h1 className={styles.title}><Icon name="package" size={28} /> Kho vật phẩm & tài nguyên</h1>
        <p>Hạt giống thảo mộc, quặng khoáng sản và nguyên liệu thu hoạch trên khắp 5 Vương quốc</p>
      </div>

      <ItemsBrowser items={items} />
    </div>
  );
}
