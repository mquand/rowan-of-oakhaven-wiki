import { notFound } from 'next/navigation';
import styles from '../Database.module.scss';
import Icon from '../../../components/Icon';
import EntryBrowser from './EntryBrowser';
import {
  getCrops,
  getMonsters,
  getWeapons,
  getPerks,
  getLocations,
} from '../../../lib/gameData';

const CATEGORIES = {
  monsters: {
    loader: getMonsters,
    title: 'Sổ quái vật',
    subtitle: 'Sinh vật bị Bụi Sao Hắc Hóa trên khắp Năm Vương quốc — xoa dịu bằng vị giác và trà bánh',
    icon: 'sparkle',
  },
  crops: {
    loader: getCrops,
    title: 'Sổ cây trồng',
    subtitle: 'Thảo mộc theo mùa, chu kỳ sinh trưởng và sản phẩm thu hoạch',
    icon: 'farm',
  },
  weapons: {
    loader: getWeapons,
    title: 'Vũ khí phép thuật',
    subtitle: 'Bộ sưu tập vũ khí ma thuật rèn tại Lò của Boris',
    icon: 'sword',
  },
  perks: {
    loader: getPerks,
    title: 'Kỹ năng tiện ích',
    subtitle: 'Bí kíp sống của Bà Ngoại — kỹ năng bị động phục hồi từ trang sách cổ',
    icon: 'book-open',
  },
  locations: {
    loader: getLocations,
    title: 'Bản đồ & vương quốc',
    subtitle: 'Hành trình mở rộng qua Năm Vương quốc của Rowan of Oakhaven',
    icon: 'map-pin',
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map(category => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const config = CATEGORIES[category];
  if (!config) return { title: 'Không tìm thấy trang' };
  return { title: `${config.title} — Rowan of Oakhaven Wiki` };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const config = CATEGORIES[category];
  if (!config) notFound();

  const entries = config.loader();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}><Icon name={config.icon} size={28} /> {config.title}</h1>
        <p>{config.subtitle}</p>
      </div>

      <EntryBrowser category={category} entries={entries} />
    </div>
  );
}
