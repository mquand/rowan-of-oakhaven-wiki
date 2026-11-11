import styles from '../Database.module.scss';
import { getItems } from '../../../lib/gameData';

export const metadata = {
  title: 'Danh Mục Vật Phẩm — Rowan of Oakhaven Wiki',
};

function getCategoryIcon(cat) {
  switch (cat) {
    case 'seed': return '🌱';
    case 'ingredient': return '🌾';
    case 'mineral': return '⛏️';
    case 'gem': return '💎';
    default: return '📦';
  }
}

export default function ItemsPage() {
  const items = getItems();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📦 Danh Mục Vật Phẩm & Tài Nguyên</h1>
        <p>Hạt giống thảo mộc, quặng khoáng sản và nguyên liệu thu hoạch trên khắp 5 Vương Quốc</p>
      </div>

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.cardTop}>
              <div className={styles.iconWrap}>{getCategoryIcon(item.category)}</div>
              <span className="badge">{item.category}</span>
            </div>
            <h3>{item.name}</h3>
            <p className={styles.desc}>{item.description}</p>
            <div className={styles.tags}>
              {item.tags?.map(t => (
                <span key={t} className="badge forest">#{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
