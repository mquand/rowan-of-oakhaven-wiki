'use client';

import { useMemo, useState } from 'react';
import Icon from '../../../components/Icon';
import styles from '../Database.module.scss';

export default function RecipesBrowser({ recipes }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(recipe => {
      const haystack = [
        recipe.name,
        recipe.description,
        recipe.effect_description,
        recipe.station === 'tea_station' ? 'trà trà asmr' : 'lò nướng bánh',
        ...(recipe.ingredients || []).map(i => i.name),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [recipes, query]);

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
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Không tìm thấy công thức nào khớp với tìm kiếm.</p>
          <button type="button" className={styles.resetBtn} onClick={() => setQuery('')}>
            Xóa tìm kiếm
          </button>
        </div>
      ) : (
        <table className={styles.wikiTable}>
          <thead>
            <tr>
              <th className={styles.iconCell}>Icon</th>
              <th>Công thức</th>
              <th className={styles.stationCell}>Trạm</th>
              <th className={styles.descCell}>Mô tả</th>
              <th className={styles.effectCell}>Hiệu ứng</th>
              <th className={styles.qtyCell}>Nguyên liệu</th>
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
                <td className={styles.nameCell}>{recipe.name}</td>
                <td className={styles.stationCell}>
                  {recipe.station === 'tea_station' ? 'Trạm trà ASMR' : 'Lò nướng bánh'}
                </td>
                <td className={styles.descCell}>{recipe.description}</td>
                <td className={styles.effectCell}>{recipe.effect_description}</td>
                <td className={styles.qtyCell}>
                  {recipe.ingredients
                    .map(ing => `${ing.name} x${ing.quantity}`)
                    .join(', ')}
                </td>
                <td className={styles.durationCell}>
                  {recipe.duration_seconds}s
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
