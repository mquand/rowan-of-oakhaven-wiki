'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

const STATIONS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'tea_station', label: 'Trạm Trà ASMR' },
  { id: 'bakery_oven', label: 'Lò Nướng Bánh' },
];

export default function RecipesBrowser({ recipes }) {
  const [query, setQuery] = useState('');
  const [station, setStation] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter(recipe => {
      if (station !== 'all' && recipe.station !== station) return false;
      if (!q) return true;
      const haystack = [
        recipe.name,
        recipe.description,
        recipe.effect_description,
        recipe.station === 'tea_station' ? 'trà asmr' : 'lò nướng bánh',
        ...(recipe.ingredients || []).map(i => i.name),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [recipes, query, station]);

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Icon name="magnifying-glass" size={18} className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Tìm công thức, nguyên liệu, hiệu ứng..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Tìm công thức"
          />
        </div>

        <div className={styles.chips} role="group" aria-label="Lọc theo trạm pha chế">
          {STATIONS.map(s => (
            <button
              key={s.id}
              type="button"
              className={`${styles.chip} ${station === s.id ? styles.chipActive : ''}`}
              onClick={() => setStation(s.id)}
              aria-pressed={station === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy công thức nào khớp với tìm kiếm.</p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setQuery('');
              setStation('all');
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
                <th>Công thức</th>
                <th className={styles.stationCell}>Trạm</th>
                <th className={styles.descCell}>Mô tả</th>
                <th className={styles.effectCell}>Hiệu ứng</th>
                <th>Nguyên liệu cần</th>
                <th className={styles.durationCell}>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(recipe => (
                <tr key={recipe.id} id={recipe.id}>
                  <td className={styles.iconCell}>
                    <div className={styles.iconWrap}>
                      <Icon
                        name={recipe.station === 'tea_station' ? 'tea-bag' : 'cake'}
                        size={20}
                      />
                    </div>
                  </td>
                  <td className={styles.nameCell}>
                    <strong>{recipe.name}</strong>
                  </td>
                  <td className={styles.stationCell}>
                    <span className="badge">
                      {recipe.station === 'tea_station' ? 'Trà ASMR' : 'Lò nướng'}
                    </span>
                  </td>
                  <td className={styles.descCell}>{recipe.description}</td>
                  <td className={styles.effectCell}>{recipe.effect_description}</td>
                  <td>
                    <div className={styles.ingredientChips}>
                      {recipe.ingredients.map(ing => (
                        <Link
                          key={ing.id}
                          href={`/database/items/${ing.id}`}
                          className={styles.ingredientLink}
                        >
                          <span>{ing.name}</span>
                          <span className={styles.ingredientQty}>x{ing.quantity}</span>
                        </Link>
                      ))}
                    </div>
                  </td>
                  <td className={styles.durationCell}>
                    {recipe.duration_seconds}s
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
