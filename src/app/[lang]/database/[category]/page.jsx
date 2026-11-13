import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../Database.module.scss';
import Icon from '../../../../components/Icon';
import EntryBrowser from './EntryBrowser';
import { LOCALES, DEFAULT_LOCALE } from '../../../../lib/i18n/config';
import { getDictionary } from '../../../../lib/i18n/getDictionary';
import {
  getCrops,
  getMonsters,
  getWeapons,
  getPerks,
  getLocations,
} from '../../../../lib/gameData';

const CATEGORY_META = {
  monsters: {
    loader: getMonsters,
    icon: 'sparkle',
    vi: {
      title: 'Danh Sách Quái Vật',
      kicker: 'Hồ Sơ Sinh Vật Hang Mỏ',
      subtitle: 'Thông tin thuộc tính, điểm yếu và tỉ lệ rơi chiến lợi phẩm của các sinh vật trong hang mỏ.',
    },
    en: {
      title: 'Monsters & Bosses',
      kicker: 'Dungeon Creature Dossiers',
      subtitle: 'Attributes, elemental weaknesses, and loot drops of dungeon creatures.',
    },
  },
  crops: {
    loader: getCrops,
    icon: 'farm',
    vi: {
      title: 'Cây Trồng & Nông Sản',
      kicker: 'Nông Trại Bốn Mùa',
      subtitle: 'Chu kỳ sinh trưởng, khả năng tái sinh, mùa vụ gieo trồng và sản lượng thu hoạch.',
    },
    en: {
      title: 'Crops & Farming',
      kicker: 'Four-Season Farm',
      subtitle: 'Growth cycles, regrowth rates, planting seasons, and harvest yields.',
    },
  },
  weapons: {
    loader: getWeapons,
    icon: 'sword',
    vi: {
      title: 'Trang Bị & Vũ Khí',
      kicker: 'Kho Trang Bị Oakhaven',
      subtitle: 'Chỉ số sát thương, độ hiếm và hiệu ứng đặc biệt của vũ khí và công cụ khai hoang.',
    },
    en: {
      title: 'Weapons & Equipment',
      kicker: 'Oakhaven Armory',
      subtitle: 'Damage stats, rarities, and special effects of equipment and harvesting tools.',
    },
  },
  perks: {
    loader: getPerks,
    icon: 'book-open',
    vi: {
      title: 'Kỹ Năng & Thiên Phú',
      kicker: 'Hệ Thống Kỹ Năng',
      subtitle: 'Kỹ năng nội tại và hiệu ứng bổ trợ cho khai khoáng, làm nông và chế biến.',
    },
    en: {
      title: 'Skill Trees & Perks',
      kicker: 'Skill Progression',
      subtitle: 'Passive masteries and buffs across exploration, farming, and crafting.',
    },
  },
  locations: {
    loader: getLocations,
    icon: 'map-pin',
    vi: {
      title: 'Bản Đồ & Địa Danh',
      kicker: 'Bản Đồ Thế Giới',
      subtitle: 'Danh sách các khu vực tại Thị trấn Oakhaven và các vùng liên thông.',
    },
    en: {
      title: 'World Locations & Atlas',
      kicker: 'World Geography',
      subtitle: 'Directory of areas across Oakhaven Town and connected realms.',
    },
  },
};

export function generateStaticParams() {
  const categories = Object.keys(CATEGORY_META);
  return LOCALES.flatMap(lang => categories.map(category => ({ lang, category })));
}

export async function generateMetadata({ params }) {
  const { lang, category } = await params;
  const config = CATEGORY_META[category];
  const dict = getDictionary(lang || DEFAULT_LOCALE);
  if (!config) return { title: dict.search.noResults };
  const meta = config[lang] || config.vi;
  return { title: `${meta.title} — Rowan of Oakhaven Wiki` };
}

export default async function CategoryPage({ params }) {
  const { lang, category } = await params;
  const config = CATEGORY_META[category];
  if (!config) notFound();

  const currentLang = lang || DEFAULT_LOCALE;
  const dict = getDictionary(currentLang);
  const meta = config[currentLang] || config.vi;
  const entries = config.loader(currentLang);

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href={`/${currentLang}`}>{dict.nav.home}</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/${currentLang}/database`}>{dict.nav.database}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>{meta.title}</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>{meta.kicker}</p>
        <h1 className={styles.title}><Icon name={config.icon} size={28} /> {meta.title}</h1>
        <p>{meta.subtitle}</p>
      </div>

      <EntryBrowser category={category} entries={entries} lang={currentLang} />
    </div>
  );
}
