'use client';

import { useMemo, useState } from 'react';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

export default function CharactersBrowser({ characters }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter(char => {
      const haystack = [
        char.name,
        char.role,
        char.species,
        char.location,
        char.description,
        char.quote,
        ...(char.favorite_items || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [characters, query]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Tìm cư dân, loài, địa điểm..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tìm cư dân"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy cư dân nào khớp với tìm kiếm.</p>
          <button type="button" className={styles.resetBtn} onClick={() => setQuery('')}>
            Xóa tìm kiếm
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(char => (
            <article key={char.id} className={`${styles.characterCard} pixel-frame`}>
              <div className={styles.charRole}>{char.role}</div>
              <h3>{char.name}</h3>
              <div className={styles.species}>
                {char.species}
                <span className={styles.speciesLoc}>
                  <Icon name="map-pin" size={14} /> {char.location}
                </span>
              </div>

              {char.quote && (
                <div className={styles.quote}>
                  "{char.quote}"
                </div>
              )}

              <p className={styles.desc}>{char.description}</p>

              <div className={styles.charMeta}>
                <span>Món yêu thích: <strong>{char.favorite_items?.join(', ') || 'Đang cập nhật'}</strong></span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
