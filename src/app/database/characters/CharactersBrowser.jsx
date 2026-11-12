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
        <table className={styles.wikiTable}>
          <thead>
            <tr>
              <th className={styles.iconCell}>Icon</th>
              <th>Tên</th>
              <th className={styles.metaCell}>Vai trò</th>
              <th className={styles.metaCell}>Loài</th>
              <th className={styles.metaCell}>Vị trí</th>
              <th className={styles.descCell}>Mô tả</th>
              <th className={styles.metaCell}>Món yêu thích</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(char => (
              <tr key={char.id}>
                <td className={styles.iconCell}>
                  <div className={styles.iconWrap}>
                    <Icon name="users" size={20} />
                  </div>
                </td>
                <td className={styles.nameCell}>{char.name}</td>
                <td className={styles.metaCell}>{char.role}</td>
                <td className={styles.metaCell}>
                  {char.species}
                  <span className={styles.speciesLoc}>
                    <Icon name="map-pin" size={12} /> {char.location}
                  </span>
                </td>
                <td className={styles.descCell}>{char.description}</td>
                <td className={styles.metaCell}>
                  {char.favorite_items?.join(', ') || 'Đang cập nhật'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
