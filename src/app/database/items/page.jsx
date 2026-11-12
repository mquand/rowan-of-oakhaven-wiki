import styles from '../Database.module.scss';
import { getItems } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import ItemsBrowser from './ItemsBrowser';

export const metadata = {
  title: 'Danh Mục Vật Phẩm — Rowan of Oakhaven Wiki',
};

export default function ItemsPage() {
  const items = getItems();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.kicker}>Database / Items</p>
        <h1 className={styles.title}><Icon name="package" size={28} /> Danh mục vật phẩm và tài nguyên</h1>
        <p>Hạt giống thảo mộc, quặng khoáng sản và nguyên liệu thu hoạch trên khắp 5 Vương quốc</p>
      </div>

      <ItemsBrowser items={items} />
    </div>
  );
}
