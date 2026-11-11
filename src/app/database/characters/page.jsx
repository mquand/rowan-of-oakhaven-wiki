import styles from '../Database.module.scss';
import { getCharacters } from '../../../lib/gameData';

export const metadata = {
  title: 'Hồ Sơ Cư Dân & Dân Làng — Rowan of Oakhaven Wiki',
};

export default function CharactersPage() {
  const characters = getCharacters();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>👥 Hồ Sơ Cư Dân Oakhaven & Bạn Đồng Hành</h1>
        <p>Những vị khách ghé tiệm tâm sự, chia sẻ nỗi niềm và cùng thưởng thức trà bánh</p>
      </div>

      <div className={styles.grid}>
        {characters.map(char => (
          <div key={char.id} className={styles.characterCard}>
            <div className={styles.charRole}>{char.role}</div>
            <h3>{char.name}</h3>
            <div className={styles.species}>{char.species} · 📍 {char.location}</div>

            {char.quote && (
              <div className={styles.quote}>
                "{char.quote}"
              </div>
            )}

            <p className={styles.desc}>{char.description}</p>

            <div className={styles.charMeta}>
              <span>Món yêu thích: <strong>{char.favorite_items?.join(', ') || 'Đang cập nhật'}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
