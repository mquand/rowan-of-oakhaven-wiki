import Link from 'next/link';
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
    title: 'Sổ Quái Vật Hắc Hóa',
    kicker: 'Hồ Sơ Sinh Vật Đới Mỏ',
    subtitle: 'Các sinh vật bị ô nhiễm Bụi Sao Hắc Hóa khắp Năm Vương Quốc — đánh bại để thanh tẩy đới mỏ và thu thập nguyên liệu quý.',
    icon: 'sparkle',
  },
  crops: {
    loader: getCrops,
    title: 'Sổ Cây Trồng & Thảo Mộc',
    kicker: 'Nông Trại Bốn Mùa Oakhaven',
    subtitle: 'Thảo mộc theo 4 mùa, chu kỳ sinh trưởng, khả năng tái sinh và hiệu suất kinh tế.',
    icon: 'farm',
  },
  weapons: {
    loader: getWeapons,
    title: 'Vũ Khí & Pháp Khí Ma Thuật',
    kicker: 'Lò Rèn Boris Barnaby',
    subtitle: 'Kiếm pha lê sao, liềm ma thuật, đèn lồng đom đóm và gậy quấy trà rèn tại Lò Boris.',
    icon: 'sword',
  },
  perks: {
    loader: getPerks,
    title: 'Kỹ Năng & Bí Kíp Tiện Ích',
    kicker: 'Quyển Sổ Cũ Của Bà Ngoại',
    subtitle: 'Kỹ năng bị động phục hồi từ các trang sổ rách của Bà Ngoại Amalia qua tiến trình khám phá.',
    icon: 'book-open',
  },
  locations: {
    loader: getLocations,
    title: 'Bản Đồ Địa Danh Năm Vương Quốc',
    kicker: 'Địa Lý Thế Giới Rowan',
    subtitle: 'Thị trấn Oakhaven, Rừng Thầm Thì, Xứ Lò Rèn Boris, Rừng Yêu Tinh và Địa Đàng Cực Quang.',
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
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database">Cơ sở dữ liệu</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{config.title}</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>{config.kicker}</p>
        <h1 className={styles.title}><Icon name={config.icon} size={28} /> {config.title}</h1>
        <p>{config.subtitle}</p>
      </div>

      <EntryBrowser category={category} entries={entries} />
    </div>
  );
}
