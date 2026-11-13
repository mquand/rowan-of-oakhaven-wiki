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
      title: 'Sổ Quái Vật Hắc Hóa',
      kicker: 'Hồ Sơ Sinh Vật Đới Mỏ',
      subtitle: 'Các sinh vật bị ô nhiễm Bụi Sao Hắc Hóa khắp Năm Vương Quốc — đánh bại để thanh tẩy đới mỏ và thu thập nguyên liệu quý.',
    },
    en: {
      title: 'Corrupted Bestiary',
      kicker: 'Dungeon Creature Dossiers',
      subtitle: 'Creatures corrupted by Dark Starlight across the Five Realms — defeat them to cleanse the mines and gather precious materials.',
    },
  },
  crops: {
    loader: getCrops,
    icon: 'farm',
    vi: {
      title: 'Sổ Cây Trồng & Thảo Mộc',
      kicker: 'Nông Trại Bốn Mùa Oakhaven',
      subtitle: 'Thảo mộc theo 4 mùa, chu kỳ sinh trưởng, khả năng tái sinh và hiệu suất kinh tế.',
    },
    en: {
      title: 'Crops & Herbs Almanac',
      kicker: 'Oakhaven Four-Season Farm',
      subtitle: 'Herbs across four seasons, growth cycles, regrowth rates, and economic yields.',
    },
  },
  weapons: {
    loader: getWeapons,
    icon: 'sword',
    vi: {
      title: 'Vũ Khí & Pháp Khí Ma Thuật',
      kicker: 'Lò Rèn Boris Barnaby',
      subtitle: 'Kiếm pha lê sao, liềm ma thuật, đèn lồng đom đóm và gậy quấy trà rèn tại Lò Boris.',
    },
    en: {
      title: 'Weapons & Magical Implements',
      kicker: 'Boris Barnaby Forge',
      subtitle: 'Starlight crystal blades, magical scythes, firefly lanterns, and tea-stirring hammers forged at Boris’s.',
    },
  },
  perks: {
    loader: getPerks,
    icon: 'book-open',
    vi: {
      title: 'Kỹ Năng & Bí Kíp Tiện Ích',
      kicker: 'Quyển Sổ Cũ Của Bà Ngoại',
      subtitle: 'Kỹ năng bị động phục hồi từ các trang sổ rách của Bà Ngoại Amalia qua tiến trình khám phá.',
    },
    en: {
      title: 'Skills & Utility Perks',
      kicker: 'Grandma’s Old Journal',
      subtitle: 'Passive perks restored from Grandma Amalia’s torn journal pages through exploration milestones.',
    },
  },
  locations: {
    loader: getLocations,
    icon: 'map-pin',
    vi: {
      title: 'Bản Đồ Địa Danh Năm Vương Quốc',
      kicker: 'Địa Lý Thế Giới Rowan',
      subtitle: 'Thị trấn Oakhaven, Rừng Thầm Thì, Xứ Lò Rèn Boris, Rừng Yêu Tinh và Địa Đàng Cực Quang.',
    },
    en: {
      title: 'Five Realms Atlas & Locations',
      kicker: 'Rowan World Geography',
      subtitle: 'Oakhaven Town, Whispering Woods, Boris Forge Realm, Elven Grove, and Aurora Elysium.',
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
