import styles from '../Database.module.scss';
import { getCharacters } from '../../../lib/gameData';
import Icon from '../../../components/Icon';
import CharactersBrowser from './CharactersBrowser';

export const metadata = {
  title: 'Hồ Sơ Cư Dân & Dân Làng — Rowan of Oakhaven Wiki',
};

export default function CharactersPage() {
  const characters = getCharacters();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}><Icon name="users" size={28} /> Hồ sơ cư dân Oakhaven và bạn đồng hành</h1>
        <p>Những vị khách ghé tiệm tâm sự, chia sẻ nỗi niềm và cùng thưởng thức trà bánh</p>
      </div>

      <CharactersBrowser characters={characters} />
    </div>
  );
}
