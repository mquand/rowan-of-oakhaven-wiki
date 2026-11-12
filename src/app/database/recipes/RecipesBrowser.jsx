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
        <div className={styles.grid}>
          {filtered.map(recipe => (
            <article key={recipe.id} className={`${styles.recipeCard} pixel-frame`}>
              <div className={styles.recipeStation}>
                <Icon name={recipe.station === 'tea_station' ? 'tea-bag' : 'cake'} size={14} />
                {recipe.station === 'tea_station' ? 'Trạm trà ASMR' : 'Lò nướng bánh'}
              </div>
              <h3>{recipe.name}</h3>
              <p className={styles.desc}>{recipe.description}</p>

              <div className={styles.effect}>
                <Icon name="sparkle" size={14} />
                <span>{recipe.effect_description}</span>
              </div>

              <div className={styles.ingredientsHeader}>Nguyên liệu cần có:</div>
              <ul className={styles.ingredientsList}>
                {recipe.ingredients.map(ing => (
                  <li key={ing.id}>
                    <span>{ing.name}</span>
                    <strong>x{ing.quantity}</strong>
                  </li>
                ))}
              </ul>

              <div className={styles.duration}>
                <Icon name="timer" size={14} />
                <span>Thời gian hoàn thành: {recipe.duration_seconds}s</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
