'use client';

import { useMemo, useState } from 'react';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const GROUPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'shop', label: 'Tiệm Bụi Sao' },
  { id: 'oakhaven', label: 'Cư Dân Oakhaven' },
  { id: 'realms', label: '5 Vương Quốc & Khách' },
];

export default function CharactersBrowser({ characters }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return characters.filter(char => {
      if (group === 'shop') {
        const isShop = ['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'].includes(char.id);
        if (!isShop) return false;
      } else if (group === 'oakhaven') {
        const isOakhaven =
          char.location.includes('Oakhaven') &&
          !['npc_rowan', 'pet_pip', 'pet_mallow', 'npc_amalia'].includes(char.id);
        if (!isOakhaven) return false;
      } else if (group === 'realms') {
        const isRealms = !char.location.includes('Oakhaven');
        if (!isRealms) return false;
      }

      if (!q) return true;
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
  }, [characters, query, group]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Tìm cư dân, loài, vị trí, quà yêu thích..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tìm cư dân"
          />
        </div>

        <div className={styles.chips} role="group" aria-label="Lọc theo nhóm cư dân">
          {GROUPS.map(g => (
            <button
              key={g.id}
              type="button"
              className={`${styles.chip} ${group === g.id ? styles.chipActive : ''}`}
              onClick={() => setGroup(g.id)}
              aria-pressed={group === g.id}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy cư dân nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setQuery('');
              setGroup('all');
            }}
          >
            Xóa tìm kiếm
          </button>
        </div>
      ) : (
        <div className={`${styles.tableWrapper} pixel-frame`}>
          <table className={styles.wikiTable}>
            <thead>
              <tr>
                <th className={styles.iconCell}>Icon</th>
                <th>Tên</th>
                <th className={styles.metaCell}>Vai trò</th>
                <th className={styles.metaCell}>Loài</th>
                <th className={styles.metaCell}>Vị trí</th>
                <th className={styles.descCell}>Tiểu sử & Lời thoại</th>
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
                  <td className={styles.nameCell}>
                    <strong>{char.name}</strong>
                  </td>
                  <td className={styles.metaCell}>{char.role}</td>
                  <td className={styles.metaCell}>
                    <span className="badge forest">{char.species}</span>
                  </td>
                  <td className={styles.metaCell}>
                    <span className={styles.speciesLoc}>
                      <Icon name="map-pin" size={12} /> {char.location}
                    </span>
                  </td>
                  <td className={styles.descCell}>
                    <p>{char.description}</p>
                    {char.quote && (
                      <em style={{ display: 'block', marginTop: '6px', color: '#ffcf40', fontSize: '12px' }}>
                        &ldquo;{char.quote}&rdquo;
                      </em>
                    )}
                  </td>
                  <td className={styles.metaCell}>
                    {char.favorite_items && char.favorite_items.length > 0 ? (
                      <div className={styles.ingredientChips}>
                        {char.favorite_items.map(item => (
                          <span key={item} className="badge">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      'Đang cập nhật'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
