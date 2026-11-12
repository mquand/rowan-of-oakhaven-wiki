import Link from 'next/link';
import styles from '../Database.module.scss';
import { getCharacters } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import CharactersBrowser from './CharactersBrowser';

export const metadata = {
  title: 'Hồ Sơ Cư Dân & Dân Làng — Rowan of Oakhaven Wiki',
  description: 'Hồ sơ 22 cư dân Oakhaven và 5 Vương Quốc: tính cách, vị trí, lời thoại và sở thích quà tặng.',
};

export default function CharactersPage() {
  const characters = getCharacters();

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link href="/database">Cơ sở dữ liệu</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.current}>Cư dân</span>
      </nav>

      <div className={styles.header}>
        <p className={styles.kicker}>Database / Residents</p>
        <h1 className={styles.title}><Icon name="users" size={28} /> Hồ sơ cư dân Oakhaven và bạn đồng hành</h1>
        <p>Những vị khách ghé tiệm tâm sự, chia sẻ nỗi niềm và cùng thưởng thức trà bánh</p>
      </div>

      <CharactersBrowser characters={characters} />
    </div>
  );
}
